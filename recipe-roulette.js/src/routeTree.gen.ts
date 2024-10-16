/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as VerifyEmailImport } from './routes/verify-email'
import { Route as RouletteImport } from './routes/roulette'
import { Route as ResetPasswordImport } from './routes/reset-password'
import { Route as RecipeResultsImport } from './routes/recipe-results'
import { Route as RecipeImport } from './routes/recipe'
import { Route as NotFoundImport } from './routes/not-found'
import { Route as HistoryImport } from './routes/history'
import { Route as FavoritedImport } from './routes/favorited'
import { Route as IndexImport } from './routes/index'
import { Route as settingsSettingsImport } from './routes/(settings)/settings'
import { Route as settingsfoodPreferencesSettingsFoodPreferencesImport } from './routes/(settings)/(foodPreferences)/settings.food-preferences'

// Create/Update Routes

const VerifyEmailRoute = VerifyEmailImport.update({
  path: '/verify-email',
  getParentRoute: () => rootRoute,
} as any)

const RouletteRoute = RouletteImport.update({
  path: '/roulette',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordRoute = ResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any)

const RecipeResultsRoute = RecipeResultsImport.update({
  path: '/recipe-results',
  getParentRoute: () => rootRoute,
} as any)

const RecipeRoute = RecipeImport.update({
  path: '/recipe',
  getParentRoute: () => rootRoute,
} as any)

const NotFoundRoute = NotFoundImport.update({
  path: '/not-found',
  getParentRoute: () => rootRoute,
} as any)

const HistoryRoute = HistoryImport.update({
  path: '/history',
  getParentRoute: () => rootRoute,
} as any)

const FavoritedRoute = FavoritedImport.update({
  path: '/favorited',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const settingsSettingsRoute = settingsSettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const settingsfoodPreferencesSettingsFoodPreferencesRoute =
  settingsfoodPreferencesSettingsFoodPreferencesImport.update({
    path: '/settings/food-preferences',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/favorited': {
      id: '/favorited'
      path: '/favorited'
      fullPath: '/favorited'
      preLoaderRoute: typeof FavoritedImport
      parentRoute: typeof rootRoute
    }
    '/history': {
      id: '/history'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof HistoryImport
      parentRoute: typeof rootRoute
    }
    '/not-found': {
      id: '/not-found'
      path: '/not-found'
      fullPath: '/not-found'
      preLoaderRoute: typeof NotFoundImport
      parentRoute: typeof rootRoute
    }
    '/recipe': {
      id: '/recipe'
      path: '/recipe'
      fullPath: '/recipe'
      preLoaderRoute: typeof RecipeImport
      parentRoute: typeof rootRoute
    }
    '/recipe-results': {
      id: '/recipe-results'
      path: '/recipe-results'
      fullPath: '/recipe-results'
      preLoaderRoute: typeof RecipeResultsImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/roulette': {
      id: '/roulette'
      path: '/roulette'
      fullPath: '/roulette'
      preLoaderRoute: typeof RouletteImport
      parentRoute: typeof rootRoute
    }
    '/verify-email': {
      id: '/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof VerifyEmailImport
      parentRoute: typeof rootRoute
    }
    '/(settings)/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof settingsSettingsImport
      parentRoute: typeof rootRoute
    }
    '/(settings)/(foodPreferences)/settings/food-preferences': {
      id: '/settings/food-preferences'
      path: '/settings/food-preferences'
      fullPath: '/settings/food-preferences'
      preLoaderRoute: typeof settingsfoodPreferencesSettingsFoodPreferencesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  FavoritedRoute,
  HistoryRoute,
  NotFoundRoute,
  RecipeRoute,
  RecipeResultsRoute,
  ResetPasswordRoute,
  RouletteRoute,
  VerifyEmailRoute,
  settingsSettingsRoute,
  settingsfoodPreferencesSettingsFoodPreferencesRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/favorited",
        "/history",
        "/not-found",
        "/recipe",
        "/recipe-results",
        "/reset-password",
        "/roulette",
        "/verify-email",
        "/settings",
        "/settings/food-preferences"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/favorited": {
      "filePath": "favorited.jsx"
    },
    "/history": {
      "filePath": "history.jsx"
    },
    "/not-found": {
      "filePath": "not-found.jsx"
    },
    "/recipe": {
      "filePath": "recipe.jsx"
    },
    "/recipe-results": {
      "filePath": "recipe-results.jsx"
    },
    "/reset-password": {
      "filePath": "reset-password.jsx"
    },
    "/roulette": {
      "filePath": "roulette.jsx"
    },
    "/verify-email": {
      "filePath": "verify-email.jsx"
    },
    "/settings": {
      "filePath": "(settings)/settings.jsx"
    },
    "/settings/food-preferences": {
      "filePath": "(settings)/(foodPreferences)/settings.food-preferences.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
