import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { IQuestionCommentsRepository } from "../repositories/question-comments-repository";

interface ICommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface ICommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentRepository: IQuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: ICommentOnQuestionUseCaseRequest): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    });

    await this.questionCommentRepository.create(questionComment);

    return { questionComment };
  }
}
