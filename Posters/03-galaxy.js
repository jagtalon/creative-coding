const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [3600, 5400], // 12x12
	suffix: "12x18",
};

const sketch = () => {
	/* Create a spiral.

		https://www.mathsisfun.com/numbers/nature-golden-ratio-fibonacci.html
	  https://github.com/mattdesl/canvas-sketch/blob/master/examples/canvas-dot-flower.js
		https://livebook.manning.com/book/generative-art/chapter-4/20
	*/
	const generateSpiral = (phi, points, maxRadius, artboard, dots) => {
		const { context, width, height } = artboard;
		const { color, initRadius } = dots;

		for (let i = 1; i < points; i++) {
			// Select the color for the dots.
			context.fillStyle = color;

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

			// Draw the circle.
			context.beginPath();
			context.arc(cx, cy, radius, 0, 2 * Math.PI, true);
			context.fill();
		}
	};

	// Generate the stars. We'll draw them later.
	const createGrid = () => {
		const points = [];
		const count = 50;

		for (let x = 0; x < count; x++) {
			for (let y = 0; y < count; y++) {
				let u = random.value();
				let v = random.value();

				points.push({
					radius: 5 * random.value(),
					position: [u, v],
				});
			}
		}

		return points;
	};

	return ({ context, width, height }) => {
		// Set the night sky.
		context.fillStyle = "#212529";
		context.fillRect(0, 0, width, height);

		// These are the colors for our galaxy. Just a bunch of greys.
		const colors = [
			"#f8f9fa",
			"#e9ecef",
			"#dee2e6",
			"#ced4da",
			"#adb5bd",
			"#6c757d",
			"#495057",
			"#343a40",
			"#212529",
		];

		let gridPoints = createGrid();

		// Draw the stars.
		gridPoints.forEach((g) => {
			const x = g.position[0] * width;
			const y = g.position[1] * height;

			context.fillStyle = "#dee2e6";
			context.beginPath();
			context.arc(x, y, g.radius, 0, 2 * Math.PI, true);
			context.fill();
		});

		// This is the initial radius of the spirals.
		// We'll progressively grow the radius from here.
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

			// Slightly rotate each spiral.
			context.translate(width / 2, height / 2);
			context.rotate(0.028);
			context.translate(-width / 2, -height / 2);
		});
	};
};

canvasSketch(sketch, settings);
