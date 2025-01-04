import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let questionsRepository: InMemoryQuestionsRepository
let getQuestionBySlug: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        getQuestionBySlug = new GetQuestionBySlugUseCase(questionsRepository)
    })

    it('should be able to get a question by slug', async () => {
        const newQuestion = makeQuestion()

        await questionsRepository.create(newQuestion)

        const { question } = await getQuestionBySlug.execute({
            slug: newQuestion.slug.value,
        })

        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
    })
})
