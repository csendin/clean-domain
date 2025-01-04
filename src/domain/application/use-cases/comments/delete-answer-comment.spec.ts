import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let deleteAnswerComment: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
    beforeEach(() => {
        answerCommentsRepository = new InMemoryAnswerCommentsRepository()
        deleteAnswerComment = new DeleteAnswerCommentUseCase(answerCommentsRepository)
    })

    it('should be able to delete a answer comment', async () => {
        const answerComment = makeAnswerComment()

        await answerCommentsRepository.create(answerComment)

        await deleteAnswerComment.execute({
            answerCommentId: answerComment.id.toString(),
            authorId: answerComment.authorId.toString(),
        })

        expect(answerCommentsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete another user answer comment', async () => {
        const answerComment = makeAnswerComment({
            authorId: new UniqueEntityId('author-1'),
        })

        await answerCommentsRepository.create(answerComment)

        expect(() => {
            return deleteAnswerComment.execute({
                answerCommentId: answerComment.id.toString(),
                authorId: 'author-2',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
