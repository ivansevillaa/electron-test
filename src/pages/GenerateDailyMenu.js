import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AppLayout from "../components/Layout";
import "./generateMenu.css";
import { Typography, Button, Alert } from 'antd';
const { Title } = Typography;

const GenerateMenu = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    fetch('https://sentidosapi1.azurewebsites.net/ver_categorias')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, [])

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    const date = new Date();
    try {
      const response = await fetch('https://sentidosapi1.azurewebsites.net/crear_menus_mobiles', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          ...data,
          fecha_creacion: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        })
      })
      console.log(response);
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
      {success && <Alert message="Plato agregado exitosamente" type="success" showIcon closable />}
      <div className="invoiceContainer">
        <Title>Cargar plato del día</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='id_Categoria'>
            Categoría
            <select id="id_Categoria" {...register("id_Categoria", { required: 'La categoría es obligatoria para cargar un plato nuevo' })}>
              <option value="">--Seleccioná categoría--</option>
              {categories && categories.map((category) => (
                <option key={category.categoriaId} value={category.categoriaId}>{category.tipo_categoria}</option>
              ))}
            </select>
          </label>
          {errors.id_Categoria && <span className='error'>{errors.id_Categoria.message}</span>}
          <label htmlFor='plato'>
            Nombre del plato
            <input
              id="plato"
              placeholder='Ensalada'
              {...register("plato", { 
                required: 'El nombre del plato es obligatorio para cargar un plato nuevo'
              })}
            />
          </label>
          {errors.plato && <span className='error'>{errors.plato.message}</span>}
          <label htmlFor={'precio'}>
            Precio
            <input
              type="number"
              id="precio"
              placeholder="400"
              {...register('precio', {
                required: 'El precio es obligatorio para cargar un plato nuevo'
              })}
            />
          </label>
          {errors.precio && <span className='error'>{errors.precio.message}</span>}
          <label htmlFor={'informacion_plato'}>
            Informacion
            <textarea
              id="informacion_plato"
              placeholder="Las hamburguesas más ricas"
              {...register('informacion_plato', {
                required: 'La información es obligatoria para cargar un plato nuevo'
              })}
            />
          </label>
          {errors.informacion_plato && <span className='error'>{errors.informacion_plato.message}</span>}
          <label htmlFor='url_foto_menu'>
            Imagen
            <input
              id="url_foto_menu"
              placeholder='https://mifoto.com/jejox'
              {...register("url_foto_menu")}
            />
          </label>
          <Button type="primary" htmlType='submit' loading={loading}>Cargar plato nuevo</Button>
        </form>
      </div>
    </AppLayout>
  )
}

export default GenerateMenu
