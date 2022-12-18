import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from "./NavBar";
import SideBar from './SideBar.js';
import { useState } from 'react';
import Background from './Background';
import { getPreds } from './GetData';
import { useEffect } from 'react';
import Content from './Content';


export default function Dashboard(props) {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState("")
    const [keywords, setKeywords] = useState(["AAPL","IBM"])
    const [selected,setSelected]  = useState(0)

    useEffect(() => {
        getPreds(keywords[selected], setData)
    }, [])

    const theme = useTheme();
    const fullScreenDrawer = useMediaQuery(theme.breakpoints.down('sm'));

    const changeOpen = () => {
        setOpen(!open)
    }



    return (
        <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
            {fullScreenDrawer ? <NavBar changeOpen={changeOpen} drawerOpen={open} isMobile={fullScreenDrawer} /> : null}

            <SideBar setSelected={setSelected} fullScreen={fullScreenDrawer} openDrawer={open} user={props.user} keywords={["AAPL","IBM"]} />
            {fullScreenDrawer ? null: <Background />}
            <Content data={data} selected={selected} fullScreenDrawer={fullScreenDrawer} user={props.user} keywords={["AAPL","IBM"]}/>
        </div>
    )
}