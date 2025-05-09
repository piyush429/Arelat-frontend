import { defineConfig, createSystem, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        tokens: {
            colors: {},
        },
    },
    globalCss: {
        html: {
            colorPalette: "green",
            color: "green",
        },
    },
});

export const theme = createSystem(defaultConfig, config);
