import { Comment } from "@prisma/client";
import { AppError } from "../errors";
import { IComments, ICommentsResponse } from "../interfaces";
import { commentSchemaResponse } from "../schemas";
import { prisma } from "../server";
import { ICommentsUpdate } from "../interfaces/comments.interface";

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

const deleteCommentsService = async (commentId: string, userId: string) => {
  const commentData: Comment | null = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (commentData!.userId != userId) {
    throw new AppError("You can only delete your comments", 403);
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

const updateCommentsService = async (
  commentId: string,
  userId: string,
  data: ICommentsUpdate
) => {
  const commentData: Comment | null = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  console.log(commentData);
  if (commentData!.userId != userId) {
    throw new AppError("You can only update your comments", 403);
  }

  const updateComment: ICommentsUpdate | null = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: data.content!,
    },
  });

  return updateComment;
};

export {
  createCommentService,
  getCommentsService,
  deleteCommentsService,
  updateCommentsService,
};
