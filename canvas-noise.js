const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

// This contains the settings for the different drawings.
const artworks = [
  // Mountains and valleys
  {
    characters: ['▅', '▃', '►', '▔', '▂', '▬', '●'],
    freq: 1,
    amp: .7,
    scale: .04,
    count: 120,
    palette: random.pick(palettes),
    rotation: 4,
    coordinates: 'grid'
  },
  // Squiggly yet flat
  {
    characters: ['▅', '▃', '►', '▔', '▂', '▬', '●'],
    freq: 0,
    amp: 0,
    scale: .04,
    count: 120,
    palette: random.pick(palettes),
    rotation: 5,
    coordinates: 'random'
  }
]

random.setSeed(random.getRandomSeed())
console.log(random.getSeed())

const settings = {
  dimensions: [2480, 3508],
  suffix: random.getSeed()
};


const sketch = () => {
  const artwork = artworks[2]

  // Fetch the artwork settings.
  const {
    palette,
    count,
    freq,
    amp,
    scale,
    rotation,
    characters,
    coordinates
  } = artwork

  // Create the points that we'll be drawing along with their size and rotation.
  const createGrid = () => {
    const points = []

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        let u = count <= 1 ? 0.5 : x / (count - 1)
        let v = count <= 1 ? 0.5 : y / (count - 1)

        if (coordinates === 'random') {
          u = random.value()
          v = random.value()
        }

        const radius = random.noise2D(u, v, freq, amp) * .5 + .5

        points.push({
          fill: random.pick(palette),
          radius: Math.abs(radius) * scale,
          position: [u, v],
          rotation: random.noise2D(u, v) * rotation,
          character: random.pick(characters)
        })
      }
    }

    return points
  }

  const points = createGrid().filter(() => random.value() > .5)
  const margin = 300

  return ({ context, width, height }) => {
    // Set the canvas to white because otherwise we'll get a 
    // transparent background.
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    // Draw the points.
    points.forEach(data => {
      const {
        radius,
        position,
        fill,
        rotation,
        character
      } = data
      const [u, v] = position

      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.save()
      context.fillStyle = `${fill}E6`
      context.font = `${radius * width}px "Segoe UI"`

      context.translate(x, y)
      context.rotate(rotation)
      context.fillText(character, 0, 0)
      context.restore()
    })
  };
};

canvasSketch(sketch, settings);