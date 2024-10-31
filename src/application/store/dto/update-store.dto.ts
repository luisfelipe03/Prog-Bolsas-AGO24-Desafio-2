export interface UpdateStoreDTO {
    id: string;
    name: string;
    phone: string;
    zip: string;
}

export function validateUpdateStoreInput(data: any): UpdateStoreDTO {
    const errors: string[] = [];

    if (typeof data.id !== "string") {
        errors.push("ID is required and must be a string");
    }

    if (typeof data.name !== "string" || data.name.length < 1) {
        errors.push("Name is required and must have at least 1 character");
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
        id: data.id,
        name: data.name,
        phone: data.phone,
        zip: data.zip,
    };
}
