import { z } from "zod";
import { createLoginSchema } from "../schemas";

type ILogin = z.infer<typeof createLoginSchema>

export {ILogin}