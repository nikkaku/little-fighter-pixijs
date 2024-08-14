import Player from '@/player.js'

export default class {
  #activeKeys
  #historyKeys

  constructor (app) {
    this.app = app
    this.#activeKeys = []
    this.#historyKeys = []
  }

  init = () => {
    window.addEventListener('keydown', (env) => this.action(env), false)
    window.addEventListener('keyup', (env) => this.action(env), false)
    // window.addEventListener('keypress', this.action.bind(keyboard.action), false)

    const player = new Player(this.app)
    player.init()
  
    // app.ticker.add(_delta => {
    this.app.ticker.add(() => {
      this.update()

      player.update({ obj: this.get })
      // player.add(env)
    })
  }

  action (env) {
    // player.add()
    if (env.type === 'keydown' && !this.#activeKeys.map(item => item.keyCode).includes(env.keyCode)) {
      this.#activeKeys.push({ keyCode: env.keyCode, type: env.type, timestamp: new Date().getTime() })
    } else if (env.type === 'keyup') {
      const target = this.#activeKeys.findIndex(cur => cur.keyCode === env.keyCode)
      this.#activeKeys.splice(target, 1)
      this.#historyKeys.push({ keyCode: env.keyCode, timestamp: new Date().getTime() })
    }
  }

  consume = () => {
    // if (Object.)
  //   this.#historyKeys.concat(arr)
  }

  update () {
    const now = new Date().getTime()  
    const target = structuredClone(this.#historyKeys)
      .filter(item => !(item.timestamp + 1000 <= now))
  
    this.#historyKeys.length = 0
    this.#historyKeys.push(...target)
  }

  get get () {
    return {
      active: this.#activeKeys,
      history: this.#historyKeys
    }
  }

  static format (arr = []) {
    return arr.flat().map(item => item.keyCode)
  }
}
