# Capacitive Svelte

This template should help get you started developing with Svelte and Capacitor.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Technical decisions

### vitest and @storybook/jest

Vitest is a testing tool like Jest, but it is optimized to vite projects. It uses the same build pipeline as the project and simplifies a lot the configuration and possible conflicts. However, the incredible play function in stories granted by the Storybook Interactions addon is only usable with the @storybook/jest package.

Given the situation it is recommended to use Vitest when in a test file and the storybook Jest when creating play functions.

## TODO

- [x] Add svelte + vite + ts template
- [x] Add Storybook
- [x] Add a way to test components
- [ ] Add example standalone tests
- [x] Add more screen sizes to Storybook
- [x] Add Linter
- [x] Add SCSS support
- [ ] Add support to [Storybook Svelte CSF](https://storybook.js.org/addons/@storybook/addon-svelte-csf/)
- [ ] Try to add [Storybook Storysource Addon](https://storybook.js.org/addons/@storybook/addon-storysource)
- [ ] Add a guide on how to setup development environment
- [ ] Add a guide on how to run in browser
- [ ] Add information on how the project is structured
- [ ] Add default snippets to project
- [ ] Add Capacitor and enable mobile app development
- [ ] Add a guide on how to run in android and ios
- [ ] Add a guide on how to deploy to Appstore Connect and Google Play Console
- [ ] Link more resources
- [ ] Consider adding [Designs Addon](https://storybook.js.org/addons/storybook-addon-designs/)
- [ ] Consider adding [Mock Service Worker Addon](https://storybook.js.org/addons/msw-storybook-addon)
- [ ] Consider adding [Prettier](https://github.com/sveltejs/prettier-plugin-svelte) to allow users to format in any IDE


## How this was built?

1. Created a vite svelte project using `npm init vue` and selecting svelte as per the instructions available at the [Svelte docs](https://svelte.dev/docs#getting-started)
2. Added Storybook using `npx storybook@latest init` as per the instructions available at the [Storybook Docs](https://storybook.js.org/docs/svelte/get-started/install/)
4. Added Testing
   1. Added the needed packages to run [Storybook Addon Interactions](https://storybook.js.org/addons/@storybook/addon-interactions/)
   2. Added [Vitest](https://vitest.dev/config/)
   3. Added [Testing Library](https://testing-library.com/docs/svelte-testing-library/setup)
5. Added SCSS using [svelte-add](https://github.com/svelte-add/scss)
   1. Had to add a path aliasing configuration to stay consistent with all of the template
6. Added linting step by step
   1. Added aliases to SCSS following [this comment's suggestion](https://github.com/sveltejs/svelte-preprocess/issues/97#issuecomment-551842456)
   2. Added javascript linting with [Eslint instructions](https://eslint.org/docs/latest/use/getting-started#configuration)
   3.  Added typescript linting with [Typescript eslint instructions](https://typescript-eslint.io/getting-started). Had to com keep linting separated by using overrides
   4.  Added Svelte linting with [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte) and [svelte-eslint-parser](https://github.com/sveltejs/svelte-eslint-parser#readme)
7.  Fixed all stories to the CSF3 format recommended by Storybook (less lint errors and much more intuitive)
