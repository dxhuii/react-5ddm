## 安装依赖

```bash
yarn add markdown-it react-markdown-editor-lite p-min-delay vditor
```

## 添加组件 src/app/components/Editer/index.js

```js
import React, { useEffect } from 'react'
import Vditor from 'vditor'

const e = React.createElement

export default function () {
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      height: 360,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after() {
        vditor.setValue('Hello, Vditor + React!')
      }
    })
  })

  return e('div', { id: 'vditor' })
}
```

## 页面引用

```js
// 生成异步加载组件
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
const Editer = loadable(() => pMinDelay(import('@/components/Editer'), 200), { ssr: false })
```

#### jsx 引用

```jsx
<Editer />
```

## hashids 使用

```bash
yarn add hashids
```

## 页面引用

```js
import Hashids from 'hashids'
const hashids = new Hashids('plain', 7)
const s1 = hashids.encode(33320)
const s2 = hashids.encode(33321)
const s3 = hashids.encode(33322)
const s4 = hashids.encode(33323)
const s5 = hashids.encode(33324)
console.log(hashids.decode('nyOwnDp'), s1, s2, s3, s4, s5)
```
