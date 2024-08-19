import { createServer } from "node:http";
import { registerRoutes } from "./components/register";
import { RouteResolver } from "./routers/routeResolver";
import { decorateRequest } from "./streams/request";
import { decorateResponse } from "./streams/response";

export const server = createServer(async (incomingMessage, serverResponse) => {
    const routers = registerRoutes();
    RouteResolver.instance.register(routers);

    const req = decorateRequest(incomingMessage);
    const res = decorateResponse(serverResponse);

    RouteResolver.instance.resolve(req, res);
});
