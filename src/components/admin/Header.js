import  React ,{Fragment} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

function Header(props) {

  return (
    <Fragment>
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Notfications" />
          <Tab label="Templates" />
        </Tabs>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;