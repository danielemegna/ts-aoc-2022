# TypeScript Advent Of Code 2022

Solutions for [2022 Advent Of Code challenges](https://adventofcode.com/2022) in TypeScript

### Dev setup

Install proper nodejs version via [asdf](https://asdf-vm.com/):

```
$ asdf install
```

or simply check needed nodejs version in [.tool-versions](.tool-versions) file.

> if you want to enable yarn you should do it via [corepack](https://fek.io/blog/what-is-corepack-in-node-js): `corepack enable yarn` <br/>
> using asdf a reshim could be needed: `asdf reshim nodejs`

-----

Install project dependencies:

```
$ yarn install
```

and run tests via jest:

```
$ yarn jest
```

### Docker-only dev setup

Use temporary node container with current directory volume:

```
$ docker run --rm -it -v $PWD:/app -w /app node:20.10.0-slim bash
# yarn install
# yarn jest
```

> check used node version in [.tool-versions](.tool-versions)
