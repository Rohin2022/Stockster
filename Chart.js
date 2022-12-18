import { Title } from 'chart.js'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function Chart(props) {
    var data = props.data.split(" ")
    
    var d = []
    var idx = 0
    for (var x = 0; x < data.length; x++) {
        const p = data[x]
        d.push({ price: p, idx: idx })
        idx++;
    }
    
    console.log(data)

    return (
        <ResponsiveContainer width="50%" aspect={1.25}>
            <LineChart data={d}>
                <Line type="monotone" dataKey="price" stroke="rgb(212,76,160)" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="idx" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    )
}