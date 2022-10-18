import React, { useContext } from 'react';
import './layout.css';
import {
  EditOutlined,
  FundOutlined,
  ProfileOutlined,
  ImportOutlined,
  DollarOutlined,
  ContactsOutlined,
  CalendarOutlined,
  QrcodeOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const { Content, Footer, Sider } = Layout;

const items = (history, userContext) => [
  {
    key: 1,
    icon: <EditOutlined />,
    label: 'Registrar pedido',
    onClick: () => history.push('/'),
    disabled: !(userContext && userContext.user && (userContext.user.rol === 1 || userContext.user.rol === 3))
  },
  {
    key: 2,
    icon: <ProfileOutlined />,
    label: 'Generar factura',
    onClick: () => history.push('/invoice'),
    disabled: !(userContext && userContext.user && (userContext.user.rol === 1 || userContext.user.rol === 4))
  },
  {
    key: 3,
    icon: <DollarOutlined />,
    label: 'Registrar pago',
    onClick: () => history.push('/pay'),
    disabled: !(userContext && userContext.user && (userContext.user.rol === 1 || userContext.user.rol === 4))
  },
  {
    key: 4,
    icon: <ContactsOutlined />,
    label: 'Listado de clientes',
    onClick: () => history.push('/clients'),
    disabled: !(userContext && userContext.user && userContext.user.rol === 1)
  },
  {
    key: 5,
    icon: <CalendarOutlined />,
    label: 'Mesas reservadas',
    onClick: () => history.push('/tables'),
    disabled: !(userContext && userContext.user && (userContext.user.rol === 1 || userContext.user.rol === 2))
  },
  {
    key: 6,
    icon: <QrcodeOutlined />,
    label: 'Menu QR',
    onClick: () => history.push('/menu-qr'),
    disabled: !(userContext && userContext.user && userContext.user.rol === 1)
  },
  {
    key: 7,
    icon: <PlusOutlined />,
    label: 'Generar menu',
    onClick: () => history.push('/menu'),
    disabled: !(userContext && userContext.user && userContext.user.rol === 1)
  },
  // {
  //   key: 8,
  //   icon: <FundOutlined />,
  //   label: 'Informe de ingresos',
  //   onClick: () => history.push('/income'),
  //   disabled: !(userContext && userContext.user && userContext.user.rol === 1)
  // },
  {
    key: 9,
    icon: <ImportOutlined />,
    label: 'Cerrar sesión',
    onClick: () => {
      userContext.setUser(null)
      history.push('/login')
    }
  }
]

function AppLayout ({ children }) {
  const history = useHistory()
  const userContext = useContext(UserContext)

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
          // style={{ background: '#ffc9ae' }}
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline"  items={items(history, userContext)} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: 'center',
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Sentidos © 2022 Creado por Rusetti
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout;
