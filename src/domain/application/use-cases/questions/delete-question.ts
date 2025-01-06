import { Either, left, right } from '@/core/either'

import { NotAllowedError } from '../../errors/not-allowed-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface DeleteQuestionRequest {
    authorId: string
    questionId: string
}

type DeleteQuestionResponse = Either<ResourceNotFoundError | NotAllowedError, null>

export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ authorId, questionId }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        await this.questionsRepository.delete(question)

        return right(null)
    }
}
