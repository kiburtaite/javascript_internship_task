import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import finnhub from 'finnhub';

const app = express();
const PORT = process.env.PORT || 8080;
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/search', async (req, res) => {
    let codes = [];
    finnhubClient.symbolSearch(req.body.text, (error, data, response) => {
        data.result.map(result => codes.push(result.symbol))
        finnhubClient.companyProfile2({'symbol': codes[0]}, (error, data, response) =>
        /*Only 1 search result, since mapping thought finnhubClient.companyProfile2 didn't work for me.*/ 
        res.json(data))
    })
});

app.post('/candles', async (req, res) => {
    finnhubClient.stockCandles(req.body.code, "D", req.body.start, req.body.end, (error, data, response) => {
        console.log(req.body.company, data);
        res.json(data)
    })
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))