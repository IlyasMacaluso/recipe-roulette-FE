import { createFileRoute } from '@tanstack/react-router'
import { NotFound404 } from '../pages/NotFound404/NotFound404'

export const Route = createFileRoute('/not-found')({
  component: () => <NotFound404/>
})