import { useState } from 'react'

const useToast = () => {
  const [props, setProps] = useState({})
  const showToast = function(content = null, options = {}) {
    setProps({
      content,
      ...options
    })
  }

  return { showToast, props }
}

export default useToast
