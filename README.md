#<p align="center">`Token Tracker`</p>
---
Token Tracker is a REACT/Express.js webapp that aims to provide a more streamlined, user-friendly way of learning about cryptocurrencies! 

Using both the [Coinbase Advanced Trade Websocket](https://docs.cloud.coinbase.com/advanced-trade-api/docs/ws-overview) and the [NewsAPI](https://newsapi.org/) Token Tracker gets the most up-to-date prices **AND** the most relevant information about whatever currency you are interested in.

##Screenshot
---
####TODO: [ App Screenshot Here ]

##Installation
---
To install Token Tracker to your machine run the following command from your terminal:
`$ git clone https://github.com/cornfrog/Token-Tracker`

##Usage
---
1. To get started using Token Tracker first go into the **root** directory, and install all dependencies with `yarn`:
```
$ cd ./Token-Tracker/
$ yarn install
```
2. In the root of the **server** folder, create the `token-tracker_development` PostgreSQL database:
```
$ cd ./Token-Tracker/server/
$ createdb token-tracker_development
``` 
3. While still in the **server** folder, run the following `yarn` command to create tables used in the `token-tracker_development` database:
```
$ yarn migrate:latest
```
4. Go back to the **root** folder, and run the following `yarn` command to start the server:
```
$ yarn run dev
```
5. Navigate to [localhost:3000](http://localhost:3000) from your browser.

##Contributing
---
Bug reports and pull requests are welcome here at [https://github.com/cornfrog/Token-Tracker](https://github.com/cornfrog/Token-Tracker). Please use the fork-and-branch workflow.