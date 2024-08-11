import '@/style/index.css'
import { Application } from 'pixi.js'

// app
export const app = new Application()
await app.init({ width: 460, height: 320, backgroundColor: 0xecedf1, antialias: false })
document.body.appendChild(app.canvas)

// ticker
app.ticker.add(delta => {
  // console.log('delta', delta)
  // player1.ticker()
})
