import jimp from 'jimp'
import sharp from 'sharp'

(async function () {
  const bmp = './src/assets/sprite/sys/freeze_s.bmp'
  const png = bmp.replace(/bmp$/, 'png')
  const webp = bmp.replace(/bmp$/, 'webp')

  const result = await jimp.read(bmp)
  await result.write(png)
  // const base64 = await result.getBase64Async(jimp.MIME_PNG)
  await new Promise((resolve) => setTimeout(() => resolve(), 800))
  await sharp(png).webp().toFile(webp)
}())
