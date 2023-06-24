import logo from './logo.svg';
import './App.css';
import { Grid, Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <p>teste</p>
        </Grid>
        <Grid item xs={12} md={4}>
        <p>teste</p>
        </Grid>
        <Grid item xs={12} md={4}>
        <p>teste</p>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
