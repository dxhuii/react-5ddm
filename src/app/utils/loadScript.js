// 动态加载JS
export const loadScript = ({ src, end, dom, callback }) => {
  if (!(typeof document === 'undefined')) {
    const script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0],
      body = document.getElementsByTagName('body')[0],
      scriptDom = document.getElementsByTagName('script')
    script.src = src
    script.async = 1
    for (let i = 0; i < scriptDom.length; i++) {
      const url = /http:|https:/.test(src) ? src : window.location.protocol + src
      if (scriptDom[i].src === url) {
        scriptDom[i].parentNode.removeChild(scriptDom[i])
      }
    }

    if (script.addEventListener) {
      script.addEventListener(
        'load',
        function() {
          callback && callback()
        },
        false
      )
    }

    if (dom) {
      dom.appendChild(script)
    } else {
      end ? body.appendChild(script) : head.appendChild(script)
    }
  }
}
