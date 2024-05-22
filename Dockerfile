# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-alpine
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile --production

ENV NODE_ENV=production

ARG PORT
EXPOSE ${PORT:-3000}
ENTRYPOINT [ "bun", "run", "src/index.ts" ]