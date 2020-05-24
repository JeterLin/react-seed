import { createBrowserHistory, History } from 'history';

let _history: History;

export function setupHistory(): History {
    _history = createBrowserHistory();
    return _history;
}

export function getHistory(): History {
    return _history;
}
