import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ThemeContext } from "~/contexts/theme";

const categories = [
  "Italian",
  "Asian",
  "Mexican",
  "Mediterranean",
  "American"
];

export const Header = component$(() => {
  const theme = useContext(ThemeContext);

  return (
    <header class="bg-white dark:bg-gray-800 shadow-md">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <Link href="/" class="text-2xl font-bold text-primary">
            RecipeHub
          </Link>
          <div class="flex items-center space-x-6">
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
            <select
              value={theme.value}
              onChange$={(event) => {
                theme.value = (event.target as HTMLSelectElement).value as 'light' | 'dark' | 'system';
              }}
              class="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Choose a theme 🎨</option>
              <option value="light">Light 🌞</option>
              <option value="dark">Dark 🌙</option>
              <option value="system">System 🖥️</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
});
