import { useEffect, useState } from 'react';
import { createNewOrder } from './api';
import { Step1, Step2 } from './pages';
import { OrderInfo, PizzaOptions } from './types';


function App() {
  const [ step, setStep ] = useState<number>(1);
  const [ info, setInfo ] = useState<OrderInfo | null>(null);

  const onStep1Submit = (orderInfo: PizzaOptions)=> {
    setInfo({
      options: orderInfo
    });
    setStep(2);
  };

  const onStep2Submit = () => {
    createNewOrder(info as OrderInfo).then(() => {
      setStep(3);
    });
  };

  switch(step) {
  case 1:
    return (<Step1 onSubmit={ onStep1Submit } />);

  case 2:
    return (<Step2 onSubmit={ onStep2Submit } />);

  case 3:
    return (<div>Done</div>);
  }

  return null;
}

export default App;
