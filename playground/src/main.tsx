import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { DashboardFilled, SmileOutlined } from '@ant-design/icons'
import Layout from '@virtual-antd-layout'

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh' }}>
      <BrowserRouter>
        <Layout routes={[
          {
            path: '/',
            flatMenu: true,
            children: [
              {
                icon: <DashboardFilled />,
                name: '首页',
                path: '/react',
                headerRender: false,
                menuRender: false,
                footerRender: false,
                menuHeaderRender: false,
                component: lazy(() => import('./Pages/React')),
              },
              {
                icon: <SmileOutlined />,
                name: '二',
                path: '/two',
                children: [
                  {
                    name: '二二',
                    path: 'two-child',
                    component: lazy(() => import('./Pages/Two/TwoChild')),
                  },
                ],
                component: lazy(() => import('./Pages/Two')),
              },
              {
                icon: <SmileOutlined />,
                name: '三',
                path: '/three',
                children: [
                  {
                    index: true,
                    element: <Navigate replace to="asdas"></Navigate>,
                  },
                  {
                    hideInMenu: true,
                    name: 'sansan',
                    path: ':id',
                    component: lazy(() => import('./Pages/Three')),
                  },
                ],
              },
            ],
          },

        ]}>
        </Layout>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
