import { Either, left, right } from '@/core/either'
import { Question } from '@/domain/enterprise/entities/question'

import { NotAllowedError } from '../../errors/not-allowed-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { AnswersRepository } from '../../repositories/answers-repository'
import { QuestionsRepository } from '../../repositories/questions-repository'

interface ChooseQuestionBestAnswerRequest {
    authorId: string
    answerId: string
}

type ChooseQuestionBestAnswerResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question
    }
>

export class ChooseQuestionBestAnswerUseCase {
    constructor(
        private questionsRepository: QuestionsRepository,
        private answersRepository: AnswersRepository
    ) {}

    async execute({ answerId, authorId }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRepository.findById(answer.questionId.toString())

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.update(question)

        return right({ question })
    }
}
