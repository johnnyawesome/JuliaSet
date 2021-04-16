/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

const canvasSize = 800;
const maxIterations = 50;

/*
While iterating over each pixel, we'll overwrite
"realNumberPart" and "imagNumberPart" - [The "z" in f(z) = z² + c ] every iteration.
But we have to add the original at the end of the formula f(z) = z² + c
[IMPORTANT] In contrast to the Mandelbrot Set, for the Julia set,
"real" and "imag" DO NOT change perPixel, but stay constant for the whole image!
Below Array holds nice-looking values for both values of the complex number "c": "real" and "imag".
*/

const beautifulValues = [
  { real: 0.3, imag: 0.6 },
  { real: 0, imag: 1 },
  { real: 0, imag: 0.5 },
  { real: 0, imag: 0.55 },
  { real: 0, imag: 0.645 },
  { real: 0, imag: 0.7 },
  { real: 0, imag: 0.75 },
  { real: 0, imag: 0.85 },
  { real: 0.285, imag: 0.01 },
  { real: -0.70176, imag: -0.3842 },
  { real: -0.835, imag: -0.2321 },
  { real: -0.8, imag: 1 },
  { real: -0.8, imag: 0.156 },
  { real: 0.37, imag: 0.1 },
  { real: -0.4, imag: -0.59 },
  { real: 0, imag: 1 }];

let index = 0;

function setup() {
  angleMode(DEGREES);
  createCanvas(canvasSize, canvasSize, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(1);
  drawJuliaSet(beautifulValues[index].real, beautifulValues[index].imag);
}

//Display the (colored) cells around the points
function drawJuliaSet(real, imag) {

  //Create an Image
  let finalImage = createImage(canvasSize, canvasSize);
  //Load all Pixels
  finalImage.loadPixels();

  for (let i = 0; i <= canvasSize; i++) {
    for (let j = 0; j <= canvasSize; j++) {

      //Map the entire canvas between -2 and 2
      //[The limits of the Mandelbrot-Set]
      let realNumberPart = map(j, 0, canvasSize, -1.6, 1.6);
      let imagNumberPart = map(i, 0, canvasSize, -1.6, 1.6);

      //Iterate maxIteration-Times over f(z) = z² + c
      let iteration = 0;
      while (iteration < maxIterations) {

        //Calculate new values (real and imaginary part) of c
        let realNumberPartNew = ((realNumberPart * realNumberPart) - (imagNumberPart * imagNumberPart)) + real;
        let imagNumberPartNew = (2 * realNumberPart * imagNumberPart) + imag;

        //Assigning the new values to "z" for the next iteration.
        //"c" is still unchanged!
        realNumberPart = realNumberPartNew;
        imagNumberPart = imagNumberPartNew;

        iteration++

        if (abs(realNumberPart + imagNumberPart) >= 2.5) {
          finalImage.set(j, i, color(0, map(iteration, 0, maxIterations, 25, 255), 0));
          break;
        }
        if (iteration === maxIterations) finalImage.set(j, i, color(0, 30, 80));
      }
    }
    //Update the image with the calculated pixels
    finalImage.updatePixels();
    //Display the image
    image(finalImage, 0, 0);
  }
}

function mouseClicked() {
  index++;
  index = index % beautifulValues.length;
  console.log(index)

  drawJuliaSet(beautifulValues[index].real, beautifulValues[index].imag);
}

function draw() {
}