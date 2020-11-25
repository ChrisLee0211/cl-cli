/** 语言类型 */
type lang = 'typescript' | 'javascript'
/** 项目类型 */
type projectType = 'component' | 'admin' | 'utils' | 'server'
/** 框架类型 */
type frame = 'vue' | 'react' 
/** 宿主类型 */
type env = 'node' | 'browser'

interface config {
    /** 项目名称 */
    name: string;
    /** 代码类型 */
    codeType: lang;
    /** 项目类型 */
    projectType: projectType
    /** 宿主环境类型 */
    envType: env
    /** 框架类型 */
    frameType: frame | undefined
    /** 是否启用eslint */
    useEslint: boolean
    /** 是否预装axios */
    useAxios: boolean
}

interface contextCtr {
    /** 配置项 */
    config:config
    /** 配置项完成进度栈 */
    progressStack:Array<keyof config>
    /** 设置项目名 */
    setName(name:string):void
    /** 设置代码类型 */
    setCodeType(type:lang):void
    /** 设置项目类型 */
    setProjectType(type:projectType):void
    /** 设置是否使用eslint */
    setEslint(state:boolean):void
    /** 设置是否使用axios */
    setAxios(state:boolean):void
    setEnv(env:env):void
    setFrame(frame:frame):void
    /** 记录一个已完成的配置入栈 */
    pushToStack(key:keyof config):void
    /** 检查是否所有配置项加载完成 */
    isFinish():boolean
}