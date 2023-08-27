import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface IAnswerCommentsRepository {
  create(answer: AnswerComment): Promise<void>
}
