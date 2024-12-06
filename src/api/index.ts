import { recipeApi } from './modules/recipe';

export const api = {
  rest: {
    recipe: recipeApi,
  },
} as const;

export type Api = typeof api;
