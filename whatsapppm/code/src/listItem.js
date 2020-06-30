import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

export default function(props) {
  const [value, setValue] = React.useState(
    localStorage.getItem(props.person.phone) ||
      `Hi ${props.person.name.split(/\s/)[0]}`
  );
  const change = e => {
    localStorage.setItem(props.person.phone, e.target.value);
    setValue(e.target.value);
  };
  const btnClick = e => {
    e.preventDefault();
    let phone = props.person.phone;
    const uri =
      "https://wa.me/91" + phone + "/?text=" + encodeURIComponent(value);
    console.log("opening", uri);
    window.open(uri);
  };
  return (
    <form>
      <Grid container xs={12}>
        <Grid item xs={4}>
          {props.person.name}
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            value={value}
            onChange={change}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" onClick={btnClick}>
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
