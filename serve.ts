import { server } from "./src/server";

const host = process.env.host ?? "localhost";
const port = process.env.port ?? 3000;

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
