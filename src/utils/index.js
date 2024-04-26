export function framesTemplate ({ rows = 10, cols = 17 } = {}) {
  const data = {
    row: 0,
    col: 0,
    count: 0,
    width: 79,
    height: 79,
  }

  let fileContext = ''
  fileContext += '{\n'
  fileContext += '  frames: {'
  for (let i = 0; i < cols; i ++) {
    for (let j = 0; j < rows; j ++) {
      fileContext += `
        "rollSequence${data.count.toString().padStart(4, '0')}.png": {
          "frame": {
            "x": ${(data.width + 1) * j},
            "y": ${(data.height + 1) * i},
            "w": ${data.width},
            "h": ${data.height}
          },
          "rotated": false,
          "trimmed": true,
          "spriteSourceSize": {
            "x": 0,
            "y": 0,
            "w": ${data.width},
            "h": ${data.height}
          },
          "sourceSize": {
            "w": 1390,
            "h": 800
          }
        },
  `
      data.count++
    }
}
  fileContext += '  },'
  fileContext += `
  "meta": {
    "image": "freeze.png",
    "size": {
      "w": 1390,
      "h": 800
    },
    "scale": 1
  }
`
  fileContext += '}'

  console.log(fileContext)
}