import requests
from sklearn.ensemble import RandomForestRegressor
import numpy as np
from flask import Flask, request, jsonify
import sys
from joblib import load
import string


def getData(company):
    d = requests.get("https://www.alphavantage.co/query",
                     params={
                         "function": "TIME_SERIES_DAILY_ADJUSTED",
                         "apikey": "8653GXMTQMJEI3CN",
                         "symbol": company
                     }).json()["Time Series (Daily)"]
    arr = []
    for i in d:
        arr.append(float(d[i]["5. adjusted close"]))
    return arr


def lagData(listData, num_prev=8):
    lags = []
    labels = []
    for i in range(num_prev, len(listData) - 1):
        lags.append(listData[i - num_prev:i])
        labels.append(listData[i])
    return lags, labels


def trainModel(laggedData, labels):
    csf = RandomForestRegressor()
    csf.fit(laggedData, labels)
    return csf


def getPreds(lastNDays, csf, numDaysToPred=5):
    preds = []
    inputData = lastNDays
    for i in range(numDaysToPred):
        preds.append(csf.predict([inputData])[0])
        inputData.pop(0)
        inputData.append(preds[-1])
    out = [str(x) for x in preds]



app = Flask(__name__)



@app.route('/')
def predsRoute():
    inputStr = request.args.get("company")
    data = getData(inputStr)
    lagged, labels = lagData(data)
    csf = trainModel(lagged, labels)
    preds = getPreds(data[-8:], csf)
    response = jsonify({'preds': preds})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# listen
if __name__ == "__main__":
    app.run(port=5000)
