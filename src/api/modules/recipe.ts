import type { Recipe, RecipesResponse } from '~/types/recipe';
import { baseApi } from '../base';

export const recipeApi = {
  fetchRecipes: async (): Promise<RecipesResponse> => {
    return baseApi('/recipes');
  },

  fetchRecipe: async ({ id }: { id: string }): Promise<Recipe> => {
    return baseApi(`/recipes/${id}`);
  },

  fetchRecipesByCategory: async ({ category }: { category: string }): Promise<RecipesResponse> => {
    const data = await baseApi<RecipesResponse>('/recipes');
    return {
      ...data,
      recipes: data.recipes.filter(
        (recipe) => recipe.cuisine.toLowerCase() === category.toLowerCase()
      ),
    };
  },
};
