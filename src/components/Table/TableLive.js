import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import WatchLater from "@material-ui/icons/WatchLater";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import "assets/css/lol.css?v=1.9.0";
import axios from "axios";
import api from "../../api/api";
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

var interval;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default function CustomTable(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(-1);
  const [match, setMatch] = useState();
  const [diff, setDiff] = useState([0]);
  const [blue, setBlue] = useState([0]);
  const [red, setRed] = useState([0]);
  const [predict, setPredict] = useState(false);
  const getMatch = (index, gameId) => {
    async function fetchData() {
      setPredict(false);
      const result = await axios.get(
        `https:feed.lolesports.com/livestats/v1/window/${gameId}`
      );

      if (result.status === 200) {
        var time = result.data.frames[0].rfc460Timestamp;
        time = new Date(time);
        var now = new Date(Date.now());
        var secondsNow = now.getSeconds() - 26;
        now.setSeconds(secondsNow);
        var diff = millisToMinutesAndSeconds(now - time);
        //var diff = millisToMinutesAndSeconds(now - time);

        //  event.day = new Date(event.startTime).getDate();
        //  event.week = new Date(event.startTime).getDay();
        //  event.month = new Date(event.startTime).getMonth();

        var date = new Date(Date.now());

        date.setMilliseconds(0);
        var seconds = date.getSeconds() - 26;
        date.setSeconds(Math.round(seconds / 10) * 10);

        console.log(diff);
        var btotalXp = 0;
        var btotalCs = 0;
        var rtotalXp = 0;
        var rtotalCs = 0;
        const res = await axios.get(
          `https:feed.lolesports.com/livestats/v1/window/${gameId}?startingTime=${date.toISOString()}`
        );
        console.log(res);
        if (typeof res.data.frames === "undefined")
          window.location.reload(false);

        var blueTeam = result.data.gameMetadata.blueTeamMetadata.esportsTeamId;
        var redTeam = result.data.gameMetadata.redTeamMetadata.esportsTeamId;

        var aux = result.data.gameMetadata.blueTeamMetadata.participantMetadata[0].summonerName.split(
          " "
        )[0];

        const blue = await api.get(`/getTeams?hl=pt-BR&id=${blueTeam}`, {
          headers: {
            "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
          },
        });
        const red = await api.get(`/getTeams?hl=pt-BR&id=${redTeam}`, {
          headers: {
            "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
          },
        });

        if (typeof blue.data.data.teams !== "undefined") {
          if (blue.data.data.teams[0].code !== aux) {
            setBlue(red.data.data.teams[0]);
            setRed(blue.data.data.teams[0]);
          } else {
            setBlue(blue.data.data.teams[0]);
            setRed(red.data.data.teams[0]);
          }
        }
        if (typeof res.data.frames !== "undefined") {
          typeof res.data.frames[9] !== "undefined" &&
            res.data.frames[9].blueTeam.participants.map((participant) => {
              btotalXp = btotalXp + LvlToXp[participant.level];
              btotalCs = btotalCs + participant.creepScore;
            });
          typeof res.data.frames[9] !== "undefined" &&
            res.data.frames[9].redTeam.participants.map((participant) => {
              rtotalXp = rtotalXp + LvlToXp[participant.level];
              rtotalCs = rtotalCs + participant.creepScore;
            });

          if (typeof res.data.frames !== "undefined") {
            if (
              typeof res.data.frames[9] !== "undefined" &&
              res.data.frames[9].gameState === "finished"
            ) {
              var timeOver = res.data.frames[9].rfc460Timestamp;

              timeOver = new Date(timeOver);

              diff = millisToMinutesAndSeconds(timeOver - time);
            }
          } else window.location.reload(false);

          setDiff(diff);
          if (typeof res.data.frames[9] !== "undefined") {
            var match = {
              gold: res.data.frames[9].blueTeam.totalGold,
              kills: res.data.frames[9].blueTeam.totalKills,
              towers: res.data.frames[9].blueTeam.towers,
              inhibitors: res.data.frames[9].blueTeam.inhibitors,
              dragons: res.data.frames[9].blueTeam.dragons.length,
              barons: res.data.frames[9].blueTeam.barons,
              xp: btotalXp,
              cs: btotalCs,
              opp_gold: res.data.frames[9].redTeam.totalGold,
              opp_kills: res.data.frames[9].redTeam.totalKills,
              opp_towers: res.data.frames[9].redTeam.towers,
              opp_inhibitors: res.data.frames[9].redTeam.inhibitors,
              opp_dragons: res.data.frames[9].redTeam.dragons.length,
              opp_barons: res.data.frames[9].redTeam.barons,
              opp_xp: rtotalXp,
              opp_cs: rtotalCs,
            };
            setMatch(match);
          }
        } else window.location.reload(false);

        time.setMilliseconds(0);
        var minutes = time.getMinutes() + 15;
        time.setSeconds(0);
        time.setMinutes(minutes);

        const res15 = await axios.get(
          `https://feed.lolesports.com/livestats/v1/window/${
            res.data.esportsGameId
          }?startingTime=${time.toISOString()}`
        );

        var btotalXp = 0;
        var btotalCs = 0;
        var rtotalXp = 0;
        var rtotalCs = 0;

        if (typeof res15.data.frames !== "undefined") {
          res15.data.frames[0].blueTeam.participants.map((participant) => {
            btotalXp = btotalXp + LvlToXp[participant.level];
            btotalCs = btotalCs + participant.creepScore;
          });
          res15.data.frames[0].redTeam.participants.map((participant) => {
            rtotalXp = rtotalXp + LvlToXp[participant.level];
            rtotalCs = rtotalCs + participant.creepScore;
          });

          var match15 = {
            goldat15: res15.data.frames[0].blueTeam.totalGold,
            xpat15: btotalXp,
            csat15: btotalCs,
            opp_goldat15: res15.data.frames[0].redTeam.totalGold,
            opp_xpat15: rtotalXp,
            opp_csat15: rtotalCs,
            golddiffat15:
              res15.data.frames[0].blueTeam.totalGold -
              res15.data.frames[0].redTeam.totalGold,
            xpdiffat15: btotalXp - rtotalXp,
            csdiffat15: btotalCs - rtotalCs,
          };

          axios
            .post("http://127.0.0.1:5000/predict", [match15], {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              setPredict(res.data.prediction[0]);
            });
          console.log(match15);
        }
      } else {
        setMatch({
          gold: 0,
          kills: 0,
          towers: 0,
          inhibitors: 0,
          dragons: 0,
          barons: 0,
          xp: 0,
          cs: 0,
          opp_gold: 0,
          opp_kills: 0,
          opp_towers: 0,
          opp_inhibitors: 0,
          opp_dragons: 0,
          opp_barons: 0,
          opp_xp: 0,
          opp_cs: 0,
        });
        setDiff(0);
        setBlue(0);
        setRed(0);
        console.log(result.status, gameId);
      }
    }
    if (open !== -1) {
      setOpen(-1);
      clearInterval(interval);
    } else {
      setOpen(index);
      interval = window.setInterval(function () {
        fetchData();
      }, 1000);
    }
  };
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {typeof tableData !== "undefined" ? (
            tableData.map((cell, index) => (
              <>
                <TableRow
                  onClick={() => getMatch(index, cell.gameId)}
                  className={classes.tableBodyRow}
                  className={
                    (open === index && "selecteD") || "tableBodyRowHover"
                  }
                >
                  <div>
                    <TableCell className={classes.tableCellTime}>
                      <div class="EventTime">
                        <div class="time">
                          <span class="hour">
                            {("0" + new Date(cell.startTime).getHours()).slice(
                              -2
                            )}
                          </span>
                          <span class="minute">00</span>
                          <span class="approx">APROX.</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className={classes.tableCellTeams}>
                      <div className="divMatch">
                        <div className="divTeam">
                          <h1 className="teamName">
                            {cell.match.teams[0].name.length < 20
                              ? cell.match.teams[0].name
                              : cell.match.teams[0].code}
                          </h1>
                          <img
                            className="imgTeam"
                            src={cell.match.teams[0].image}
                            alt=""
                          />
                        </div>
                        <h1 className="vs">vs</h1>
                        <div className="divTeam2">
                          <img
                            className="imgTeam"
                            src={cell.match.teams[1].image}
                            alt=""
                          />
                          <h1 className="teamName">
                            {cell.match.teams[1].name.length < 20
                              ? cell.match.teams[1].name
                              : cell.match.teams[1].code}
                          </h1>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className={classes.tableCellLeague}>
                      <div class="league">
                        <div class="name">{cell.league.name.split(" ")[0]}</div>
                        <div class="strategy">
                          melhor de {cell.match.strategy.count}
                        </div>
                      </div>
                    </TableCell>
                  </div>
                  <Collapse in={open == index} timeout="auto" unmountOnExit>
                    <>
                      <main class="">
                        <main class="Watch">
                          <div class="center-pane">
                            <div class="lower">
                              <div class="overview-pane">
                                <div class="VodsGameSelector active-selection">
                                  <div class="games">
                                    <span class="label">PREDIÇÕES</span>
                                    <h3 class="game game1 selected watch-annotated">
                                      15
                                    </h3>
                                  </div>
                                </div>
                                <div class="VodsGameSelector active-selection tab title stats selected">
                                  <div class="type"></div>
                                  <div
                                    class="type"
                                    style={{ background: "#03719C" }}
                                  >
                                    BLUE
                                  </div>
                                  <div
                                    class="type"
                                    style={{ background: "#EE2737" }}
                                  >
                                    RED
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">VENCEDOR</div>
                                  <div
                                    className={
                                      predict ? "team1 predicted" : "team1"
                                    }
                                  >
                                    <img
                                      className="imgTeam"
                                      src={blue.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue.code}</h1>
                                  </div>
                                  <div
                                    className={
                                      predict === 0
                                        ? "team2 predicted"
                                        : "team2"
                                    }
                                  >
                                    <img
                                      className="imgTeam"
                                      src={red.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">TORRE</div>
                                  <div className="team1">
                                    <img
                                      className="imgTeam"
                                      src={blue.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">BARÃO</div>
                                  <div className="team1">
                                    <img
                                      className="imgTeam"
                                      src={blue.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">DRAGÃO</div>
                                  <div className="team1">
                                    <img
                                      className="imgTeam"
                                      src={blue.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red.code}</h1>
                                  </div>
                                </div>
                                <div className="prediction">
                                  <div className="result">OVER</div>
                                  <div className="team1 ">
                                    <img
                                      className="imgTeam"
                                      src={blue.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{blue.code}</h1>
                                  </div>
                                  <div className="team2">
                                    <img
                                      className="imgTeam"
                                      src={red.image}
                                      alt=""
                                    />
                                    <h1 className="teamName">{red.code}</h1>
                                  </div>
                                </div>
                              </div>
                              <div class="nav-details">
                                <div class="nav">
                                  <div class="StatsMatchup">
                                    <div class="VodsGameSelector active-selection tab title stats selected">
                                      <div class="games">
                                        <span
                                          class="label"
                                          style={{ color: "white" }}
                                        >
                                          ESTATISTICAS
                                        </span>
                                      </div>
                                    </div>
                                    <div class="VodsGameSelector active-selection tab title stats selected">
                                      <div class="games games2">
                                        <div class="matchNumber">
                                          <span class="label">PARTIDA</span>
                                          <h3 class="game game1 selected watch-annotated">
                                            {cell.count}
                                          </h3>
                                        </div>

                                        <div class="matchTime">
                                          <WatchLater
                                            style={{
                                              color: "#EE2737",
                                              height: "1.92857143rem",
                                              fontSize: "2.92857143rem",
                                              lineHeight: "1.92857143rem",
                                              marginRight: "16px",
                                              marginBottom: "0.1rem",
                                            }}
                                          />

                                          <div class="label">{diff}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="info">
                                      <div class="stats">
                                        <div class="StatsMatchupPerformance">
                                          <div class="player primary">
                                            <div class="stat kda">
                                              <div class="value">
                                                <span class="kills ">
                                                  {typeof match !== "undefined"
                                                    ? match.kills
                                                    : 0}
                                                </span>
                                              </div>
                                              <div class="title">Abates</div>
                                            </div>
                                            <div class="stat goldEarned">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.gold
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Ouro recebido
                                              </div>
                                            </div>
                                            <div class="stat minionKills">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.cs
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Tropas abatidas
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.xp
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                XP Recebido
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.barons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                barons realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsPlaced">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.dragons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                dragões realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.towers
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Torres destruídas
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.inhibitors
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Inibidores destruídos
                                              </div>
                                            </div>
                                          </div>
                                          <div class="player secondary">
                                            <div class="stat kda">
                                              <div class="value">
                                                <span class="kills ">
                                                  {typeof match !== "undefined"
                                                    ? match.opp_kills
                                                    : 0}
                                                </span>
                                              </div>
                                              <div class="title">Abates</div>
                                            </div>
                                            <div class="stat goldEarned">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_gold
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Ouro recebido
                                              </div>
                                            </div>
                                            <div class="stat minionKills">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_cs
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Tropas abatidas
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_xp
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                XP Recebido
                                              </div>
                                            </div>
                                            <div class="stat killParticipation">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_barons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                barons realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsPlaced">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_dragons
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                dragões realizados
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_towers
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Torres destruídas
                                              </div>
                                            </div>
                                            <div class="stat wardsDestroyed">
                                              <div class="value">
                                                {typeof match !== "undefined"
                                                  ? match.opp_inhibitors
                                                  : 0}
                                              </div>
                                              <div class="title">
                                                Inibidores destruídos
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </main>
                      </main>
                    </>
                  </Collapse>
                </TableRow>
              </>
            ))
          ) : (
            <div></div>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
