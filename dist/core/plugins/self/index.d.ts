import { Plugin } from '../../index';
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
