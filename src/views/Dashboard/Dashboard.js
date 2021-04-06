import React, { useEffect, useState } from "react";

import ChartistGraph from "react-chartist";

import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import api from "../../api/api";
import axios from "axios";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

var LvlToXp = new Array();
LvlToXp[1] = 0;
LvlToXp[2] = 280;
LvlToXp[3] = 660;
LvlToXp[4] = 1140;
LvlToXp[5] = 1720;
LvlToXp[6] = 2400;
LvlToXp[7] = 3180;
LvlToXp[8] = 4060;
LvlToXp[9] = 5040;
LvlToXp[10] = 6120;
LvlToXp[11] = 7300;
LvlToXp[12] = 8580;
LvlToXp[13] = 9960;
LvlToXp[14] = 11440;
LvlToXp[15] = 13020;
LvlToXp[16] = 14700;
LvlToXp[17] = 16480;
LvlToXp[18] = 18360;

export default function Dashboard() {
  const classes = useStyles();
  const [gamesLists, setGames] = useState([]);
  const [eventsList, setEvents] = useState([]);
  var games = [];
  var Games = [];
  var matches = [];
  var tour = [];
  var tourna = [];
  var tournaments = [];
  var events = [];
  var results = [];
  var test = [];
  var result;
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await api.get("/getTournamentsForLeague?hl=pt-BR", {
  //       headers: {
  //         "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  //       },
  //     });

  //     let promiseTour = res.data.data.leagues.map((tournament) => {
  //       tour = [...tour, tournament];
  //     });
  //     Promise.all(promiseTour)
  //       .then(function (resultsArray) {
  //         console.log(tour);
  //         console.log("ok1");
  //         let promiseTourna = tour.map((tournament) => {
  //           tourna = [...tourna, tournament.tournaments];
  //         });
  //         Promise.all(promiseTourna)
  //           .then(function (resultsArray) {
  //             console.log(tourna);
  //             console.log("ok2");
  //             let promiseTournaments = tourna.map((event) => {
  //               event.map((match) => {
  //                 tournaments = [...tournaments, match.id];
  //               });
  //             });
  //             Promise.all(promiseTournaments)
  //               .then(function (resultsArray) {
  //                 console.log(tournaments);
  //                 console.log("ok3");
  //                 let promiseEvents = tournaments.map(async (item) => {
  //                   const res2 = await api.get(
  //                     `/getCompletedEvents?hl=pt-BR&tournamentId=${item}`,
  //                     {
  //                       headers: {
  //                         "x-api-key":
  //                           "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  //                       },
  //                     }
  //                   );
  //                   events = [...events, res2.data.data.schedule.events];
  //                 });

  //                 Promise.all(promiseEvents)
  //                   .then(function (resultsArray) {
  //                     console.log(events);
  //                     console.log("events");

  //                     let promiseMatches = events.map((matchesList) => {
  //                       matchesList.map((match) => {
  //                         matches = [...matches, match.games];
  //                       });
  //                     });
  //                     Promise.all(promiseMatches)
  //                       .then(function (resultsArray) {
  //                         console.log(matches);
  //                         console.log("matches");
  //                         let promiseGames = matches.map((gamesList) => {
  //                           gamesList.map((game) => {
  //                             games = [...games, game.id];
  //                           });
  //                         });
  //                         Promise.all(promiseMatches)
  //                           .then(function (resultsArray) {
  //                             console.log(games);
  //                             console.log("games");
  //                             let promiseArr = games.map(async (game) => {
  //                               await axios
  //                                 .get(
  //                                   `https://feed.lolesports.com/livestats/v1/window/${game}`
  //                                 )
  //                                 .then(async (res2) => {
  //                                   if (
  //                                     typeof res2.data.frames !== "undefined"
  //                                   ) {
  //                                     var date = new Date(
  //                                       res2.data.frames[0].rfc460Timestamp
  //                                     );

  //                                     date.setMilliseconds(0);
  //                                     var minutes = date.getMinutes() + 15;
  //                                     date.setSeconds(0);
  //                                     date.setMinutes(minutes);
  //                                     // const res4 = await api.get(
  //                                     //   `/getEventDetails?hl=pt-BR&id=${res2.data.esportsMatchId}`,
  //                                     //   {
  //                                     //     headers: {
  //                                     //       "x-api-key":
  //                                     //         "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  //                                     //     },
  //                                     //   }
  //                                     // );
  //                                     var dateResult = new Date(
  //                                       res2.data.frames[0].rfc460Timestamp
  //                                     );

  //                                     dateResult.setMilliseconds(0);
  //                                     var minutes =
  //                                       dateResult.getMinutes() + 90;
  //                                     dateResult.setSeconds(0);
  //                                     dateResult.setMinutes(minutes);
  //                                     const res4 = await axios.get(
  //                                       `https://feed.lolesports.com/livestats/v1/window/${
  //                                         res2.data.esportsGameId
  //                                       }?startingTime=${dateResult.toISOString()}`
  //                                     );
  //                                     if (
  //                                       res4.data.frames[9].blueTeam.towers >
  //                                       res4.data.frames[9].redTeam.towers
  //                                     ) {
  //                                       result = 1;
  //                                     } else result = 0

  //                                     // results = [
  //                                     //   ...results,
  //                                     //   res4.data.data.event.match.teams[0]
  //                                     //     .result.gameWins,
  //                                     // ];

  //                                     const res3 = await axios.get(
  //                                       `https://feed.lolesports.com/livestats/v1/window/${
  //                                         res2.data.esportsGameId
  //                                       }?startingTime=${date.toISOString()}`
  //                                     );

  //                                     var btotalXp = 0;
  //                                     var btotalCs = 0;
  //                                     var rtotalXp = 0;
  //                                     var rtotalCs = 0;

  //                                     var bdragonO = 0;
  //                                     var bdragonC = 0;
  //                                     var bdragonF = 0;
  //                                     var bdragonM = 0;

  //                                     res3.data.frames[0].blueTeam.dragons.map(
  //                                       (dragon) => {
  //                                         if (dragon === "ocean") bdragonO = 1;
  //                                         if (dragon === "cloud") bdragonC = 1;
  //                                         if (dragon === "mountain")
  //                                           bdragonM = 1;
  //                                         if (dragon === "infernal") bdragonF = 1;
  //                                       }
  //                                     );
  //                                     var rdragonO = 0;
  //                                     var rdragonC = 0;
  //                                     var rdragonF = 0;
  //                                     var rdragonM = 0;

  //                                     res3.data.frames[0].redTeam.dragons.map(
  //                                       (dragon) => {
  //                                         if (dragon === "ocean") rdragonO = 1;
  //                                         if (dragon === "cloud") rdragonC = 1;
  //                                         if (dragon === "mountain") rdragonM = 1;
  //                                         if (dragon === "infernal") rdragonF = 1;
  //                                       }
  //                                     );

  //                                     res3.data.frames[0].blueTeam.participants.map(
  //                                       (participant) => {
  //                                         btotalXp =
  //                                           btotalXp + participant.level;
  //                                         btotalCs =
  //                                           btotalCs + participant.creepScore;
  //                                       }
  //                                     );
  //                                     res3.data.frames[0].redTeam.participants.map(
  //                                       (participant) => {
  //                                         rtotalXp =
  //                                           rtotalXp + participant.level;
  //                                         rtotalCs =
  //                                           rtotalCs + participant.creepScore;
  //                                       }
  //                                     );

  //                                     var match = {
  //                                       goldat15:
  //                                         res3.data.frames[0].blueTeam
  //                                           .totalGold,
  //                                       xpat15: btotalXp,
  //                                       csat15: btotalCs,
  //                                       towerat15:
  //                                         res3.data.frames[0].blueTeam.towers,
  //                                       bdragonOat15: bdragonO,
  //                                       bdragonCat15: bdragonC,
  //                                       bdragonMat15: bdragonM,
  //                                       bdragonFat15: bdragonF,
  //                                       opp_goldat15:
  //                                         res3.data.frames[0].redTeam.totalGold,
  //                                       opp_xpat15: rtotalXp,
  //                                       opp_csat15: rtotalCs,
  //                                       opp_towerat15:
  //                                         res3.data.frames[0].redTeam.towers,
  //                                       rdragonOat15: rdragonO,
  //                                       rdragonCat15: rdragonC,
  //                                       rdragonMat15: rdragonM,
  //                                       rdragonFat15: rdragonF,
  //                                       result: res4.data.frames[9].blueTeam.towers - res4.data.frames[9].redTeam.towers,
  //                                       // golddiffat15:
  //                                       //   res3.data.frames[0].blueTeam
  //                                       //     .totalGold -
  //                                       //   res3.data.frames[0].redTeam.totalGold,
  //                                       // xpdiffat15: btotalXp - rtotalXp,
  //                                       // csdiffat15: btotalCs - rtotalCs,
  //                                     };

  //                                     console.log(res3.data);
  //                                     console.log(res4.data);
  //                                     console.log(res4.data.frames[9].blueTeam.towers - res4.data.frames[9].redTeam.towers);
  //                                     console.log(match);
  //                                     Games = [...Games, match];
  //                                     console.log(Games);
  //                                   }
  //                                 });
  //                             });

  //                             Promise.all(promiseArr)
  //                               .then(function (resultsArray) {
  //                                 console.log(Games);
  //                                 // games = games.filter((game) => {
  //                                 //   return typeof game !== "undefined";
  //                                 // });
  //                                 // console.log(games);
  //                                 // axios
  //                                 //   .post(
  //                                 //     "http://127.0.0.1:5000/predict",
  //                                 //     games,
  //                                 //     {
  //                                 //       headers: {
  //                                 //         "Access-Control-Allow-Origin": "*",
  //                                 //         "Content-Type": "application/json",
  //                                 //       },
  //                                 //     }
  //                                 //   )
  //                                 //   .then((res) => {
  //                                 //     console.log(res.data.prediction);
  //                                 //     console.log(results);
  //                                 //     var count = 0;
  //                                 //     for (var i = 0; i < results.length; i++) {
  //                                 //       if (
  //                                 //         results[i] === 1 &&
  //                                 //         res.data.prediction[i] === 1
  //                                 //       )
  //                                 //         count = count + 1;
  //                                 //     }
  //                                 //     results = results.filter((x) => x === 1);
  //                                 //     console.log(count / results.length);
  //                                 //   });

  //                                 // setGames(games);
  //                               })
  //                               .catch(function (err) {});
  //                           })
  //                           .catch(function (err) {});
  //                       })
  //                       .catch(function (err) {});
  //                   })
  //                   .catch(function (err) {});
  //               })
  //               .catch(function (err) {});
  //           })
  //           .catch(function (err) {});
  //       })
  //       .catch(function (err) {});
  //   }


  //   fetchData();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/getCompletedEvents?hl=pt-BR", {
        headers: {
          "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      var data = res.data.data.schedule.events;
      data = data.filter((game) => {
        return game.match.strategy.count === 1;
      });
      data.map((match) => {
        match.games.map((game) => {
          matches = [...matches, game.id];
        });
      });


      let promiseArr = matches.map(async (game) => {

        await axios
          .get(`https://feed.lolesports.com/livestats/v1/window/${game}`)
          .then(async (res2) => {

            if (typeof res2.data.frames !== "undefined") {
              var date = new Date(res2.data.frames[0].rfc460Timestamp);

              date.setMilliseconds(0);
              var minutes = date.getMinutes() + 15;
              date.setSeconds(0);
              date.setMinutes(minutes);
              var res4 = await api.get(`/getEventDetails?hl=pt-BR&id=${res2.data.esportsMatchId}`, {
                headers: {
                  "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
                },
              });

              

              const res3 = await axios.get(
                `https://feed.lolesports.com/livestats/v1/window/${
                  res2.data.esportsGameId
                }?startingTime=${date.toISOString()}`
              );
              console.log(res3)
              var btotalXp = 0;
              var btotalCs = 0;
              var rtotalXp = 0;
              var rtotalCs = 0;
              res3.data.frames[0].blueTeam.participants.map((participant) => {
                // btotalXp = btotalXp + LvlToXp[participant.level];
                btotalXp = btotalXp + participant.level;
                btotalCs = btotalCs + participant.creepScore;
              });
              res3.data.frames[0].redTeam.participants.map((participant) => {
                // rtotalXp = rtotalXp + LvlToXp[participant.level];
                rtotalXp = rtotalXp + participant.level;
                rtotalCs = rtotalCs + participant.creepScore;
              });
              var bDragons = res3.data.frames[0].blueTeam.dragons.length
              var rDragons = res3.data.frames[0].redTeam.dragons.length
              var bGold = res3.data.frames[0].blueTeam.totalGold 
              var rGold = res3.data.frames[0].redTeam.totalGold
              var bTowers = res3.data.frames[0].blueTeam.towers 
              var rTowers = res3.data.frames[0].redTeam.towers
               var match = {
                 goldat15: res3.data.frames[0].blueTeam.totalGold,
                 xpat15: btotalXp,
                 csat15: btotalCs,
                 opp_goldat15: res3.data.frames[0].redTeam.totalGold,
                 opp_xpat15: rtotalXp,
                 opp_csat15: rtotalCs,
                 golddiffat15:
                   res3.data.frames[0].blueTeam.totalGold -
                   res3.data.frames[0].redTeam.totalGold,
                 xpdiffat15: btotalXp - rtotalXp,
                 csdiffat15: btotalCs - rtotalCs,
               };
              results = [...results,res4.data.data.event.match.teams[0].result.gameWins]
              // var result
              // if ((bTowers - rTowers) > 0 ){
              //   result = 1
              // } else result = 0

              // results = [...results,result]
              

              // console.log('res3')
              // var match = {
              //     goldDiff: bGold - rGold ,
              //     xpDiff: btotalXp - rtotalXp,
              //     towerDiff: bTowers - rTowers,
              //     dragonDiff: bDragons - rDragons
              // };
              console.log(match)
              games = [...games, match];
            }
           

          });
      });

      Promise.all(promiseArr)
        .then(function (resultsArray) {
          games = games.filter((game) => {
            return typeof game !== "undefined";
          });
          console.log(games);
          axios
            .post("http://127.0.0.1:5000/predict", games, {
              headers: {
                'Access-Control-Allow-Origin': "*",
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              console.log(res.data.prediction)
              console.log(results)
              var count = 0
              for (var i = 0; i < results.length; i++){
                if (results[i] === 1 && res.data.prediction[i] === 1)
                  count = count + 1
              }
              results = results.filter(x => x === 1)
              console.log(count / results.length)
            });

          setGames(games);
        })
        .catch(function (err) {
          
        });
    }
    fetchData();
  }, []);

  return (
    <div>
      {console.log(gamesLists)}
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
