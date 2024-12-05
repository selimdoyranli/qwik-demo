import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

const categories = [
  "Italian",
  "Asian",
  "Mexican",
  "Mediterranean",
  "American"
];

export const Header = component$(() => {
  return (
    <header class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <Link href="/" class="text-2xl font-bold text-primary">
            RecipeHub
          </Link>
          <nav class="hidden md:flex space-x-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
});
