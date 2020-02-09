# Highest
### Your best climbing companion

**🚀 Web Application to track climbing routes activity, made with Vue**

[![Netlify Status](https://api.netlify.com/api/v1/badges/7dc9a45b-de70-46bd-b876-2909f9a483e3/deploy-status)](https://app.netlify.com/sites/climbing/deploys)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b12f922e68ee491982dd1f2e3df24812)](https://www.codacy.com/manual/exybore/climbing-app?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=exybore/climbing-app&amp;utm_campaign=Badge_Grade)
[![License](https://img.shields.io/github/license/exybore/climbing-app)](https://github.com/exybore/climbing-app/blob/master/.LICENSE)
[![Opened issues](https://img.shields.io/github/issues/exybore/climbing-app)](https://github.com/exybore/climbing-app/issues)

- [❓ Why this application ?](#-why-this-application-)
- [🌈 How it works](#-how-it-works)
- [💻 Development](#-development)
  - [Environment setup](#environment-setup)
  - [Building the app](#building-the-app)
  - [Linting and fixing files](#linting-and-fixing-files)
  - [Customizing configuration](#customizing-configuration)
- [📜 Credits](#-credits)
- [🔐 License](#-license)

## ❓ Why this application ?

TODO: write more description

It's always useful to keep track -in one place- of the routes you want to climb, and your objectives with these routes.

## 🌈 How it works

It's a website built on top of VueJS that saves all of user's data into browser's storage, meaning that any API is required at the back.
Moreover, as it's a Progressive Web Application, it can load quickly and run offline.

The interface is adapted if you're on a mobile device or on a computer : it takes part of user experiences on both systems.

I plan to add syncing options via an account so the climbing data can be shared between devices.

## 💻 Development

### Environment setup

Thank you for being interested in helping the application to grow by expanding its code !
First of all, clone the repository from GitHub on your local machine : (this requires Git to be installed)

```bash
git clone https://github.com/exybore/climbing-app.git  # Using HTTP
git clone git@github.com:exybore/climbing-app          # Using SSH
```

Install the required dependencies using your favorite package manager :

```bash
npm i         # Using NPM
yarn install  # Using Yarn
```

Then, run the application using the `serve` command : (Make sure you installed Vue CLI on your system)

```bash
npm run serve  # Using NPM
yarn serve     # Using Yarn
```

A web server will start with hot reload enabled, perfect to develop.

### Building the app

To get a built version of the application ready to be served by a HTTP server, use the `build` command :

```bash
npm run build  # Using NPM
yarn build     # Using Yarn
```

Files will be generated in the `dist` folder, and the entry point will be the `index.html` file.

### Linting and fixing files

To lint the files and check for formatting, run the `lint` command :

```bash
npm run lint  # Using NPM
yarn lint     # Using Yarn
```

If a better formatting is available, new code will be written directly inside the concerned files.

### Customizing configuration

If you want to customize the build configuration, check the [Configuration Reference](https://cli.vuejs.org/config/) on the Vue CLI documentation.

## 📜 Credits

- Main libraries : [VueJS](https://vuejs.org), [Vuetify](https://vuetifyjs.com)
- Maintainer : [Exybore](https://github.com/exybore)

## 🔐 License

This project is under the [GNU GPL v3](./LICENSE) license.
