import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { RecipeCard } from "~/components/recipe-card/recipe-card";
import { api } from "~/api";

export const useRecipes = routeLoader$(async () => {
  const data = await api.rest.recipe.fetchRecipes();
  return data;
});

export const head: DocumentHead = {
  title: "RecipeHub - Discover Delicious Recipes",
  meta: [
    {
      name: "description",
      content: "Browse through our collection of delicious recipes from various cuisines",
    },
  ],
};

export default component$(() => {
  const recipes = useRecipes();

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.value.recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
          <RecipeCard recipe={recipe} />
        </Link>
      ))}
    </div>
  );
});
