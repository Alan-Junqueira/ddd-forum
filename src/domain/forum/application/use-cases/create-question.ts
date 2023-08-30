import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";

interface ICreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type ICreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: ICreateQuestionUseCaseRequest): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
