# React + TS + Vite + RouterV6 + redux/toolkit

[模板创建CLI](https://github.com/racheljoin/templates.git)
```
npx fe-quick-start-template@latest gen
```


### 路由控制
1. [路由使用文档](https://reactrouter.com/en/6.21.1)
2. 集成鉴权功能
3. 404页面添加

### 数据mock使用
1. mock文件夹下添加文件，格式同mock/test.ts，
2. 代码处请求路径同test.ts中数组项url定义格式，如```fetch("/api/identity-count")```

### 代码格式化配置
1. eslint格式化ts、tsx
2. eslint添加stylelint插件格式化css、less文件

### changelog自动生成，并推送tag
1. 命令行选择版本号自增方式生成tag
2. 根据commit信息自动生成changelog
3. 命令行选择是否推送远程，触发tag钩子
```
yarn genTag
```

### 


### 基础模板信息 [react-ts](https://vitejs.dev/guide/)

#### ESLint配置扩展

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
