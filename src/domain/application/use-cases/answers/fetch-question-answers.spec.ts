import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let answersRepository: InMemoryAnswersRepository
let fetchQuestionAnswer: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        fetchQuestionAnswer = new FetchQuestionAnswersUseCase(answersRepository)
    })

    it('should be able to fetch question answers', async () => {
        await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }))
        await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }))
        await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }))

        const { answers } = await fetchQuestionAnswer.execute({
            questionId: 'question-1',
            page: 1,
        })

        expect(answers).toHaveLength(3)
    })

    it('should be able to fetch paginated question answers', async () => {
        for (let i = 1; i <= 22; i++) {
            await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }))
        }

        const { answers } = await fetchQuestionAnswer.execute({
            questionId: 'question-1',
            page: 2,
        })

        expect(answers).toHaveLength(2)
    })
})
