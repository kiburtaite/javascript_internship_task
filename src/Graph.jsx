import ReactApexChart from 'react-apexcharts';

const Graph = ( {company, candles} ) => {

  const series = [{
    data: candles
  }];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
};
 
return (
      <div>
        <div>
            <ReactApexChart options={options} series={series} type="candlestick" height={350} />
        </div>
    </div>
    );
}

export default Graph