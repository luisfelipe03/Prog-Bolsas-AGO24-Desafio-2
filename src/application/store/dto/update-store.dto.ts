import { z } from 'zod';

export const UpdateStoreInputDTO = z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    phone: z.string(),  
    zip: z.string(), 
});

export type UpdateStoreDTO = z.infer<typeof UpdateStoreInputDTO>;
