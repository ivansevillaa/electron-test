import React, { useContext, useEffect, useState } from 'react';
import './login.css';
import { useForm } from 'react-hook-form'
import { Typography, Button } from 'antd';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom'
const { Title } = Typography;

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userContext) {
      console.log(Boolean(userContext.user));
      if (userContext.user) {
        history.push('/');
      }
    }
  }, [history, userContext])

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://sentidosapi1.azurewebsites.net/api/login_empleado', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
      })
      
      if (response.status === 200)  {
        const res = await response.json();
        userContext.setUser(res);
      }
      
      if (response.status === 404)  {
        setError('Usuario y/o contraseña incorrectos');
      }

      if (response.status >= 500) {
        setError('Ocurrió un error, intentelo de nuevo en unos minutos');
      }

      setLoading(false);
    } catch(e) {
      setError('Ocurrió un error, intentelo de nuevo más tarde');
      setLoading(false);
    }
  };

  return (
    <div className='orderContainer'>
      <Title>Iniciar sesión</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email_empleado'>
          Email
          <input
            id="email_empleado"
            placeholder='empleado@gmail.com'
            type="email"
            {...register("email_empleado", { 
              required: 'El email del empleado es obligatorio para poder iniciar sesión'
            })}
          />
        </label>
        {errors.email_empleado && <span className='error'>{errors.email_empleado.message}</span>}
        <label htmlFor='password_empleado'>
          Contraseña
          <input
            id="password_empleado"
            placeholder='*******'
            type="password"
            {...register("password_empleado", { 
              required: 'La contraseña es obligatoria para poder iniciar sesión'
            })}
          />
        </label>
        {errors.password_empleado && <span className='error'>{errors.password_empleado.message}</span>}
        <Button type="primary" htmlType='submit' loading={loading}>Iniciar sesión</Button>
        {error && <span className='error'>{error}</span>}
      </form>
    </div>
  )
}

export default Login;
