export interface CreateStoreDTO {
    name: string;
    phone: string;
    zip: string;
}

export function validateCreateStoreInput(data: any): CreateStoreDTO {
    const errors: string[] = [];

    if (typeof data.name !== "string" || data.name.length < 5) {
        errors.push("Name is required and must be at least 5 characters long");
    }

    if (typeof data.phone !== "string") {
        errors.push("Phone is required and must be a string");
    }

    if (typeof data.zip !== "string") {
        errors.push("Zip is required and must be a string");
    }

    if (errors.length > 0) {
        throw new Error(`Validation error(s): ${errors.join(", ")}`);
    }

    return {
        name: data.name,
        phone: data.phone,
        zip: data.zip,
    };
}

