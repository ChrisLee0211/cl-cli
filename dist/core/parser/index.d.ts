import { fileNode } from '../helpers/UtilsLib';
export declare class CoreParser {
    parseTree: {
        [key: string]: fileNode;
    }[];
    constructor();
    ruleSetter<C>(key: keyof C, fileNode: fileNode): void;
    getParseTree(): {
        [key: string]: fileNode;
    }[];
}
declare const _default: CoreParser;
export default _default;
