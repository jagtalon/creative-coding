const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
  // units: 'cm',
  // pixelsPerInch: 300
};

const sketch = () => {
  const palette = random.pick(palettes)

  const createGrid = () => {
    const points = []
    const count = 13

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = random.value()
        const v = random.value()

        points.push({
          fill: random.pick(palette),
          radius: Math.abs(random.gaussian() * .03),
          position: [u, v]
        })
      }
    }

    return points
  }

  const points = createGrid().filter(() => random.value() > .5)
  const margin = 300
  console.log(points)

  return ({ context, width, height }) => {
    // Set the canvas to white because otherwise we'll get a 
    // transparent background.
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
  
    points.forEach(data => {
      const {
        radius,
        position,
        fill
      } = data
      const [u, v] = position

      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.fillStyle = 'white'
      context.beginPath()
      context.arc(x, y, radius * width, 0, 2 * Math.PI, false)
      context.fillStyle = fill
      context.fill()
    })
  };
};

canvasSketch(sketch, settings);
