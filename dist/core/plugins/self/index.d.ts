import { Plugin } from "../../index";
/** 语言类型 */
declare type lang = "typescript" | "javascript";
/** 项目类型 */
declare type projectType = "component" | "admin" | "utils" | "server";
/** 框架类型 */
declare type frame = "vue" | "react";
/** 宿主类型 */
declare type env = "node" | "browser";
/** UI框架 */
declare type uiFrameForVue = "element" | "antd-vue" | "none";
declare type uiFrameForReact = "antd" | "none";
declare type ui = uiFrameForVue | uiFrameForReact | "none";
interface config {
    lang: lang;
    projectType: projectType;
    frame: frame;
    env: env;
    ui: ui;
}
export declare const basePlugin: Plugin<config>;
export declare const framePlugin: Plugin<config>;
export declare const uiPlugin: Plugin<config>;
export {};
