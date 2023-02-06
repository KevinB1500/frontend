import React from 'react';

const Form = ({registro, setRegistro}) => {

    const handleChange = e => {
        setRegistro({
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(registro.cliente)
        //Validación de cliente
        if(registro.cliente === ''){
            alert('Ingrese un cliente para generar un token')
            return
        }


        //Consulta
        let rutaFetch =  "http://localhost:4000/generarToken/?cliente="+registro.cliente;
        console.log(rutaFetch);
        fetch(rutaFetch)
        .then(res => res.text())
        .then(data => {
            const el = document.createElement('p');
            el.textContent = data;
            const token = document.createElement('p');
            token.textContent = "token: "+el.textContent.slice(10,16)
            if(el.textContent.split(',')[0] === el.textContent){
                document.getElementById('formulario').appendChild(token);
                const normalSecond = document.createElement('p');
                normalSecond.textContent = "Segundos restantes: 60"
                document.getElementById('formulario').appendChild(normalSecond);
            }else{
                const tiempo = document.createElement('p');
                tiempo.textContent = el.textContent.slice(-5, -1);
                
                
                let futureMinute = parseInt(tiempo.textContent.slice(0,2));
                let futureSecond = parseInt(tiempo.textContent.slice(2,))
                
                let currentDate = new Date();
                let currentMinute = currentDate.getMinutes();
                let currentSecond = currentDate.getSeconds();
    
                let minuteDifference = futureMinute - currentMinute;
                let secondDifference = futureSecond - currentSecond;
    
                let totalSecondDifference = (minuteDifference * 60) + secondDifference;
    
                const segundosRestantes = document.createElement('p');
                segundosRestantes.textContent = "Segundos restantes: " + totalSecondDifference;
                document.getElementById('formulario').appendChild(token);
                document.getElementById('formulario').appendChild(segundosRestantes);
            }
            
          })
        .catch(error => console.error(error));
        
        
    }

    return ( 
        <div>
            <form id='formulario' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='cliente' className='form-label'>Cliente</label>
                    <input name='cliente' onChange={handleChange} type='text' id='cliente' className='form-control'></input>
                </div>
                <div className='d-grid gap-2 mx-auto' style={{width: '300px', height: '50px'}}>
                    <button type='submit' className="btn btn-primary" >Generar Token</button>
                </div>
            </form>
        </div>
     );
}
 
export default Form;