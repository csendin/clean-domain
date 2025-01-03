import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let questionsRepository: InMemoryQuestionsRepository
let fetchRecentQuestions: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        fetchRecentQuestions = new FetchRecentQuestionsUseCase(questionsRepository)
    })

    it('should be able to fetch recent questions', async () => {
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 20) }))
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 18) }))
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2024, 0, 23) }))

        const { questions } = await fetchRecentQuestions.execute({
            page: 1,
        })

        expect(questions).toEqual([
            expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
            expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
        ])
    })

    it('should be able to fetch paginated recent questions', async () => {
        for (let i = 1; i <= 22; i++) {
            await questionsRepository.create(makeQuestion())
        }

        const { questions } = await fetchRecentQuestions.execute({
            page: 2,
        })

        expect(questions).toHaveLength(2)
    })
})
