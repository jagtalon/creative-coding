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
		const points = 1000;
		const maxRadius = width / 3;

		// The golden ratio
		const phi = 1.61803398875;

		// https://www.mathsisfun.com/numbers/nature-golden-ratio-fibonacci.html
		// https://github.com/mattdesl/canvas-sketch/blob/master/examples/canvas-dot-flower.js
		for (let i = 1; i < points; i++) {
			context.fillStyle = random.pick(palette);

			const t = i / points;

			// Pick our angle based on the golden ratio
			const theta = 2 * Math.PI * i * phi;

			// Get back a distance 0..1 based on current step
			const distance = Math.sqrt(t);

			// Scale this point to our max dimensions
			const r = distance * maxRadius;

			const cx = width / 2 + Math.cos(theta) * r;
			const cy = height / 2 + Math.sin(theta) * r;

			// Make the circles smaller when closer to center.
			const radius = 20 * distance;

			// context.font = `bold ${radius}px "Segoe UI"`;
			// context.fillText(theta, cx, cy);

			context.beginPath();
			context.arc(cx, cy, radius, 0, 2 * Math.PI, true);
			context.fill();
		}
	};
};

canvasSketch(sketch, settings);
