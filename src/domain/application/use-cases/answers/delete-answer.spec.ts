import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { DeleteAnswerUseCase } from './delete-answer'

let answersRepository: InMemoryAnswersRepository
let deleteAnswer: DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach(() => {
        answersRepository = new InMemoryAnswersRepository()
        deleteAnswer = new DeleteAnswerUseCase(answersRepository)
    })

    it('should be able to delete a answer', async () => {
        const newAnswer = makeAnswer()

        await answersRepository.create(newAnswer)

        await deleteAnswer.execute({
            authorId: newAnswer.authorId.toString(),
            answerId: newAnswer.id.toString(),
        })

        expect(answersRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-01'),
        })

        await answersRepository.create(newAnswer)

        expect(() => {
            return deleteAnswer.execute({
                authorId: 'author-02',
                answerId: newAnswer.id.toString(),
            })
        }).rejects.toBeInstanceOf(Error)
    })
})
