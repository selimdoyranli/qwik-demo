import { createContextId } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export type Theme = "light" | "dark" | "system";
export const ThemeContext = createContextId<Signal<Theme>>("theme"); 
