const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

random.setSeed(random.getRandomSeed())

const settings = {
    dimensions: [2480, 3508],
    suffix: random.getSeed()
  // units: 'cm',
  // pixelsPerInch: 300
};

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 30

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)

        points.push([u, v])
      }
    }

    return points
  }

  const points = createGrid()
  const margin = 300

  return ({ context, width, height }) => {
    // Set the canvas to white because otherwise we'll get a 
    // transparent background.
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
  
    points.forEach(([u,v]) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.fillStyle = `black`
      context.beginPath()
      context.arc(x, y, (random.noise2D(u, v, 1, 1) * .5 + .5) * 20, 0, 2 * Math.PI, true)
      context.fill()
    })
  };
};

canvasSketch(sketch, settings);