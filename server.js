const { Server } = require("net");
const server = new Server();
const END = "END";
const host = "0.0.0.0";

const error = (message) => {
  console.error(message);
  process.exit(1);
};

const listen = (port) => {
  server.on("connection", (socket) => {
    const remoteSocket = `${socket.remoteAddress}, port of user: ${socket.remotePort}`;
    console.log(`New connection from ${remoteSocket}`);
    socket.setEncoding("utf-8");
    socket.write("Conexión correcta con el servidor");
    socket.on("data", (mensaje) => {
      if (mensaje === END) {
        socket.end();
      } else {
        console.log(`${remoteSocket} -> ${mensaje}`);
      }
    });

    socket.on("close", () => {
      console.log(`Connection with ${remoteSocket} closed`);
    });

    server.on("error", (err) => error(err.message))
  });

  server.listen({port , host}, () => {
    console.log("Servidor en ejecución");
  });
};

const main = () => {
  if (process.argv.length !== 3) {
    error(`Usage: node ${__filename} port`);
  }
  let port  = process.argv[2];
  if(isNaN(port)){
      error(`Invalid port '${port}'`)
  }

  port = Number(port)
  listen(port)
};

if (require.main === module) {
  main();
}
