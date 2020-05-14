import { StoreType } from '@store';
let store: StoreType | null = null;

export function setStore(s: StoreType) {
    store = s;
}

export function getStore(): { dispatch: Function } {
    if (store && typeof store.dispatch === 'function') {
        return store;
    }
    return {
        dispatch: () => {},
    };
}
