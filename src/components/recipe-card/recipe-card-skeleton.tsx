import { component$ } from "@builder.io/qwik";

export const RecipeCardSkeleton = component$(() => {
  return (
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div class="w-full h-48 bg-gray-200 dark:bg-gray-700"/>
      <div class="p-4">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"/>
        <div class="flex items-center mb-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"/>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-2"/>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"/>
          ))}
        </div>
      </div>
    </div>
  );
}); 
