export default defineConfig({
  optimizeDeps: {
    include: ['linked-dep'],
  },
  base: '/statblock-converter/',
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
  },
})