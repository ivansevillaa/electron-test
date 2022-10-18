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
    try {
      const response = await fetch('https://sentidosapi1.azurewebsites.net/crear_plato', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data)
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
      {success && <Alert message="Plato agregado exitosamente" type="success" showIcon closable />}
      <div className="invoiceContainer">
        <Title>Cargar plato</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='idcategoria'>
            Categoría
            <select id="idcategoria" {...register("idcategoria", { required: 'La categoría es obligatoria para cargar un plato nuevo' })}>
              <option value="">--Seleccioná categoría--</option>
              {categories && categories.map((category) => (
                <option key={category.categoriaId} value={category.categoriaId}>{category.tipo_categoria}</option>
              ))}
            </select>
          </label>
          {errors.idcategoria && <span className='error'>{errors.idcategoria.message}</span>}
          <label htmlFor='comida'>
            Nombre del plato
            <input
              id="comida"
              placeholder='Ensalada'
              {...register("comida", { 
                required: 'El nombre del plato es obligatorio para cargar un plato nuevo'
              })}
            />
          </label>
          {errors.comida && <span className='error'>{errors.comida.message}</span>}
          <label htmlFor={'precio'}>
            Cantidad
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
          <Button type="primary" htmlType='submit' loading={loading}>Cargar plato nuevo</Button>
        </form>
      </div>
    </AppLayout>
  )
}

export default GenerateMenu
