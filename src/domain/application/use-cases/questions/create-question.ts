import { Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/enterprise/entities/question'

import { QuestionsRepository } from '../../repositories/questions-repository'

interface CreateQuestionRequest {
    title: string
    content: string
    authorId: string
}

type CreateQuestionResponse = Either<
    null,
    {
        question: Question
    }
>

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ title, content, authorId }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const question = Question.create({
            title,
            content,
            authorId: new UniqueEntityId(authorId),
        })

        await this.questionsRepository.create(question)

        return right({ question })
    }
}
