import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Tabs, Row, Col, Button, List, Tag, Divider } from 'antd';
import { StarOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import './UniversityDetailPage.css';

const { Title, Text, Paragraph } = Typography;

// 创建大学图片URL映射
const universityImages: Record<string, string[]> = {
  // 哈佛大学
  '1': [
    'https://picsum.photos/id/1/1200/800',
    'https://picsum.photos/id/101/1200/800',
    'https://picsum.photos/id/102/1200/800'
  ],
  // 麻省理工学院
  '2': [
    'https://picsum.photos/id/103/1200/800',
    'https://picsum.photos/id/104/1200/800'
  ],
  // 牛津大学
  '3': [
    'https://picsum.photos/id/105/1200/800',
    'https://picsum.photos/id/106/1200/800'
  ],
  // 剑桥大学
  '4': [
    'https://picsum.photos/id/107/1200/800',
    'https://picsum.photos/id/108/1200/800'
  ],
  // 斯坦福大学
  '5': [
    'https://picsum.photos/id/501/1200/800',
    'https://picsum.photos/id/502/1200/800'
  ],
  // 清华大学
  '6': [
    'https://picsum.photos/id/503/1200/800',
    'https://picsum.photos/id/504/1200/800'
  ],
  // 耶鲁大学
  '7': [
    'https://picsum.photos/id/505/1200/800',
    'https://picsum.photos/id/506/1200/800'
  ],
  // 哥伦比亚大学
  '8': [
    'https://picsum.photos/id/507/1200/800',
    'https://picsum.photos/id/508/1200/800'
  ],
  // 帝国理工学院
  '9': [
    'https://picsum.photos/id/509/1200/800',
    'https://picsum.photos/id/510/1200/800'
  ],
  // 多伦多大学
  '10': [
    'https://picsum.photos/id/511/1200/800',
    'https://picsum.photos/id/512/1200/800'
  ],
  // 悉尼大学
  '11': [
    'https://picsum.photos/id/513/1200/800',
    'https://picsum.photos/id/514/1200/800'
  ],
  // 香港大学
  '12': [
    'https://picsum.photos/id/515/1200/800',
    'https://picsum.photos/id/516/1200/800'
  ],
  // 新加坡国立大学
  '13': [
    'https://picsum.photos/id/517/1200/800',
    'https://picsum.photos/id/518/1200/800'
  ],
  // 东京大学
  '14': [
    'https://picsum.photos/id/519/1200/800',
    'https://picsum.photos/id/520/1200/800'
  ]
};

// 大学详情数据映射
interface UniversityDetail {
  id: number;
  name: string;
  country: string;
  city: string;
  ranking: number;
  founded: number;
  description: string;
  images: string[];
  majors: {
    id: number;
    name: string;
    minScore: number;
    description: string;
  }[];
  admissionRequirements: {
    undergraduate: {
      gpa: string;
      sat: string;
      toefl: string;
      ielts: string;
      requirements: string[];
    };
    graduate: {
      gpa: string;
      gre: string;
      toefl: string;
      ielts: string;
      requirements: string[];
    };
  };
  facilities: string[];
  studentLife: string;
}

const universities: Record<string, UniversityDetail> = {
  // 哈佛大学
  '1': {
    id: 1,
    name: '哈佛大学',
    country: '美国',
    city: '剑桥',
    ranking: 1,
    founded: 1636,
    description: '哈佛大学成立于1636年，是美国历史最悠久的高等学府，也是世界顶尖的研究型大学之一。哈佛拥有世界一流的师资力量和丰富的教学资源，培养了无数杰出人才，包括多位美国总统、诺贝尔奖得主和各行各业的领袖。',
    images: universityImages['1'] || [],
    majors: [
      { id: 101, name: '计算机科学', minScore: 650, description: '哈佛大学计算机科学专业致力于培养具有创新精神和技术能力的计算机人才。' },
      { id: 102, name: '经济学', minScore: 645, description: '经济学专业研究经济现象和规律，培养学生的分析和解决问题的能力。' },
      { id: 103, name: '医学', minScore: 655, description: '哈佛大学医学院是世界顶尖的医学教育机构，培养优秀的医学专业人才。' },
      { id: 104, name: '法学', minScore: 650, description: '哈佛大学法学院是美国最负盛名的法学院之一，提供卓越的法律教育。' },
      { id: 105, name: '商学院', minScore: 648, description: '哈佛商学院是全球最顶尖的商学院，培养商业领袖和创新者。' }
    ],
    admissionRequirements: {
      undergraduate: {
        gpa: '3.8以上',
        sat: '1500-1600',
        toefl: '100以上',
        ielts: '7.0以上',
        requirements: ['高中成绩单', '推荐信', '个人陈述', '课外活动经历']
      },
      graduate: {
        gpa: '3.5以上',
        gre: '320以上',
        toefl: '105以上',
        ielts: '7.5以上',
        requirements: ['大学成绩单', '推荐信', '个人陈述', '研究计划', '作品集（部分专业）']
      }
    },
    facilities: ['图书馆', '实验室', '体育馆', '学生宿舍', '餐厅', '研究中心'],
    studentLife: '哈佛大学校园生活丰富多彩，有超过400个学生社团和组织。学生可以参加各种学术、文化、体育和社交活动，丰富自己的课余生活。'
  },
  // 麻省理工学院
  '2': {
    id: 2,
    name: '麻省理工学院',
    country: '美国',
    city: '剑桥',
    ranking: 2,
    founded: 1861,
    description: '麻省理工学院（MIT）成立于1861年，是世界顶尖的私立研究型大学，以其在工程学、计算机科学、物理学和管理科学等领域的卓越成就而闻名。MIT致力于科学研究和技术创新，培养了众多诺贝尔奖得主和科技领域的领军人才。',
    images: universityImages['2'] || [],
    majors: [
      { id: 201, name: '电气工程与计算机科学', minScore: 655, description: 'MIT的EECS专业是世界顶尖的工程专业之一，致力于培养未来的科技领袖。' },
      { id: 202, name: '机械工程', minScore: 650, description: '机械工程专业专注于设计、分析和制造机械系统，为学生提供扎实的理论基础和实验技能。' },
      { id: 203, name: '物理学', minScore: 645, description: '物理学专业研究物质和能量的基本规律，为学生提供扎实的理论基础和实验技能。' },
      { id: 204, name: '经济学', minScore: 640, description: 'MIT经济学专业在全球享有盛誉，专注于实证研究和量化分析方法。' },
      { id: 205, name: '管理学', minScore: 645, description: '斯隆管理学院提供卓越的商科教育，培养具有技术背景的商业领袖。' }
    ],
    admissionRequirements: {
      undergraduate: {
        gpa: '3.9以上',
        sat: '1520-1600',
        toefl: '105以上',
        ielts: '7.5以上',
        requirements: ['高中成绩单', '推荐信', '个人陈述', '标准化考试成绩', '课外活动和奖项']
      },
      graduate: {
        gpa: '3.7以上',
        gre: '325以上',
        toefl: '110以上',
        ielts: '8.0以上',
        requirements: ['大学成绩单', '推荐信', '个人陈述', '研究计划', '标准化考试成绩']
      }
    },
    facilities: ['世界一流实验室', '图书馆', '体育馆', '创新中心', '学生宿舍', '餐厅'],
    studentLife: 'MIT拥有充满活力的校园生活，学生可以参与各种学术和社交活动。学校有超过500个学生组织，包括文化团体、体育俱乐部和学术社团。'
  },
  // 牛津大学
  '3': {
    id: 3,
    name: '牛津大学',
    country: '英国',
    city: '牛津',
    ranking: 3,
    founded: 1096,
    description: '牛津大学成立于11世纪，是英语世界中最古老的大学，也是世界顶尖的高等学府之一。牛津采用独特的学院制和导师制教学模式，培养了众多世界级的学者、政治家和艺术家。牛津大学在人文学科、社会科学和自然科学等领域都享有崇高声誉。',
    images: universityImages['3'] || [],
    majors: [
      { id: 301, name: '哲学、政治与经济学', minScore: 640, description: '牛津大学的PPE专业是其最负盛名的本科专业之一，培养全面发展的社会科学人才。' },
      { id: 302, name: '法学', minScore: 635, description: '牛津法学院是世界上最古老的法学院之一，提供卓越的法律教育。' },
      { id: 303, name: '物理学', minScore: 645, description: '物理学专业拥有悠久的历史和强大的研究实力，培养杰出的物理学家。' },
      { id: 304, name: '工程科学', minScore: 635, description: '工程科学专业涵盖多个工程领域，注重理论与实践相结合。' },
      { id: 305, name: '医学', minScore: 640, description: '牛津大学医学专业在全球享有盛誉，培养优秀的医学专业人才。' }
    ],
    admissionRequirements: {
      undergraduate: {
        gpa: 'A-level: A*AA以上',
        sat: '不适用，接受A-level或IB成绩',
        toefl: '110以上',
        ielts: '7.5以上（单项不低于7.0）',
        requirements: ['高中成绩单', '推荐信', '个人陈述', '面试', '特定科目的入学考试']
      },
      graduate: {
        gpa: '本科一等或二等一学位',
        gre: '部分专业要求',
        toefl: '110以上',
        ielts: '7.5以上（单项不低于7.0）',
        requirements: ['大学成绩单', '推荐信', '个人陈述', '研究计划', '面试（部分专业）']
      }
    },
    facilities: ['学院图书馆', '大学图书馆', '博物馆', '实验室', '体育设施', '学生宿舍'],
    studentLife: '牛津大学的学生生活丰富多样，学院制为学生提供了紧密的社区氛围。学生可以参加各种社团活动，包括文化团体、体育俱乐部、音乐和戏剧团体等。'
  },
  // 剑桥大学
  '4': {
    id: 4,
    name: '剑桥大学',
    country: '英国',
    city: '剑桥',
    ranking: 4,
    founded: 1209,
    description: '剑桥大学成立于1209年，是英语世界第二古老的大学，也是世界顶尖的高等学府之一。剑桥以其卓越的学术传统、杰出的科研成果和优秀的教学质量而闻名。大学采用学院制，培养了众多诺贝尔奖得主、科学家和思想家。',
    images: universityImages['4'] || [],
    majors: [
      { id: 401, name: '数学', minScore: 650, description: '剑桥大学数学专业是世界最顶尖的数学专业之一，培养了众多杰出数学家。' },
      { id: 402, name: '工程学', minScore: 640, description: '工程专业涵盖多个工程领域，注重理论与实践相结合。' },
      { id: 403, name: '计算机科学', minScore: 645, description: '计算机科学专业在人工智能和软件工程领域享有盛誉。' },
      { id: 404, name: '自然科学', minScore: 635, description: '自然科学专业涵盖物理、化学、生物等多个学科。' },
      { id: 405, name: '经济学', minScore: 638, description: '经济学专业在经济理论和应用经济学领域实力雄厚。' }
    ],
    admissionRequirements: {
      undergraduate: {
        gpa: 'A-level: A*A*A以上',
        sat: '不适用，接受A-level或IB成绩',
        toefl: '110以上',
        ielts: '7.5以上（单项不低于7.0）',
        requirements: ['高中成绩单', '推荐信', '个人陈述', '面试', '特定科目的入学考试']
      },
      graduate: {
        gpa: '本科一等或二等一学位',
        gre: '部分专业要求',
        toefl: '110以上',
        ielts: '7.5以上（单项不低于7.0）',
        requirements: ['大学成绩单', '推荐信', '个人陈述', '研究计划', '面试（部分专业）']
      }
    },
    facilities: ['图书馆系统', '实验室', '博物馆', '体育设施', '学生宿舍', '研究中心'],
    studentLife: '剑桥大学的学生生活丰富多彩，学院制为学生提供了紧密的社区氛围。学生可以参加各种社团活动，包括文化团体、体育俱乐部、音乐和戏剧团体等。'
  },
  // 斯坦福大学
  '5': {
    id: 5,
    name: '斯坦福大学',
    country: '美国',
    city: '斯坦福',
    ranking: 5,
    founded: 1885,
    description: '斯坦福大学成立于1885年，是世界顶尖的私立研究型大学之一。斯坦福以其在工程学、计算机科学、商学、医学等领域的卓越成就而闻名，培养了众多诺贝尔奖得主、科技企业家和各界领袖。硅谷的崛起与斯坦福大学密切相关。',
    images: universityImages['5'] || [],
    majors: [
      { id: 501, name: '计算机科学', minScore: 655, description: '斯坦福大学计算机科学专业是世界顶尖的CS专业之一，培养了众多科技领袖。' },
      { id: 502, name: '电气工程', minScore: 650, description: '电气工程专业在半导体、通信和信号处理领域享有盛誉。' },
      { id: 503, name: '商学', minScore: 648, description: '斯坦福商学院是全球最顶尖的商学院之一，培养创新企业家。' },
      { id: 504, name: '医学', minScore: 645, description: '斯坦福医学院在生物医学研究和临床医学领域处于领先地位。' },
      { id: 505, name: '心理学', minScore: 640, description: '心理学专业在认知心理学和临床心理学领域实力雄厚。' }
    ],
    admissionRequirements: {
      undergraduate: {
        gpa: '3.9以上',
        sat: '1500-1600',
        toefl: '105以上',
        ielts: '7.5以上',
        requirements: ['高中成绩单', '推荐信', '个人陈述', '标准化考试成绩', '课外活动']
      },
      graduate: {
        gpa: '3.6以上',
        gre: '320以上',
        toefl: '105以上',
        ielts: '7.5以上',
        requirements: ['大学成绩单', '推荐信', '个人陈述', '研究计划', '工作经验']
      }
    },
    facilities: ['图书馆系统', '实验室', '医疗中心', '体育中心', '学生宿舍', '艺术中心'],
    studentLife: '斯坦福大学拥有美丽的校园和创新的学术氛围，学生可以参与各种创业活动和科研项目。'
  }
};

// 默认大学详情（哈佛大学）
const defaultUniversityDetail = universities['1'];

const UniversityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [university, setUniversity] = useState<UniversityDetail>(defaultUniversityDetail)
  const [activeTab, setActiveTab] = useState('introduction')

  useEffect(() => {
    // 这里应该是API调用，现在使用模拟数据
    // 根据ID获取大学详情
    console.log('获取大学详情，ID:', id)
    // 模拟API延迟
    setTimeout(() => {
      // 根据ID从大学详情映射中获取对应的大学信息
      const selectedUniversity = universities[id || '1'];
      setUniversity(selectedUniversity || defaultUniversityDetail)
    }, 500)
  }, [id])

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  return (
      <div className="university-detail-page" style={styles.universityDetailPage}>
      <section className="header-section">
        <div className="container">
          <div className="university-header">
            <div className="university-info">
              <div className="ranking-badge">
                <StarOutlined style={{ color: '#ffd700' }} />
                <Text strong>QS排名: {university.ranking}</Text>
              </div>
              <Title level={2} className="university-name">{university.name}</Title>
              <div className="location-info">
                <BookOutlined />
                <Text>{university.city}, {university.country}</Text>
              </div>
              <div className="founded-info">
                <CalendarOutlined />
                <Text>成立于 {university.founded} 年</Text>
              </div>
            </div>
            <div className="university-image-placeholder" style={styles.universityImagePlaceholder}>
        {university.images && university.images.length > 0 ? (
          <img 
            src={university.images[0]} 
            alt={`${university.name} 校园图片`} 
            className="university-main-image"
            style={styles.universityMainImage}
          />
        ) : (
          <div className="image-placeholder-text" style={styles.imagePlaceholderText}>{university.name}</div>
        )}
      </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <Tabs 
            activeKey={activeTab} 
            onChange={handleTabChange} 
            className="university-tabs" 
            style={styles.universityTabs}
            items={[
              {
                key: 'introduction',
                label: '院校简介',
                children: (
                  <Card className="tab-content" style={styles.tabContent}>
                    <Paragraph className="university-description">
                      {university.description}
                    </Paragraph>
                    <Divider />
                    <div className="facilities-section">
                      <Title level={5}>校园设施</Title>
                      <div className="facilities-list">
                        {university.facilities.map((facility, index) => (
                          <Tag key={index} color="blue">{facility}</Tag>
                        ))}
                      </div>
                    </div>
                    <Divider />
                    <div className="student-life-section">
                      <Title level={5}>学生生活</Title>
                      <Paragraph>{university.studentLife}</Paragraph>
                    </div>
                  </Card>
                )
              },
              {
                key: 'majors',
                label: '专业设置',
                children: (
                  <Card className="tab-content" style={styles.tabContent}>
                    <List
                      dataSource={university.majors}
                      renderItem={major => (
                        <List.Item>
                          <List.Item.Meta
                            title={<span>{major.name} <Tag color="green">最低分数: {major.minScore}</Tag></span>}
                            description={major.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                )
              },
              {
                key: 'admission',
                label: '录取要求',
                children: (
                  <Card className="tab-content" style={styles.tabContent}>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Title level={5}>本科录取要求</Title>
                        <Paragraph><strong>GPA:</strong> {university.admissionRequirements.undergraduate.gpa}</Paragraph>
                        <Paragraph><strong>SAT:</strong> {university.admissionRequirements.undergraduate.sat}</Paragraph>
                        <Paragraph><strong>TOEFL:</strong> {university.admissionRequirements.undergraduate.toefl}</Paragraph>
                        <Paragraph><strong>IELTS:</strong> {university.admissionRequirements.undergraduate.ielts}</Paragraph>
                        <Title level={5}>申请材料:</Title>
                        <List
                          size="small"
                          dataSource={university.admissionRequirements.undergraduate.requirements}
                          renderItem={item => <List.Item>{item}</List.Item>}
                        />
                      </Col>
                      <Col span={12}>
                        <Title level={5}>研究生录取要求</Title>
                        <Paragraph><strong>GPA:</strong> {university.admissionRequirements.graduate.gpa}</Paragraph>
                        <Paragraph><strong>GRE:</strong> {university.admissionRequirements.graduate.gre}</Paragraph>
                        <Paragraph><strong>TOEFL:</strong> {university.admissionRequirements.graduate.toefl}</Paragraph>
                        <Paragraph><strong>IELTS:</strong> {university.admissionRequirements.graduate.ielts}</Paragraph>
                        <Title level={5}>申请材料:</Title>
                        <List
                          size="small"
                          dataSource={university.admissionRequirements.graduate.requirements}
                          renderItem={item => <List.Item>{item}</List.Item>}
                        />
                      </Col>
                    </Row>
                  </Card>
                )
              },
              {
                key: 'gallery',
                label: '校园图片',
                children: (
                  <Card className="tab-content" style={styles.tabContent}>
                    <Row gutter={[16, 16]}>
                      {university.images.map((image, index) => (
                        <Col span={12} key={index}>
                          <img 
                            src={image} 
                            alt={`${university.name} 图片${index + 1}`} 
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card>
                )
              }
            ]}
          />
        </div>
      </section>

      <section className="action-section">
        <div className="container">
          <div className="action-buttons">
            <Link to="/application">
              <Button type="primary" size="large" style={styles.applyButton}>
                立即申请
              </Button>
            </Link>
            <Link to="/university-search">
              <Button size="large" style={styles.backButton}>
                返回搜索
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  universityDetailPage: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  universityImagePlaceholder: {
    width: '300px',
    height: '200px',
    backgroundColor: '#e8e8e8',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  universityMainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  imagePlaceholderText: {
    fontSize: '16px',
    color: '#666',
    fontWeight: 'bold'
  },
  universityTabs: {
    marginBottom: '20px'
  },
  tabContent: {
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  applyButton: {
    marginRight: '16px',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff'
  },
  backButton: {
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    color: '#333'
  }
}

export default UniversityDetailPage