import { Entity } from "@/core/entity/entity";
import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface INotificationProps {
  recipientId: UniqueEntityId;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
}

export class Notification extends Entity<INotificationProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  static create(
    props: Optional<INotificationProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return notification;
  }
}
