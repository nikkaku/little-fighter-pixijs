import '@/style/index.css'
import { Application } from 'pixi.js'
// import Character from '@/character.js'
import { Keyboard } from '@/player.js'
// import Message from '@/message.js'
// import Logo from '@/logo.js'

const app = new Application()
await app.init({ width: 460, height: 320, backgroundColor: 0xecedf1, antialias: false })
document.body.appendChild(app.canvas)

const init = async () => {
  const keyboard = new Keyboard()
  const handler = (env) => {
    keyboard.add(env.keyCode)
    console.log(keyboard.getKeyList)
  }

  window.addEventListener('keydown', handler.bind(handler), false)

  // const logo = new Logo()
  // await logo.init(app)
  
  // const msg = new Message()
  // await msg.init(app)

  // const player1 = new Character()
  // player1.init()

  app.ticker.add(delta => {
    keyboard.ticker()

    // console.log('delta', delta)
    // player1.ticker()
  })
}

init()
