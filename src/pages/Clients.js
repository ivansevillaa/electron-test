import React from "react";
import { useForm } from "react-hook-form";
import AppLayout from "../components/Layout";
import "./clients.css";

const Clients = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('MANDO A BACKEND: ', data);
  };

  return (
    <AppLayout>
      <div className="invoiceContainer">
        <h1>Registrar pago</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='idPedido'>
            Ingrese ID del pedido que quiere generar la factura
            <input
              id="idPedido"
              placeholder='7347843'
              {...register("idPedido", { 
                required: 'El ID del pedido es obligatorio para poder generar la factura'
              })}
            />
          </label>
          {errors.idPedido && <span className='error'>{errors.idPedido.message}</span>}
          <button>Generar factura</button>
        </form>
      </div>
    </AppLayout>
  )
}

export default Clients
