import '@/assets/index.css'
import { Application, Assets, Sprite } from 'pixi.js'

const app = new Application()
await app.init({ width: 800, height: 600 })
document.body.appendChild(app.canvas)

const url = new URL('@/assets/images/vite.svg', import.meta.url)
const texture = await Assets.load(url.href)
const logo = new Sprite(texture)
logo.x = app.renderer.width / 2
logo.y = app.renderer.height / 2
logo.anchor.x = .5
logo.anchor.y = .5
app.stage.addChild(logo)
