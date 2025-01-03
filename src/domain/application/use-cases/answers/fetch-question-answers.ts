import { Answer } from '@/domain/enterprise/entities/answer'

import { AnswersRepository } from '../../repositories/answers-repository'

interface FetchQuestionAnswersRequest {
    questionId: string
    page: number
}

interface FetchQuestionAnswersResponse {
    answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswersRepository) {}

    async execute({ questionId, page }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
        const answers = await this.answersRepository.findMany(questionId, { page })

        return { answers }
    }
}
