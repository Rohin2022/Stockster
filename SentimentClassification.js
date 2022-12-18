import axios from 'axios';



export default function Classify(text, setSentiments) {
    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/classify',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer esFWCGd2medRhW8UrMMzBgH56wL9QuFqDblqA7Ep'
        },
        data: {
            model: 'medium',
            outputIndicator: 'Classify this product review',
            taskDescription: 'Classify these product reviews as positive, negative, or neutral',
            inputs: text,
            examples: [
                { text: 'The company has been doing well', label: 'positive' },
                { text: 'The exceeded my expectations', label: 'positive' },
                { text: 'I should buy more shares', label: 'positive' },
                { text: 'I would recommend this to others', label: 'positive' },
                { text: 'The company is doing poorly', label: 'negative' },
                { text: 'The stock is doing badly', label: 'negative' },
                { text: "I'm unhappy with this", label: 'negative' },
                { text: 'The stock has plateaued', label: 'neutral' },
                { text: 'It is doing ok', label: 'neutral' },
                { text: 'It is doing fine', label: 'neutral' },
            ]
        }
    };

    axios.request(options).then((data) => {
        const d = data.data["classifications"]
        var sentiments = []
        for(var input in d){
            sentiments.push(d[input]["prediction"])
        }
        setSentiments(sentiments)
        console.log(sentiments)
    })
}