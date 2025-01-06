import { Either, left, right } from '@/core/either'
import { Question } from '@/domain/enterprise/entities/question'

import { NotAllowedError } from '../../errors/not-allowed-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface EditQuestionRequest {
    title: string
    content: string
    authorId: string
    questionId: string
}

type EditQuestionResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question
    }
>

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ title, content, authorId, questionId }: EditQuestionRequest): Promise<EditQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content

        await this.questionsRepository.update(question)

        return right({ question })
    }
}
