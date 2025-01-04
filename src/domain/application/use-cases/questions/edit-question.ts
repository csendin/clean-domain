import { Question } from '@/domain/enterprise/entities/question'

import { QuestionsRepository } from '../../repositories/questions-repository'

interface EditQuestionRequest {
    title: string
    content: string
    authorId: string
    questionId: string
}

interface EditQuestionResponse {
    question: Question
}

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) {}

    async execute({ title, content, authorId, questionId }: EditQuestionRequest): Promise<EditQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found.')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        question.title = title
        question.content = content

        await this.questionsRepository.update(question)

        return { question }
    }
}
