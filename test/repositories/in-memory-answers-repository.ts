import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/application/repositories/answers-repository'
import { Answer } from '@/domain/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
    items: Answer[] = []

    constructor(private answerAttachmentsRepository: AnswerAttachmentsRepository) {}

    async findById(id: string) {
        const answer = this.items.find((item) => item.id.toString() === id)

        if (!answer) return null

        return answer
    }

    async findMany(questionId: string, { page }: PaginationParams) {
        const answers = this.items
            .filter((item) => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20)

        return answers
    }

    async create(answer: Answer) {
        this.items.push(answer)
    }

    async update(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)

        this.items[itemIndex] = answer
    }

    async delete(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)

        this.items.splice(itemIndex, 1)

        this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
    }
}
