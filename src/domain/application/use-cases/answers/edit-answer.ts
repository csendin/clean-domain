import { Answer } from '@/domain/enterprise/entities/answer'

import { AnswersRepository } from '../../repositories/answers-repository'

interface EditAnswerRequest {
    content: string
    authorId: string
    answerId: string
}

interface EditAnswerResponse {
    answer: Answer
}

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ content, authorId, answerId }: EditAnswerRequest): Promise<EditAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        answer.content = content

        await this.answersRepository.update(answer)

        return { answer }
    }
}
