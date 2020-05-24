import React from 'react';
import { Router as BrowserRouter } from 'react-router';
import {setupHistory} from './historyConfig';

const history = setupHistory();
interface IProps {
    children: JSX.Element[];
}

export function Router(props: IProps) {
    return <BrowserRouter history={history}>{props.children}</BrowserRouter>;
}
