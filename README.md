<p align="center">
"Production-ready Nest.js template with user authentication." 🚀
</p>

<p align="center">
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="yarn"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>


## 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

```bash 
docker-compose up -d 
```


```bash
yarn start:dev
```

This development mode works with and exposes the **BD postgres** to port **5436** so that we can then connect from our editor to it.

Now, you should be able to start debugging the configuration using the IDE.

## ⚙️ Building

```bash
yarn build
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:
 CommingSoon