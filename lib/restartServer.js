const restartServer = (server) => {
  server.close(() => {
    console.log("restarting ...");

    process.exit(0);
  });
};

module.exports = restartServer;
