import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { DeleteAnswerUseCase } from "./delete-answer"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1'
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('Should no be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () =>
      await sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})