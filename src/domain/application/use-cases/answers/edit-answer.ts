import { Either, left, right } from '@/core/either'
import { Answer } from '@/domain/enterprise/entities/answer'

import { NotAllowedError } from '../../errors/not-allowed-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { AnswersRepository } from '../../repositories/answers-repository'

interface EditAnswerRequest {
    content: string
    authorId: string
    answerId: string
}

type EditAnswerResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        answer: Answer
    }
>

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ content, authorId, answerId }: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }

        answer.content = content

        await this.answersRepository.update(answer)

        return right({ answer })
    }
}
