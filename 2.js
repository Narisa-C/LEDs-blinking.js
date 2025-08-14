const { Chip, Line } = require('node-libgpiod');
const ledPins = [23, 24, 25, 26];
const chip = new Chip(0);
const leds = ledPins.map(pin => new Line(chip, pin));

// Request output mode for all LEDs
leds.map(led => led.requestOutputMode());

// declare paramiters
let index = 0;
const delay = 300;

// Sequential blink using arrow function .. edited from the fisrt day to make the code look more clean! :) hehe
const runSequence = () => {
  leds.map((led, i) => led.setValue(i === index ? 1 : 0));
  index = (index + 1) % leds.length;
  setTimeout(runSequence, delay);
};

// Start blinking
runSequence();
// this part there is something 'unneccessary' wait to be fixed
process.on('SIGINT', () => {
        leds.forEach(led => {
         led.setValue(0)
         led.release();
        });
process.exit();
});
