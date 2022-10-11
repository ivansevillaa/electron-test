import React, { useEffect } from 'react';
import './order.css';
import { useForm } from "react-hook-form";

function Order() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data.plates.filter((item) => item.id));
    const date = new Date();
    const transformedData = {
      dni: data.dni,
      nombre: data.nombre,
      apellido: data.apellido,
      idMesa: data.nro_mesa,
      platos: data.plates.filter((item) => item.id),
      fecha: date.toLocaleDateString(),
      hora: `${date.getHours()}:${date.getMinutes()}`
    };
    console.log('MANDO A BACKEND: ', transformedData);
  };

  /* TODO: obtener los platos del backend */
  const plates = [{id: 1, name: 'Pizza'}, {id: 2, name: 'Empanadas'}, {id: 3, name: 'Hamburguesa'}, {id: 4, name: 'Parrillada'}]

  return (
    <div className='orderContainer'>
      <h1>Registro de pedido</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='dni'>
          Dni del cliente
          <input
            id="dni"
            placeholder='41989765'
            {...register("dni", { 
              required: 'El DNI del cliente es obligatorio para poder registrar el pedido',
              minLength: { value: 8, message: 'El DNI debe tener 8 caracteres' }
            })}
          />
        </label>
        {errors.dni && <span className='error'>{errors.dni.message}</span>}
        <label htmlFor='nombre'>
          Nombre del cliente
          <input
            id="nombre"
            placeholder='Antonio'
            {...register("nombre", { 
              required: 'El Nombre del cliente es obligatorio para poder registrar el pedido'
            })}
          />
        </label>
        {errors.nombre && <span className='error'>{errors.nombre.message}</span>}
        <label htmlFor='apellido'>
          Apellido del cliente
          <input
            id="apellido"
            placeholder='Garibaldi'
            {...register("apellido", { 
              required: 'El apellido del cliente es obligatorio para poder registrar el pedido'
            })}
          />
        </label>
        {errors.apellido && <span className='error'>{errors.apellido.message}</span>}
        <label htmlFor='nro_mesa'>
          Nro. de mesa
          {/* TODO: obtener las mesas del back */}
          <select id="nro_mesa" {...register("nro_mesa", { required: 'El número de mesa es obligatorio para poder registrar el pedido' })}>
            <option value="">--Seleccioná una mesa--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </label>
        {errors.nro_mesa && <span className='error'>{errors.nro_mesa.message}</span>}
        <fieldset>
          <legend>Seleccioná los platos:</legend>
            {plates.map((plate, index) => (
              <React.Fragment key={plate.id}>
                <label>
                  {plate.name}
                  <input
                    type="checkbox"
                    value={plate.id}
                    {...register(`plates.${index}.id`)}
                  />
                </label>
                {watch(`plates.${index}.id`) && (
                  <label htmlFor={`cantidad-${plate.id}`}>
                    Cantidad
                    <input 
                      type="number"
                      id={`cantidad-${plate.id}`}
                      defaultValue={1}
                      {...register(`plates.${index}.cantidad`)}
                    />
                  </label>
                  /* TODO: agregar error si no selecciona la cantidad */
                )}
              </React.Fragment>
            ))}
            {/* agregar logica para mostrar error si no se seleccionó ningun pedido */}
        </fieldset>
        <button>Registrar pedido</button>
      </form>
    </div>
  )
}

export default Order;
