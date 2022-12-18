import BgImage from './Bg.png'
import stocks from './Stocks.jpg'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { forgotPassword, signInUser } from './firebaseConfig';

export default function LandingPage() {
    const theme = useTheme();
    const mediumUp = useMediaQuery(theme.breakpoints.up('md'));

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [dialog, setDialogVisible] = useState(false)

    const authenticateUser = () => {
        signInUser(username, password)
    }

    const openDialog = () => {
        setDialogVisible(true)
    }

    const closeDialog = () => {
        setDialogVisible(false)
    }

    const sendResetLink = () => {
        forgotPassword(email)
        closeDialog()
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
                    <Typography variant="h4" style={{ paddingTop: "18px", color: "rgb(137,52,255)" }}>
                        Sign in
                    </Typography>
                    <div style={{ width: "60%", marginTop: "auto", marginBottom: "auto" }}>
                        <TextField InputLabelProps={{ style: { color: "rgb(137,52,255)" } }} InputProps={{ classes: { notchedOutline: { borderColor: "red" } } }} autoFocus onChange={(event) => { setUsername(event.target.value) }} label="Username" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                        <TextField InputLabelProps={{ style: { color: "rgb(137,52,255)" } }} onChange={(event) => { setPassword(event.target.value) }} label="Password" type="password" autoComplete="current-password" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 8, marginBottom: 18, width: "100%" }} />
                        <Typography variant="caption">
                            <Button size="small" disableRipple onClick={openDialog} style={{ textTransform: "none", backgroundColor: "rgba(0,0,0,0)" }}>
                                Forgot password?
                            </Button>
                        </Typography>
                    </div>
                    <Button onClick={authenticateUser} variant="contained" style={{ marginTop: "auto", marginBottom: "18px", width: "70%", textTransform: "none", background: "linear-gradient(45deg, rgb(137,52,255), rgb(212,76,160))" }}>
                        Login
                    </Button>
                    <Typography variant="caption" style={{ paddingBottom: "18px" }}>
                        Don't have an account? <a style={{ color: "rgb(212,76,160)" }} href="/newUser">Create one</a> today!
                    </Typography>
                </div>

            </Box>
            <Dialog open={dialog} onClose={closeDialog}>
                <DialogTitle>
                    Reset Password
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To recieve a reset link, please enter your email address here. We
                        will send an email which will provide instructions on how to reset your account
                    </DialogContentText>
                    <TextField autoFocus onChange={(event) => { setEmail(event.target.value) }} label="Email" variant="standard" size="small" style={{ borderRadius: 5, marginTop: 18, marginBottom: 8, width: "100%" }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button onClick={sendResetLink}>
                        Send Reset Link
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}