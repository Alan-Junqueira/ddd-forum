import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { DeleteQuestionUseCase } from "./delete-question"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1'
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('Should no be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () =>
      await sut.execute({
        questionId: 'question-1',
        authorId: 'author-2'
      })
    ).rejects.toBeInstanceOf(Error)

  })
})