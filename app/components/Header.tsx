import * as React from 'react';
import { Link } from '@remix-run/react';

const categories = [
  'Asian',
  'American',
  'Italian',
  'Mexican',
  'Mediterranean',
  'Indian'
];

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Recipe App
          </Link>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
} 
