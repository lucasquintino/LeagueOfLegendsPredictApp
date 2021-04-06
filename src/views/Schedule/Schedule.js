import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
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
    fontWeight: 'semi-bold',
    lineHight: '2.9857143',
    marginBottom: "3px",
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

export default function Schedule() {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/getSchedule?hl=pt-BR", {
        headers: {
          "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      var data = res.data.data.schedule.events.filter((event) => {
        return event.state === "unstarted";
      });
      data.map((event) => {
        event.time = new Date(event.startTime).getHours();
        event.day = new Date(event.startTime).getDate();
        event.week = new Date(event.startTime).getDay()
        event.month = new Date(event.startTime).getMonth()
      });
      Array.prototype.groupBy = function (k) {
        return this.reduce(
          (acc, item) => (
            (acc[item[k]] = [...(acc[item[k]] || []), item]), acc
          ),
          []
        );
      };
      data = data.groupBy("day");
      console.log(data);
      setMatches(data);
    }
    fetchData();
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {matches.map((item) => (
          <Card style={{marginBottom: '75px'}}>
            <CardHeader color="rose">
              {console.log(item)}
              <h1 className={classes.cardTitleWhite}>{Week[item[0].week]}</h1>
              <h3 className={classes.cardCategoryWhite}>
              {item[0].day} de {Month[item[0].month]}
              </h3>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableData={item.map((match) => [
                  match.time,
                  match.match.teams,
                  match.league.name,
                ])}
              />
            </CardBody>
          </Card>
        ))}
      </GridItem>
    </GridContainer>
  );
}
