import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { EditQuestionUseCase } from './edit-question'

let questionsRepository: InMemoryQuestionsRepository
let editQuestion: EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        editQuestion = new EditQuestionUseCase(questionsRepository)
    })

    it('should be able to edit a question', async () => {
        const newQuestion = makeQuestion()

        await questionsRepository.create(newQuestion)

        await editQuestion.execute({
            title: 'Edited text',
            content: 'Edited content',
            authorId: newQuestion.authorId.toString(),
            questionId: newQuestion.id.toString(),
        })

        expect(questionsRepository.items[0]).toMatchObject({
            title: 'Edited text',
            content: 'Edited content',
        })
    })

    it('should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-01'),
        })

        await questionsRepository.create(newQuestion)

        expect(() => {
            return editQuestion.execute({
                title: 'Edited text',
                content: 'Edited content',
                authorId: 'author-02',
                questionId: newQuestion.id.toString(),
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
