import React from "react";
import { Switch, Route, Link } from "@router";
export default function Demo() {
  return <h2>Demo</h2>;
}
function Home() {
  return <h3>Home</h3>;
}

function About() {
  return <h3>About</h3>;
}
export function DemoRouter() {
  return (
    <div>
      <header>
        <Link to="/home">Home</Link>&nbsp;|&nbsp; 
        <Link to="/about">About</Link>
      </header>
      <main>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
