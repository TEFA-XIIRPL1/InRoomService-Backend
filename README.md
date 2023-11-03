<!-- Dokumentation -->

## Dokumentation

This is a server for In Room Service System. It is made with [Node.js](https://nodejs.org/en/download/) and [Express](https://expressjs.com/). The database is made with [MySQL](https://www.mysql.com/).

## Table of Contents

- [How to Contributing](#how-to-contributing)
  - [Step by Step to Create new API](#step-by-step-to-create-new-api)
  - [Step by Step to Create new Test](#step-by-step-to-create-new-test)
  - [Step by Step to Create new Helper](#step-by-step-to-create-new-helper)
  - [How About Create new Model](#how-about-create-new-model)
  - [For Better Developer Experience](#for-better-developer-experience)
    - [Principles](#principles)
    - [Extensions](#extensions)
- [References](#references)

## Getting Started

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [GIT](https://git-scm.com/downloads)
3. Database [see database dokumentation](https://github.com/TEFA-XIIRPL1/Database#database)

### Installation

1. Clone the repo

```sh
git clone https://github.com/TEFA-XIIRPL1/InRoomService-Backend.git
```

2. Install NPM packages

```sh
npm install
```

3. Start database [see database dokumentation](https://github.com/TEFA-XIIRPL1/Database#database)
4. Start the server

```sh
npm run dev
```

## Usage

1. Open [Postman](https://www.postman.com/downloads/)
2. Use the API

# How to Contributing

Make sure you have followed the steps in [Getting Started](#getting-started)

## Step by Step to Create new API

1. Create new file in `services` folder
2. Create new file in `routes` folder
3. Put it in `index.js`
4. Create the test in `tests` folder [guide](#step-by-step-to-create-new-test)
5. Run the test

```sh
npm run test
```

6. Commit your changes

```sh
git commit -m "feat: Add some <feature-name>"
```

7. Push to the branch

```sh
git push origin feature/<feature-name>
```

## Step by Step to Create new Test

1. Touch `tests` folder
2. Go Inside `apis` folder if you want to create new test for api
3. Go Inside `helpers` folder if you want to create new test for helper
4. Create new file with format `<feature-name>.<apis | helper | ...>.test.js`
5. Create the test

## Step by Step to Create new Helper

1. Create new file in `helpers` folder
2. Create the helper
3. Use the helper
4. Create the test in `tests` folder [guide](#step-by-step-to-create-new-test)
5. Run the test

```sh
npm run test
```

6. Commit your changes

```sh
git commit -m "feat: Add some <feature-name>"
```

7. Push to the branch

```sh
git push origin feature/<feature-name>
```

## How About Create new Model

`Important!` in this project you must create new model in [database repo](https://github.com/TEFA-XIIRPL1/Database) first, than copy your changes to this repo

## For Better Developer Experience

### Principles

- [ ] [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- [ ] [KISS](https://en.wikipedia.org/wiki/KISS_principle)
- [ ] [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
- [ ] [SOLID](https://en.wikipedia.org/wiki/SOLID)

### Extensions

1. Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VSCode
2. Install [Prettier](https://prettier.io/docs/en/install.html) and [ESLint](https://eslint.org/docs/user-guide/getting-started) for your code editor
3. Install [Husky](https://typicode.github.io/husky/#/) and [Lint-staged]

# References

- [Node.js](https://nodejs.org/en/download/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Postman](https://www.postman.com/downloads/)
- [GIT](https://git-scm.com/downloads)
- [Prettier](https://prettier.io/docs/en/install.html)
- [ESLint](https://eslint.org/docs/user-guide/getting-started)
- [Husky](https://typicode.github.io/husky/#/)
