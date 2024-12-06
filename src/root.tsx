import { component$, useContextProvider, useStore, useTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik/build";
import { ThemeContext, type Theme } from "./contexts/theme";

import "./global.css";

function applyTheme() {
  const storedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = storedTheme === 'system' ? systemTheme : storedTheme || systemTheme;
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export default component$(() => {
  const themeStore = useStore<{ value: Theme }>({
    value: (typeof window !== 'undefined' ? localStorage.getItem('theme') as Theme : null) ?? 'system'
  });

  useTask$(({ track }) => {
    const theme = track(() => themeStore.value);
    
    if (typeof window === 'undefined') return;

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      localStorage.setItem('theme', 'system');
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  });

  useContextProvider(ThemeContext, themeStore);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <script dangerouslySetInnerHTML={`(${applyTheme.toString()})()`} />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
