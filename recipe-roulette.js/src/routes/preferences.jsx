import { createFileRoute } from '@tanstack/react-router'
import { Preferences } from '../pages/Preferences/Preferences'

export const Route = createFileRoute('/preferences')({
  component: () => <Preferences />
})