# Your ASCII Life

Convert your real-time webcam video stream into a grid of ASCII graphics based off of each pixel's brightness.

# Motivation

The idea behind Your ASCII Life was to explore some new ways to manipulate live video steams while keeping things like the character selection and brightness ceiling dynamic.

# Screenshots

![alt text](https://imgur.com/WPVkjP4.jpg)

# Tech Stack

- Javascript
- P5.js
- CSS

# Features

A big part of working on Your ASCII Life was the dynamic light threshold to ensure it's not reading an over or underexposed image. The way I achieved this is by first taking into account exponential light fall off, mapping how it picks the correct ASCII character to plot of:

![alt text](https://imgur.com/oZgh8Jc.jpg)

Ensuring a natural-looking contrast with the ASCII image.

The dynamic threshold works of this exponential curve, sampling every 10th pixel in the frame, averaging them and then adjusting the ceiling to that new average. This enables the users to move between differently lit environments while keeping a similar contrast across images.

The threshold in a well-lit environment:
![alt text](https://imgur.com/L48WnWa.png)

The threshold in a darker environment:
![alt text](https://imgur.com/oL0KLgH.png)

# License

MIT © Sam Peach
