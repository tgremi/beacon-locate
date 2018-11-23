const noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");
const calculateDistance = require("./calc/helpers").calculateDistance
const scanner = new BeaconScanner();




const mountBufferFromNoble = (stop) => {
  noble.on("discover", function (peripheral) {
    console.log({ mac: peripheral.uuid, rssi: peripheral.rssi });
    if (peripheral.uuid == "72bf02b4266e") {
      console.log({ mac: peripheral.uuid, rssi: peripheral.rssi });
      console.log("\n \n \n  [RESULT from NOBLE] ")
      console.log(calculateDistance(peripheral.rssi))
      console.log("\n \n \n")
    }
  });
  noble.startScanning([], true);
}

const mountBufferFromBeaconScanner = (stop) => {

  scanner.onadvertisement = advertisement => {
    var beacon = advertisement["iBeacon"];
    beacon.rssi = advertisement["rssi"];
    console.log(JSON.stringify(beacon, null, "    "));
    console.log("\n \n \n  [RESULT] ")
    console.log(calculateDistance(beacon.rssi))
    console.log("\n \n \n")
  };



  scanner
    .startScan()
    .then(() => {
      console.log("Scanning for BLE devices...");
    })
    .catch(error => {
      console.error(error);
    });
}

setInterval((arg) => {
  console.log(arg)
  mountBufferFromBeaconScanner()
}, 5000);


// setInterval((arg) => {
//   console.log(arg)
//   mountBufferFromNoble()
// }, 5000);
