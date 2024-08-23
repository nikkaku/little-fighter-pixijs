import jimp from 'jimp'

(async function () {
  const bmp = './src/assets/sprite/sys/freeze_0.bmp'
  const png = bmp.replace(/bmp$/, 'png')

  const result = await jimp.read(bmp)
  result.scan(0, 0, result.bitmap.width, result.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx]
    const g = this.bitmap.data[idx + 1]
    const b = this.bitmap.data[idx + 2]

    if (r === 0 && g === 0 && b === 0) this.bitmap.data[idx + 3] = 0
  })

  await result.writeAsync(png)
}())
