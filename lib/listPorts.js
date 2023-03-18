const { SerialPort } = require("serialport");

const listPorts = (response) => {
  let ports = [];
  SerialPort.list()
    .then((data) => {
      data.forEach((element) => {
        if (element.pnpId) {
          ports.push(element.path);
        }
      });
      response.status(200).send({ status: "success", data: ports });
    })
    .catch((err) => {
      response.status(500).send({ status: "error", data: data });
    });
};

module.exports = listPorts;
