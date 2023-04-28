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
- [ ] Add SCSS support
- [ ] Try to add [Storybook Storysource Addon](https://storybook.js.org/addons/@storybook/addon-storysource)
- [ ] Add Capacitor and enable mobile app development
- [ ] Add a guide on how to setup development environment
- [ ] Add a guide on how to run in browser, ios and android
- [ ] Add a guide on how to deploy to Appstore Connect and Google Play Console
- [ ] Add information on how the project is structured
- [ ] Link more resources
- [ ] Consider adding [Designs Addon](https://storybook.js.org/addons/storybook-addon-designs/)
- [ ] Consider adding [Mock Service Worker Addon](https://storybook.js.org/addons/msw-storybook-addon)
