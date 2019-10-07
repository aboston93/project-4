import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Box from '@material-ui/core/Box';




// slowly building out componets 
class App extends React.Component {
  render = () => (
    <Box color="text.primary" clone>
    <Button variant="contained" color="primary">
    Hello World
  </Button>
  <Container maxWidth="sm">
    </Container>
  </Box>
 

  );
}

export default App;
