import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"
import { EditAnswerUseCase } from "./edit-answer"
import { NotAllowedError } from "./errors/not-allowed-error"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: "author-1",
      content: "Conteúdo teste",
      answerId: newAnswer.id.toString()
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "Conteúdo teste",
    })
  })

  it('Should no be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: "author-2",
      content: "Conteúdo teste",
      answerId: newAnswer.id.toString()
    })

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  })
})