export class InvalidZipError extends Error {
    constructor() {
        super("Invalid Zip. Please provide a valid zip code.");
    }
}