import { createServer } from "node:http";
import { registerRoutes } from "./components/register";
import { RouteResolver } from "./routers/routeResolver";
import { decorateRequest } from "./streams/request";
import { decorateResponse } from "./streams/response";

(function () {
    const routers = registerRoutes();
    RouteResolver.instance.register(routers);
    console.log("Routes registered");
})();

export const server = createServer(async (incomingMessage, serverResponse) => {
    const res = decorateResponse(serverResponse);
    const req = decorateRequest(incomingMessage);

    RouteResolver.instance.resolve(req, res);
});
