# Capacitive Svelte

This template should help get you started developing with Svelte and Capacitor.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Technical details

### vitest and @storybook/jest

Vitest is a testing tool like Jest, but it is optimized to vite projects. It uses the same build pipeline as the project and simplifies a lot the configuration and possible conflicts. However, the incredible play function in stories granted by the Storybook Interactions addon is only usable with the @storybook/jest package.

Given the situation it is recommended to use Vitest when in a test file and the storybook Jest when creating play functions.

### Handling events in svelte stories

Svelte Storybook will refuse to handle Svelte events and add automatically the actions, so you will have to manually add each event with a `action("on:<event name>")` handler.

It is quite hard to find exactly how storybook gives events mock handlers as args in Svelte. Storybook will give you all the event handle mocks with the name `event_<event name>`, so an event handled by `on:click` would be accessible by `args.event_click`. This is the only way to consistently test events being dispatched using interactions addon. If you try to instantiate a separate mock to handle and you add it to the template, expecting for it to be called will fail.

The last quirk is that the Template's slot props in Svelte CSF are badly typed, so whenever you try to add the mock handlers to the events you will get a unsafe assignment with any value. My recommendation is to disable only that linting rule for the Template definition.


## TODO

- [x] Add svelte + vite + ts template
- [x] Add Storybook
- [x] Add a way to test components
- [ ] Add example standalone tests
- [x] Add more screen sizes to Storybook
- [x] Add Linter
- [x] Add SCSS support
- [x] Add support to [Storybook Svelte CSF](https://storybook.js.org/addons/@storybook/addon-svelte-csf/)
- [x] Try to add [Storybook Storysource Addon](https://storybook.js.org/addons/@storybook/addon-storysource)
- [ ] Add prettier to all programming languages
- [ ] Set prettier as the default formatter to all languages (vscode)
- [ ] Set eslint to run on save on all relevant languages
- [ ] Add all the needed scripts in the package.json
- [ ] Add a guide on how to setup development environment
- [ ] Add a guide on how to run in browser
- [ ] Add information on how the project is structured
- [ ] Link to in-depth structure guide
- [ ] Add default snippets to project
- [ ] Add Capacitor and enable mobile app development
- [ ] Add a guide on how to run in android and ios
- [ ] Add a guide on how to deploy to Appstore Connect and Google Play Console
- [ ] Add Docker image for easy android development environment
- [ ] Add Docker image for easy ios development environment
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
8.  Added Svelte CSF support for better docs with storysource addon
    1. Added the packages normally with NPM and referencing them in the `.storybook/main.ts` file
    2. Converted Button to use Svelte CSF so there will be an example and all the quirks are dealt with
