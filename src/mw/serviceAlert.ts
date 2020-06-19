import { success, error } from '@view/baseComponent';
import { Middleware, PayloadAction, Dispatch } from '@reduxjs/toolkit';

export const ALERT_SUCCESS = 'serv/success';
export const ALERT_ERROR = 'serv/error';

type IAction = PayloadAction<{ msg: string; title: string }>;
export const serviceAlert: Middleware = () => (nextDispatch: Dispatch<IAction>) => (action: IAction): IAction | undefined => {
    if (action.type === ALERT_SUCCESS) {
        const { msg, title } = action.payload;
        success({ title, content: msg });
    }
    if (action.type === ALERT_ERROR) {
        const { msg, title } = action.payload;
        error({ title, content: msg });
    }
    return nextDispatch(action);
};
