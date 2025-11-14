import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Result } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import './NotFoundPage.css'

const { Title, Paragraph } = Typography

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在"
          extra={
            <Link to="/">
              <Button type="primary" icon={<HomeOutlined />}>
                返回首页
              </Button>
            </Link>
          }
          className="result-container"
        >
          <div className="not-found-content">
            <Title level={3}>您可能遇到了以下情况：</Title>
            <Paragraph className="error-reason">
              • 页面地址输入错误<br />
              • 页面链接已过期<br />
              • 页面已被删除或移动<br />
              • 服务器暂时不可用
            </Paragraph>
            
            <Title level={4}>快速访问</Title>
            <div className="quick-links">
              <Link to="/" className="link-item">首页</Link>
              <Link to="/university/search" className="link-item">院校查询</Link>
              <Link to="/qs-ranking" className="link-item">QS排名</Link>
              <Link to="/customer-service" className="link-item">在线客服</Link>
            </div>
          </div>
        </Result>
      </div>
    </div>
  )
}

export default NotFoundPage