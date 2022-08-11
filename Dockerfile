FROM node:16.15

# First install all the dependencies
WORKDIR /usr/src/backend
COPY backend/package.json backend/yarn.lock ./
RUN yarn

WORKDIR /usr/src/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn

# Build frontend
COPY frontend ./
RUN yarn build
# Copy frontend output into backend public folder
RUN cp -r ./build /usr/src/backend/public

# Build backend
WORKDIR /usr/src/backend
COPY backend ./
RUN yarn build

RUN adduser myuser
USER myuser

CMD ["npm", "run", "start-prod"]