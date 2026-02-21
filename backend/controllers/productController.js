// Product controller — handles CRUD operations for products,
// image uploads to Cloudinary, and customer review management.

const Product = require("../models/productModel");
const catchAsync = require("../middlewares/asyncErrorHandler");
const AppError = require("../utils/errorHandler");
const QueryBuilder = require("../utils/searchFeatures");
const cloudinary = require("cloudinary");

// Helper: uploads an array of base64 images to a Cloudinary folder
const uploadImages = async (images, folder) => {
    const uploaded = [];
    for (const img of images) {
        const result = await cloudinary.v2.uploader.upload(img, { folder });
        uploaded.push({ public_id: result.public_id, url: result.secure_url });
    }
    return uploaded;
};

// Helper: removes images from Cloudinary by their public_id
const removeImages = async (images) => {
    for (const img of images) {
        await cloudinary.v2.uploader.destroy(img.public_id);
    }
};

// ── Public Routes ──────────────────────────────────────

// GET /products — list products with search, filter, sort, pagination
exports.fetchAllItems = catchAsync(async (req, res) => {
    const perPage = 8;
    const totalItems = await Product.countDocuments();

    const queryBuilder = new QueryBuilder(Product.find(), req.query)
        .applySearch()
        .applyFilters()
        .applySorting();

    // Count how many items match *before* pagination
    const filteredCount = await queryBuilder.query.clone().countDocuments();

    queryBuilder.applyPagination(perPage);
    const items = await queryBuilder.query;

    res.status(200).json({
        success: true,
        products: items,
        productsCount: totalItems,
        resultPerPage: perPage,
        filteredProductsCount: filteredCount,
    });
});

// GET /product/:id — fetch a single product by its ID
exports.fetchItemDetails = catchAsync(async (req, res, next) => {
    const item = await Product.findById(req.params.id);
    if (!item) return next(new AppError("Product not found", 404));

    res.status(200).json({ success: true, product: item });
});

// ── Admin Routes ───────────────────────────────────────

// GET /admin/products — fetch all products for admin dashboard
exports.fetchAdminItems = catchAsync(async (_req, res) => {
    const items = await Product.find();
    res.status(200).json({ success: true, products: items });
});

// POST /product/new — create a new product with images
exports.addNewProduct = catchAsync(async (req, res) => {
    // Normalize images to an array whether single or multiple
    const rawImages = typeof req.body.images === "string"
        ? [req.body.images]
        : req.body.images;

    const productImages = await uploadImages(rawImages, "products");

    // Upload brand logo separately
    const logoResult = await cloudinary.v2.uploader.upload(req.body.logo, {
        folder: "brands",
    });

    // Parse JSON specifications (they come as stringified objects from FormData)
    const parsedSpecs = req.body.specifications.map((spec) => JSON.parse(spec));

    req.body.images = productImages;
    req.body.brand = {
        name: req.body.brandname,
        logo: { public_id: logoResult.public_id, url: logoResult.secure_url },
    };
    req.body.specifications = parsedSpecs;
    req.body.user = req.user.id;

    const newProduct = await Product.create(req.body);
    res.status(201).json({ success: true, product: newProduct });
});

// PUT /product/:id — update an existing product
exports.modifyProduct = catchAsync(async (req, res, next) => {
    let item = await Product.findById(req.params.id);
    if (!item) return next(new AppError("Product not found", 404));

    // If new images were uploaded, swap out the old ones in Cloudinary
    if (req.body.images !== undefined) {
        const rawImages = typeof req.body.images === "string"
            ? [req.body.images]
            : req.body.images;

        // Delete old images from cloud storage
        await removeImages(item.images);

        // Upload new images
        req.body.images = await uploadImages(rawImages, "products");
    }

    // If a new brand logo was uploaded, swap out the old one
    if (req.body.logo !== undefined) {
        await cloudinary.v2.uploader.destroy(item.brand.logo.public_id);
        const logoResult = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: "brands",
        });
        req.body.brand = {
            name: req.body.brandname,
            logo: { public_id: logoResult.public_id, url: logoResult.secure_url },
        };
    }

    // Parse specifications if they were sent
    if (req.body.specifications) {
        req.body.specifications = req.body.specifications.map((s) => JSON.parse(s));
    }

    item = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, product: item });
});

// DELETE /product/:id — remove a product and its cloud images
exports.removeProduct = catchAsync(async (req, res, next) => {
    const item = await Product.findById(req.params.id);
    if (!item) return next(new AppError("Product not found", 404));

    // Clean up all images from Cloudinary
    await removeImages(item.images);
    if (item.brand?.logo?.public_id) {
        await cloudinary.v2.uploader.destroy(item.brand.logo.public_id);
    }

    await item.remove();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
});

// ── Review Routes ──────────────────────────────────────

// PUT /review — add or update a review on a product
exports.submitReview = catchAsync(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const reviewData = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const item = await Product.findById(productId);
    if (!item) return next(new AppError("Product not found", 404));

    // Check if this user already reviewed this product
    const existingIndex = item.reviews.findIndex(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingIndex >= 0) {
        // Update existing review
        item.reviews[existingIndex] = reviewData;
    } else {
        // Add new review
        item.reviews.push(reviewData);
    }

    // Recalculate the average rating
    item.numOfReviews = item.reviews.length;
    const totalRating = item.reviews.reduce((sum, r) => sum + r.rating, 0);
    item.ratings = totalRating / item.numOfReviews;

    await item.save({ validateBeforeSave: false });
    res.status(200).json({ success: true });
});

// GET /reviews?id= — get all reviews for a product
exports.fetchReviews = catchAsync(async (req, res, next) => {
    const item = await Product.findById(req.query.id);
    if (!item) return next(new AppError("Product not found", 404));

    res.status(200).json({ success: true, reviews: item.reviews });
});

// DELETE /reviews?productId=&id= — remove a specific review
exports.removeReview = catchAsync(async (req, res, next) => {
    const item = await Product.findById(req.query.productId);
    if (!item) return next(new AppError("Product not found", 404));

    // Filter out the review to be deleted
    const updatedReviews = item.reviews.filter(
        (r) => r._id.toString() !== req.query.id.toString()
    );

    // Recalculate ratings
    const reviewCount = updatedReviews.length;
    const avgRating = reviewCount > 0
        ? updatedReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews: updatedReviews,
        ratings: avgRating,
        numOfReviews: reviewCount,
    }, { new: true, runValidators: true });

    res.status(200).json({ success: true });
});