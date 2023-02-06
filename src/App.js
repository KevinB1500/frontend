import React , {Fragment, useState} from 'react';
import Navbar from './Components/Navbar';
import Form from './Components/Form';

function App() {

  const [registro, setRegistro] = useState({
    cliente: ''
  })


  return (
    <Fragment>
      <Navbar brand='Virtual Token App'></Navbar>
      <div className="m-4" style={{height: '600px'}}>
        <Form registro={registro} setRegistro={setRegistro}></Form>
      </div>
    </Fragment>
  );
}

export default App;
