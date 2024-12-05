import { component$ } from "@builder.io/qwik";
import type { Recipe } from "~/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = component$<RecipeCardProps>(({ recipe }) => {
  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img src={recipe.image} alt={recipe.name} class="w-full h-48 object-cover" width="600" height="400" loading="lazy"/>
      <div class="p-4">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{recipe.name}</h3>
        <div class="flex items-center mb-2">
          <span class="text-yellow-400">★</span>
          <span class="text-gray-600 dark:text-gray-300 ml-1">{recipe.rating}</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">({recipe.reviewCount} reviews)</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {recipe.tags.map((tag) => (
            <span key={tag} class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}); 
