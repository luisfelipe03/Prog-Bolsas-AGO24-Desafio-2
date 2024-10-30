import { describe, expect, it } from "vitest";
import { convertAddressToString, getAddressByCEP } from "./viaCEP";

describe("viaCEP", () => {
    it("should return the address", async () => {
        const address = await getAddressByCEP("55296630");
        expect(address).toEqual({
            street: "Rua Francisco Gueiros",
            neighborhood: "Heliópolis",
            city: "Garanhuns",
            latLng: {
                lat: -8.8846718,
                lng: -36.4755754,
            },
            state: "PE",
            zip: "55296-630",
        });
    });

    //TODO: Melhorar a exceção
    it("should return null if the CEP is not found", async () => {
        const address = await getAddressByCEP("55415001");
        expect(address).toBeNull();
    });

    it("should throw an error if the CEP is invalid", async () => {
        try {
            await getAddressByCEP("123a56b89");
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty("message", "Invalid Zip. Please provide a valid zip code.");
        }
    });

    it("should throw an error if the CEP is empty", async () => {
        try {
            await getAddressByCEP("");
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty("message", "Invalid Zip. Please provide a valid zip code.");
        }
    });

    it("should convert the address to a string", async () => {
        const address = await getAddressByCEP("55296630");
        if (address) {
            const addressString = convertAddressToString(address);
            expect(addressString).toBe(
                "Rua Francisco Gueiros, Heliópolis, Garanhuns - PE"
            );
        }
    });
});
