# Using npm instead of yarn because it cause a not issue with keystone module - which is required
FROM node:23-alpine AS base

RUN mkdir /app
WORKDIR /app

COPY . ./

FROM base AS builder

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/schema.graphql ./schema.graphql
COPY --from=builder /app/dist/ ./dist

ARG PORT=80
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD yarn start

