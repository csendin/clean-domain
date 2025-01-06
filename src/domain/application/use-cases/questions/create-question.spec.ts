import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CreateQuestionUseCase } from './create-question'

let questionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase

describe('Create Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        createQuestion = new CreateQuestionUseCase(questionsRepository)
    })

    it('should be able to create a question', async () => {
        const res = await createQuestion.execute({
            title: 'New question',
            content: 'Question content',
            authorId: '1',
        })

        expect(res.isRight()).toBe(true)

        if (res.isRight()) {
            expect(questionsRepository.items[0]).toEqual(res.value.question)
        }
    })
})
