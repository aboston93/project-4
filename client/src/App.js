import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Box from '@material-ui/core/Box';




class App extends React.Component {
  render = () => (
    <Box color="text.primary" clone>
    <Button variant="contained" color="primary">
    Hello World
  </Button>
  </Box>
  );
}

export default App;
