FROM node

ENV APP_ROOT="/app/" \
  HOME=${APP_ROOT} \
  APP_GRP="root" \
  APP_USR="node" \
  UID_USR=1000 \
  APP_PORT=5000

EXPOSE ${APP_PORT}

WORKDIR ${APP_ROOT}

RUN apt-get update && apt-get install -y build-essential curl

# Add node user to root group
RUN adduser ${APP_USR} ${APP_GRP} && chown -R ${APP_USR}:${APP_GRP} ${APP_ROOT}

USER ${UID_USR}:${APP_GRP}

USER ${UID_USR}

COPY --chown=${UID_USR}:${APP_GRP} ./package.json ./package-lock.json ./tsconfig.json ${APP_ROOT}

COPY --chown=${UID_USR}:${APP_GRP} ./src ${APP_ROOT}/src

RUN npm ci

RUN npm run build

USER root

RUN chown -R ${APP_USR}:${APP_GRP} ${APP_ROOT}/src && chmod -R g=u ${APP_ROOT}/src

USER ${UID_USR}

CMD  ["npm", "start"]
