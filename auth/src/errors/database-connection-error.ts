import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connection to database'
    statusCode = 500

    constructor() {
        super('error connecting database')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors () {
        return [
            { message: this.reason }
        ]
    }
}