import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { recipeApi } from '../api/recipes';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../types/recipe';

export const loader: LoaderFunction = async ({ params }) => {
  const { recipes } = await recipeApi.fetchRecipesByCategory({ 
    category: params.slug as string 
  });
  return json({ recipes });
};

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const categoryName = params.slug ? 
    params.slug.charAt(0).toUpperCase() + params.slug.slice(1) : 
    'Unknown';

  return [
    { title: `${categoryName} Recipes - Recipe App` },
    { description: `Discover delicious ${categoryName.toLowerCase()} recipes from our collection.` }
  ];
};

export default function Category() {
  const { recipes } = useLoaderData<{ recipes: Recipe[] }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
} 
