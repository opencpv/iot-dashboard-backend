const app = require("express")();
const { SerialPort } = require("serialport");
const server = require("http").createServer(app);
const cors = require("cors");
const listPorts = require("./lib/listPorts");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8080;

app.use(cors());

app.get("/", function (req, res) {
  res.send("websocket running");
});

app.get("/devices", (req, res) => {
  const devices = listPorts(res);
});

// io.on("connection", function (socket) {
//   //Whenever someone disconnects this piece of code executed
//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//   });

//   socket.on("connectDevice", (data) => {
//     let path = data.device;
//     let baudrate = data.baudrate;

//     let buffer = "";
//     try {
//       serialPort = new SerialPort({ path, baudRate: parseInt(baudrate) });
//       serialPort.on("error", (err) => {
//         console.log("Error: ", err.message);
//       });

//       serialPort.on("close", () => {});

//       serialPort.on("data", (chunk) => {
//         buffer += chunk.toString();
//         if (buffer.endsWith("\n")) {
//           const data = buffer.trim();
//           try {
//             const jsonData = JSON.parse(data);
//             socket.emit("isConnected", true);
//             socket.emit("usb-data", jsonData);
//             socket.broadcast.emit("usb-data", jsonData);
//             socket.broadcast.emit("isConnected", true);
//             console.log(buffer);
//             buffer = "";
//           } catch (error) {}
//         }
//       });
//     } catch (error) {
//       console.log("error");
//     }
//   });

//   socket.on("disconnectDevice", () => {
//     try {
//       serialPort.close((err) => {
//         if (err) {
//           console.log("Error closing port: ", err.message);
//         } else {
//           socket.emit("isConnected", false);
//           console.log("Port closed");
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
