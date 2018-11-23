var express = require("express");
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var scanner = io.of("/scanner");

scanner.on("connection", function(socket) {
  console.log("Scanner Connected");

  socket.on("message", function(msg) {
    var noble = require("noble");

    //replace localhost with your server's IP;
    var socket = require("socket.io-client")("http://localhost/scanner");

    //replace with your hardware address
    var addressToTrack = "7c669d9b2dda";

    socket.on("connect", function() {
      console.log("connected to server");
    });

    noble.on("discover", function(peripheral) {
    //   if (peripheral.uuid == addressToTrack) {
        socket.emit("deviceData", {
          mac: peripheral.uuid,
          rssi: peripheral.rssi
        });
    //   }
    });

    noble.startScanning([], true); //allows dubplicates while scanning
  });

  socket.on("disconnect", function() {
    console.log("Scanner Disconnected");
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
