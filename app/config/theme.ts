import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      radii: {
        base: { value: '12px' },
        sm: { value: '12px' },
      },
      colors: {
        primary: { value: "#0FEE0F" },
        priBtn: { value: "color-[#FF0420]" },
      },
      fonts: {
        body: { value: `"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` },
        heading: { value: `"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"` },
      },
      sizes: {
        base: { value: '100%' },
        sm: { value: '640px' },
        md: { value: '768px' },
        lg: { value: '1024px' },
        xl: { value: '1280px' },
        '2xl': { value: '1536px' }
      }
    },
  },
})

export const system = createSystem(defaultConfig, config)