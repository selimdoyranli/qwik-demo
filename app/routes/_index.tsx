import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { recipeApi } from '../api/recipes';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../types/recipe';

export const loader: LoaderFunction = async () => {
  const { recipes } = await recipeApi.fetchRecipes();
  return json({ recipes });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Recipe App - Discover Delicious Recipes" },
    { description: "Explore a wide variety of delicious recipes from different cuisines around the world." }
  ];
};

export default function Index() {
  const { recipes } = useLoaderData<{ recipes: Recipe[] }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Delicious Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
} 
