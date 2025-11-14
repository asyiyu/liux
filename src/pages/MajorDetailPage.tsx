import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Tabs, Row, Col, Button, List, Tag, Divider, Table } from 'antd';
import { BookOutlined, DollarOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import './MajorDetailPage.css';

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

// 模拟专业详情数据
const mockMajorDetail = {
  id: 101,
  name: '计算机科学',
  university: {
    id: 1,
    name: '哈佛大学',
    ranking: 1
  },
  description: '哈佛大学计算机科学专业是世界顶尖的计算机科学教育项目之一，致力于培养具有创新能力和技术专长的计算机科学家和工程师。该专业涵盖了计算机科学的各个领域，包括人工智能、机器学习、计算机系统、编程语言、算法分析等。',
  coreCourses: [
    '计算机科学导论',
    '数据结构与算法',
    '计算机系统原理',
    '人工智能基础',
    '机器学习',
    '编程语言原理',
    '数据库系统',
    '计算机网络'
  ],
  admissionRequirements: {
    academic: [
      '高中GPA 3.8以上',
      'SAT 1530+ 或 ACT 34+',
      'TOEFL 109+ 或 IELTS 7.5+',
      '数学和科学课程成绩优异'
    ],
    application: [
      '在线申请表',
      '高中成绩单',
      '标准化考试成绩',
      '2封推荐信',
      '个人陈述',
      '简历（可选）',
      '作品集（展示编程项目，可选但推荐）'
    ],
    deadlines: [
      { type: '提前申请', date: '11月1日' },
      { type: '常规申请', date: '1月1日' }
    ]
  },
  careerProspects: [
    { position: '软件工程师', salary: '$85,000-$120,000', demand: '高' },
    { position: '数据科学家', salary: '$90,000-$130,000', demand: '极高' },
    { position: '人工智能工程师', salary: '$95,000-$140,000', demand: '极高' },
    { position: '计算机系统分析师', salary: '$80,000-$115,000', demand: '高' },
    { position: '网络安全专家', salary: '$90,000-$135,000', demand: '高' }
  ],
  faculty: [
    { name: 'John Smith教授', title: '计算机科学系主任', expertise: '人工智能' },
    { name: 'Mary Johnson教授', title: '正教授', expertise: '机器学习' },
    { name: 'Robert Williams教授', title: '正教授', expertise: '计算机系统' },
    { name: 'Jennifer Davis教授', title: '副教授', expertise: '编程语言' }
  ],
  researchAreas: ['人工智能', '机器学习', '计算机视觉', '自然语言处理', '网络安全', '分布式系统'],
  programLength: '4年（本科）',
  tuition: '$55,000/年',
  enrollment: 350,
  acceptanceRate: '5%',
  accreditation: 'ABET认证'
}

const MajorDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [major, setMajor] = useState(mockMajorDetail)
  const [activeTab, setActiveTab] = useState('introduction')

  useEffect(() => {
    // 这里应该是API调用，现在使用模拟数据
    console.log('获取专业详情，ID:', id)
    // 模拟API延迟
    setTimeout(() => {
      // 这里可以根据ID筛选不同的专业数据
      setMajor(mockMajorDetail)
    }, 500)
  }, [id])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const careerColumns = [
    { title: '职位', dataIndex: 'position', key: 'position' },
    { title: '薪资范围', dataIndex: 'salary', key: 'salary' },
    { title: '市场需求', dataIndex: 'demand', key: 'demand' }
  ]

  return (
    <div className="major-detail-page">
      <section className="header-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">首页</Link>
            <span> / </span>
            <Link to={`/university/${major.university.id}`}>{major.university.name}</Link>
            <span> / </span>
            <Text>{major.name}</Text>
          </div>
          <Title level={2} className="major-name">{major.name}</Title>
          <div className="major-university">
            <UserOutlined />
            <Link to={`/university/${major.university.id}`}>{major.university.name}</Link>
            <Text className="ranking"> (QS排名: {major.university.ranking})</Text>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Tabs activeKey={activeTab} onChange={handleTabChange} className="major-tabs">
                <TabPane tab="专业介绍" key="introduction">
                  <Card className="tab-content">
                    <Paragraph className="major-description">
                      {major.description}
                    </Paragraph>
                    <Divider />
                    <div className="key-info-section">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <div className="info-item">
                            <CalendarOutlined className="info-icon" />
                            <div>
                              <Text strong>项目时长</Text>
                              <p>{major.programLength}</p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="info-item">
                            <DollarOutlined className="info-icon" />
                            <div>
                              <Text strong>学费</Text>
                              <p>{major.tuition}</p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="info-item">
                            <BookOutlined className="info-icon" />
                            <div>
                              <Text strong>录取率</Text>
                              <p>{major.acceptanceRate}</p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="info-item">
                            <BookOutlined className="info-icon" />
                            <div>
                              <Text strong>认证</Text>
                              <p>{major.accreditation}</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </TabPane>

                <TabPane tab="申请要求" key="requirements">
                  <Card className="tab-content">
                    <div className="requirements-section">
                      <Title level={5}>学术要求</Title>
                      <List
                        dataSource={major.admissionRequirements.academic}
                        renderItem={item => <List.Item>• {item}</List.Item>}
                      />
                      
                      <Divider />
                      
                      <Title level={5}>申请材料</Title>
                      <List
                        dataSource={major.admissionRequirements.application}
                        renderItem={item => <List.Item>• {item}</List.Item>}
                      />
                      
                      <Divider />
                      
                      <Title level={5}>申请截止日期</Title>
                      <List
                        dataSource={major.admissionRequirements.deadlines}
                        renderItem={item => (
                          <List.Item>
                            <Text strong>{item.type}:</Text> {item.date}
                          </List.Item>
                        )}
                      />
                    </div>
                  </Card>
                </TabPane>

                <TabPane tab="课程设置" key="courses">
                  <Card className="tab-content">
                    <Title level={5}>核心课程</Title>
                    <div className="courses-list">
                      {major.coreCourses.map((course, index) => (
                        <Tag key={index} color="blue" className="course-tag">{course}</Tag>
                      ))}
                    </div>
                    <Divider />
                    <Title level={5}>研究方向</Title>
                    <div className="research-areas">
                      {major.researchAreas.map((area, index) => (
                        <Tag key={index} color="green" className="research-tag">{area}</Tag>
                      ))}
                    </div>
                  </Card>
                </TabPane>

                <TabPane tab="就业前景" key="careers">
                  <Card className="tab-content">
                    <Table
                      columns={careerColumns}
                      dataSource={major.careerProspects}
                      pagination={false}
                      rowKey="position"
                    />
                  </Card>
                </TabPane>

                <TabPane tab="师资力量" key="faculty">
                  <Card className="tab-content">
                    <List
                      dataSource={major.faculty}
                      renderItem={professor => (
                        <List.Item className="faculty-item">
                          <List.Item.Meta
                            title={<Text strong>{professor.name}</Text>}
                            description={
                              <div>
                                <p>{professor.title}</p>
                                <p>研究方向: {professor.expertise}</p>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </TabPane>
              </Tabs>
            </Col>

            <Col xs={24} lg={8}>
              <Card className="sidebar-card">
                <Title level={4}>申请此专业</Title>
                <Paragraph>立即提交申请，获取专业顾问的一对一指导</Paragraph>
                <Button type="primary" size="large" block className="apply-button">
                  <Link to={`/apply/${major.id}`}>开始申请</Link>
                </Button>
                
                <Divider />
                
                <Title level={4}>联系顾问</Title>
                <Paragraph>有任何问题？联系我们的专业留学顾问</Paragraph>
                <Button size="large" block>
                  <Link to="/customer-service">咨询顾问</Link>
                </Button>
                
                <Divider />
                
                <Title level={5}>相关专业推荐</Title>
                <List
                  dataSource={[
                    { name: '数据科学', university: '麻省理工学院' },
                    { name: '人工智能', university: '斯坦福大学' },
                    { name: '软件工程', university: '加州大学伯克利分校' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Link to="#">{item.name}</Link>
                      <Text className="related-university"> - {item.university}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  )
}

export default MajorDetailPage