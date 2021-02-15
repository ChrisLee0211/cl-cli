module.exports = {

    parser:  "@typescript-eslint/parser", //定义ESLint的解析器
    plugins: ["@typescript-eslint"], //定义了该eslint文件所依赖的插件
    env:{                          //指定代码的运行环境
        browser: true,
        node: true,
        commonjs:true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "no-dupe-args":["error"],
        "use-isnan":["error"],
        "array-callback-return":["error"],
        "default-case":["error"],
        "no-unused-vars":[1],
        "no-undef":["error"],
        "block-spacing":["error"],
        "comma-spacing":["error"],
        "indent":[1, 4],
        "semi":[2, "always"],
        "quotes":[2, "double"],
        "no-duplicate-imports":["error"]
    }                            
};