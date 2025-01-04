import { QuestionComment } from '@/domain/enterprise/entities/question-comment'

import { QuestionCommentsRepository } from '../../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string
    page: number
}

interface FetchQuestionCommentsUseCaseResponse {
    questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
    constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

    async execute({
        questionId,
        page,
    }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const questionComments = await this.questionCommentsRepository.findMany(questionId, { page })

        return { questionComments }
    }
}
