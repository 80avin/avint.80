import React from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ListItem from "./listItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
export default function(props) {
  const classes = useStyles();

  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {props.name + " : " + props.persons.length}
        </Paper>
        <hr />
      </Grid>
      <Grid item xs={12}>
        {props.persons.map((p, i) => (
          <Paper className={classes.paper}>
            <Grid container xs={12}>
              <Grid item xs={2}>
                {i + 1}
              </Grid>
              <Grid item xs={10}>
                <ListItem person={p} key={p.phone} />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </Grid>
  );
}
