export default {
  save: (name, data) => {
    const obj = {
      data,
      expire: new Date().getTime() + 1000 * 60 * 30
    }
    localStorage.setItem(name, JSON.stringify(obj))
  },
  load: name => {
    const storage = localStorage.getItem(name)
    const time = new Date().getTime()
    let result = null
    if (storage) {
      const obj = JSON.parse(storage)
      if (time < obj.expire) {
        result = obj.data
      } else {
        localStorage.removeItem(name)
      }
    }
    return result
  },
  remove: name => {
    localStorage.removeItem(name)
  }
}
