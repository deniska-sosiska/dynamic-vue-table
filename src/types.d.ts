declare module '*.png';
declare module '*.png?url';

declare module 'tiny-emitter/instance' {
    function on(...args: unknown[]): unknown;
    function off(...args: unknown[]): unknown;
    function emit(...args: unknown[]): unknown;
}
