# Config ExpressJS Server with TypeScript

Build server NodeJS with ExpressJS framework, I use TypeScript language for this project. With TypeScript, it's more complicated than JavaScript. So we need to config and setup some simple commands to run server.

## Run Server

1. Dowload project from git and open folder

```bash
cd ExpressTS_Server_Config
```

2. Install dependencies

- You can install all dependencies like that:

```bash
npm i
```
- Or you can install the latest package with this:

```bash
npm install express dotenv
```

```bash
npm install --save-dev typescript ts-node-dev @types/node @types/express nodemon rimraf concurrently @babel/core @babel/node @babel/preset-env
```

3. Run server
```bash
npm run dev
```

## Config package and command

0. Config tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2022",
        // "module": "NodeNext",
        "lib": [
            "dom",
            "es6",
            "es2017",
            "esnext.asynciterable"
        ],
        "skipLibCheck": true,
        "sourceMap": false,
        "outDir": "./dist",
        "moduleResolution": "node",
        "removeComments": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "noImplicitThis": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "resolveJsonModule": true,
        "baseUrl": "."
    },
    "exclude": [
        "node_modules"
    ],
    "include": [
        "./src/**/*.ts"
    ]
}
```

> With this server I don't use option module. When we don't use this option. tsc will compile to `.js` file with `import` syntax. But NodeJS can't run `.js` file with `import` syntax. Instead of that, we use babel-node to run that file.

1.  `npm run build`

```json
"build": "rimraf dist & npx tsc"
```

> We use `npx tsc` to compile `.ts` file to `.js` file, and with rimraf we can remove some trash folder in folder `dist`

2. `npm run watch`

```json
"watch": "npx tsc -w"
```

> With option `-w` of `tsc` we can watch all file `.ts` change and it auto compile to `.js` file without restart or run command again

3. `npm run server`

```json
"server": "nodemon --exec babel-node dist/index.js --ext *"
```

> When all file `.ts` compiled to folder `dist` we use nodemon watch that folder and run when folder change

4. `npm run serve`

```json
"serve": "concurrently \"npx tsc -w\" \"nodemon --exec babel-node dist/index.js --ext *\" ",
```

> We can use seperated commands by open 2 terminals. First terminal run `npm run watch` and second ternimal run `npm run server`. But we can use concurrently to run 2 commands at one moment without open 2 terminals

5. `npm run dev`

```json
"dev": "ts-node-dev --respawn --transpile-only ./src/index.ts",
```

> During coding and develop, maybe we don't need to compile and run `.js` file. So we can use `ts-node-dev` to run `.ts` file directly without compile.


