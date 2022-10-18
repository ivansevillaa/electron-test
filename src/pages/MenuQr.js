import React from "react";
import AppLayout from "../components/Layout";
import "./menuQr.css";
import {QRCodeSVG} from 'qrcode.react';
import { Typography } from 'antd';
const { Title } = Typography;


const MenuQr = () => {
  return (
    <AppLayout>
      <div className="invoiceContainer">
        <Title>Escaneá el QR para conocer el menú</Title>
        <QRCodeSVG 
          value="https://postimg.cc/hXRpS3fs"
          width={320}
          height={320}
        />
      </div>
    </AppLayout>
  )
}

export default MenuQr
