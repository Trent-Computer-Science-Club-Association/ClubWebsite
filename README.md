<p align="center">
  <img src="public/logo.svg" alt="Trent Computer Science Club Association Logo" width="200">
</p>

# Trent Computer Science Club Association Website

This repository contains the source code for the official website of the Trent University Computer Science Club Association. The website serves as a central hub for club activities, announcements, resources, and information about our club's events.

# Running the Website Locally

In order to run the website locally, you will need to have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed on your machine.

```bash
yarn install
yarn dev
```

## Pages

- **[Home](https://tcsca.ca)** - The home page
- **[About Us](https://tcsca.ca/About)** - The about us page
- **[Events](https://tcsca.ca/Events)** - The events page
- **[Contact Us](https://tcsca.ca/Contact)** - The contact us page

## Layout and Structure

- **[pages](pages)** - This folder contains the source code for each page with `_app.tsx` and `_document.tsx` being special files that control global page content.
- **[components](components)** - The folder contains all react components used throughout the project (e.g `Button`)
- **[layouts](layouts)** - This folder contains all the layouts for the project (e.g `AboutSection`)
- **[styles](styles)** - This folder contains all styles for the project
  - **[components](styles/components)** - This folder contains all styles for the components
  - **[layouts](styles/layouts)** - This folder contains all styles for the layouts
- **[utils.ts](utils.ts)** - This file contains all of our global utility functions

- Additionally, in the root directly you will find a `config.ts` file and `config.yaml` file.
  - `config.ts` is the backbone of our site and ensures type safety for our configuration
  - `config.yaml` is the configuration file for the website

## Commands

- `yarn dev` - Runs the next.js development process
- `yarn build` - Runs the next.js build process
- `yarn start` - Starts the next.js server in production mode
- `yarn lint` - Runs the linter
- `yarn format` - Runs prettier to format code

## Contributing

We welcome contributions to this project, however, please note that we do have plans and goals, so please contact us before doing anything that heavily impacts UI or functionality. (Fixes always welcome)

## Contact Us

- The best way to contact our devs is via Discord, you can join our Discord server [here](https://discord.gg/serea2sPAd).
- Additionally, you can use the contact us page [here](https://tcsca.ca/Contact).
