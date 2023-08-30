import { Entity } from "@/core/entity/entity";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";

interface IAnswerAttachmentProps {
  answerId: string;
  attachmentId: string;
}

export class AnswerAttachment extends Entity<IAnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IAnswerAttachmentProps, id?: UniqueEntityId) {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }
}
