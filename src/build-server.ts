import fastify, { FastifyServerOptions } from "fastify";
import fastifySensible from "@fastify/sensible";
import fastifyCors from "@fastify/cors";
import openAPIPlugin from "./plugins/schemas";
import requestLogger from "./plugins/request-logger";
import browserInstancePlugin from "./plugins/browser";
import browserWebSocket from "./plugins/browser-socket";
import seleniumPlugin from "./plugins/selenium";
import { browserRoutes, seleniumRoutes, actionsRoutes } from "./routes";

export default function buildFastifyServer(options?: FastifyServerOptions) {
  const server = fastify(options);

  // Plugins
  server.register(requestLogger);
  server.register(fastifySensible);
  server.register(fastifyCors, { origin: true });
  server.register(openAPIPlugin);
  server.register(browserInstancePlugin);
  server.register(seleniumPlugin);
  server.register(browserWebSocket);

  // Routes
  server.register(actionsRoutes);
  server.register(browserRoutes);
  server.register(seleniumRoutes);

  return server;
}
