import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AppLayout from "../components/Layout";
import "./invoice.css";
import Ticket from "../components/Ticket";
import { Typography, Button, Alert } from 'antd';
const { Title } = Typography;

const Invoice = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [orderData, setOrderData] = useState();
  const [clientData, setClientData] = useState();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`https://sentidosapi1.azurewebsites.net/create_factura/${data.idPedido}`, {
        method: 'POST'
      })
      const responseClient = await fetch(`https://sentidosapi1.azurewebsites.net/create_factura/get_cliente/${data.idPedido}`)

      if (response.status === 200 && responseClient.status === 200)  {
        setSuccess(true);
        const data = await response.json();
        const clientData = await responseClient.json();
        setOrderData(data);
        setClientData(clientData);
      }

      if (response.status !== 200 && responseClient.status !== 200) {
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
      {success && <Alert message="Factura generada exitosamente" type="success" showIcon closable />}
      {success ? (
        <Ticket orderData={orderData} clientData={clientData} />
      ) : (
        <div className="invoiceContainer">
          <Title>Generar facturar</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='idPedido'>
              ID pedido
              <input
                id="idPedido"
                placeholder='7347843'
                {...register("idPedido", { 
                  required: 'El ID del pedido es obligatorio para poder generar la factura'
                })}
              />
            </label>
            {errors.idPedido && <span className='error'>{errors.idPedido.message}</span>}
            <Button type="primary" htmlType='submit' loading={loading}>Generar factura</Button>
          </form>
        </div>
      )}
    </AppLayout>
  )
}

export default Invoice
