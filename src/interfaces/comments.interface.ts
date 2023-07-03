import { z } from "zod";
import {
  commentSchema,
  commentSchemaResponse,
  commentSchemaUpdate,
} from "../schemas";

export type IComments = z.infer<typeof commentSchema>;
export type ICommentsResponse = z.infer<typeof commentSchemaResponse>;
export type ICommentsUpdate = z.infer<typeof commentSchemaUpdate>;
