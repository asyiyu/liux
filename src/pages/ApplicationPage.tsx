import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Radio, DatePicker, Upload, Typography, Card, Row, Col, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ApplicationPage.css';

const { Title, Text } = Typography;
const { Option } = Select;

// 模拟院校数据
const universities = [
  { id: 1, name: '哈佛大学', country: '美国' },
  { id: 2, name: '牛津大学', country: '英国' },
  { id: 3, name: '麻省理工学院', country: '美国' },
  { id: 4, name: '剑桥大学', country: '英国' },
  { id: 5, name: '斯坦福大学', country: '美国' },
];

// 模拟专业数据
const majors = [
  { id: 1, name: '计算机科学' },
  { id: 2, name: '商业管理' },
  { id: 3, name: '电子工程' },
  { id: 4, name: '金融学' },
  { id: 5, name: '机械工程' },
];

const ApplicationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 表单提交处理
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 模拟API提交
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('提交的申请数据:', values);
      setSubmitted(true);
      
      Modal.success({
        title: '申请提交成功',
        content: '您的申请已成功提交，我们将尽快处理并通知您结果。',
      });
    } catch (error) {
      Modal.error({
        title: '申请提交失败',
        content: '请稍后重试或联系客服。',
      });
    } finally {
      setLoading(false);
    }
  };

  // 文件上传配置
  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    beforeUpload: (file: any) => {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        Modal.error({
          title: '文件过大',
          content: '请上传小于10MB的文件',
        });
      }
      return false; // 阻止自动上传
    },
  };

  return (
    <div className="application-page">
      <div className="container">
        {/* 页面标题 */}
        <div className="page-header">
          <Title level={2}>在线留学申请</Title>
          <Text type="secondary">请填写以下信息提交您的留学申请</Text>
        </div>

        <Card className="application-form-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="application-form"
          >
            {/* 申请院校与专业 */}
            <Title level={4}>申请信息</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="申请院校"
                  name="university"
                  rules={[{ required: true, message: '请选择申请院校' }]}
                >
                  <Select placeholder="请选择申请院校">
                    {universities.map((university) => (
                      <Option key={university.id} value={university.name}>
                        {university.name} - {university.country}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="申请专业"
                  name="major"
                  rules={[{ required: true, message: '请选择申请专业' }]}
                >
                  <Select placeholder="请选择申请专业">
                    {majors.map((major) => (
                      <Option key={major.id} value={major.name}>
                        {major.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="申请学期"
                  name="semester"
                  rules={[{ required: true, message: '请选择申请学期' }]}
                >
                  <Select placeholder="请选择申请学期">
                    <Option value="fall">秋季</Option>
                    <Option value="spring">春季</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="申请年份"
                  name="year"
                  rules={[{ required: true, message: '请选择申请年份' }]}
                >
                  <Select placeholder="请选择申请年份">
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* 个人信息 */}
            <Title level={4}>个人信息</Title>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入您的姓名' }]}
                >
                  <Input placeholder="请输入您的姓名" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="性别"
                  name="gender"
                  rules={[{ required: true, message: '请选择性别' }]}
                >
                  <Radio.Group>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱地址' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input placeholder="请输入邮箱地址" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="手机号码"
                  name="phone"
                  rules={[{ required: true, message: '请输入手机号码' }]}
                >
                  <Input placeholder="请输入手机号码" />
                </Form.Item>
              </Col>
            </Row>

            {/* 申请材料 */}
            <Title level={4}>申请材料</Title>
            <Text type="secondary">请上传以下必需材料（PDF、Word或图片格式，单个文件不超过10MB）</Text>
            
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="个人简历"
                  name="resume"
                  rules={[{ required: true, message: '请上传个人简历' }]}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>选择简历文件</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="成绩单"
                  name="transcript"
                  rules={[{ required: true, message: '请上传成绩单' }]}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>选择成绩单文件</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="语言成绩单"
                  name="languageCertificate"
                  rules={[{ required: true, message: '请上传语言成绩单' }]}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>选择语言成绩单</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="护照/身份证"
                  name="idDocument"
                  rules={[{ required: true, message: '请上传护照或身份证' }]}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>选择身份证明文件</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            {/* 申请动机 */}
            <Form.Item
              label="申请动机"
              name="motivation"
              rules={[{ required: true, message: '请输入申请动机' }]}
            >
              <Input.TextArea rows={4} placeholder="请简要描述您的申请动机和目标" />
            </Form.Item>

            {/* 协议条款 */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[{ required: true, message: '请阅读并同意申请条款' }]}
            >
              <Radio>
                我已阅读并同意 <Link to="/terms">《申请条款》</Link> 和 <Link to="/privacy">《隐私政策》</Link>
              </Radio>
            </Form.Item>

            {/* 提交按钮 */}
            <div className="form-actions">
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                提交申请
              </Button>
              <Button onClick={() => form.resetFields()} size="large">
                重置表单
              </Button>
            </div>
          </Form>
        </Card>

        {/* 申请提示 */}
        <Card className="tips-card" style={{ marginTop: 24 }}>
          <Title level={5}>申请提示</Title>
          <ul>
            <li>请确保所有上传材料的真实性和完整性</li>
            <li>建议提前准备所有申请材料</li>
            <li>提交后我们将在3-5个工作日内处理您的申请</li>
            <li>如有疑问，请联系客服：400-123-4567</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationPage;