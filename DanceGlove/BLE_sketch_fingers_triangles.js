// orientation variables, right
let tapID = 0.0;
let valflex1 = 0.0;
let valflex2 = 0.0;


/* initialize services we're looking for*/
//right
const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
const characteristicsUUID = {
  tapID: "19b10013-e8f2-537e-4f6c-d104768a1214",
  valflex1: "19b10014-e8f2-537e-4f6c-d104768a1214",
  valflex2: "19b10015-e8f2-537e-4f6c-d104768a1214",
}

// Declare BLE Object + characteristics
let myBLE;
let tapIDCharacteristic;
let valflex1Characteristic;
let valflex2Characteristic;


function setup() {
  createCanvas(720, 400, WEBGL);
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
    else if (characteristics[i].uuid == characteristicsUUID.tapID) {
      tapIDCharacteristic = characteristics[i];
      myBLE.startNotifications(tapIDCharacteristic, tapIDCallback,'float32');
    } 
    else if (characteristics[i].uuid == characteristicsUUID.valflex1){
      valflex1Characteristic = characteristics[i];
      myBLE.startNotifications(valflex1Characteristic, valflex1Callback,'float32');
    } 
    else if (characteristics[i].uuid == characteristicsUUID.valflex2) {
      valflex2Characteristic = characteristics[i];
      myBLE.startNotifications(valflex2Characteristic, valflex2Callback, 'float32');
    } 
    else {
      console.log("nothing");
    }
  }
}


function tapIDCallback(data) {
  console.log('tapID: ', data)
  console.log(Number(data))
  tapID = data;
}

function valflex1Callback(data) {
  console.log('valflex1: ', data)
  valflex1 = data;
}

function valflex2Callback(data) {
  console.log('valflex2: ', data)
  valflex2 = data;
}



//draws triangles
//index finger triangle
// function drawIndex() {
//   stroke(0)
//   fill(180)
//   triangle(180,50,270,((valflex1/800)*400),360,50)

// //draw middle finger triangle
//   stroke(0)
// //   fill(180)
//   triangle(360,50,450,((valflex2/800)*400),540,50)
// }
// draws the Arduino Nano:
// function drawMiddle() {
//   // the base board:
// 	stroke(0) // outline black
// 	fill(180) // fill is grey
// 	box(60,0,60)
// }

// function drawIndex() {
// 	stroke(0) // outline black
// 	fill(180) // fill is grey
// 	box(60,0,60)
// }


function draw() {
  // update the drawing:
  background(255); // set background to white
  //index finger triangle

//push();
  nostroke();
  fill(180);
  triangle(180,50,270,((valflex1/800)*400),360,50);

//draw middle finger triangle
  nostroke();
  fill(180);
  triangle(360,50,450,((valflex2/800)*400),540,50);

//pop();

}