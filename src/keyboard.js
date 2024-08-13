export default class {
  #activeKeys
  #historyKeys

  constructor () {
    this.#activeKeys = []
    this.#historyKeys = []
  }

  init = () => {
  }

  action (env) {
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
