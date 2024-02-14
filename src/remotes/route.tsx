import React, { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

export interface RouteMap {
    children?: RouteMap[] | null | undefined;
    path: string;
    child: ReactNode;
    errorElement?: ReactNode | null | undefined;
}

export class AppRoute {
    private routes: RouteMap[];

    constructor(routeMap: RouteMap[]) {
        this.routes = routeMap;
    }
    private loadAllRoutes(routes: RouteMap[]) {
        return (
            <Routes>
                {routes.map((route, i) => {
                    return this.mountRoute(route, i);
                })}
            </Routes>
        );
    }
    private loadChildren(children?: RouteMap[] | null) {
        const childs: ReactNode[] = [];
        while (children != null) {
            childs.push(children.map((e, i) => this.mountRoute(e, i)));
            break;
        }
        return childs;
    }

    private mountRoute(route: RouteMap, key: React.Key) {
        return (
            <Route path={route.path} key={key} element={route.child} errorElement={route.errorElement}>
                {this.loadChildren(route.children)}
            </Route>
        );
    }

    public getRoutes(): ReactNode {
        return <>{this.loadAllRoutes(this.routes)}</>;
    }
}
