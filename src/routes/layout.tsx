import { component$, Slot } from "@builder.io/qwik";
import { Header } from "~/components/header/header";

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main class="container mx-auto px-4 py-8">
        <Slot />
      </main>
    </div>
  );
});
