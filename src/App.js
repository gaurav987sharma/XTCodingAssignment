import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import "./styles.css";

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
    const Url = "https://api.spaceXdata.com/v3/launches?limit=50" + str;
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
    const center = { justifyContent: "center", alignItems: "center" };
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
        <Container fixed>
          <Typography gutterBottom variant="h4" component="h3">
            SpaceX Launch Programs
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
              >
                <Card className={"root"}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="h3">
                        Filters
                      </Typography>
                      <Typography align="center">Launch Year</Typography>
                      <Typography align="center">
                        --------------------------------------
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      {yearArr.map((item) => (
                        <Grid item xs={6} className="maxwidth100">
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            style={
                              this.state.year == item
                                ? { backgroundColor: "#155015" }
                                : { backgroundColor: "green" }
                            }
                            className={"button"}
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
                    <Typography align="center">Successful Launch</Typography>
                    <Typography align="center">
                      --------------------------------------
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item xs={6} className="maxwidth90">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          style={
                            this.state.launchStatus == "true"
                              ? { backgroundColor: "#155015" }
                              : { backgroundColor: "green" }
                          }
                          className={"margin"}
                          onClick={this.FilterHandler}
                          value="true"
                          name="launchStatus"
                        >
                          True
                        </Button>
                      </Grid>
                      <Grid item xs={6} style={{ maxWidth: "80px" }}>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          style={
                            this.state.launchStatus == "false"
                              ? { backgroundColor: "#155015" }
                              : { backgroundColor: "green" }
                          }
                          className={"margin"}
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
                      style={{ textDecorationLine: "underline" }}
                      align="center"
                    >
                      Successful Landing
                    </Typography>
                    <Typography align="center">
                      --------------------------------------
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item xs={6} className="maxwidth90">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          style={
                            this.state.landingSatus == "true"
                              ? { backgroundColor: "#155015" }
                              : { backgroundColor: "green" }
                          }
                          className={"margin"}
                          onClick={this.FilterHandler}
                          value="true"
                          name="landingSatus"
                        >
                          True
                        </Button>
                      </Grid>
                      <Grid item xs={6} className="maxwidth90">
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          style={
                            this.state.landingSatus == "false"
                              ? { backgroundColor: "#155015" }
                              : { backgroundColor: "green" }
                          }
                          className={"margin"}
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

            <Grid item lg={9} md={8} xs={12} sm={6}>
              {this.state.loader ? (
                <img
                  className="width100"
                  src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
                />
              ) : (
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={1}
                >
                  {data.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                      <Card className="rootCard">
                        <CardActionArea>
                          <img
                            className="media"
                            src={item.links.mission_patch_small}
                          />

                          <CardContent>
                            <Typography
                              gutterBottom
                              className="commaValue title"
                            >
                              {item.mission_name} #{item.flight_number}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className="commaValue"
                            >
                              <b>Mission Ids: </b>
                              <span>{item.mission_id.join(",")}</span>
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <b>Launch Year:</b> {item.launch_year}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <b>Successful Launch:</b>{" "}
                              {` ${item.launch_success.toString()}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <b>Successful Landing:</b>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default App;
