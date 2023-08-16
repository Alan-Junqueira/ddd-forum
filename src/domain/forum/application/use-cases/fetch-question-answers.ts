import { IAnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../../enterprise/entities/answer";

interface IFetchQuestionAnswersRequest {
  page: number;
  questionId: string;
}

interface IFetchQuestionAnswersResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionAnswersRequest): Promise<IFetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );

    if (!answers) {
      throw new Error("Answers not found");
    }

    return { answers };
  }
}
