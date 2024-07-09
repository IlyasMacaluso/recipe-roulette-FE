import { createFileRoute } from '@tanstack/react-router'
import { Settings } from '../pages/Settings/Settings'

export const Route = createFileRoute('/settings')({
  component: () => <Settings />
})