import '@/assets/index.css'
import { Application, Assets, Sprite, Texture, AnimatedSprite } from 'pixi.js'
import { framesTemplate } from '@/utils/index.js'

const app = new Application()
await app.init({ width: 460, height: 300 })
document.body.appendChild(app.canvas)

const url = new URL('@/assets/images/vite.svg', import.meta.url)
const texture = await Assets.load(url.href)
const logo = new Sprite(texture)
logo.x = app.renderer.width / 2
logo.y = app.renderer.height / 2
logo.anchor.x = .5
logo.anchor.y = .5
app.stage.addChild(logo)

await Assets.load(new URL('@/assets/freeze.json', import.meta.url).href)
const freezeList = []
// 80
for (let i = 0; i < 170; i++) {
  freezeList.push(Texture.from(`rollSequence${i.toString().padStart(4, '0')}.png`))
}
const freezeAnimate = new AnimatedSprite(freezeList)
freezeAnimate.animationSpeed = .1
freezeAnimate.x = 20
freezeAnimate.y = app.renderer.height / 2
freezeAnimate.play()
app.stage.addChild(freezeAnimate)

// framesTemplate()

