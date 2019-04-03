import express from "express";
import http from "http";
import socket from "socket.io";
import serveStatic from "serve-static";

const app = express();
const server = new http.Server(app);
const io = socket.listen(server);

app.use(serveStatic("dist/client", { index: ["index.html"] }));

export default app;
