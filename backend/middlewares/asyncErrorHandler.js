// Wraps async route handlers so we don't need try/catch in every controller.
// Any rejected promise is automatically forwarded to the error middleware.

const catchAsync = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};

module.exports = catchAsync;