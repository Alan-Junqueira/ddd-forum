import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { IAnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface ICommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface ICommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentRepository: IAnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: ICommentOnAnswerUseCaseRequest): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),
    });

    await this.answerCommentRepository.create(answerComment);

    return { answerComment };
  }
}
