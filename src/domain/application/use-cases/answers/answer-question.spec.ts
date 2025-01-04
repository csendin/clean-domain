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
        const { answer } = await answerQuestion.execute({
            content: 'Answer content',
            authorId: '1',
            questionId: '1',
        })

        expect(answer.id).toBeTruthy()
    })
})
