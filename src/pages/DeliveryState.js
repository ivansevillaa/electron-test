import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AppLayout from "../components/Layout";
import "./generateMenu.css";
import { Typography, Button, Alert, Divider } from 'antd';
const { Title } = Typography;

const GenerateMenu = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const getOrders = () => {
    fetch('https://sentidosapi1.azurewebsites.net/cargar_pedidos')
      .then(res => res.json())
      .then(data => setData(data));
  }

  useEffect(() => {
    getOrders()
  }, [])

  const handleNextState = async (orderId) => {
    const response = await fetch(`https://sentidosapi1.azurewebsites.net/actualizar_el_estadoPedidos/${orderId}`, {
      method: 'PUT'
    })
    getOrders()
    console.log(response);
  }

  return (
    <AppLayout>
      {error && <Alert message={error} type="error" showIcon closable />}
      {success && <Alert message="Plato agregado exitosamente" type="success" showIcon closable />}
      <div className="invoiceContainer">
        <Title>Actualizar estado del delivery</Title>
        {data && data.map((item) => {
          return (
            <div key={item.id_pedidos}>
              <Title level={4}>Pedido Nro: {item.id_pedidos}</Title>
              <Title level={4}>Estado actual: {item.estados_pedido}</Title>
              <Button onClick={() => handleNextState(item.id_pedidos)}>Pasar a siguiente estado</Button>
              <Divider />
            </div>
          )
        })}
      </div>
    </AppLayout>
  )
}

export default GenerateMenu
