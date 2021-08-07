import express from "express";
import { Server as SocketServer } from "socket.io";
import { Server, createServer } from "http";
import cors from "cors";
import ChatEvent from "./constants";
// import { ChatMessage } from "./types";

class App {
  public static readonly PORT: number = 8080;

  private _app: express.Application;

  private server: Server;

  private io: SocketServer;

  private port: string | number;

  constructor() {
    this._app = express();
    this.port = +process.env.PORT!;
    this._app.use(cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket(): void {
    this.io = new SocketServer(this.server, {
      cors: {
        origin: "http://localhost:3000",
      },
    });
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on(ChatEvent.CONNECT, (socket: any) => {
      console.log("Connected client on port %s.", this.port);
      socket.on("message", ({ message }: { message: string }) => {
        console.log("got a message", message);
      });
      // socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
      //   console.log("[server](message): %s", JSON.stringify(m));
      //   this.io.emit("message", m);
      // });

      socket.on(ChatEvent.DISCONNECT, () => {
        console.log("Client disconnected");
      });
    });
  }

  get app(): express.Application {
    return this._app;
  }
}
export default App;
