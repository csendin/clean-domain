import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Slug } from '../value-objects/slug'

export interface QuestionProps {
    title: string
    slug: Slug
    content: string
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId | null
    createdAt: Date
    updatedAt: Date
}

export class Question extends Entity<QuestionProps> {
    get title() {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createSlug(title)
        this.touch()
    }

    get slug() {
        return this.props.slug
    }

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

    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    set bestAnswerId(bestAnswerId: UniqueEntityId | null | undefined) {
        if (bestAnswerId === undefined || bestAnswerId === null) {
            return
        }

        this.props.bestAnswerId = bestAnswerId

        this.touch()
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'days') <= 3
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('...')
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<QuestionProps, 'createdAt' | 'updatedAt' | 'slug'>, id?: UniqueEntityId) {
        const question = new Question(
            {
                ...props,
                slug: props.slug ?? Slug.createSlug(props.title),
                createdAt: props.createdAt ?? new Date(),
                updatedAt: props.updatedAt ?? new Date(),
            },
            id,
        )

        return question
    }
}
