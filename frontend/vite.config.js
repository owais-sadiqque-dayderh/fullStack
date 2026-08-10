import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] })
//   ], server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3002',
//         changeOrigin: true,
//       },
//     }
//   },
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Nest the React Compiler options directly inside the react plugin configuration
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", {}]
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    }
  },
})
