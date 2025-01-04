import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { EditAnswerUseCase } from './edit-answer'

let answersRepository: InMemoryAnswersRepository
let editAnswer: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        editAnswer = new EditAnswerUseCase(answersRepository)
    })

    it('should be able to edit a answer', async () => {
        const newAnswer = makeAnswer()

        await answersRepository.create(newAnswer)

        await editAnswer.execute({
            content: 'Edited content',
            authorId: newAnswer.authorId.toString(),
            answerId: newAnswer.id.toString(),
        })

        expect(answersRepository.items[0]).toMatchObject({
            content: 'Edited content',
        })
    })

    it('should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-01'),
        })

        await answersRepository.create(newAnswer)

        expect(() => {
            return editAnswer.execute({
                content: 'Edited content',
                authorId: 'author-02',
                answerId: newAnswer.id.toString(),
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
