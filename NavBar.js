import { Button, Tooltip, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logout } from './firebaseConfig';
import websiteLogo from './Logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function NavBar(props) {
    return (<AppBar position="fixed" elevation={0} color="primary" >
        <Toolbar style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            {
                props.isMobile ? 
                <div>
                    <IconButton onClick={props.changeOpen}>
                        {props.drawerOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </div>
                : 
                <div></div>
            }
            <div style={{display:"flex",alignItems:"center"}}>
                <Typography variant="h6" style={{paddingRight:"18px"}}>
                    STOCKSTER
                </Typography>
                <Tooltip title="Sign out">
                    <Button onClick={logout} href="/login" style={{
                        borderRadius: 20,
                        padding: 0,
                        maxWidth: '50px',
                        maxHeight: '50px',
                        minWidth: '50px',
                        minHeight: '50px'
                    }}>
                        <img src={websiteLogo} style={{
                            width: 50
                        }} />
                    </Button>
                </Tooltip>
            </div>
        </Toolbar>
    </AppBar>);
}