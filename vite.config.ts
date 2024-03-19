import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 0,
    reporters: ["default", "html"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
