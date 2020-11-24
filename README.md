# cl-cli

todoList
1. 确认文件名是否重复，重复就提示是否覆盖（已完成）
2. 选择语言，（不选择版本，默认最新，因为脚手架生成后可以自己安装想要的版本）
3. 选择项目类型（组件、后台、原生工具）
 - 组件、后台（vue ｜ react）
 - 原生工具 （node | browser）
4. 选择配套工具(eslint\axios\)
5. 拉取基础模版
6. 内存中组合加工
7. 生成项目

实现要点：
- 使用一个class来保存配置上下文
- 每个步骤穿插进度条
- 在加工环节尽可能设计成插件形式，方便以后拓展