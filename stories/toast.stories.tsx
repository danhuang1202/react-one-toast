import { storiesOf } from '@storybook/react'
import React from 'react'
import { useToast, ToastContainer } from '../src/index'
import { withInfo } from '@storybook/addon-info'
import { withKnobs, text, number, object } from '@storybook/addon-knobs'
// @ts-ignore
import style from './toast.stories.css'

const Toast = ({ message, action = {} }) => {
  const { link, text } = action

  return (
    <div className={style.toast}>
      <span>{message}</span>
      {link && text && (
        <a className={style.action} href={link}>
          {text}
        </a>
      )}
    </div>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withInfo({
      header: false,
      inline: true
    })
  )
  .add('ToastContainer', () =>
    React.createElement(() => {
      const { showToast, props } = useToast()

      return (
        <>
          <Button
            text="button1"
            onClick={() => {
              showToast(<Toast message="I'm toast 1!" />)
            }}
          />
          <Button
            text="button2"
            onClick={() => {
              showToast(<Toast message="I'm toast 2!" />)
            }}
          />
          <Button
            text="button3"
            onClick={() => {
              showToast(<Toast message="I'm toast 3!" />)
            }}
          />
          <Button
            text="button4"
            onClick={() => {
              showToast(<Toast message="I'm toast 4!" />)
            }}
          />
          <Button
            text="button5"
            onClick={() => {
              showToast(<Toast message="I'm toast 5!" />)
            }}
          />
          <ToastContainer
            className={text('className', style.container)}
            height={number('height', 52)}
            timeout={object('timeout', {
              duration: 500,
              appear: 2000
            })}
            replaceDuration={number('replaceDuration', 200)}
            {...props}
          />
        </>
      )
    })
  )
