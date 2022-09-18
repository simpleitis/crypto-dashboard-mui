import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Carousel from './Carousel';

function Banner() {
  return (
    <div style={{ backgroundImage: 'url(./banner.jpg)' }}>
      <Container
        sx={{
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 5,
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '40%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Get all the info regarding crypto
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
