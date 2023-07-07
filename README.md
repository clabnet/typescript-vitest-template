# ![TypeScript Vitest Starter Template](https://user-images.githubusercontent.com/6388707/58275504-7818c880-7d95-11e9-84af-f8aa50b93d5f.png)TypeScript Vitest Starter Template

[![Use pnpm](https://img.shields.io/badge/Use-PNPM-yellowgreen)](https://pnpm.io/)
[![Styled with prettier](https://img.shields.io/badge/styled%20with-Prettier-blue.svg)](https://github.com/prettier/prettier)
[![Eslint](https://img.shields.io/badge/linted%20by-eslint-brightgreen.svg)](https://eslint.org)
[![Tested with Vitest](https://img.shields.io/badge/Tested%20with-Vitest-green)](https://vitest.dev/)

`TypeScript Vitest Starter Template` is a friction-free features-complete boilerplate for building Node.js backend services and microservices with TypeScript.
It works on Windows, Linux, and macOS and makes the developer productive in no time! It supports any _Active LTS_ Node.js version (`12.12.x`, `14.x.x`, `16.x.x`).

There are only three steps you need to do to be productive after `TypeScript Vitest Starter Template` is initialized (follow the [Getting Started](#getting-started) section):
1. Put your code inside the `./src` folder
2. Put your tests inside the `./test` folder.
3. Relax and enjoy coding!

## Features

* uses [esbuild](https://esbuild.github.io) and [`tsup`](https://tsup.egoist.sh) in dev mode for blazing fast builds and restarts
* VS Code debugger configs in .vscode folder
* recommended Dockerfile for secure Node.js production-ready images
* most strict and backend specific [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) configuration
* configured tests [Vitest](https://vitest.dev/)
* [dotenv](https://github.com/motdotla/dotenv#readme) for development env vars

## Getting Started
### Clone the repo
```
$ git clone https://github.com/clabnet/typescript-vitest-template.git {your_project_name}
$ cd {your_project_name}
```

### Remove references to the original starter
```
$ rm -rf .git && pnpm init
```

### Initialize a git repository with your own
```
$ git init
```

### Install development dependencies
```
$ pnpm i
```

### Add remote origin and make an initial commit
```
$ git remote add origin git@github.com:{your_repository}.git
$ git add .
$ git commit -m "Initial commit"
$ git push -u origin master
```
### Start the development server

```
$ pnpm dev
```

## Included pnpm scripts
`TypeScript Vitest Starter Template` includes a bunch of scripts that cover the most common scenarios for Node.js backend projects.

The commands must be run from the project's root folder.

### `dev`
It runs the project in development mode. It uses [`tsup`](https://tsup.egoist.sh) to watch the `./src/**/*.ts` files, build and restart the server on save. It exposes the debugger on the default port (`9229`), ready to be used by the provided VS Code `attach` configuration. This script runs parallelly [esbuild](https://esbuild.github.io) and `tsc --noEmit` to build your code faster.
```
$ pnpm dev
```

### `build`
It builds for production all files from the `./src` to the `./build` folder. It uses `tsc` directly and therefore checks types too. It also emits the source maps.
```
$ pnpm build
```

### `start`
It runs previously built code from the `./build` folder. In addition, it uses `--enable-source-maps` flag for native source-maps support. Note: this flag is present in Node.js since version `12.12.x`.
```
$ pnpm start
```
This script is included only for convenience to test the production build locally on your dev machine. If needed, `-r dotenv/config` can be add to load the dev env. It is advised to run Node.js binary directly to avoid any overhead or `sigterm` propagation issues in production.
```
$ node --enable-source-maps build/index.js
```

### `lint`
It uses [`eslint`](https://eslint.org) and [`prettier`](https://prettier.io) to lint the code. It checks `./src` and `./test` folders. Note: `prettier` is run as `eslint` plugin via [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier).
```
$ pnpm lint
```
If you want to fix all of the fixable problems, run
```
$ pnpm lint -- --fix
```

### `update`
It uses [pnpm-check](https://www.npmjs.com/package/pnpm-check) to help you upgrading your dependencies and never have any outdated and broken packages again.
```
$ pnpm update
```

### `test`
It uses [`Vitest`](https://vitest.dev/) to run tests in watch mode with interactive repl in console.
```
$ pnpm test
```

### `test:ui`
It runs `Vitest` in [watch mode](https://vitest.dev/guide/ui.html) with web page repl.
```
$ pnpm test:ui
```

### `test:coverage`
It runs `Vitest` coverage (https://vitest.dev/guide/coverage.html#coverage) with default C8 provider.
```
$ pnpm test:ui
```

## Env Vars
`TypeScript Vitest Starter Template` includes [dotenv](https://github.com/motdotla/dotenv#readme). You have to rename `.env.example` to `.env` and put your variables inside it. They will be automatically loaded when running `$ pnpm dev` script.

## External typings augmentation
`TypeScript Vitest Starter Template` is configured to allow you to extend typings of external packages using `./typings` folder. The logic behind it is based on [this](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html) official template. To augment a module, create a folder with the same module name you are augmenting and add an `index.d.ts` file inside it. [Here](https://github.com/fox1t/fastify-websocket-router/tree/master/typings/fastify) you can find a real-world example.

## Debugging Steps

* run the `dev` script to start your application (`$ pnpm dev`)
* either
  * use the VS Code included `attach` config for the best debugging experience
  <img width="327" alt="image" src="https://user-images.githubusercontent.com/1620916/129894966-15385c33-da0c-4e00-9f6f-a8ddf966e63e.png">

  * use the provided debug URL in Chrome

## Docker Support

`TypeScript Vitest Starter Template` provides a `Dockerfile` that follows the best practices regarding Node.js containerized applications.
* the application is run using a dedicated non-root user
* the Dockerfile uses a dedicated build step


### Build your docker image
```
docker build -t my-project-name .
```

### Run your docker container

```
docker run -p PORT:PORT my-project-name
```

## Credits
Thanks to [Maksim Sinik](https://github.com/fox1t).
This project is based to [Stampo - TypeScript Microservice Starter](https://github.com/fox1t/typescript-microservice-starter).
I have remove Tap, add Vitest, Pnpm, upgrade and refactoring.
