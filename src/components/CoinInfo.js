import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function CoinInfo(props) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart(props.coin.id, days, props.type)
    );

    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [days, props.type]);

  return (
    <ThemeProvider theme={darkTheme}>
      {!historicalData ? (
        <CircularProgress sx={{ color: 'gold' }} size={250} thickness={1} />
      ) : (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${props.type}`,
                  borderColor: '#EEBC1D',
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            {chartDays.map((day) => {
              return <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>{day.label}</SelectButton>;
            })}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    symbol: state.currency.symbol,
  };
};

export default connect(mapStateToProps, null)(CoinInfo);
