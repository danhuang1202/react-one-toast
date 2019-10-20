# react-one-toast

Easily show notification from buttom to top with React.
The main differnet with other libraries is that only one `Toast` will displayed with multiple notifacations, the later notification will replace the previous one. 

## Installation
```
npm i react-one-toast
```

## Usage

Implement your toast component
```js
// Toast.js
import React from 'react'

function Toast({ message }){
  const { link, text } = action

  return (
    <div className={style.toast}>{message}</div>
  )
}
```

Show toast when button clicked 
```js
// App.js
import React from 'react'
import Toast from './Toast'
import {useToast, ToastContainer } from 'react-one-toast'
import from 'react-one-toast/css/style.css'

function App(){
  const {showToast, props} = useToast()

  return (
    <>
      <button
        onClick={()=>{showToast(<Toast message="success !"/>)}}
      >
        Add to wishlist
      </button>
      <ToastContainer {...props}/>
    </>
  )
}
```

## Modules
- ToastContainer
  
  React element for showing toast

  | props | type | required | default | description |
  | --- | --- | --- | --- | --- |
  | height | number | true | - | Height of `ToastContainer`  |
  | className	| string |	false | - | Custom class name of `ToastContainer` |
  | content	| ReactNode | true | - | ReactNode of Toast content |
  | timeout	| Timeout |	false | - | See type definetion bellow |
  | replaceDuration	| number | false | 200 | traisition duration in milliseconds for replace taost content |

  - Timeout

    | props | type | required | default | description |
    | --- | --- | --- | --- | --- |
    | duration | number | false | 500 | traisition duration in milliseconds for showing `ToastContainer`  |
    | appear	| number |	false | 2000 | timeout in milliseconds to hidding `ToastContainer` |
  
- useToast

  React hooks to generate props for `ToastContainer`

  | arguments | type | required | default | description |
  | --- | --- | --- | --- | --- |
  | content | ReactNode | true | - | toast content |
  | options	| object |	false | {} | other props exclude `content` for `ToastContainer` |