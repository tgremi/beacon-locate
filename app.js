const noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");
const calculateDistance = require("./calc/helpers").calculateDistance;

var scanner = new BeaconScanner();

scanner.onadvertisement = advertisement => {
  var beacon = advertisement["iBeacon"];
  beacon.rssi = advertisement["rssi"];
  console.log(JSON.stringify(beacon, null, "    "));
};

scanner
  .startScan()
  .then(() => {
    console.log("Scanning for BLE devices...");
  })
  .catch(error => {
    console.error(error);
  });

// noble.startScanning();

// noble.on(`discover`, function(peripheral) {
//   var macAddress = peripheral.uuid;
//   var rss = peripheral.rssi;
//   var localName = peripheral.localName;

//   console.log("found device: ", macAddress, " ", localName, " ", rss);
// });

//replace localhost with your server's IP;
// const socket = require('socket.io-client')('http://localhost/scanner');

//replace with your hardware address
// var addressToTrack = "74278BDA-B644-4520-8F0C-720EAF059935";

// socket.on("connect", function() {
//   console.log("connected to server");
// });

// noble.on("discover", function(peripheral) {
//   // if (peripheral.uuid == addressToTrack) {
//   // socket.emit('deviceData',);
//   console.log({ mac: peripheral.uuid, rssi: peripheral.rssi });
//   console.log("\n \n \n [RESULT] \n\n\n");
//   console.log(calculateDistance(peripheral.rssi));
//   // }
// });
// noble.startScanning([], true);

//allows dubplicates while scanning

// const BeaconScanner = require("node-beacon-scanner");
// const scanner = new BeaconScanner();

// // Set an Event handler for becons
// scanner.onadvertisement = ad => {
//   console.log(JSON.stringify(ad, null, "  "));
//   console.log("\n \n \n [RESULT] \n\n\n");
//   console.log(calculateDistance(ad.rssi));
// };

// // Start scanning
// scanner
//   .startScan()
//   .then(() => {
//     console.log("Started to scan.");
//   })
//   .catch(error => {
//     console.error(error);
//   });
