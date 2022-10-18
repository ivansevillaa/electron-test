import React, { useEffect, useState, useRef } from "react";
import AppLayout from "../components/Layout";
import "./clients.css";
import { Typography, Table, Row, Col, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
const { Title } = Typography;

const ComponentToPrint = React.forwardRef(({ columns, clients }, ref) => {
  return (
    <div className="clientContainer" ref={ref}>
      <Row>
        <Col span={6}>
          <img src="https://sentidos.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75" width={90} height={90} />
        </Col>
        <Col span={12} className="tableTitle">
          <Title>Listado de clientes</Title>
        </Col>
      </Row>
      <Table columns={columns} dataSource={clients} size="middle" />
    </div>
  )
})

const Clients = () => {
  const [clients, setClients] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Nombre',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'email',
      key: 'email',
    }
  ];

  useEffect(() => {
    fetch('https://sentidosapi1.azurewebsites.net/api/get/usuarios')
      .then(res => res.json())
      .then(data => setClients(data));
  }, [])

  return (
    <AppLayout>
      <ComponentToPrint ref={componentRef} columns={columns} clients={clients} />
      <Button type="primary" onClick={handlePrint}>Imprimir listado</Button>
    </AppLayout>
  )
}

export default Clients
