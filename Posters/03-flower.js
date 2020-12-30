const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const palettes = require("nice-color-palettes");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [3600, 5400], // 12x18
	suffix: "12x18",
};

const sketch = () => {
	// https://www.mathsisfun.com/numbers/nature-golden-ratio-fibonacci.html
	// https://github.com/mattdesl/canvas-sketch/blob/master/examples/canvas-dot-flower.js
	// https://livebook.manning.com/book/generative-art/chapter-4/20
	const generateSpiral = (phi, points, maxRadius, artboard, dots) => {
		const { context, width, height } = artboard;
		const { color, initRadius } = dots;

		for (let i = 1; i < points; i++) {
			if (Array.isArray(color)) {
				context.fillStyle = random.pick(color) + "55";
			} else {
				context.fillStyle = color;
			}

			// Pick our angle based on the golden ratio
			const theta = 2 * Math.PI * i * phi;

			// Get back a distance 0..1 based on current step
			const distance = Math.sqrt(i / points);

			// Scale this point to our max dimensions
			// r represents the radius of the unit circle.
			// Try incrementing r differently.
			const r = distance * maxRadius;

			const cx = width / 2 + Math.cos(theta) * r;
			const cy = height / 2 + Math.sin(theta) * r;

			// Make the circles smaller when closer to center.
			// Also, don't go below 0.25 distance to prevent points that are too small.
			const radius = initRadius * (distance > 0.25 ? distance : 0.25);

			context.beginPath();
			context.arc(cx, cy, radius, 0, 2 * Math.PI, true);
			context.fill();
		}
	};

	return ({ context, width, height }) => {
		// Set the canvas to white because otherwise we'll get a
		// transparent background.
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		const colors = [
			"#7400b8",
			"#6930c3",
			"#5e60ce",
			"#5390d9",
			"#4ea8de",
			"#48bfe3",
			"#56cfe1",
			"#64dfdf",
			"#72efdd",
			"#80ffdb",
		];

		let initRadius = 15;
		colors.reverse().forEach((color) => {
			generateSpiral(
				1.61803398875,
				300,
				width * 0.4,
				{
					context,
					width,
					height,
				},
				{
					color,
					initRadius,
				}
			);

			initRadius += 2;

			context.translate(width / 2, height / 2);
			context.rotate(0.028);
			context.translate(-width / 2, -height / 2);
		});
	};
};

canvasSketch(sketch, settings);
