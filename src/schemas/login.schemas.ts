import { z } from "zod";

const createLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(120)
})

export {createLoginSchema}