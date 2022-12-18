import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import { Typography } from '@mui/material'
import { logout } from './firebaseConfig'
export default function AvatarCard(props) {
    var img = `url(${props.imgUrl})`

    return props.name == null ?
        <ButtonBase onClick={logout}>
            <Card variant="outlined" style={{ backgroundColor: "rgb(0,0,0,0)", marginLeft: 18, marginRight: 18, marginTop: 10, height: 60, display: "flex", alignItems: "center" }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="" style={{ backgroundColor: "rgb(204, 147, 182)" }}>
                            {props.imgUrl == null ? props.username.charAt(0).toUpperCase() : <img src={img} />}
                        </Avatar>
                    }
                    title={<Typography style={{ color: "white" }}>{props.username.split("@")[0]}</Typography>}

                />
            </Card>
        </ButtonBase>
        :
        <ButtonBase onClick={logout}>
            <Card variant="outlined" style={{ backgroundColor: "rgb(0,0,0,0", marginLeft: 18, marginRight: 18, marginTop: 10, height: 60, display: "flex", alignItems: "center" }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="" style={{ backgroundColor: "rgb(204, 147, 182)" }}>
                            {props.imgUrl == null ? props.name.charAt(0).toUpperCase() : <img src={img} />}
                        </Avatar>
                    }
                    title={<Typography style={{ color: "rgb(212,76,160)" }}>props.name</Typography>}

                />
            </Card>
        </ButtonBase>

}