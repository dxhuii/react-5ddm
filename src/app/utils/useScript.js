import { useEffect, useState } from 'react'

// Hook
export default function useScript(src) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  })

  useEffect(
    () => {
      // Create script
      let script = document.createElement('script'),
        scriptDom = document.getElementsByTagName('script')
      script.src = src
      script.async = true

      for (let i = 0; i < scriptDom.length; i++) {
        const url = /http:|https:/.test(src) ? src : window.location.protocol + src
        if (scriptDom[i].src === url) {
          scriptDom[i].parentNode.removeChild(scriptDom[i])
        }
      }

      // Script event listener callbacks for load and error
      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false
        })
      }

      script.addEventListener('load', onScriptLoad)

      // Add script to document body
      document.body.appendChild(script)

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener('load', onScriptLoad)
      }
    },
    [src] // Only re-run effect if script src changes
  )

  return [state.loaded, state.error]
}
