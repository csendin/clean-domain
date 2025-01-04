import { QuestionsRepository } from '@/domain/application/repositories/questions-repository'
import { Question } from '@/domain/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
    items: Question[] = []

    async create(question: Question) {
        this.items.push(question)
    }
}
