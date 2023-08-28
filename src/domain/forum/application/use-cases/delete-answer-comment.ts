import { Either, left, right } from "@/core/either";
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface IDeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type IDeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<IDeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return left("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left("Not allowed!");
    }

    await this.answerCommentRepository.delete(answerComment);

    return right({});
  }
}
