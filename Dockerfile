###
## ubuntu base with nodejs coppied in from official image, for a more secure base
###
#cache our node version for installing later
FROM node:18.18-slim AS node
FROM ubuntu:noble-20241015 AS base

RUN apt-get update \
  && apt-get -qq install -y --no-install-recommends \
  tini \
  && rm -rf /var/lib/apt/lists/*

# new way to get node, let's copy in the specific version we want from a docker image
# this avoids depdency package installs (python3) that the deb package requires
COPY --from=node /usr/local/include/ /usr/local/include/
COPY --from=node /usr/local/lib/ /usr/local/lib/
COPY --from=node /usr/local/bin/ /usr/local/bin/
RUN corepack disable && corepack enable

RUN groupadd --gid 1001 node \
  && useradd --uid 1001 --gid node --shell /bin/bash --create-home node

USER node
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM base as dev
RUN npm install && npm cache clean --force
COPY --chown=node:node . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]

FROM dev AS prod-build
RUN npm run build 

FROM base AS prod
EXPOSE 3000
COPY --from=dev /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=prod-build --chown=node:node /app/build ./build
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "build"]

