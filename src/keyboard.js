export const keys = []
const addKeys = []
const removeKeys = []

export const addKeysAction = (env) => {
  addKeys.push({ keyCode: env.keyCode, time: new Date().getTime() })
}

export const removeKeysAction = (arr = []) => {
  removeKeys.concat(arr)
}

export const updateKeysAction = () => {
  const now = new Date().getTime()
  const add = structuredClone(addKeys)
  const remove = removeKeys.map(item => item.index)
  addKeys.length = 0
  removeKeys.length = 0

  const target = structuredClone(keys)
    .filter(item => !(item.time + 3000 <= now || remove.includes(item.index)))
    .concat(add)
    .map((item, index) => { return { ...item, index } })

  keys.length = 0
  keys.push(...target)
}

export default () => {
  window.addEventListener('keydown', addKeysAction.bind(addKeysAction), false)
}