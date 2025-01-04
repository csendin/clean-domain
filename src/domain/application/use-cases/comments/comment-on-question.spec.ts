import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { CommentOnQuestionUseCase } from './comment-on-question'

let questionsRepository: InMemoryQuestionsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let commentOnQuestion: CommentOnQuestionUseCase

describe('Comment on Question', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        questionCommentsRepository = new InMemoryQuestionCommentsRepository()
        commentOnQuestion = new CommentOnQuestionUseCase(questionsRepository, questionCommentsRepository)
    })

    it('should be able to comment on question', async () => {
        const question = makeQuestion()

        await questionsRepository.create(question)

        await commentOnQuestion.execute({
            content: 'Test comment',
            authorId: question.authorId.toString(),
            questionId: question.id.toString(),
        })

        expect(questionCommentsRepository.items[0].content).toEqual('Test comment')
    })
})
