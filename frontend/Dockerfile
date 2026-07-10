FROM oven/bun:latest

WORKDIR /app/frontend

COPY . .

RUN bun install

EXPOSE 5173

CMD ["bun", "run", "--cwd", "frontend", "dev", "--host", "0.0.0.0"]