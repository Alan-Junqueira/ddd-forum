import { Either, left, right } from "@/core/either";
import { IAnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface IDeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type IDeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      throw left(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);

    return right({});
  }
}
