import * as config from "./src/config/server";
import { server } from "./src/server";

server.listen(config.port, config.host, () => {
    console.log(`Server running at ${config.baseUrl}`);
});
