import { AppError } from "../errors";
import { IComments, ICommentsResponse } from "../interfaces";
import { commentSchemaResponse } from "../schemas";
import { prisma } from "../server";

const createCommentService = async (
  data: IComments,
  userId: string,
  carId: string
): Promise<ICommentsResponse> => {
  const newComment = await prisma.comment.create({
    data: {
      ...data,
      carId,
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return newComment;
};

const getCommentsService = async (
  carId: string
): Promise<ICommentsResponse[]> => {
  const comments = await prisma.comment.findMany({
    where: { carId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return comments;
};

export { createCommentService, getCommentsService };
