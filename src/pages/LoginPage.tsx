import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Checkbox, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './LoginPage.css'

const { Title, Text } = Typography
const { Item } = Form

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      // 模拟登录请求
      console.log('登录信息:', values)
      // 这里应该是API调用
      setTimeout(() => {
        message.success('登录成功')
        // 登录成功后跳转到首页
        window.location.href = '/'
      }, 1000)
    } catch (error) {
      message.error('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('表单验证失败:', errorInfo)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card" title={<Title level={3}>欢迎登录</Title>}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Item
              label="用户名/邮箱"
              name="username"
              rules={[{ required: true, message: '请输入用户名或邮箱' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名或邮箱" />
            </Item>

            <Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Item>

            <Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Item>

            <Item className="login-options">
              <Link to="/forgot-password" className="forgot-password">忘记密码？</Link>
            </Item>

            <Item>
              <Button type="primary" htmlType="submit" className="login-button" loading={loading}>
                登录
              </Button>
            </Item>

            <div className="register-link">
              <Text>还没有账号？</Text>
              <Link to="/register">立即注册</Link>
            </div>
          </Form>
        </Card>

        <div className="login-info">
          <Title level={4}>为什么选择我们</Title>
          <ul className="feature-list">
            <li>专业的留学申请服务团队</li>
            <li>个性化留学规划指导</li>
            <li>免费的院校匹配系统</li>
            <li>全程跟踪申请进度</li>
            <li>24小时在线客服支持</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LoginPage