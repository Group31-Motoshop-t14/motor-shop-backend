import { z } from "zod";
import { commentSchema, commentSchemaResponse } from "../schemas";

export type IComments = z.infer<typeof commentSchema>;
export type ICommentsResponse = z.infer<typeof commentSchemaResponse>;
