import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let questionsRepository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
    beforeEach(() => {
        questionsRepository = new InMemoryQuestionsRepository()
        answersRepository = new InMemoryAnswersRepository()
        chooseQuestionBestAnswer = new ChooseQuestionBestAnswerUseCase(questionsRepository, answersRepository)
    })

    it('should be able to choose the question best answer', async () => {
        const question = makeQuestion()

        const answer = makeAnswer({
            questionId: question.id,
        })

        await questionsRepository.create(question)
        await answersRepository.create(answer)

        await chooseQuestionBestAnswer.execute({
            answerId: answer.id.toString(),
            authorId: question.authorId.toString(),
        })

        expect(questionsRepository.items[0].bestAnswerId).toEqual(answer.id)
    })

    it('should not be able to to choose another user question best answer', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityId('author-1'),
        })

        const answer = makeAnswer({
            questionId: question.id,
        })

        await questionsRepository.create(question)
        await answersRepository.create(answer)

        expect(() => {
            return chooseQuestionBestAnswer.execute({
                answerId: answer.id.toString(),
                authorId: 'author-2',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
