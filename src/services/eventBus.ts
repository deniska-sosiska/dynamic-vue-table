import emitter from 'tiny-emitter/instance';
import { eventBusEmitNames } from '@/services/eventBusEmitNames';

export const EventBus = {
    $emit: (eventName: eventBusEmitNames, eventPayload: unknown) => emitter.emit(eventName, eventPayload),
    $on: <T = undefined>(eventName: eventBusEmitNames, callback: (payload: T extends undefined ? unknown : T) => unknown) => emitter.on(eventName, callback),
    $off: <T = undefined>(eventName: eventBusEmitNames, callback: (payload: T extends undefined ? unknown : T) => unknown) => emitter.off(eventName, callback),
};
