const adminMiddleware = (req, res, next) => {
    // Placeholder for admin authentication logic
    console.log("Admin Middleware Triggered");
    next();
};

module.exports = adminMiddleware;
