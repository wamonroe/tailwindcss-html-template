# Tailwind CSS Template

A simple, framework-less, plain-old-HTML template using Tailwind CSS. Use it as a template for a
simple landing page or as a starting point for something more.

## Development Environment

Install the dependencies:

```bash
npm install
```

Run the the development server:

```bash
gulp serve
```

Compile, minify, and/or copy files for distribution:

```bash
gulp build
```

## Deploy

Run `gulp build` and then copy all the files and folders from `./dist` to the webhost.

## Files

This very simple project expects only two files `./src/index.html` and `./src/styles.css`. Both of
these files get compiled and/or minified during the build process. Any additional assets (such as
images) should be placed in `./src/assets`.
