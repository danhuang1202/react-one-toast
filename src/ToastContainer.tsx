import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { Transition } from 'react-transition-group'
import classNames from 'classnames'
import useRaf from '@dh-react-hooks/use-raf'
// @ts-ignore
import style from './ToastContainer.css'

type Timeout = {
  /** traisition duration in milliseconds for showing taost */
  duration: number
  /** timeout in milliseconds to hidding taost */
  appear: number
}

type Props = {
  /** Container height */
  height: number
  /** Custom class name */
  className?: string
  /** ReactNode of Toast content */
  content: ReactNode
  /** traisition timeout in milliseconds for taost container */
  timeout?: Timeout
  /** traisition duration in milliseconds for replace taost content */
  replaceDuration?: number
}

export const ToastContainer = ({
  height,
  className,
  content,
  timeout: { duration = 500, appear = 2000 } = {},
  replaceDuration = 200
}) => {
  const [enable, setEnable] = useState(false)
  const timeoutId = useRef(null)
  const previousContent = useRef(null)
  const previousEl = useRef(null)
  const currentEl = useRef(null)
  const { isActive, start: replaceToast } = useRaf({
    disable: true,
    duration: replaceDuration,
    callback: elapsedTime => {
      const percentage = elapsedTime / replaceDuration

      if (previousEl.current) {
        previousEl.current.style.opacity = 1 - percentage
      }
      if (currentEl.current) {
        currentEl.current.style.top = `${(1 - percentage) * height}px`
      }
    }
  })

  useEffect(() => {
    if (content) {
      setEnable(true)

      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }

      timeoutId.current = setTimeout(() => {
        setEnable(false)
      }, appear)
    }

    previousContent.current = content
  }, [content, appear])

  const hasAnotherToastComming =
    previousContent.current && previousContent.current !== content
  if (hasAnotherToastComming && !isActive) {
    replaceToast()
  }

  return (
    <Transition
      in={enable}
      timeout={{
        appear,
        enter: duration,
        exit: duration
      }}
    >
      {transitionState => (
        <div
          style={{
            height: `${height}px`,
            transitionDuration: `${duration}ms`
          }}
          className={classNames(style.container, className, transitionState)}
        >
          {hasAnotherToastComming ? (
            <>
              <div ref={previousEl} className={'previous-content'}>
                {previousContent.current}
              </div>
              <div
                ref={currentEl}
                style={{
                  top: height
                }}
                className={'current-content'}
              >
                {content}
              </div>
            </>
          ) : (
            content
          )}
        </div>
      )}
    </Transition>
  )
}

export default ToastContainer
