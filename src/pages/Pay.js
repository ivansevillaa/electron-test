import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AppLayout from "../components/Layout";
import "./invoice.css";
import { Typography, Button, Alert } from 'antd';
const { Title } = Typography;

const Pay = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [payMethods, setPayMethods] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    fetch('https://sentidosapi1.azurewebsites.net/api/get/metodo_pago')
      .then(res => res.json())
      .then(data => setPayMethods(data));
  }, [])

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`https://sentidosapi1.azurewebsites.net/confirmacion_depago/${data.idPedido}/${data.pay_method}`, {
        method: 'PUT'
      })
      if (response.status === 200)  {
        setSuccess(true);
      }

      if (response.status !== 200) {
        setError('Ocurrió un error, intentelo de nuevo en unos minutos');
      }

      setLoading(false);
    } catch(e) {
      setError('Ocurrió un error, intentelo de nuevo más tarde');
      setLoading(false);
    }
  };


  return (
    <AppLayout>
      {error && <Alert message={error} type="error" showIcon closable />}
      {success && <Alert message="Pago registrado exitosamente" type="success" showIcon closable />}
      <div className="invoiceContainer">
        <Title>Registrar pago</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='idPedido'>
            ID pedido
            <input
              id="idPedido"
              placeholder='7347843'
              {...register("idPedido", { 
                required: 'El ID del pedido es obligatorio para poder registrar el pago'
              })}
            />
          </label>
          {errors.idPedido && <span className='error'>{errors.idPedido.message}</span>}
          <label htmlFor='pay_method'>
            Método de pago
            <select id="pay_method" {...register("pay_method", { required: 'El método de pago es obligatorio para poder registrar el pago' })}>
              <option value="">--Seleccioná método de pago--</option>
              {payMethods && payMethods.map((method) => (
                <option key={method.id_MetodoPago} value={method.id_MetodoPago}>{method.tipo_pago}</option>
              ))}
            </select>
          </label>
          {errors.pay_method && <span className='error'>{errors.pay_method.message}</span>}
          <Button type="primary" htmlType='submit' loading={loading}>Registrar pago</Button>
        </form>
      </div>
    </AppLayout>
  )
}

export default Pay
