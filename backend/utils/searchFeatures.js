// Query builder utility — chains search, filter, sort, and pagination
// operations onto a Mongoose query. Used by the product listing endpoint.

class QueryBuilder {
    constructor(baseQuery, queryParams) {
        this.query = baseQuery;
        this.params = queryParams;
    }

    // Full-text search on the product name field
    applySearch() {
        if (this.params.keyword) {
            this.query = this.query.find({
                name: { $regex: this.params.keyword, $options: "i" },
            });
        }
        return this;
    }

    // Apply range and exact-match filters (price, ratings, category)
    // Strips out pagination/sort fields so they don't pollute the filter
    applyFilters() {
        const filterCopy = { ...this.params };
        const excludedFields = ["keyword", "page", "limit", "sort"];
        excludedFields.forEach((field) => delete filterCopy[field]);

        // Convert operators like gte/lte into MongoDB $gte/$lte syntax
        let filterString = JSON.stringify(filterCopy);
        filterString = filterString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(filterString));
        return this;
    }

    // Sort results — supports price ascending/descending and newest first
    applySorting() {
        if (this.params.sort) {
            const sortMapping = {
                lowest: "price",
                highest: "-price",
                newest: "-createdAt",
                ratings: "-ratings",
            };
            const sortKey = sortMapping[this.params.sort] || "-createdAt";
            this.query = this.query.sort(sortKey);
        }
        return this;
    }

    // Paginate results — defaults to 8 items per page
    applyPagination(perPage = 8) {
        const currentPage = Number(this.params.page) || 1;
        const skipCount = perPage * (currentPage - 1);
        this.query = this.query.limit(perPage).skip(skipCount);
        return this;
    }
}

module.exports = QueryBuilder;