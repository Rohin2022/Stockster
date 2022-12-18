import React from "react";

export default function Background(props) {
    return (
        <div style={{ width: "50vw",height:"100vh", position: "absolute", right: 0 }}>
            <div style={{ height: "0",width:"0",borderTop: "100vh solid black", borderRight: "80vh solid transparent",zIndex:10,position:"absolute"}} />
            <div style={{ height: "100vh",width:"100%", position:"absolute",background: "linear-gradient(90deg, rgba(42,3,97,1) 0%, rgba(42,3,97,1) 50%, rgba(0,0,0,1) 100%)", zIndex: 0 }} />
        </div>
    )
}