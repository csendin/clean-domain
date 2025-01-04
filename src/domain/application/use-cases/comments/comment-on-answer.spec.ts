import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { CommentOnAnswerUseCase } from './comment-on-answer'

let answersRepository: InMemoryAnswersRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let commentOnAnswer: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        answerCommentsRepository = new InMemoryAnswerCommentsRepository()
        commentOnAnswer = new CommentOnAnswerUseCase(answersRepository, answerCommentsRepository)
    })

    it('should be able to comment on answer', async () => {
        const answer = makeAnswer()

        await answersRepository.create(answer)

        await commentOnAnswer.execute({
            content: 'Test comment',
            authorId: answer.authorId.toString(),
            answerId: answer.id.toString(),
        })

        expect(answerCommentsRepository.items[0].content).toEqual('Test comment')
    })
})
