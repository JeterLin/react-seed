import React from 'react';
import { Route as RouterRoute, RouteProps as RouterRouteProps } from 'react-router-dom';
import qs from 'query-string';

type RouteProps = RouterRouteProps & {
    query?: Record<string, string>;
    name?: string;
};
function checkPath(path?: string): boolean {
    return typeof path === 'string' && path.indexOf('?') !== -1;
}
export function Route(props: RouteProps): JSX.Element {
    return <RouterRoute {...props} />;
}
