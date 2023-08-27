import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface IDeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface IDeleteAnswerCommentUseCaseResponse {}

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
      throw new Error("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed!");
    }

    await this.answerCommentRepository.delete(answerComment);

    return {};
  }
}
