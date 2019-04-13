//Yes, I know global variables are bad.
let video;
let vScale = 16;
let canvas;
const fr = 60;

let titleObj = {
  i: 0,
  txt: 'your ascii life'
}

function typeWriter(){
  if (titleObj.i < titleObj.txt.length) {
    document.querySelector('h1').innerHTML += titleObj.txt.charAt(titleObj.i);
    titleObj.i += 1;
    setTimeout(typeWriter, 100);
  }
}
setTimeout(typeWriter, 500);

// This is the main brain of the page.
let gradientObj = {
  threshold: 190,
  decreaser: 0.75,
  brightArr: [],
  thresholdCalc(bright){
    if (!Number.isNaN(bright)) {
      this.brightArr.push(bright);
    }
    if (this.brightArr.length > 10) {
      const num = this.brightArr.length;
      const result = Math.log2((this.brightArr.reduce((a,b)=>a+b)/num))*30;
      this.threshold = result > 255 ? 255:result; 
      this.brightArr = [];
    }
    
  }
}

//Setting up the video-stream and canvas
function setup() {
  frameRate(fr);
  canvas = createCanvas(640*1.2, 480*1.2);
  canvas.parent('canvas-container');
  pixelDensity(1);
  video = createCapture(VIDEO);
  // video  = createVideo('stock-video.mp4');
  video.size(width/vScale, height/vScale);
  // video.loop();
  video.hide();
  fill(225);
  textAlign(RIGHT);
}

//Looking through pixel values from the video-stream
function draw(){
  let bright;
  background(0);

  video.loadPixels();
  loadPixels();

  for (let x = 0; x < video.width; x++) {
    for (let y = 0; y < video.height; y++) {
      let index = (x + y * video.width)*4;

      let r = video.pixels[index+0]
      let g = video.pixels[index+1]
      let b = video.pixels[index+2]

      //Averaging the red, green and blue values gives you a greyscale image.
      bright = (r+g+b)/3;

      //If the brightness of the pixel falls in a certain range, place a specifc ASCII character
      let asciiChar;
      if (bright >= gradientObj.threshold) {
        asciiChar = char(35);
      } else if (bright > gradientObj.threshold*gradientObj.decreaser) {
        asciiChar = char(38);        
      } else if (bright > gradientObj.threshold*Math.pow(gradientObj.decreaser, 2)) {
        asciiChar = char(92);                
      } else if (bright > gradientObj.threshold*Math.pow(gradientObj.decreaser, 3)) {
        asciiChar = char(62);                
      } else if (bright > gradientObj.threshold*Math.pow(gradientObj.decreaser, 3.5)) {
        asciiChar = char(44);                
      } else if (bright > gradientObj.threshold*Math.pow(gradientObj.decreaser, 4)) {
        asciiChar = char(46);                
      } else {
        asciiChar = char(32)
      }

      text(asciiChar, x*vScale, y*vScale);
    }
  }

  // Don't worry about this...
  // frameCount%1==0 ? gradientObj.thresholdCalc(bright) : false;
  // gradientObj.thresholdCalc(bright);

}

//Save-image feature.
const saveBtn = document.getElementById('save-button');
saveBtn.addEventListener('click', ()=>{
  saveCanvas(canvas, 'ascii-image', 'jpg');
})



