import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { AnswerAttachmentList } from './answer-attachment-list'

export interface AnswerProps {
    content: string
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    attachments: AnswerAttachmentList
    createdAt: Date
    updatedAt: Date
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
    }

    get attachments() {
        return this.props.attachments
    }

    set attachments(attachments: AnswerAttachmentList) {
        this.props.attachments = attachments
        this.touch()
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...')
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<AnswerProps, 'createdAt' | 'updatedAt' | 'attachments'>, id?: UniqueEntityId) {
        const answer = new Answer(
            {
                ...props,
                attachments: props.attachments ?? new AnswerAttachmentList(),
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt ?? new Date(),
            },
            id
        )

        return answer
    }
}
