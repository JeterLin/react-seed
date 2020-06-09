/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreator, PayloadAction, Reducer, Action } from '@reduxjs/toolkit';
import { ITodoDetailState } from './types';
// define action types
const prefix = 'todoDetail/';
export const TODO_TITLE_CHANGE = `${prefix}title-change`;
export const TODO_DESCRIPTION_CHANGE = `${prefix}description-change`;
export const TODO_DATE_CHANGE = `${prefix}date-change`;

// define action creators
type ITitleChangeAction = PayloadAction<string>;
const matchTitleChange = (action: Action<any>): action is ITitleChangeAction => {
    return action.type === TODO_TITLE_CHANGE;
};
const todoTitleChange: ActionCreator<ITitleChangeAction> = (title = '') => {
    return { type: TODO_TITLE_CHANGE, payload: title };
};

type IDescriptionChangeAction = PayloadAction<string>;
const matchDescriptionChange = (action: Action<any>): action is IDescriptionChangeAction => {
    return action.type === TODO_DESCRIPTION_CHANGE;
};
const todoDescriptionChange: ActionCreator<IDescriptionChangeAction> = (description = '') => {
    return { type: TODO_DESCRIPTION_CHANGE, payload: description };
};

type IDatePayload = Partial<{ startDate: number; endDate: number }>;
type IDateChangeAction = PayloadAction<IDatePayload>;
const matchDateChange = (action: Action<any>): action is IDateChangeAction => action.type === TODO_DATE_CHANGE;
const todoDateChange: ActionCreator<IDateChangeAction> = (payload: IDatePayload = { startDate: 0, endDate: 0 }) => {
    return { type: TODO_DATE_CHANGE, payload };
};

// define reducers

// initial state for reducers
const initState: ITodoDetailState = {
    title: '',
    description: '',
    startDate: Date.now(),
    endDate: Date.now(),
};
// reducers
const todoDetail: Reducer<ITodoDetailState, Action<PayloadAction<any>>> = (state = initState, action) => {
    if (matchTitleChange(action)) {
        return { ...state, title: action.payload };
    }
    if (matchDescriptionChange(action)) {
        return { ...state, description: action.payload };
    }
    if (matchDateChange(action)) {
        const { startDate, endDate } = action.payload;
        if (startDate && !endDate) {
            return { ...state, startDate };
        }
        if (endDate && !startDate) {
            return { ...state, endDate };
        }
        if (startDate && endDate) return { ...state, startDate, endDate };
    }
    return state;
};

export { todoDetail as default };
export const actions = { todoTitleChange, todoDescriptionChange, todoDateChange };
export { ITodoDetailState };
