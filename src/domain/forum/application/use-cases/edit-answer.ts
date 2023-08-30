import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { IAnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface IEditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type IEditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}
