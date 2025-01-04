import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { DeleteQuestionCommentUseCase } from './delete-question-comment'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let deleteQuestionComment: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
    beforeEach(() => {
        questionCommentsRepository = new InMemoryQuestionCommentsRepository()
        deleteQuestionComment = new DeleteQuestionCommentUseCase(questionCommentsRepository)
    })

    it('should be able to delete a question comment', async () => {
        const questionComment = makeQuestionComment()

        await questionCommentsRepository.create(questionComment)

        await deleteQuestionComment.execute({
            questionCommentId: questionComment.id.toString(),
            authorId: questionComment.authorId.toString(),
        })

        expect(questionCommentsRepository.items).toHaveLength(0)
    })

    it('should not be able to delete another user question comment', async () => {
        const questionComment = makeQuestionComment({
            authorId: new UniqueEntityId('author-1'),
        })

        await questionCommentsRepository.create(questionComment)

        expect(() => {
            return deleteQuestionComment.execute({
                questionCommentId: questionComment.id.toString(),
                authorId: 'author-2',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
