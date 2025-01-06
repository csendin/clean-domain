import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { NotAllowedError } from '../../errors/not-allowed-error'
import { DeleteQuestionUseCase } from './delete-question'

let questionsRepository: InMemoryQuestionsRepository
let deleteQuestion: DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        deleteQuestion = new DeleteQuestionUseCase(questionsRepository)
    })

    it('should be able to delete a question', async () => {
        const newQuestion = makeQuestion()

        await questionsRepository.create(newQuestion)

        const res = await deleteQuestion.execute({
            authorId: newQuestion.authorId.toString(),
            questionId: newQuestion.id.toString(),
        })

        expect(res.isRight()).toBe(true)

        if (res.isRight()) {
            expect(questionsRepository.items).toHaveLength(0)
        }
    })

    it('should not be able to delete a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-01'),
        })

        await questionsRepository.create(newQuestion)

        const res = await deleteQuestion.execute({
            authorId: 'author-02',
            questionId: newQuestion.id.toString(),
        })

        expect(res.isLeft()).toBe(true)
        expect(res.value).toBeInstanceOf(NotAllowedError)
    })
})
