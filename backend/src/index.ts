import * as path from "path";

import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import fastifyIO from "fastify-socket.io";

import { Chat } from "./services/chat";
import { Game } from "./services/game";
import { Users } from "./services/users";

const port = process.env.PORT ?? 4000;
const server = fastify();
server.register(fastifyIO, {
  cors: {
    origin: "*",
  },
});
server.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

const game = new Game();
const chat = new Chat();
const users = new Users();

users.subscribeToLogin((socket, name) => {
  game.bindSocket(socket);
  chat.bindUser(socket, name);
});

server.ready().then(() => {
  // we need to wait for the server to be ready, else `server.io` is undefined
  server.io.on("connection", users.bindSocket);
});

server.listen(port, "::");
