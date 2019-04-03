import express from "express";
import http from "http";
import path from "path";
import socket from "socket.io";
import dotenv from "dotenv";
import Phaser from "phaser";
import serveStatic from "serve-static";

dotenv.config();

const { PORT, ENVIRONMENT } = process.env;

const app = express();
const server = new http.Server(app);
// const io = socket.listen(server);

app.use(serveStatic("dist/client", { index: ["index.html"] }));

export default app;
