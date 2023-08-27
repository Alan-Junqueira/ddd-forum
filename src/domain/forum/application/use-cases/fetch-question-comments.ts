import { QuestionComment } from "../../enterprise/entities/question-comment";
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository";

interface IFetchQuestionCommentsRequest {
  page: number;
  questionId: string;
}

interface IFetchQuestionCommentsResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository
  ) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionCommentsRequest): Promise<IFetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    if (!questionComments) {
      throw new Error("Answers not found");
    }

    return { questionComments };
  }
}
