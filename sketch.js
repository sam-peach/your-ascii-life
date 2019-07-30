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
  threshold: 150,
  brightArr: [],
  thresholdCalc(bright){
    if (!Number.isNaN(bright)) {
      this.brightArr.push(bright);
    }
    if (this.brightArr.length > 5000) {
      const num = this.brightArr.length;
      const result = (this.brightArr.reduce((a,b)=>a+b)/num)*1;
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
  video.size(width/vScale, height/vScale);
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

      index%10==0 ? gradientObj.thresholdCalc(bright) : false;


      asciiBright = Math.pow(bright, 2)/255
      //If the brightness of the pixel falls in a certain range, place a specifc ASCII character
      let asciiChar;
      if (asciiBright >= gradientObj.threshold) {
        asciiChar = char(35);
      } else if (asciiBright > (gradientObj.threshold/7) * 6)  {
        asciiChar = char(38);        
      } else if (asciiBright > (gradientObj.threshold/7) * 5) {
        asciiChar = char(62);                
      } else if (asciiBright > (gradientObj.threshold/7) * 4) {
        asciiChar = char(43);                
      } else if (asciiBright > (gradientObj.threshold/7) * 3) {
        asciiChar = char(47);                
      } else if (asciiBright > (gradientObj.threshold/7) * 1) {
        asciiChar = char(46);                
      } else {
        asciiChar = char(32)
      }

      text(asciiChar, x*vScale, y*vScale);
    }
  }
}

//Save-image feature.
const saveBtn = document.getElementById('save-button');
saveBtn.addEventListener('click', ()=>{
  saveCanvas(canvas, 'ascii-image', 'jpg');
})



