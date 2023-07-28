import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityId } from "@/core/entity/unique-entity-id"
import { EditQuestionUseCase } from "./edit-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: "author-1",
      title: "Pergunta teste",
      content: "Conteúdo teste",
      questionId: newQuestion.id.toString()
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Pergunta teste",
      content: "Conteúdo teste",
    })
  })

  it('Should no be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () =>
      await sut.execute({
        authorId: "author-2",
        title: "Pergunta teste",
        content: "Conteúdo teste",
        questionId: newQuestion.id.toString()
      })
    ).rejects.toBeInstanceOf(Error)
  })
})