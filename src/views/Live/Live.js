import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableLive from "components/Table/TableLive.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import axios from "axios";
import api from "../../api/api";

var Month = new Array();
Month[0] = "Janeiro";
Month[1] = "Fevereiro";
Month[2] = "Março";
Month[3] = "Abril";
Month[4] = "Maio";
Month[5] = "Junho";
Month[6] = "Juljo";
Month[7] = "Agosto";
Month[8] = "Setembro";
Month[9] = "Outro";
Month[10] = "Novembro";
Month[11] = "Dezembro";

var Week = new Array();
Week[0] = "Domingo";
Week[1] = "Segunda-Feira";
Week[2] = "Terça-Feira";
Week[3] = "Quarta-Feira";
Week[4] = "Quinta-Feira";
Week[5] = "Sexta-Feira";
Week[6] = "Sábado";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontFamily: "Poppins",
    fontWeight: "semi-bold",
    lineHight: "2.42857143",
    marginBottom: "3px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Live() {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);
  const [games, setGames] = useState([]);
  var gamesList = [];

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/getLive?hl=pt-BR", {
        headers: {
          "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      var data = res.data.data.schedule.events.filter((event) => {
        return event.type === "match";
      });
      console.log(data);
      setMatches(data);
      // setMatches([
      //   {
      //     id: "104372946602479086",
      //     startTime: "2020-08-13T10:00:00Z",
      //     time: new Date("2020-08-13T10:00:00Z").getHours(),
      //     state: "inProgress",
      //     type: "match",
      //     blockName: "Eliminatórias - Rodada 1",
      //     league: {
      //       id: "104366947889790212",
      //       slug: "pcs",
      //       name: "PCS",
      //       image:
      //         "http://static.lolesports.com/leagues/1592515942679_PCS-01-FullonDark.png",
      //       priority: 1000,
      //     },
      //     match: {
      //       id: "104372946602479086",
      //       teams: [
      //         {
      //           id: "104367082616536883",
      //           name: "Nova Esports",
      //           slug: "nova-esports",
      //           code: "NOV",
      //           image:
      //             "http://static.lolesports.com/teams/1592588738660_NovaEsportsNOV-01-FullonDark.png",
      //           result: { outcome: null, gameWins: 0 },
      //           record: { wins: 0, losses: 0 },
      //         },
      //         {
      //           id: "104367068120825486",
      //           name: "PSG.Talon Esports",
      //           slug: "psgtalon-esports",
      //           code: "PSG",
      //           image:
      //             "http://static.lolesports.com/teams/1592515076798_talon-esports.png",
      //           result: { outcome: null, gameWins: 0 },
      //           record: { wins: 0, losses: 0 },
      //         },
      //       ],
      //       strategy: { type: "bestOf", count: 3 },
      //     },
      //     count: 1,
      //     gameId: "104372946602479087",
      //   },
      // ]);

      data.map(async (event) => {
        const res2 = await api.get(`/getEventDetails?hl=pt-BR&id=${event.id}`, {
          headers: {
            "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
          },
        });
        gamesList = [...gamesList, res2.data.data.event.match.games];
        console.log(res2);
        if (gamesList.length == data.length) {
          gamesList.map((games, index) => {
            console.log(games);
            games = games.filter((game) => game.state === "inProgress");
            if (games.length > 0) {
              gamesList[index] = games;
              data[index].count = games[0].number;
              data[index].gameId = games[0].id;
              data[index].time = new Date(data[index].startTime).getHours();
            }
          });
        }

        console.log(gamesList);
      });
    }
    fetchData();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {console.log(matches)}

        <Card style={{ marginBottom: "75px" }}>
          <CardHeader color="danger">
            {console.log(matches)}

            <h2 className={classes.cardTitleWhite}>
              <RadioButtonChecked
                style={{
                  color: "#fff",
                  height: "1.92857143rem",
                  fontSize: "2.3125rem",
                  lineHeight: "1.92857143rem",
                  marginRight: "5px",
                }}
              />
              Ao Vivo
            </h2>
          </CardHeader>
          <CardBody>
            <TableLive tableHeaderColor="primary" tableData={matches} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
