import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import {
  IAnswerAttachmentProps,
  AnswerAttachment,
} from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachment(
  override: Partial<IAnswerAttachmentProps> = {},
  id?: UniqueEntityId
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return answerAttachment;
}
