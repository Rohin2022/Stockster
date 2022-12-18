import { ButtonBase, Card, CardHeader, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import List from '@mui/material/List'
import axios from "axios"
import { useEffect, useState } from 'react'
import Classify from "./SentimentClassification"

function getColor(sentiment) {
    if (sentiment === "positive") {
        return "green"
    }
    else if (sentiment === "negative") {
        return "red"
    }
    return "blue"
}

export default function Summaries(props) {
    const [articles, setArticles] = useState([])
    const [titles, setTitles] = useState([])
    const [urls, setUrls] = useState([])
    const [sentiments, setSentiments] = useState([])
    const [dialogOpen, setDialogOpen] = useState(-1)

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${props.company}&topics=technology&apikey=${Math.random()>0.33 ? Math.random()>0.33 ? "8653GXMTQMJEI3CN": "5LMPPLKCHZIFE7RR": "HZ8MT4IZHF3FGO2A"}`)
            .then((data) => {
                console.log(data)
                const feed = data.data["feed"].slice(0, 4)
                var summaries = []
                var titles = []
                var urls = []
                for (var key in feed) {
                    const article = feed[key]
                    summaries.push(article["summary"])
                    titles.push(article["title"])
                    urls.push(article["url"])
                }
                Classify(titles, setSentiments)
                setArticles(summaries)
                setTitles(titles)
                setUrls(urls)
            })
    }, [])
    return (
        <div style={{ width: "50%", paddingLeft: 18 }}>
            <List style={{ overflowY: "auto" }}>
                {titles.map((title, idx) => {
                    return (
                        <div key={idx} style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, overflow: "hidden", height: "50px", backdropFilter: "blur(10px)", marginBottom: 18 }}>
                            <ButtonBase onClick={() => setDialogOpen(idx)}>
                                <CardHeader style={{ borderRadius: 10 }} title={<Typography variant="subtitle1" style={{ color: "rgb(212,76,160)", display: "block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{title}</Typography>} />
                            </ButtonBase>
                        </div>
                    )
                })}
            </List>
            <Dialog open={dialogOpen != -1} onClose={() => setDialogOpen(-1)} PaperProps={{
                sx: {
                    width: "80vw",
                    height: "80vh",
                    background: "linear-gradient(90deg, rgba(42,3,97,1) 0%, rgba(42,3,97,1) 50%, rgba(0,0,0,1) 100%)"
                }
            }}>
                <DialogTitle style={{ color: "rgb(212,76,160)" }}>
                    {titles[dialogOpen]}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <a href={urls[dialogOpen]}>Follow this link for more information</a>

                        <Typography style={{ color: getColor(sentiments[dialogOpen]), paddingTop: 18 }}>{"Overall sentiment: " + sentiments[dialogOpen]}</Typography>
                        <Typography variant="h6" style={{paddingTop:18,color:"rgb(212,76,160)"}}>
                            Preview
                        </Typography>
                        <Typography variant="body1" style={{color:"rgb(204, 147, 182)"}}>{articles[dialogOpen]}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: "rgb(212,76,160)" }} onClick={() => setDialogOpen(-1)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}