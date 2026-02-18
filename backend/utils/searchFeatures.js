class SearchFeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",
            }
        } : {};

        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString }

        // fields to remove for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Specific handling for case-insensitive category
        if (queryCopy.category) {
            this.query = this.query.find({
                category: {
                    $regex: queryCopy.category,
                    $options: "i"
                }
            });
            delete queryCopy.category;
        }

        // price filter
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort;

            if (sortBy === "newest") {
                this.query = this.query.sort({ createdAt: -1 });
            } else if (sortBy === "oldest") {
                this.query = this.query.sort({ createdAt: 1 });
            } else if (sortBy === "highest") {
                this.query = this.query.sort({ price: -1 });
            } else if (sortBy === "lowest") {
                this.query = this.query.sort({ price: 1 });
            } else if (sortBy === "popular") {
                this.query = this.query.sort({ numOfReviews: -1, ratings: -1 });
            }
        } else {
            // Default sort: Newest first
            this.query = this.query.sort({ createdAt: -1 });
        }
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;

        const skipProducts = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }
};

module.exports = SearchFeatures;