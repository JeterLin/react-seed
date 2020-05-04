import React, { Suspense, lazy } from "react";
import { Switch, Route, Link } from "@router";
import reactDemoImg from "@assets/react-demo.jpg";

import ss from "./demo.css";
export default function Demo() {
  return <h2>Demo</h2>;
}

function LoadingThings(props) {
  return <h2>{props.children}</h2>;
}
// load the component after 2s
const lazyComponent = (p) => {
  if (p && typeof p.then === "function") {
    return p
      .then(({ default: c }) => {
        return new Promise((r, rj) => {
          setTimeout(() => {
            r({ default: c });
          }, 2e3);
        });
      })
      .catch((err) => "error with loading component");
  }
  throw "argument type with lazyComponent must be Promise";
};
const AsyncHome = lazy(() => lazyComponent(import("./Home")));
const AsyncAbout = lazy(() => lazyComponent(import("./About")));

export function DemoRouter() {
  return (
    <div className={ss.banner}>
      <header className={ss.bannerHeader}>
        <img src={reactDemoImg} />
        <nav>
          <Link to="/home">Home</Link>&nbsp;|&nbsp;
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/home">
            <Suspense
              fallback={<LoadingThings>Loading home ...</LoadingThings>}
            >
              <AsyncHome />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense
              fallback={<LoadingThings>Loading About ...</LoadingThings>}
            >
              <AsyncAbout />
            </Suspense>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
