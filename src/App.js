import React from "react";
import "./styles.css";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const style1 = {
  root: {
    maxWidth: 345,
    flexGrow: 1
  },
  media: {
    height: 140
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      year: "",
      launchStatus: "",
      landingSatus: "",
      loader: true
    };
  }

  FilterHandler = (e) => {
    console.log(e.target);
    var { name, value } = e.target;
    if (this.state[name] === value) {
      value = "";
    }
    this.setState(
      {
        [name]: value,
        loader: true
      },
      this.getRecordHandler
    );
  };
  getRecordHandler = () => {
    let obj = {
      launch_success: this.state.launchStatus,
      land_success: this.state.landingSatus,
      launch_year: this.state.year
    };
    console.log(obj);
    let finalObj = this.clean(obj);
    console.log("fincalobl=========>", finalObj);
    var str = "";
    for (let key in obj) {
      str += `&${key}=${obj[key]}`;
    }
    const Url = "https://api.spaceXdata.com/v3/launches?limit=100" + str;
    fetch(Url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({ data: data, loader: false }, console.log(data))
      );
  };
  clean = (obj) => {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ""
      ) {
        delete obj[propName];
      }
    }
    return obj;
  };
  componentDidMount() {
    const Url = "https://api.spaceXdata.com/v3/launches?limit=100";
    fetch(Url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({ data: data, loader: false }, console.log(data))
      );
  }
  componentDidUpdate() {}
  render() {
    const { classes } = this.props;
    const { data } = this.state;
    const yearArr = [
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020
    ];
    console.log(this.state);
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={2} sm={2}>
            <Grid container spacing={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="h3">
                      Filters
                    </Typography>
                    <Typography
                      gutterBottom
                      style={{ textDecorationLine: "underline" }}
                    >
                      Launch Year
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Grid container spacing={3}>
                    {yearArr.map((item) => (
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          style={
                            this.state.year == item
                              ? { backgroundColor: "#155015" }
                              : { backgroundColor: "green" }
                          }
                          className={classes.button}
                          onClick={this.FilterHandler}
                          name="year"
                          component="button"
                          value={item}
                        >
                          {item}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </CardActions>
                <CardContent>
                  <Typography
                    gutterBottom
                    style={{ textDecorationLine: "underline" }}
                  >
                    Successful Launch
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={
                          this.state.launchStatus == "true"
                            ? { backgroundColor: "#155015" }
                            : { backgroundColor: "green" }
                        }
                        className={classes.margin}
                        onClick={this.FilterHandler}
                        value="true"
                        name="launchStatus"
                      >
                        True
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={
                          this.state.launchStatus == "false"
                            ? { backgroundColor: "#155015" }
                            : { backgroundColor: "green" }
                        }
                        className={classes.margin}
                        onClick={this.FilterHandler}
                        value="false"
                        name="launchStatus"
                      >
                        False
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
                <CardContent>
                  <Typography
                    gutterBottom
                    style={{ textDecorationLine: "underline" }}
                  >
                    Successful Landing
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={
                          this.state.landingSatus == "true"
                            ? { backgroundColor: "#155015" }
                            : { backgroundColor: "green" }
                        }
                        className={classes.margin}
                        onClick={this.FilterHandler}
                        value="true"
                        name="landingSatus"
                      >
                        True
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={
                          this.state.landingSatus == "false"
                            ? { backgroundColor: "#155015" }
                            : { backgroundColor: "green" }
                        }
                        className={classes.margin}
                        onClick={this.FilterHandler}
                        value="false"
                        name="landingSatus"
                      >
                        False
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {this.state.loader ? (
            <img src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
          ) : (
            <Grid item xs={10} sm={10}>
              <Grid container spacing={3}>
                {data.map((item, index) => (
                  <Grid item key={index} xs={9} sm={3}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          style={{ maxWidth: "100%" }}
                          image={item.links.mission_patch_small}
                          title=""
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            style={{ fontWeight: "bold", color: "#17179e" }}
                          >
                            {item.mission_name} #{item.flight_number}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            <b>Mission Ids:</b>
                            <ul>
                              {item.mission_id.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                            <p>
                              <b>Launch date:</b> {item.launch_year}
                            </p>
                            <p>
                              <b>Successful Launch:</b>{" "}
                              {item.launch_success.toString()}
                            </p>
                            <p>
                              <b>Successful Landing:</b>{" "}
                              {item.launch_date_local}
                            </p>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

export default withStyles(style1)(App);
