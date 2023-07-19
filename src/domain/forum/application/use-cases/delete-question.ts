import { IQuestionsRepository } from "../repositories/questions-repository";

interface IDeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface IDeleteQuestionUseCaseResponse { }

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) { }

  async execute({
    questionId,
    authorId
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error("Question not found.")
    }

    if(authorId !== question.authorId.toString()){
      throw new Error("Not allowed.")
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}