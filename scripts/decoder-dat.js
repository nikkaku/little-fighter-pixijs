import fs from 'fs'

(async function () {
  const KEY_BYTES = ('SiuHungIsAGoodBearBecauseHeIsVeryGood').split('').map(item => item.charCodeAt(0))
  const KEEP_BYTE = 123  
  fs.readFile('./src/assets/data/freeze_ball.dat', null, async function (err, result) {
    /**
     * 感謝 s911415 的解析 dat 方案，基於此方法並稍加修改。
     * https://github.com/s911415/html5-lf2/blob/master/tools/Dat_Decoder.html
     */ 
    const buf = new Uint8Array(result.buffer, KEEP_BYTE)
      .map((item, index) => {
        const target = item - KEY_BYTES[(index + KEEP_BYTE) % KEY_BYTES.length]
        return target < 0 ? 10 : target
      })

    const blob = new Blob([buf], { type: 'text/plain' })
    const q = await new Response(blob).text()
    fs.writeFile('./src/assets/data/qq.txt', q, function () {})
  })
}())
