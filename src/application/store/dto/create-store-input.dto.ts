import { z } from 'zod';

export const CreateStoreInputDTO = z.object({
    name: z.string().min(5, "Name is required"),
    phone: z.string(),  
    zip: z.string(), 
});

export type CreateStoreDTO = z.infer<typeof CreateStoreInputDTO>;
