module.exports = class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message || "default AppError message";
        this.status = status;
    }
}

