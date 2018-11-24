const noble = require("noble");
const BeaconScanner = require("node-beacon-scanner");
const calculateDistance = require("./calc/helpers").getRange
const scanner = new BeaconScanner({ 'noble': noble });
let buffer = [];
let rssiBuffer = []

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

const mountBufferFromBeaconScanner = async (stop) => {
  scanner
    .startScan()
    .then(() => {
      rssiBuffer = []
      console.log("Scanning for BLE devices...");
    })
    .catch(error => {
      console.error(error);
    });


  scanner.onadvertisement = advertisement => {
    var beacon = advertisement["iBeacon"];
    beacon.rssi = advertisement["rssi"];

    rssiBuffer.push(advertisement["rssi"])
    //Se já tivermos 10 RSSI
    if (rssiBuffer.length == 10) {
      console.log('buffer = ' + rssiBuffer)
      scanner.stopScan()
      let total = 0

      for (let i = 0; i < rssiBuffer.length; i++) {
        total += rssiBuffer[i]
      }

      total = total / rssiBuffer.length
      console.log('media = ' + total)
      console.log("parse: ", parseInt(total))
      let objData = {
        minor: beacon.minor,
        //distance: calculateDistance(-70, parseInt(total)),
        distance: calculateDistance(-70, total),
        rssi: total
      }

      //console.log(objData)

      buffer.push(objData)
      console.log("[BUFFER]:")
      console.log(buffer)
      if (buffer.length >= 15) {

        console.log("To no if")

        return buffer;
      }
    }
  };
}


const calcArithmeticMean = async () => {
  // let promise = new Promise((resolve, reject) => {
  // let buffer = setInterval((arg) => {
  let bufferFromMount = await mountBufferFromBeaconScanner();
  // if (bufferFromMount && bufferFromMount.length >= 10) {
  //   // clearInterval(bufferFromMount)
  //   return bufferFromMount
  // } else {
  //   console.log("ERRO FROM ELSE")
  // }
  // }, 5000);
  // console.log(bufferFromMount, "FROM MOUNT")
  // if (bufferFromMount.length > 10) {
  // return bufferFromMount
  // } else {
  //   reject("ERROR")
  // }
  // })

  // try {
  // let result = await promise
  let totalDistance = 0;
  for (let i = 0; bufferFromMount.length < i; i++) {
    totalDistance = totalDistance + result[i].distance
  }


  console.log(" \n \n \n \n total: ")
  console.log(totalDistance)
  console.log(" \n \n \n \n")
  // }
  // // catch (e) {
  // //   console.log(e)
  // // }

}


calcArithmeticMean()

// setInterval((arg) => {
//   console.log(arg)
//   mountBufferFromNoble()
// }, 5000);
