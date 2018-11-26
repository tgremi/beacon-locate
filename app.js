const noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");
const calculateDistance = require("./calc/helpers").getRange;
const { postDataInServer } = require("./request");
const scanner = new BeaconScanner({ noble: noble });
let buffer = [];
let rssiBufferPointA = [];
let rssiBufferPointB = [];
let rssiBufferPointC = [];

let beaconsLocate = process.env.point || [4660, 4661, 4662];

const mountBufferFromBeaconScanner = async stop => {
  scanner
    .startScan()
    .then(() => {
      rssiBuffer = [];
      console.log("Scanning for BLE devices...");
    })
    .catch(error => {
      console.error(error);
    });

  scanner.onadvertisement = async advertisement => {
    let beacon = advertisement["iBeacon"];
    beacon.rssi = advertisement["rssi"];

    switch (beacon.minor) {
      case beaconsLocate[0]: {
        console.log("[CASO 1]");
        console.log(beacon.minor);
        rssiBufferPointA.push({
          rssi: advertisement["rssi"],
          minor: beacon.minor
        });
        break;
      }
      case beaconsLocate[1]: {
        console.log("[CASO 2]");
        console.log(beacon.minor);
        rssiBufferPointB.push({
          rssi: advertisement["rssi"],
          minor: beacon.minor
        });
        break;
      }
      case beaconsLocate[2]: {
        console.log("[CASO 3]");
        console.log(beacon.minor);
        rssiBufferPointC.push({
          rssi: advertisement["rssi"],
          minor: beacon.minor
        });
        break;
      }
    }

    if (rssiBufferPointA.length == 10) {
      console.log("[PONTO - A]");
      console.log(rssiBufferPointA);
      await postDataInServer(rssiBufferPointA, (error, success) => {
        if (error) {
          console.log(error);
        } else {
          rssiBufferPointA = [];
          console.log("[Clear array]: ", rssiBufferPointA)
        }
      });
    } else if (rssiBufferPointB.length == 10) {
      console.log("[PONTO - B]");
      await postDataInServer(rssiBufferPointB, (error, success) => {
        if (error) {
          console.log(error);
        } else {
          rssiBufferPointB = [];
          console.log("[Clear array]: ", rssiBufferPointB)
        }
      });
    } else if (rssiBufferPointC.length == 10) {
      console.log("[PONTO - C]");
      await postDataInServer(rssiBufferPointC, (error, success) => {
        if (error) {
          console.log(error);
        } else {
          rssiBufferPointC = [];
          console.log("[Clear array]: ", rssiBufferPointC)
        }
      });
    }
  };
};

mountBufferFromBeaconScanner();
