import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let fetchAnswerComment: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
    beforeEach(() => {
        answerCommentsRepository = new InMemoryAnswerCommentsRepository()
        fetchAnswerComment = new FetchAnswerCommentsUseCase(answerCommentsRepository)
    })

    it('should be able to fetch answer comments', async () => {
        await answerCommentsRepository.create(
            makeAnswerComment({
                answerId: new UniqueEntityId('answer-1'),
            }),
        )
        await answerCommentsRepository.create(
            makeAnswerComment({
                answerId: new UniqueEntityId('answer-1'),
            }),
        )
        await answerCommentsRepository.create(
            makeAnswerComment({
                answerId: new UniqueEntityId('answer-1'),
            }),
        )

        const { answerComments } = await fetchAnswerComment.execute({
            answerId: 'answer-1',
            page: 1,
        })

        expect(answerComments).toHaveLength(3)
    })

    it('should be able to fetch paginated answer comments', async () => {
        for (let i = 1; i <= 22; i++) {
            await answerCommentsRepository.create(
                makeAnswerComment({
                    answerId: new UniqueEntityId('answer-1'),
                }),
            )
        }

        const { answerComments } = await fetchAnswerComment.execute({
            answerId: 'answer-1',
            page: 2,
        })

        expect(answerComments).toHaveLength(2)
    })
})