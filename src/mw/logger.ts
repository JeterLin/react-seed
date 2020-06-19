import { Middleware, PayloadAction, Dispatch } from '@reduxjs/toolkit';
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type IAction = PayloadAction<any>;
export const logger: Middleware = () => (nextDispatch: Dispatch<IAction>) => (action: IAction): IAction => {
    if (process.env.NODE_ENV === 'development' && action.type) {
        console.group(action.type);
        console.info('dispatching payload: ', action.payload);
        console.groupEnd()
    }
    return nextDispatch(action);
};
