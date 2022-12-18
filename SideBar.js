import HomeIcon from '@mui/icons-material/Home';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AvatarCard from './AvatarCard'
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import logo from './Logo.png';

import { useState } from 'react';
import { TrendingUp } from '@mui/icons-material';

export default function SideBar(props) {
    const [dialog, setDialog] = useState(false)
    const [selectedItem, setSelected] = useState(0)

    const setSelectedItem = (idx) => {
        setSelected(idx)
        props.setSelected(idx)
    }

    const drawerWidth = props.fullScreen ? "100vw" : 250

    const displayHelpDialog = () => {
        setDialog(!dialog)
    }
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            PaperProps={{
                sx: {
                    background: "linear-gradient(90deg, rgba(42,3,97,1) 0%, rgba(42,3,97,1) 20%, rgba(0,0,0,1) 100%)",
                    border: "none"
                }
            }}
            variant={props.fullScreen ? "temporary" : "permanent"}
            anchor="left"
            open={props.fullScreen ? props.openDrawer : true}

        >
            <List style={{ marginTop: 18 }}>

                <AvatarCard name={props.user.displayName} username={props.user.email} img={props.user.photoURL} style={{ paddingLeft: 18, paddingRight: 18 }} />
                <Divider style={{ marginTop: 36 }} />
                {props.keywords.map((keyword,idx) => {
                    return (
                        <ListItem key={keyword} disablePadding style={{ width: "90%", marginTop: 18, borderTopRightRadius: 30, borderBottomRightRadius: 30, background: selectedItem == idx ? "linear-gradient(90deg,rgb(204, 147, 182),rgb(212,76,160))" : "" }}>
                            <ListItemButton sx={{ "&:hover": { backgroundColor: "transparent", } }} disableRipple onClick={() => { setSelectedItem(idx) }} style={{ borderRadius: 5 }}>
                                <ListItemText primary={keyword} style={{ color: "white" }} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
                
            </List>
        </Drawer>
    )
}