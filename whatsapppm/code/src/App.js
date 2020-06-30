import React from "react";
import "./styles.css";
import * as data from "./data";
import List from "./list";
import { Container, Grid } from "@material-ui/core";

export default function App() {
  return (
    <div className="App">
      <Container xs={8}>
        <List name="Coordinator" persons={data.coord} />
        <List name="Executive member" persons={data.exec} />
        <List name="Volunteer" persons={data.vol} />
      </Container>
    </div>
  );
}
