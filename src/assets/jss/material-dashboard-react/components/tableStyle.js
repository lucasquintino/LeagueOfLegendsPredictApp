import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/material-dashboard-react.js";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor[0]
  },
  primaryTableHeader: {
    color: primaryColor[0]
  },
  dangerTableHeader: {
    color: dangerColor[0]
  },
  successTableHeader: {
    color: successColor[0]
  },
  infoTableHeader: {
    color: infoColor[0]
  },
  roseTableHeader: {
    color: roseColor[0]
  },
  grayTableHeader: {
    color: grayColor[0]
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontFamily: 'Poppins',
    "&, &$tableCell": {
      fontSize: "1em"
    }
  },
  tableCell: {
    ...defaultFont,
    height:'100px',
    fontFamily: 'Poppins',
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
  },
  tableCellTime: {
    ...defaultFont,
    height:'100px',
    fontFamily: 'Poppins',
    fontWeight:'semi-bold',
    lineHeight: "1.42857143rem",
    verticalAlign: "middle",
    color:'white',
    fontSize: "2.1125rem",
    minWidth:'8.5vw',
  },
  tableCellTeams: {
    ...defaultFont,
    height:'100px',
    fontFamily: 'Poppins',
    fontWeight:'semi-bold',
    lineHeight: "1.42857143",
    padding: "12px 8px",
    color:'white',
    verticalAlign: "middle",
    fontSize: "1.7125rem",
    width:'3000px'

  },
  tableCellLeague: {
    ...defaultFont,
    height:'100px',
    fontFamily: 'Poppins',
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "2.1125rem",
    minWidth:'7vw',

    color:'white',
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
  }
});

export default tableStyle;
