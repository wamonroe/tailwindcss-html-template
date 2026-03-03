export default {
  root: "src",
  base: "",
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  test: {
    root: ".",
    environment: "happy-dom",
    environmentOptions: {
      happyDOM: {
        settings: {
          disableCSSFileLoading: true,
          handleDisabledFileLoadingAsSuccess: true
        }
      }
    }
  }
};
