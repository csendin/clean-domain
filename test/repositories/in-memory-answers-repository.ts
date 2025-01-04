import { AnswersRepository } from '@/domain/application/repositories/answers-repository'
import { Answer } from '@/domain/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
    items: Answer[] = []

    async create(answer: Answer) {
        this.items.push(answer)
    }
}
