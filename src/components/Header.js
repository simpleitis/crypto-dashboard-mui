import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { connect } from 'react-redux';
import { changeCurrency } from '../redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Header(props) {
  const navigate = useNavigate();
  const [type, setType] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    props.changeCurrency(type, symbol);
  }, [symbol]);

  const handleChange = (e) => {
    if (e.target.value === 'USD') {
      setType(e.target.value);
      setSymbol('$');
    } else if (e.target.value === 'INR') {
      setType(e.target.value);
      setSymbol('₹');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static">
          <Toolbar>
            {/* <Typography
              variant="h6"
              sx={{
                flex: 1,
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
            <Button
                align="right"
                disableRipple
                startIcon={
                  <Avatar
                    src="logo.png"
                    variant="square"
                    sx={{ width: 30, height: 30 }}
                  />
                }
                sx={{ ':hover': { backgroundColor: 'white' } }}
              ></Button>
              Crypto Hunter
            </Typography> */}
            <Typography
              variant="h6"
              sx={{
                flex: 1,
                color: 'gold',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              <Button
                align="right"
                disableRipple
                startIcon={
                  <Avatar
                    src="logo.png"
                    variant="square"
                    sx={{ width: 40, height: 40 }}
                  />
                }
                sx={{ ':hover': { backgroundColor: 'transparent' } }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    color: 'gold',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Crypto Hunter
                </Typography>
              </Button>
            </Typography>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  variant="outlined"
                  sx={{ width: 100, height: 40, marginRight: '2%' }}
                  value={props.type}
                  onChange={handleChange}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    type: state.currency.type,
    symbol: state.currency.symbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (selection, symbol) =>
      dispatch(changeCurrency(selection, symbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
