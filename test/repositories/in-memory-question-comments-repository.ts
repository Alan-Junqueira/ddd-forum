import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async delete(question: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(item => item.id.toString() === id);

    if (!questionComment) {
      return null
    }

    return questionComment
  }
}
