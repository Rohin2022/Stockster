import { Typography, AppBar, Tabs, Tab, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Chart from "./Chart";
import Summaries from './Summary'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            style={{ width: "100%", paddingTop: 54 }}
        >
            {value === index && (
                <Box style={{ display: "flex", alignItems: "center" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function getTime(props) {
    var today = new Date()
    var curHr = today.getHours()
    const name = props.user.displayName == null ? props.user.email.split("@")[0] : props.user.displayName

    if (curHr < 12) {
        return "Good Morning " + name
    } else if (curHr < 18) {
        return "Good Afternoon " + name
    }
    return "Good Evening " + name
}

export default function Content(props) {



    return (
        <div style={{ overflowX: "hidden", overflowY: "hidden", width: props.fullScreenDrawer ? "100vw" : 'calc(100vw - 250px)', height: "100vh", zIndex: 1000, right: 0, position: props.fullScreenDrawer ? "default" : "absolute" }}>
            <Toolbar />
            <div style={{ display: "flex", margin: 18, flexWrap: "wrap", paddingRight: "36px", paddingLeft: "36px" }}>
                <Typography variant="h5" style={{ flexGrow: 1, color: "rgb(212,76,160)", marginRight: "auto", width: "100%", textAlign: "left" }}>
                    {getTime(props)}
                </Typography>
                <TabPanel value={props.selected} index={0} >
                    <Chart style={{ width: "20%" }} data={props.data} />
                    <Summaries company={props.keywords[props.selected]}/>
                </TabPanel>
                <TabPanel value={props.selected} index={1} >
                    <Chart style={{ width: "20%" }} data={props.data} />
                    <Summaries />
                </TabPanel>
            </div>
        </div>
    )
}

// news summary
// graphs
// 