import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import BgImage from './Bg.png';
import { createUser, signInUser } from './firebaseConfig';
import stocks from './Stocks.jpg';

export default function CreateAccount() {
    const theme = useTheme();
    const mediumUp = useMediaQuery(theme.breakpoints.up('md'));

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [keyword, setKeyword] = useState("") // current keyword
    const [keywords, setKeywords] = useState([]) // all keywords
    const [dialog, setDialogVisible] = useState(false)

    const authenticateUser = () => {
        signInUser(username, password)
    }


    const createAccount = () => {
        createUser(username, password, keywords.join(" "))
    }

    const closeDialog = () => {
        setDialogVisible(false)
    }

    const editBio = () => {
        setDialogVisible(true)
    }

    const addKeyword = () => {
        setKeywords([...keywords, keyword])
    }

    const handleDelete = (keyword) => {
        setKeywords(keywords.filter((key) => key !== keyword))
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url(${stocks})`, width: "100vw", height: "100vh", backgroundSize: "cover" }}>
            <Box boxShadow={3} style={{ height: "450px", width: mediumUp ? "900px" : "80%", display: "flex", alignItems: "center", borderRadius: 10, position: "relative" }}>
                <img src={BgImage} style={{ opacity: 0.9, width: "100%", height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: mediumUp ? 0 : 10, borderBottomRightRadius: mediumUp ? 0 : 10, position: "absolute", zIndex: 0, background: "linear-gradient(90deg,rgba(255,255,255,0.6),rgba(255,255,255,0))" }} />

                {mediumUp ?
                    <div style={{ position: "absolute", zIndex: 5, width: "55%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", }} >
                        <div >
                            <Typography variant="h3" style={{ color: "white", textTransform: "uppercase", }}>
                                STOCKSTER
                            </Typography>
                            <Typography variant="subtitle" style={{ color: "white", textTransform: "none" }}>
                            An efficient, data-driven approach to monitoring the stock market.
                            </Typography>
                        </div>
                    </div> :
                    null
                }

                <div style={{ position: "absolute", zIndex: 5, right: 0, width: mediumUp ? "45%" : "100%", height: "80%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h4" style={{ paddingTop: "18px", color: "rgb(137,52,255)" }}>
                            Create Account
                        </Typography>
                        <div style={{ width: "60%", marginTop: "auto", marginBottom: "auto" }}>
                            <TextField onChange={(event) => { setUsername(event.target.value) }} label="Username" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                            <TextField onChange={(event) => { setPassword(event.target.value) }} label="Password" type="password" autoComplete="current-password" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 8, width: "100%" }} />

                            <Button size="small" onClick={editBio} disableRipple style={{ textTransform: "none", background: "linear-gradient(45deg, rgb(137,52,255), rgb(212,76,160))", marginTop: "18px" }} variant="contained">
                                Edit Portfolio
                            </Button>
                        </div>
                        <Button onClick={createAccount} variant="contained" style={{ marginTop: "auto", marginBottom: "18px", width: "70%", textTransform: "none", background: "linear-gradient(45deg, rgb(137,52,255), rgb(212,76,160))" }}>
                            Create Your Account
                        </Button>
                        <Typography variant="caption" style={{ paddingBottom: "18px" }}>
                            Already have an account? <a style={{ color: "rgb(212,76,160)" }} href="/login">Sign in now!</a>
                        </Typography>
                    </div>
                </div>

            </Box>
            <Dialog open={dialog} onClose={closeDialog}>
                <DialogTitle>
                    Portfolio
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the names of companies that you would like to track. This allows us to display information tailored specifically to your preferences.
                    </DialogContentText>
                    <Typography id="input-slider" style={{ paddingTop: "18px" }}>
                        Abbreviation of company (eg. for Apple, enter <em>AAPL</em>)
                    </Typography>
                    <div style={{ display: "flex", marginTop: 8, marginBottom: 8 }}>

                        <TextField onChange={(event) => { setKeyword(event.target.value) }} label="Abbreviation" variant="standard" size="small" style={{ borderRadius: 5 }} />
                        <Button onClick={addKeyword} style={{ textTransform: "none" }}>
                            Add Company
                        </Button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            keywords.map((data, index) =>


                                <ListItem key={index} style={{ flex: "1 0 21%" }}>
                                    <Chip
                                        label={data}
                                        avatar={<Avatar>{data.charAt(0)}</Avatar>}
                                        color="primary"
                                        onDelete={() => handleDelete(data)}
                                    />
                                </ListItem>
                            )

                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}