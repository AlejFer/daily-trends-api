FROM node

ENV APP_ROOT="/app/" \
  HOME=${APP_ROOT} \
  APP_GRP="root" \
  APP_USR="node" \
  UID_USR=1000 \
  APP_PORT=5000

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

EXPOSE ${APP_PORT}

WORKDIR ${APP_ROOT}

RUN apt-get update && apt-get install -y build-essential curl

# Add node user to root group
RUN adduser ${APP_USR} ${APP_GRP} && chown -R ${APP_USR}:${APP_GRP} ${APP_ROOT}

USER ${UID_USR}:${APP_GRP}

USER ${UID_USR}

COPY --chown=${UID_USR}:${APP_GRP} ./init.script.sh ./package.json ./package-lock.json ./tsconfig.json ${APP_ROOT}

COPY --chown=${UID_USR}:${APP_GRP} ./src ${APP_ROOT}/src

COPY --chown=${UID_USR}:${APP_GRP} ./environment ${APP_ROOT}/environment

RUN npm ci

RUN npm run build

RUN ./init.script.sh

USER root

RUN chown -R ${APP_USR}:${APP_GRP} ${APP_ROOT}/src && chmod -R g=u ${APP_ROOT}/src

USER ${UID_USR}

CMD  ["npm", "start"]
