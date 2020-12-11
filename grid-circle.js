const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

random.setSeed(random.getRandomSeed());

const settings = {
	dimensions: [3600, 5400],
	suffix: "12x18",
};

const sketch = () => {
	// Create a grid of points
	const createGrid = () => {
		const points = [];
		const count = 30;

		for (let x = 0; x < count; x++) {
			for (let y = 0; y < count; y++) {
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count <= 1 ? 0.5 : y / (count - 1);

				points.push([u, v]);
			}
		}

		return points;
	};

	// Compute the distance between two points
	const pointDistance = (circle, point) => {
		return Math.sqrt(
			Math.pow(point.x - circle.x, 2) + Math.pow(point.y - circle.y, 2)
		);
	};

	const points = createGrid();
	const margin = 300;

	return ({ context, width, height }) => {
		const circle = {
			x: width / 2,
			y: height / 2,
		};

		// Set the canvas to white because otherwise we'll get a
		// transparent background.
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		points.forEach(([u, v]) => {
			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, height - margin, v);

			const point = {
				x: x,
				y: y,
			};

			// See if a point is within a circle
			const distance = pointDistance(circle, point);
			let circleRadius = width / 2;
			let pointRadius = 30;

			context.fillStyle = `black`;
			context.beginPath();

			if (distance <= circleRadius) {
				pointRadius *= distance > 0 ? distance / circleRadius : 0.1;
			}

			context.arc(x, y, pointRadius, 0, 2 * Math.PI, true);
			context.fill();
		});
	};
};

canvasSketch(sketch, settings);
