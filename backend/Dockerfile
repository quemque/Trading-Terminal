FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "--hot" ,"src/index.js"]