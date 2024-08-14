const protocol = process.env.protocol ?? "http";
const host = process.env.host ?? "localhost";
const port = parseInt(process.env.port ?? "3000");
const baseUrl = `${protocol}://${host}:${port}/`;

export { baseUrl, host, port, protocol };
