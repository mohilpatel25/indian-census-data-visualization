import React from "react";
import { FormGroup, FormControlLabel } from "@material-ui/core/";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setProperty } from "../store/slice.js";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    bottom: 20,
    left: 10,
    borderRadius: 5,
    padding: 15,
    background: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    zIndex: 1
  }
});

export default function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const map = {
    population: true,
    density: false,
    males: false,
    females: false,
    sexRatio: false,
    rural: false,
    urban: false
  };

  const [state, setState] = React.useState({
    population: true,
    density: false,
    males: false,
    females: false,
    sexRatio: false,
    rural: false,
    urban: false
  });

  const handleChange = (event) => {
    for (let key in map) map[key] = false;
    if (event.target.checked) {
      map[event.target.name] = true;
      setState(map);
      dispatch(setProperty(event.target.name));
    } else {
      map["population"] = true;
      setState(map);
      dispatch(setProperty("population"));
    }
  };

  return (
    <div className={classes.container}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.population}
              onChange={handleChange}
              name="population"
            />
          }
          label="Population"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.density}
              onChange={handleChange}
              name="density"
            />
          }
          label="Population Density"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.males}
              onChange={handleChange}
              name="males"
            />
          }
          label="No. of Males"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.females}
              onChange={handleChange}
              name="females"
            />
          }
          label="No. of Females"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.sexRatio}
              onChange={handleChange}
              name="sexRatio"
            />
          }
          label="Sex Ratio"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.urban}
              onChange={handleChange}
              name="urban"
            />
          }
          label="Urban Population"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.rural}
              onChange={handleChange}
              name="rural"
            />
          }
          label="Rural Population"
        />
      </FormGroup>
    </div>
  );
}
