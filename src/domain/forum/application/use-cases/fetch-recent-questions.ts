import { IQuestionsRepository } from "../repositories/questions-repository"
import { Question } from "../../enterprise/entities/question"

interface IFetchRecentQuestionsRequest {
  page: number
}

interface IFetchRecentQuestionsResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({
    page
  }: IFetchRecentQuestionsRequest): Promise<IFetchRecentQuestionsResponse> {

    const questions = await this.questionsRepository.findManyRecent({ page })

    if (!questions) {
      throw new Error("Question not found")
    }

    return { questions }
  }
}
