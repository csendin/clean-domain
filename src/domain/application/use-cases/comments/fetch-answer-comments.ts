import { Either, right } from '@/core/either'
import { AnswerComment } from '@/domain/enterprise/entities/answer-comment'

import { AnswerCommentsRepository } from '../../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
    answerId: string
    page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
    null,
    {
        answerComments: AnswerComment[]
    }
>

export class FetchAnswerCommentsUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

    async execute({ answerId, page }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
        const answerComments = await this.answerCommentsRepository.findMany(answerId, { page })

        return right({ answerComments })
    }
}
