import { IAnswersRepository } from "../repositories/answers-repository";

interface IDeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface IDeleteAnswerUseCaseResponse { }

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) { }

  async execute({
    answerId,
    authorId
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error("Answer not found.")
    }

    if(authorId !== answer.authorId.toString()){
      throw new Error("Not allowed.")
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}