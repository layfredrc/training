import { index, route } from '@react-router/dev/routes'

export default [
    index('./App.tsx'),
    route('alerts', './components/AlertListPage.tsx'),
]
