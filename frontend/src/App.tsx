import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

const App: React.FC = () => {
  const [display, setDisplay] = useState('');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNumberClick = (num: number) => {
    setDisplay(prev => prev + num.toString());
  };

  const handleOperationClick = (op: string) => {
    if (display) {
      setFirstNumber(parseFloat(display));
      setOperation(op);
      setDisplay('');
    }
  };

  const handleClear = () => {
    setDisplay('');
    setFirstNumber(null);
    setOperation(null);
  };

  const handleEquals = async () => {
    if (firstNumber !== null && operation && display) {
      setLoading(true);
      try {
        const result = await backend.calculate(operation, firstNumber, parseFloat(display));
        setDisplay(result.toString());
        setFirstNumber(null);
        setOperation(null);
      } catch (error) {
        setDisplay('Error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="calculator">
      <TextField
        fullWidth
        variant="outlined"
        value={display}
        disabled
        className="display"
      />
      <Grid container spacing={1} className="keypad">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <Grid item xs={3} key={num}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </Button>
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => handleOperationClick('+')}
          >
            +
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => handleOperationClick('-')}
          >
            -
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => handleOperationClick('*')}
          >
            *
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => handleOperationClick('/')}
          >
            /
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClear}
          >
            C
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEquals}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : '='}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;