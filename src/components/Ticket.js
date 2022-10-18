import React from "react"
import "../App.css"
import "./ticket.css"
// 36227167-2023-45d7-ae9e-ff6810965062
const Ticket = ({ orderData, clientData }) => {
  console.log('orderData', orderData);
  const calculateTotal = () => {
    return orderData && orderData.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.menu.precio * currentValue.cantidad
    }, 0)
  }

  return (
    <div className="invoiceContainer">
      <div id="invoice-POS">
        <center id="top">
          <div className="logo"></div>
          <div className="info">
            <h2 style={{ fontSize: '28px' }}>Sentidos</h2>
          </div>
        </center>
        <div id="mid">
          <div className="info info-cliente">
            <h2>Información del cliente</h2>
            <p> 
              Nombre   : {clientData && clientData[0].nombre_cliente}<br />
              Apellido : {clientData && clientData[0].apellido_cliente}<br />
              DNI      : {clientData && clientData[0].dni}<br />
            </p>
          </div>
        </div>
        <div id="bot">
          <div id="table">
            <table>
              <tr className="tabletitle">
                <td className="item"><h2>Item</h2></td>
                <td className="Hours"><h2>Cantidad</h2></td>
                <td className="Rate"><h2>Total unitario</h2></td>
                <td className="Rate"><h2>Sub Total</h2></td>
              </tr>
              {orderData && orderData.map((item) => {
                return (
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">{item.menu.comida}</p></td>
                    <td className="tableitem"><p className="itemtext">{item.cantidad}</p></td>
                    <td className="tableitem"><p className="itemtext">${item.menu.precio}</p></td>
                    <td className="tableitem"><p className="itemtext">${item.menu.precio * item.cantidad}</p></td>
                  </tr>
                )
              })}
              <tr className="tabletitle">
                <td></td>
                <td></td>
                <td className="Rate"><h2>Total</h2></td>
                <td className="payment"><h2>${calculateTotal()}</h2></td>
              </tr>
            </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
