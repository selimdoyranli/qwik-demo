import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { api } from "~/api";

export const useRecipe = routeLoader$(async ({ params }) => {
  return api.rest.recipe.fetchRecipe({ id: params.id });
});

export const head: DocumentHead = ({ resolveValue }) => {
  const recipe = resolveValue(useRecipe);
  
  return {
    title: `${recipe.name} Recipe - RecipeHub`,
    meta: [
      {
        name: "description",
        content: `Learn how to make ${recipe.name}. Find ingredients and step-by-step instructions.`,
      },
    ],
  };
};

export default component$(() => {
  const recipe = useRecipe();

  return (
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <img src={recipe.value.image} alt={recipe.value.name} class="w-full h-96 object-cover rounded-lg mb-8" width="600" height="400" loading="lazy"/>
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{recipe.value.name}</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Ingredients</h2>
          <ul class="list-disc list-inside space-y-2">
            {recipe.value.ingredients.map((ingredient) => (
              <li key={ingredient} class="text-gray-600 dark:text-gray-300">{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Instructions</h2>
          <ol class="list-decimal list-inside space-y-2">
            {recipe.value.instructions.map((instruction) => (
              <li key={instruction} class="text-gray-600 dark:text-gray-300">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}); 
