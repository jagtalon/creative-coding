const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const palettes = require("nice-color-palettes");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [3600, 5400], // 12x18
	suffix: "12x18",
};

const sketch = () => {
	const margin = 300;

	return ({ context, width, height }) => {
		// Set the canvas to white because otherwise we'll get a
		// transparent background.
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		const palette = random.pick(palettes);
		const points = 2000;
		const maxRadius = width * 0.4;

		// The golden ratio
		// Try slightly different values to get other spirals.
		const phi = 1.61803398875;
		console.log(palette);

		// https://www.mathsisfun.com/numbers/nature-golden-ratio-fibonacci.html
		// https://github.com/mattdesl/canvas-sketch/blob/master/examples/canvas-dot-flower.js
		// https://livebook.manning.com/book/generative-art/chapter-4/20
		for (let i = 1; i < points; i++) {
			context.fillStyle = "black";

			const t = i / points;

			// Pick our angle based on the golden ratio
			const theta = 2 * Math.PI * i * phi;

			// Get back a distance 0..1 based on current step
			const distance = Math.sqrt(t);

			// Scale this point to our max dimensions
			// r represents the radius of the unit circle.
			// Try incrementing r differently.
			const r = distance * maxRadius;

			const cx = width / 2 + Math.cos(theta) * r;
			const cy = height / 2 + Math.sin(theta) * r;

			// Make the circles smaller when closer to center.
			// Also, don't go below 0.25 distance to prevent points that are too small.
			const radius = 20 * (distance > 0.25 ? distance : 0.25);

			context.beginPath();
			context.arc(cx, cy, radius, 0, 2 * Math.PI, true);
			context.fill();
		}
	};
};

canvasSketch(sketch, settings);
