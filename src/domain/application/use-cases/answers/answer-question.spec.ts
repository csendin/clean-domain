import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { AnswerQuestionUseCase } from './answer-question'

let answersRepository: InMemoryAnswersRepository
let answerQuestion: AnswerQuestionUseCase

describe('Create Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        answerQuestion = new AnswerQuestionUseCase(answersRepository)
    })

    it('should be able to create a answer', async () => {
        const res = await answerQuestion.execute({
            content: 'Answer content',
            authorId: '1',
            questionId: '1',
        })

        expect(res.isRight()).toBe(true)

        if (res.isRight()) {
            expect(answersRepository.items[0]).toEqual(res.value.answer)
        }
    })
})
