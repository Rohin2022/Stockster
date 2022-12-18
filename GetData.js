import axios from "axios";

export function getPreds(company,setData){
    return axios.get(`http://127.0.0.1:5000/?company=${company}`,{mode: 'no-cors'}).then((data) => {
        setData(data.data["preds"])
    console.log(company)})

}