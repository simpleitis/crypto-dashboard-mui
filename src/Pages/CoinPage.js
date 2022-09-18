import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ReactTinyMarkup from 'react-tiny-markup';
import LinearProgress from '@mui/material/LinearProgress';
import millify from 'millify';

function CoinPage(props) {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: 'gold' }} />;

  return (
    <Container>
      <Grid container spacing={2} pt="2rem">
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            borderRight: { xs: 'none', md: '2px solid grey' },
            paddingRight: { xs: 'none', md: '3rem' },
          }}
        >
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="50%"
            style={{ marginRight: 0 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Montserrat',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {coin?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              width: '100%',
              fontFamily: 'Montserrat',
              paddingBottom: '1rem',
              textAlign: 'justify',
            }}
          >
            <ReactTinyMarkup>
              {coin?.description.en.split('. ')[0]}
            </ReactTinyMarkup>
          </Typography>
          <div style={{ paddingBottom: '1rem' }}>
            <span style={{ display: 'flex' }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Montserrat', fontWeight: '800' }}
              >
                Rank:
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Montserrat', paddingLeft: '1rem' }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <span style={{ display: 'flex' }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Montserrat', fontWeight: '800' }}
              >
                Current price:
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Montserrat', paddingLeft: '1rem' }}
              >
                {props.symbol}{' '}
                {coin?.market_data.current_price[props.type.toLowerCase()]}
              </Typography>
            </span>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <span style={{ display: 'flex' }}>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Montserrat', fontWeight: '800' }}
              >
                Market Cap:
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontFamily: 'Montserrat', paddingLeft: '1rem' }}
              >
                {props.symbol}{' '}
                {millify(coin?.market_data.market_cap[props.type.toLowerCase()].toString())}
              </Typography>
            </span>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <CoinInfo coin={coin}/>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    symbol: state.currency.symbol,
  };
};

export default connect(mapStateToProps, null)(CoinPage);
