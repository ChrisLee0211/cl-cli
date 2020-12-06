import {Plugin} from '../../index';
import {prompt} from './command';

interface config {
    lang: lang,
    projectType: projectType,
    frame: frame,
    env: env,
    ui:ui
}

const selfPlugin:Plugin<config> = (register,utils) => {
    const {useCommand} = utils;
    register<config>('init', async (ctx) => {
        const lang = await useCommand<{'lang':lang}>(prompt['lang'],'lang');
    })
}