import React, { useEffect, useState, useRef } from "react";
import AppLayout from "../components/Layout";
import "./tablesBooked.css";
import { Typography, Table, Row, Col, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
const { Title } = Typography;

const ComponentToPrint = React.forwardRef(({ columns, tables }, ref) => {
  return (
    <div className="clientContainer" ref={ref}>
      <Row>
        <Col span={6}>
          <img src="https://sentidos.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75" width={90} height={90} />
        </Col>
        <Col span={12} className="tableTitle">
          <Title>Mesas reservadas</Title>
        </Col>
      </Row>
      <Table columns={columns} dataSource={tables} size="middle" />
    </div>
  )
})

const TablesBooked = () => {
  const [tables, setTables] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    {
      title: 'Meso nro.',
      dataIndex: 'mesa',
      key: 'mesa',
      render: (item) => item.numero_mesa,
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha_de_reseva',
      key: 'fecha_de_reseva',
    },
    {
      title: 'Hora',
      dataIndex: 'hora_reserva',
      key: 'hora_reserva',
    },
    {
      title: 'Cantidad de personas',
      dataIndex: 'cantidad_personas',
      key: 'cantidad_personas'
    },
  ];

  useEffect(() => {
    fetch('https://sentidosapi1.azurewebsites.net/api/get/mesas_Reser/')
      .then(res => res.json())
      .then(data => setTables(data));
  }, [])

  return (
    <AppLayout>
      <ComponentToPrint ref={componentRef} columns={columns} tables={tables} />
      <Button type="primary" onClick={handlePrint}>Imprimir listado</Button>
    </AppLayout>
  )
}

export default TablesBooked
