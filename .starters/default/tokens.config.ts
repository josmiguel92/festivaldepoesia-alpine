import theme from '@nuxt-themes/tokens/config'
import { defineTheme } from 'pinceau'

export default defineTheme({
    color: {
        white: '#FFFFFF',
        // @ts-ignore
        primary: '#0047e1',
      },
    font: {
        sans: ' Noto Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
        serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
    },
})
