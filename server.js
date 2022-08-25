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
        res.json(data))
    });
});

app.post('/companies', async (req, res) => {
    req.body.codes.codes.map(code => {
    finnhubClient.companyProfile2({'symbol': 'ARTI.JK'}, (error, data, response) => 
    res.json({companies: data}))})
});

app.get('/candles', async (req, res) => {
    finnhubClient.stockCandles("AAPL", "D", 1640995200, 1654038000, (error, data, response) => 
    res.json(data))
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))