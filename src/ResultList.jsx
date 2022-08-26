import { useState } from 'react';
import Graph from './Graph.jsx';

const ResultList = ( {company, start, end, chart, setChart} ) => {

  const [info, setInfo] = useState(0);
  let candles = [];

    const load = () => {
        fetch('http://localhost:5000/candles', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: company.ticker,
            start: start,
            end: end,
            company: company.name
        })
    })
    .then(res => res.json())
    .then(data => setInfo(data))
    .then(setChart(true))
    };
    
    if(info!==0){
      for (let i = 0; i < info.t.length; i++){
        candles[i] = {
          x: new Date(info.t[i]),
          y: [info.o[i], info.h[i], info.l[i], info.c[i]]
        }
    }
  };

    return (
      <div>
        <div className="results">
          <h2>Results</h2>
          <button onClick={load}>{company.name}</button>
          <b>{company.country} ({company.currency})</b>
          <h4>{company.weburl}</h4>
        </div>
        {info!==0 && chart && 
        <Graph
        company={company}
        candles={candles}
        />
        }
      </div>
    );
  }
  
  export default ResultList
