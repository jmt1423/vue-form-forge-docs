---
title: AI Assistant
description: AI Usage
---
#### Overview

> IMPORTANT: The current implementation of the AI Assistant uses client side API keys
> to open up a bring-your-own-key system for easy handoffs between developers and projects.
> If you plan on pushing this to production it is recommended moving the OpenAI calls to
> the server.

You can find the code for the assistant in `form-builder/components/ai-prompt/AiPrompt.vue`.

## API Keys and usage
API keys can be passed into the BuilderProvider component through the config prop.

The config can be extended to pass any other API keys you decide to add as well:

## Extending

### 1. Update the Type Definition
First, extend the `FormBuilderConfig` type in your file to include additional API keys: `types/env`

```typescript
// types/env.ts
export interface FormBuilderConfig {
    apiKey?: string; // OpenAI API key (existing)
    anthropicApiKey?: string; // Example: Anthropic Claude API key
    geminiApiKey?: string; // Example: Google Gemini API key
    cohereApiKey?: string; // Example: Cohere API key
    // Add any other API keys you need
}
```

### 2. Update the use-config.ts Implementation
The existing file should already work with the extended interface since it uses the `FormBuilderConfig` type: `use-config.ts`
```typescript
// composable/use-config.ts
import { inject, provide, type InjectionKey } from 'vue'
import type { FormBuilderConfig } from "../types/env";

export const CONFIG_KEY: InjectionKey<FormBuilderConfig> = Symbol('configKey')

export function provideFormBuilderConfig(config: FormBuilderConfig) {
  provide(CONFIG_KEY, config)
}

export function useFormBuilderConfig() {
  return inject(CONFIG_KEY, {})
}
```

### 3. Usage in BuilderProvider
Then you can pass multiple API keys through the config:
```vue
// builder/BuilderProvider.vue
<script setup lang="ts">
  const formBuilderConfig = computed<FormBuilderConfig>(() => ({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    anthropicApiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
    cohereApiKey: import.meta.env.VITE_COHERE_API_KEY,
  }));
</script>

<template>
  <BuilderProvider :config="formBuilderConfig">
    <FormBuilder />
  </BuilderProvider>
</template>
```

### Note

You may find a nicer way of passing around API keys for local development, the main reason it is this way is
due to the monorepo setup I built for this software. It makes it easy to use the form builder as a local npm package
and pass any keys you have in the main application into it.