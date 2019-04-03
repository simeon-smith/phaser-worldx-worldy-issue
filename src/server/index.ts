import http from "http";
import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const { ENVIRONMENT, PORT } = process.env;

const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, function() {
  console.log("Listening on " + PORT);
});

if (module.hot) {
  module.hot.accept("./server", () => {
    server.removeListener("request", currentApp);
    server.on("request", app);
    currentApp = app;
  });
}
