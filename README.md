# Capacitive Svelte

This template should help get you started developing with Svelte and Capacitor.

## Recommended IDE Setup

Use [VS Code](https://code.visualstudio.com/) and install the
[extensions recommended for the workspace](./.vscode/extensions.json). Make sure
the [settings](./.vscode/settings.json) aren't obscured by your user settings in
any way.

## Setting up the environment

1. Install Node version 18. You may use asdf to install using `asdf install`
2. (optional) Install the dependencies to run Storybook's test runner with
   `sudo npx playwright install-deps`
3. Install NPM packages with `npm install`

## Running

```sh
# For development
npm run dev # Runs the app in hot reload mode
npm run storybook # Runs storybook in hot reloading mode

# For deployment
npm run build # Builds the app into the dist folder
npm run preview # Runs the built app
npm run storybook-build # Builds a static storybook site into storybook-static
```

To run storybook from the static folder you'll have to host the storybook-static
folder.

## Testing

You may run two kinds of tests:

```sh
# run once variants
npm run test:vitest # Runs tests in *.test.ts files
npm run test:storybook # Runs tests in storybook stories using test runner

# watch variants (will rerun changed tests automatically)
npm run test:vitest-watch # Runs tests in *.test.ts files
npm run test:storybook-watch # Runs tests in storybook stories using test runner
```

## Linting and Formatting

The project comes with a pre-loaded eslint configuration, prettier and
svelte-check. The commands are as follows:

```sh
npm run format # Formats all files using prettier
npm run lint-fix # Fixes all autofixable issues detected by eslint
npm run format-check # Checks if it's formatter correctly using prettier
npm run lint # Checks if the files are okay according to eslint
npm run check # Checks if the files are okay according to svelte-check
```

## Testing everything

You may want to run all the tests to check if the project is following the
formatter, linter and has no failing tests. You can do that with the command
`npm run check-all`

## How is it structured

```
/
|-.storybook/
| |-main.ts         # Storybook configuration
| |-preview.ts      # Storybook render configuration
| |-viewport.ts     # All the pre-loaded viewports
|
|-.vscode/
| |-extensions.json # Extension recommendations
| |-settings.json   # Workspace settings
|
|-public/           # This is copied to the root of the Svelte app
|-scripts/          # Scripts that help with build and other stuff
|-src/
| |-assets/     # add all your assets here
| |-components/ # add all your svelte components here, one folder per component
| | |-Component/                 # Should have the same name as the component
| |   |-Component.svelte         # The component should be capitalized
| |   |-Component.stories.svelte # We recommend Svelte CSF
| |   |-Component.test.ts        # The tests for this component
| |   |-*other files related to the component*
| |
| |-helpers/    # add any useful code that's not specific here
| |-pages/      # Add your pages here
| | |-*same structure as components*
| |
| |-stories/    # Add any dangling documentation here as *.mdx here
| |-styles/     # All globally available *.css or *.scss files should be put here
| |-types/      # Useful type definitions or type templates should be put here
| |
| |-App.svelte    # The root component
| |-main.ts       # The starting point of the app
| |-vite-env.d.ts # Add type references as needed
|
|-.editorconfig     # Configure the IDE with the project's format
|-.eslintrc.cjs     # Customize your eslint settings
|-.prettierrc.cjs   # Customize your prettier settings
|-aliases.config.js # All the aliases available in the project. Add more here
|-index.html        # The root of the website
|-package.json      # All dependencies here
|-svelte.config.js  # Configure how svelte is built
|-tsconfig.json     # Configure the typescript
|-vite.config.ts    # Configure how the app builds
|-vitest.config.ts  # Configure how the app is tested
```

More info here: https://docs.vlgi.com/team/dev/stack-guide/web-spa/

## Technical details

### vitest and @storybook/jest

Vitest is a testing tool like Jest, but it is optimized to vite projects. It
uses the same build pipeline as the project and simplifies a lot the
configuration and possible conflicts. However, the incredible play function in
stories granted by the Storybook Interactions addon is only usable with the
@storybook/jest package.

Given the situation it is recommended to use Vitest when in a test file and the
storybook Jest when creating play functions.

### Handling events in svelte stories

Svelte Storybook will refuse to handle Svelte events and add automatically the
actions, so you would have to manually add each event with a
`action("on:<event name>")` handler. However, in the next paragraph we describe
how to add the mock call for testing. The mock call will produce an action, so
we just recommend adding a call to `args.event_click` in the template.

It is quite hard to find exactly how storybook gives events mock handlers as
args in Svelte. Storybook will give you all the event handle mocks with the name
`event_<event name>`, so an event handled by `on:click` would be accessible by
`args.event_click`. This is the only way to consistently test events being
dispatched using interactions addon. If you try to instantiate a separate mock
to handle and you add it to the template, expecting for it to be called will
fail.

The last quirk is that the Template's slot props in Svelte CSF are badly typed,
so whenever you try to add the mock handlers to the events you will get a unsafe
assignment with any value. My recommendation is to disable only that linting
rule for the Template definition.

### Routing

We use [Svelte SPA router](https://github.com/ItalyPaleAle/svelte-spa-router).
Just look through their documentation for more info.

## TODO

- [x] Add svelte + vite + ts template
- [x] Add Storybook
- [x] Add a way to test components
- [x] Add example standalone tests
- [x] Add more screen sizes to Storybook
- [x] Add svelte-spa-router
- [x] Add route policies handling
- [x] Add Linter
- [x] Add SCSS support
- [x] Add support to
      [Storybook Svelte CSF](https://storybook.js.org/addons/@storybook/addon-svelte-csf/)
- [x] Try to add
      [Storybook Storysource Addon](https://storybook.js.org/addons/@storybook/addon-storysource)
- [x] Add prettier to all programming languages
- [x] Add [Prettier](https://github.com/sveltejs/prettier-plugin-svelte) to
      allow users to format in any IDE
- [x] Set prettier as the default formatter to all languages (vscode)
- [x] Set eslint to run on save on all relevant languages
- [x] Add all the needed scripts in the package.json
- [x] Add a guide on how to setup development environment
- [x] Add a guide on how to run in browser
- [x] Add information on how the project is structured
- [x] Link to in-depth structure guide
- [ ] Add Capacitor and enable mobile app development
- [ ] Add a guide on how to run in android and ios
- [ ] Add a guide on how to deploy to Appstore Connect and Google Play Console
- [ ] Add Docker image for easy android development environment
- [ ] Add Docker image for easy ios development environment
- [ ] Link more resources
- [ ] Add default snippets to project
- [ ] Consider adding
      [Designs Addon](https://storybook.js.org/addons/storybook-addon-designs/)
- [ ] Consider adding
      [Mock Service Worker Addon](https://storybook.js.org/addons/msw-storybook-addon)

## How this was built?

1. Created a vite svelte project using `npm init vue` and selecting svelte as
   per the instructions available at the
   [Svelte docs](https://svelte.dev/docs#getting-started)
2. Added Storybook using `npx storybook@latest init` as per the instructions
   available at the
   [Storybook Docs](https://storybook.js.org/docs/svelte/get-started/install/)
3. Added Testing
   1. Added the needed packages to run
      [Storybook Addon Interactions](https://storybook.js.org/addons/@storybook/addon-interactions/)
   2. Added [Vitest](https://vitest.dev/config/)
   3. Added
      [Testing Library](https://testing-library.com/docs/svelte-testing-library/setup)
   4. Installed package `@storybook/test-runner` for testing and installed its
      dependencies `sudo npx playwright install-deps`
4. Added SCSS using [svelte-add](https://github.com/svelte-add/scss)
   1. Had to add a path aliasing configuration to stay consistent with all of
      the template
5. Added linting step by step
   1. Added aliases to SCSS following
      [this comment's suggestion](https://github.com/sveltejs/svelte-preprocess/issues/97#issuecomment-551842456)
   2. Added javascript linting with
      [Eslint instructions](https://eslint.org/docs/latest/use/getting-started#configuration)
   3. Added typescript linting with
      [Typescript eslint instructions](https://typescript-eslint.io/getting-started).
      Had to com keep linting separated by using overrides
   4. Added Svelte linting with
      [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte)
      and
      [svelte-eslint-parser](https://github.com/sveltejs/svelte-eslint-parser#readme)
6. Fixed all stories to the CSF3 format recommended by Storybook (less lint
   errors and much more intuitive)
7. Added Svelte CSF support for better docs with storysource addon
8. Added the packages normally with NPM and referencing them in the
   `.storybook/main.ts` file
9. Converted Button to use Svelte CSF so there will be an example and all the
   quirks are dealt with
10. Added Prettier support
    1. Firstly removed any eslint conflicts there could be by using
       [this esling config](https://github.com/prettier/eslint-config-prettier#installation)
    2. Added [Prettier](https://prettier.io/docs/en/install.html)
    3. Added
       [Svelte Prettier plugin](https://github.com/sveltejs/prettier-plugin-svelte)
