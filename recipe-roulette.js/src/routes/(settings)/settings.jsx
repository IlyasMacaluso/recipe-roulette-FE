import { createFileRoute } from '@tanstack/react-router'
import { Settings } from '../../pages/Settings/Settings'

export const Route = createFileRoute('/(settings)/settings')({
  component: () => <Settings />
})