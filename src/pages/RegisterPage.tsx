import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button, Checkbox, Typography, message, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './RegisterPage.css';

const { Text } = Typography;
const { Item } = Form;
const { Option } = Select;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 模拟注册请求
      console.log('注册信息:', values);
      // 这里应该是API调用
      setTimeout(() => {
        message.success('注册成功，请登录');
        // 注册成功后跳转到登录页
        window.location.href = '/login';
      }, 1500);
    } catch (error) {
      message.error('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('表单验证失败:', errorInfo);
  };

  return (
    <div className="register-page">
      <Card className="register-card" title="用户注册">
        <Form
          form={form}
          name="register"
          initialValues={{ type: 'student', agree: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Item
            label="用户类型"
            name="type"
            rules={[{ required: true, message: '请选择用户类型' }]}
          >
            <Select placeholder="请选择用户类型">
              <Option value="student">学生</Option>
              <Option value="parent">家长</Option>
              <Option value="agent">留学顾问</Option>
            </Select>
          </Item>

          <Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 20, message: '用户名长度在3-20个字符之间' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Item>

          <Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
          </Item>

          <Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
          </Item>

          <Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度至少为6位' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </Item>

          <Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                }
              })
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Item>

          <Item
            name="agree"
            valuePropName="checked"
            rules={[{ required: true, message: '请阅读并同意用户协议和隐私政策' }]}
          >
            <Checkbox>
              我已阅读并同意 <Link to="/terms">《用户协议》</Link> 和 <Link to="/privacy">《隐私政策》</Link>
            </Checkbox>
          </Item>

          <Item>
            <Button type="primary" htmlType="submit" className="register-button" loading={loading}>
              注册
            </Button>
          </Item>

          <div className="login-link">
            <Text>已有账号？</Text>
            <Link to="/login">立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
