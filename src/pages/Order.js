import React, { useEffect, useContext, useState } from 'react';
import './order.css';
import { useForm } from "react-hook-form";
import { Typography, Button, Alert } from 'antd';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom'
import AppLayout from '../components/Layout';
const { Title } = Typography;

function Order() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const userContext = useContext(UserContext);
  const history = useHistory()
  const [plates, setPlates] = useState();
  const [tables, setTables] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [idPedido, setIdPedido] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (userContext) {
      if (!userContext.user) {
        history.push('/login');
      }
    }

    if (!userContext) {
      history.push('/login');
    }
  }, [history, userContext])

  useEffect(() => {
    fetch('https://sentidosapi1.azurewebsites.net/ver_mesas')
      .then(res => res.json())
      .then(data => setTables(data));

    fetch('https://sentidosapi1.azurewebsites.net/api/get/menu')
      .then(res => res.json())
      .then(data => setPlates(data));

    fetch('https://sentidosapi1.azurewebsites.net/ver_categorias')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, [])

  useEffect(() => {
    if (watch('plates')) {
      const plates = watch('plates').filter((item) => item.id_men).map((item) => ({
        ...item,
        cantidad: Number(item.cantidad)
      }))

      plates.forEach((item) => {
        fetch(`https://sentidosapi1.azurewebsites.net/crear/menu_pedido/${idPedido}/${item.id_men}/${item.cantidad}`, {
          method: 'POST'
        })
      })
    }
  }, [idPedido])

  const onSubmit = async (data) => {
    const date = new Date();
  
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://sentidosapi1.azurewebsites.net/create_ped/${data.nombre}/${data.apellido}/${data.dni}/${data.nro_mesa}/${date.getDay()}-${date.getMonth()}-${date.getFullYear()}/${date.getHours()}:${date.getMinutes()}`, {
        method: 'POST'
      })

      if (response.status === 200)  {
        const data = await response.json();
        setIdPedido(data[0].id_Pedido)
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
      {success && <Alert message={`Pedido con id "${idPedido}". Registrado exitosamente`} type="success" showIcon closable />}
      <div className='orderContainer'>
        <Title>Registro de pedido</Title>
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
            <select id="nro_mesa" {...register("nro_mesa", { required: 'El número de mesa es obligatorio para poder registrar el pedido' })}>
              <option value="">--Seleccioná una mesa--</option>
              {tables && tables.map((table) => (
                <option key={table.id_mesa} value={table.id_mesa}>{table.numero_mesa}</option>
              ))}
            </select>
          </label>
          {errors.nro_mesa && <span className='error'>{errors.nro_mesa.message}</span>}
          <fieldset>
            <legend>Seleccioná los platos:</legend>
              {categories && categories.map((item) => {
                return (
                  <React.Fragment key={item.categoriaId}>
                    <Title underline level="h3" style={{ fontSize: '24px' }}>{item.tipo_categoria}</Title>
                    {plates && plates.map((plate, index) => {
                      if (plate.idcategoria === item.categoriaId) {
                        return <React.Fragment key={plate.id_menu}>
                          <label>
                            {plate.comida}
                            <input
                              type="checkbox"
                              value={plate.id_menu}
                              {...register(`plates.${index}.id_men`)}
                            />
                          </label>
                          {watch(`plates.${index}.id_men`) && (
                            <label htmlFor={`cantidad-${plate.id_menu}`}>
                              Cantidad
                              <input 
                                type="number"
                                id={`cantidad-${plate.id_menu}`}
                                defaultValue={1}
                                {...register(`plates.${index}.cantidad`)}
                              />
                            </label>
                            /* TODO: agregar error si no selecciona la cantidad */
                          )}
                        </React.Fragment>
                      } else {
                        return null
                      }
                    })}
                  </React.Fragment>
                )
              })}
              {/* agregar logica para mostrar error si no se seleccionó ningun pedido */}
          </fieldset>
          <Button type="primary" htmlType='submit' loading={loading}>Registrar pedido</Button>
        </form>
      </div>
    </AppLayout>
  )
}

export default Order;
