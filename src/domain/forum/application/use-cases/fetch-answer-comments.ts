import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { IAnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface IFetchAnswerCommentsRequest {
  page: number;
  answerId: string;
}

interface IFetchAnswerCommentsResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentsRepository: IAnswerCommentsRepository
  ) {}

  async execute({
    page,
    answerId,
  }: IFetchAnswerCommentsRequest): Promise<IFetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    if (!answerComments) {
      throw new Error("Answers not found");
    }

    return { answerComments };
  }
}
