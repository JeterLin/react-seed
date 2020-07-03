import { AsyncThunkAction } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreatorsMapType = Record<string, (...args: any) => any>;
export type DefDispatchProps<ActionCreatorsMap extends ActionCreatorsMapType> = { [K in keyof ActionCreatorsMap]: ActionCreatorsMap[K] extends (...args: unknown[]) => AsyncThunkAction<unknown, unknown, Record<string, unknown>> ? (...args: Parameters<ActionCreatorsMap[K]>) => void : ActionCreatorsMap[K] };
