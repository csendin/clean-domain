import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/enterprise/entities/question-comment'

import { QuestionCommentsRepository } from '../../repositories/question-comments-repository'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface CommentOnQuestionRequest {
    content: string
    authorId: string
    questionId: string
}

interface CommentOnQuestionResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private questionCommentsRepository: QuestionCommentsRepository,
    ) {}

    async execute({ content, authorId, questionId }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found.')
        }

        const questionComment = QuestionComment.create({
            content,
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
        })

        await this.questionCommentsRepository.create(questionComment)

        return { questionComment }
    }
}
