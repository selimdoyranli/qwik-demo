import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { RecipeCard } from "~/components/recipe-card/recipe-card";
import { RecipeCardSkeleton } from "~/components/recipe-card/recipe-card-skeleton";
import { api } from "~/api";

// Server-side initial data load
export const useServerRecipes = routeLoader$(async () => {
  return await api.rest.recipe.fetchRecipes();
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
  const serverData = useServerRecipes();
  
  const recipesResource = useResource$(async ({ track, cleanup }) => {
    track(() => serverData.value);
    const controller = new AbortController();
    cleanup(() => controller.abort());

    try {
      const data = await api.rest.recipe.fetchRecipes();
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  });

  return (
    <Resource
      value={recipesResource}
      onPending={() => (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      )}
      onRejected={(error) => (
        <div class="flex justify-center items-center min-h-[200px]">
          <p class="text-xl font-semibold text-red-600">
            Error loading recipes: {error.message}
          </p>
        </div>
      )}
      onResolved={(data) => (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    />
  );
});
