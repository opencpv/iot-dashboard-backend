const { SerialPort } = require("serialport");

const connectToUsb = (socketServer, path, baudrate) => {
  const port = new SerialPort(path, { baudRate: baudrate });

  port.on("data", (data) => {
    socketServer.emit("usb-data", data.toString());
  });

  port.on("error", (err) => {
    console.log("Error: ", err.message);
  });
};

module.exports = connectToUsb;
