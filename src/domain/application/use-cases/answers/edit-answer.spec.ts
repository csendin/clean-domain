import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { NotAllowedError } from '../../errors/not-allowed-error'
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

        const res = await editAnswer.execute({
            content: 'Edited content',
            authorId: newAnswer.authorId.toString(),
            answerId: newAnswer.id.toString(),
        })

        expect(res.isRight()).toBe(true)

        if (res.isRight()) {
            expect(answersRepository.items[0]).toEqual(res.value.answer)
        }
    })

    it('should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-01'),
        })

        await answersRepository.create(newAnswer)

        const res = await editAnswer.execute({
            content: 'Edited content',
            authorId: 'author-02',
            answerId: newAnswer.id.toString(),
        })

        expect(res.isLeft()).toBe(true)
        expect(res.value).toBeInstanceOf(NotAllowedError)
    })
})
