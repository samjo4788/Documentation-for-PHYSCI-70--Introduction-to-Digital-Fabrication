// orientation variables, right
let valtap = 0.0;
let valflex1 = 0.0;
let valflex2 = 0.0;


/* initialize services we're looking for*/
//right
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
const characteristicsUUID = {
  valtap: "19b10013-e8f2-537e-4f6c-d104768a1214",
  valflex1: "19b10014-e8f2-537e-4f6c-d104768a1214",
  valflex2: "19b10015-e8f2-537e-4f6c-d104768a1214",
}

// Declare BLE Object + characteristics
let myBLE;
let valtapCharacteristic;
let valflex1Characteristic;
let valflex2Characteristic;

function setup() {
  createCanvas(720, 500);
  myBLE = new p5ble();
  background("#FFF");
  // make a button and give it a callback
  const connectButton = createButton('Connect and Start Notifications')
  connectButton.mousePressed(connectAndStartNotify);

}

function connectAndStartNotify() {
  myBLE.connect(serviceUuid, gotCharacteristics);
  //myBLE.connect(gattServiceUuid, gattCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log(characteristics[1].uuid);
  for (let i = 0; i < characteristics.length; i++) {
    if (characteristics[i].uuid == characteristicsUUID.button) {
      buttonCharacteristic = characteristics[i];
      myBLE.startNotifications(buttonCharacteristic, handleButton);
    } 
    else if (characteristics[i].uuid == characteristicsUUID.valtap) {
      valtapCharacteristic = characteristics[i];
      myBLE.startNotifications(valtapCharacteristic, valtapCallback);
    } 
    else if (characteristics[i].uuid == characteristicsUUID.valflex1){
      valflex1Characteristic = characteristics[i];
      myBLE.startNotifications(valflex1Characteristic, valflex1Callback);
    } 
    else if (characteristics[i].uuid == characteristicsUUID.valflex2) {
      valflex2Characteristic = characteristics[i];
      myBLE.startNotifications(valflex2Characteristic, valflex2Callback);
    } 
    else {
      console.log("nothing");
    }
  }
}

function valtapCallback(data) {
  console.log('valtap: ', data)
  console.log(Number(data))
  valtap = data;
}

function valflex1Callback(data) {
  console.log('valflex1: ', data)
  valflex1 = data;
}

function valflex2Callback(data) {
  console.log('valflex2: ', data)
  valflex2 = data;
}

function draw() {
  // update the drawing:
  background(255); // set background to white
  
  //index finger triangle
  stroke(0);
  fill(valtap/2,valtap, 100);
  triangle(180,300,270,valflex1,360,300);

  //draw middle finger triangle
  stroke(0);
  fill(100, valtap, valtap/2);
  triangle(360,300,450,valflex2,540,300);
}