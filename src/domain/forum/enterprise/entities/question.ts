import { UniqueEntityId } from "@/core/entity/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Slug } from "./value-objects/slug";
import dayjs from "dayjs";
import { AggregateRoot } from "@/core/entity/aggregate-root";
import { QuestionAttachment } from "./question-attachment";

export interface IQuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  content: string;
  slug: Slug;
  title: string;
  createdAt: Date;
  updatedAt?: Date;

  attachments: Array<QuestionAttachment>;
}

export class Question extends AggregateRoot<IQuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get title() {
    return this.props.title;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get attachments() {
    return this.props.attachments;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);

    this.touch();
  }

  set content(content: string) {
    this.props.content = content;

    this.touch();
  }

  set attachments(attachments: Array<QuestionAttachment>) {
    this.props.attachments = attachments;
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId;

    this.touch();
  }

  static create(
    props: Optional<IQuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return question;
  }
}
