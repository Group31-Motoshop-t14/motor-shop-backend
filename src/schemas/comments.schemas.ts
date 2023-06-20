import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(2),
});
const commentSchemaResponse = commentSchema.extend({
  id: z.string(),
  carId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export { commentSchema, commentSchemaResponse };
