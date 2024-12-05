import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RecipesResponse } from "~/types/recipe";
import { RecipeCard } from "~/components/recipe-card/recipe-card";
import { ofetch } from "ofetch";

export const useRecipesByCategory = routeLoader$(async ({ params }) => {
  const data = await ofetch<RecipesResponse>(`https://dummyjson.com/recipes`);
  return {
    ...data,
    recipes: data.recipes.filter(recipe => 
      recipe.cuisine.toLowerCase() === params.category.toLowerCase()
    )
  };
});

export default component$(() => {
  const recipes = useRecipesByCategory();

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.value.recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}); 
