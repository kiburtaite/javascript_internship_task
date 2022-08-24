import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import finnhub from 'finnhub';

const app = express();
const PORT = process.env.PORT || 8080;

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();

app.get('/results', async (req, res) => {
    finnhubClient.symbolSearch('AAPL', (error, data, response) => 
    res.json(data.result.map(result => result.symbol)))
});

app.get('/companies', async (req, res) => {
    finnhubClient.companyProfile2({'symbol': 'AAPL'}, (error, data, response) => 
    res.json(data))
});

app.get('/candles', async (req, res) => {
    finnhubClient.stockCandles("AAPL", "D", 1640995200, 1654038000, (error, data, response) => 
    res.json(data))
});
  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))