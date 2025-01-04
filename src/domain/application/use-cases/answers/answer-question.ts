import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/enterprise/entities/answer'

import { AnswersRepository } from '../../repositories/answers-repository'

interface AnswerQuestionRequest {
    content: string
    authorId: string
    questionId: string
}

interface AnswerQuestionResponse {
    answer: Answer
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ content, authorId, questionId }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
        })

        await this.answersRepository.create(answer)

        return { answer }
    }
}
