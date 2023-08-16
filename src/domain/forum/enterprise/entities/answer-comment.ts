import { Entity } from '@/core/entity/entity'
import { UniqueEntityId } from '@/core/entity/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface IAnswerCommentsProps {
  authorId: UniqueEntityId
  answerId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<IAnswerCommentsProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<IAnswerCommentsProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
