import { createFileRoute } from '@tanstack/react-router'
import { Favorited } from '../pages/Favorited/Favorited'

export const Route = createFileRoute('/favorited')({
  component: () => <Favorited />
})