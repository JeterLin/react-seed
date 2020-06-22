import { Middleware, PayloadAction, Dispatch } from '@reduxjs/toolkit';
type IAction = PayloadAction<unknown>;
export const logger: Middleware = () => (nextDispatch: Dispatch<IAction>) => (action: IAction): IAction => {
    if (process.env.NODE_ENV === 'development' && action.type) {
        console.group(action.type);
        console.info('dispatching payload: ', action.payload);
        console.groupEnd()
    }
    return nextDispatch(action);
};
