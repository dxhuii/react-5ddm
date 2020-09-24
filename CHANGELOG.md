## 2020.09.24 升级依赖包遇到的问题 整理

- `babel-plugin-react-css-modules` 不支持 `css-loader4.x` 用 `@dr.pogodin/babel-plugin-react-css-modules` 暂时代替一下
- `babel-plugin-react-css-modules` 这个不支持 `css-loader 4.x`版本
- 换成 `@dr.pogodin/babel-plugin-react-css-modules` 这个就支持了，这个是别人基于 `babel-plugin-react-css-modules` 升级了对 `css-loader 4.x` 支持
- `css-loader`从 3.x 升级到 4.x，服务端需要修改以下配置 `https://www.npmjs.com/package/css-loader#exportonlylocals`

```js
{
  loader: `css`,
  options: {
    modules: {
      localIdentName: config.CLASS_SCOPED_NAME
    }
    onlyLocals: true // 只映射，不打包CSS
  }
}

```

修改为

```js
{
  loader: `css`,
  options: {
    modules: {
      localIdentName: config.CLASS_SCOPED_NAME,
      exportOnlyLocals: true
    }
    // onlyLocals: true // 只映射，不打包CSS
  }
}

```

还有，默认不支持

```css
.list {
  &_box {
  }
}
```

这样的嵌套，需要修改配置 `https://www.npmjs.com/package/postcss-nested`

```js
;[
  '@dr.pogodin/react-css-modules',
  {
    exclude: 'node_modules',
    generateScopedName: config.CLASS_SCOPED_NAME,
    webpackHotModuleReloading: true,
    filetypes: {
      '.scss': {
        syntax: 'postcss-scss',
        plugins: ['postcss-nested']
      }
    }
  }
]
```

- 增加 `plugins: ['postcss-nested']` 这个插件就支持了。 `https://www.npmjs.com/package/@dr.pogodin/babel-plugin-react-css-modules#configurate-syntax-loaders`

- `postcss-nested` 这个现在是 5.0 版，最新的。必须 `@dr.pogodin/babel-plugin-react-css-modules` 他才支持 5.0 的版本，`babel-plugin-react-css-modules` 这个不支持。

- `postcss-nested5.0` 他需要 `postcss8.0.x` 以上才能用，然后 `postcss-scss3.0.1` 必须 `postcss8.0.9` 也就是最新版才支持，不然会报找不到类名。

- `helmet` 这个升级到 4.x 版本也会报错。

- 需要修改配置 `https://www.npmjs.com/package/helmet#how-it-works`

```js
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)
```

postcss 配置

```js
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('postcss-flexbugs-fixes'), require('autoprefixer')]
    }
  }
}
```

修改为，不需要 `require` 也是不影响功能

```js
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['postcss-flexbugs-fixes', 'autoprefixer']
    }
  }
}
```

到此所有依赖包更新完毕
