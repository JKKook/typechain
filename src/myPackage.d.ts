/**
 * declaration files
 */

interface Config {
    url: string;
}
declare module 'myPackage' {
    function increase(number: number): number;
    function decrease(number: number): number;
    function isURL(config: Config): boolean;
}
