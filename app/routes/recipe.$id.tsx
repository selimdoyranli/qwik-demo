import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { recipeApi } from '../api/recipes';
import type { Recipe } from '../types/recipe';

export const loader: LoaderFunction = async ({ params }) => {
  const recipe = await recipeApi.fetchRecipe({ id: params.id as string });
  return json({ recipe });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.recipe) {
    return [
      { title: 'Recipe Not Found' },
      { description: 'The requested recipe could not be found.' }
    ];
  }

  return [
    { title: `${data.recipe.name} - Recipe App` },
    { description: `Learn how to make ${data.recipe.name}. ${data.recipe.cuisine} recipe with ${data.recipe.rating.toFixed(1)} stars from ${data.recipe.reviewCount} reviews.` }
  ];
};

export default function RecipeDetail() {
  const { recipe } = useLoaderData<{ recipe: Recipe }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{recipe.name}</h1>
            <div className="flex items-center gap-4">
              <span className="inline-block px-3 py-1 bg-indigo-600 text-white rounded-full">
                {recipe.cuisine} Cuisine
              </span>
              <div className="flex items-center text-white">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{recipe.rating.toFixed(1)}</span>
                <span className="mx-1">•</span>
                <span>{recipe.reviewCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 text-lg mb-6">{recipe.ingredients.join(', ')}</p>
          <p className="text-gray-700 text-lg mb-6">{recipe.instructions.join(', ')}</p>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
