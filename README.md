# Stockster
An efficient, data-driven approach to monitoring the stock market.

## Inspiration
The stock market is highly volatile, however, those who are able to successfully identify patterns and better understand its behavior can reap various economic benefits. Stockster seeks to provide resources to assist the average person, and **increase the accessibility** of the stock market for the general populace.

## What it does
Stockster follows a data-driven approach to investing, presenting a clean and straightforward UI interface to maximize user efficiency and enhance user experience. Stockster utilizes machine learning to forecast future trends for a given stock and allows users to track an unlimited number of stocks simultaneously. Additionally, Stockster provides related financial news for each individual stock. Stockster then analyzes the news that it retrieves, and predicts a sentiment for said news, thereby providing the user with additional information. 

## How I built it
 - Frontend created using ReactJS - Material UI was used for components
 - Data is stored using Firebase (real-time database, and authentication)
 - API created using Flask which returns predictions for the next 5 days (training data is pulled utilizing Alpha Vantage)

## Challenges I ran into
The time constraint made it quite difficult to finish the project, and there are still many minor bugs that have to be rooted out. Additionally, it took quite a while to design the UI interface and maintain a clean, simple, and efficient user experience.

## What I learned
I learned more about Natural Language Processing (NLP) and learned how to use the Cohere API. Additionally, by utilizing parts of the Google Cloud suite, primarily, Firebase, I gained more familiarity with its capabilities.

## What's next for Stockster
 - Creating a mobile app in order to supplement the web experience
 - Providing additional information and data related to a specific stock
 - Creating/Incorporating trading bots that can further automate parts of the process
 - Improve the accuracy of the regressor
