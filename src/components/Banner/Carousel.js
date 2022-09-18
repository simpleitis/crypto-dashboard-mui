import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TrendingCoins } from '../../config/api';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Carousel(props) {
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(props.type));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [props.type]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          textTransform: 'uppercase',
          color: 'white',
        }}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {props.symbol}
          {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      item: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={{ height: '50%', display: 'flex', alignItems: 'center' }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    symbol: state.currency.symbol,
  };
};

export default connect(mapStateToProps, null)(Carousel);
