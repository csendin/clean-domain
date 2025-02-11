import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/enterprise/entities/answer'

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityId) {
    const answer = Answer.create(
        {
            content: faker.lorem.sentence(8),
            authorId: new UniqueEntityId(),
            questionId: new UniqueEntityId(),
            ...override,
        },
        id
    )

    return answer
}
