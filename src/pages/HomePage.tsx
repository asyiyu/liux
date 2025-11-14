// React导入已移除
import { Link } from 'react-router-dom';
import { Row, Col, Button, Typography, Space, Card, Tag, Divider } from 'antd';
import { SearchOutlined, GlobalOutlined, UserOutlined, TrophyOutlined, DatabaseOutlined, BorderOutlined, FileTextOutlined, CalendarOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import './HomePage.css';

const { Title, Paragraph } = Typography
// 移除未使用的Meta引入

const HomePage = () => {
  // 热门院校数据
  const popularUniversities = [
    { id: 1, name: '哈佛大学', country: '美国', ranking: 1, image: 'https://picsum.photos/id/177/400/300' },
    { id: 2, name: '牛津大学', country: '英国', ranking: 2, image: 'https://picsum.photos/id/223/400/300' },
    { id: 3, name: '麻省理工学院', country: '美国', ranking: 3, image: 'https://picsum.photos/id/241/400/300' },
    { id: 4, name: '剑桥大学', country: '英国', ranking: 4, image: 'https://picsum.photos/id/253/400/300' }
  ]
  
  // 成功案例数据
  const successStories = [
    { id: 1, name: '张明', major: '计算机科学', university: '斯坦福大学', country: '美国', image: 'https://picsum.photos/id/64/400/300' },
    { id: 2, name: '李婷', major: '金融学', university: '牛津大学', country: '英国', image: 'https://picsum.photos/id/65/400/300' },
    { id: 3, name: '王伟', major: '机械工程', university: '麻省理工学院', country: '美国', image: 'https://picsum.photos/id/91/400/300' },
    { id: 4, name: '刘芳', major: '生物医学', university: '剑桥大学', country: '英国', image: 'https://picsum.photos/id/62/400/300' }
  ]

  // 留学资讯文章数据
  const studyAbroadArticles = [
    {
      id: 1,
      title: '2025年美国留学申请全攻略：从准备到录取的完整指南',
      summary: '详细介绍美国留学申请的各个环节，包括选校策略、文书写作、面试技巧等，助您成功申请理想院校。',
      category: '申请指南',
      date: '2025-01-15',
      views: 15234,
      likes: 892,
      image: 'https://picsum.photos/seed/us-guide/400/250.jpg',
      tags: ['美国留学', '申请攻略', '文书指导']
    },
    {
      id: 2,
      title: '英国G5大学录取要求解析：如何提高申请成功率',
      summary: '深入分析牛津、剑桥、帝国理工等G5大学的录取标准，提供针对性的申请策略和准备建议。',
      category: '院校分析',
      date: '2025-01-12',
      views: 12876,
      likes: 756,
      image: 'https://picsum.photos/seed/uk-g5/400/250.jpg',
      tags: ['英国留学', 'G5大学', '录取要求']
    },
    {
      id: 3,
      title: '雅思vs托福：2025年最新对比分析及选择建议',
      summary: '全面对比雅思和托福两种语言考试的特点、难度、认可度，帮助考生选择最适合的考试。',
      category: '语言考试',
      date: '2025-01-10',
      views: 9834,
      likes: 623,
      image: 'https://picsum.photos/seed/language-test/400/250.jpg',
      tags: ['雅思', '托福', '语言考试']
    },
    {
      id: 4,
      title: '2025年加拿大留学移民新政解读：留学后移民路径更清晰',
      summary: '解读加拿大最新的留学移民政策，分析各类移民项目的申请条件和成功案例。',
      category: '政策解读',
      date: '2025-01-08',
      views: 11234,
      likes: 687,
      image: 'https://picsum.photos/seed/canada-policy/400/250.jpg',
      tags: ['加拿大留学', '移民政策', '留学移民']
    },
    {
      id: 5,
      title: '澳大利亚八大名校专业排名及就业前景分析',
      summary: '详细分析澳大利亚八大联盟各校的优势专业、就业率和薪资水平，为选校提供参考。',
      category: '院校分析',
      date: '2025-01-05',
      views: 8976,
      likes: 534,
      image: 'https://picsum.photos/seed/australia-university/400/250.jpg',
      tags: ['澳大利亚留学', '八大名校', '就业前景']
    },
    {
      id: 6,
      title: '2025年留学奖学金申请技巧：如何获得全额奖学金',
      summary: '分享各类留学奖学金的申请技巧和成功案例，帮助优秀学生获得经济支持。',
      category: '奖学金',
      date: '2025-01-03',
      views: 14567,
      likes: 892,
      image: 'https://picsum.photos/seed/scholarship/400/250.jpg',
      tags: ['奖学金', '申请技巧', '全额奖学金']
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      '申请指南': '#1890ff',
      '院校分析': '#52c41a',
      '语言考试': '#fa8c16',
      '政策解读': '#722ed1',
      '奖学金': '#eb2f96'
    }
    return colors[category] || '#666'
  }

  return (
    <div className="home-page">
      {/* 全屏背景图区域 */}
      <section className="hero-section full-screen-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Title level={1} className="hero-title">开启您的全球留学之旅</Title>
          <Paragraph className="hero-subtitle">
            从这里，走向世界顶尖学府，实现您的留学梦想
          </Paragraph>
          <div className="hero-cta">
            <Button 
              type="primary" 
              size="large" 
              style={{ 
                padding: '12px 36px', 
                fontSize: '1.1rem', 
                borderRadius: '8px' 
              }}
            >
              <Link to="/search" className="white-link">探索留学机会</Link>
            </Button>
          </div>
          {/* 滚动指示器已移除 */}
        </div>
      </section>

      {/* 热门院校推荐 */}
      <section className="universities-section">
        <div className="universities-container">
          <h2 className="universities-title">热门院校推荐</h2>
          <p className="universities-subtitle">
            精选全球顶尖大学，助您找到理想的留学目标。点击查看详情了解更多专业与申请信息。
          </p>
          <Row gutter={[32, 32]}>
            {popularUniversities.map((university) => (
              <Col key={university.id} xs={24} sm={12} md={8} lg={6}>
                <div className="university-card">
                  {university.image ? (
                    <div className="university-image-container">
                      <img 
                        className="university-image" 
                        alt={university.name} 
                        src={university.image} 
                      />
                    </div>
                  ) : (
                    <div className="university-image-placeholder">
                      <TrophyOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                    </div>
                  )}
                  <div className="university-info">
                    <Link to={`/university/${university.id}`}>
                      <h3 className="university-name">{university.name}</h3>
                    </Link>
                    <div className="university-rank">
                      <TrophyOutlined style={{ fontSize: 16, color: '#ffc107' }} />
                      世界排名 #{university.ranking}
                    </div>
                    <div className="university-location">
                      <GlobalOutlined style={{ fontSize: 16, color: '#999' }} />
                      {university.country}
                    </div>
                    <div className="university-btn">
                      <Link to={`/university/${university.id}`}>
                        <Button className="btn-primary">查看详情</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: '40px' }}>
            <Link to="/qs-ranking">
              <Button 
                type="text" 
                style={{ color: '#667eea', fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease' }}
              >
                查看全部排名
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 留学资讯板块 */}
      <section className="articles-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} className="section-title articles-title">留学资讯</Title>
            <Paragraph style={{ fontSize: '1.2rem', color: 'rgba(0,0,0,0.7)', maxWidth: '700px', margin: '20px auto 0', lineHeight: '1.6' }}>
              提供最新的留学资讯、申请指南、院校分析和政策解读，助您掌握留学动态，规划完美留学之路。
            </Paragraph>
          </div>
          
          {/* 文章分类标签 */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Space size={[16, 16]} wrap>
              {['全部', '申请指南', '院校分析', '语言考试', '政策解读', '奖学金'].map((category) => (
                <Tag
                  key={category}
                  style={{ 
                    padding: '6px 16px', 
                    fontSize: '14px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    border: category === '全部' ? 'none' : '1px solid #d9d9d9',
                    background: category === '全部' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
                    color: category === '全部' ? 'white' : '#666'
                  }}
                >
                  {category}
                </Tag>
              ))}
            </Space>
          </div>

          {/* 文章列表 */}
          <Row gutter={[32, 32]}>
            {studyAbroadArticles.map((article) => (
              <Col key={article.id} xs={24} md={12} lg={8}>
                <Card
                  hoverable
                  className="article-card"
                  cover={
                    <div className="article-image-container">
                      <img 
                        alt={article.title} 
                        src={article.image}
                        className="article-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://picsum.photos/seed/article${article.id}/400/250.jpg`;
                        }}
                      />
                      <div className="article-category-badge">
                        <Tag color={getCategoryColor(article.category)}>
                          {article.category}
                        </Tag>
                      </div>
                    </div>
                  }
                  actions={[
                    <div className="article-stats">
                      <EyeOutlined /> {article.views}
                    </div>,
                    <div className="article-stats">
                      <HeartOutlined /> {article.likes}
                    </div>,
                    <div className="article-stats">
                      <CalendarOutlined /> {article.date}
                    </div>
                  ]}
                >
                  <Card.Meta
                    title={
                      <Link to={`/article/${article.id}`} className="article-title-link">
                        {article.title}
                      </Link>
                    }
                    description={
                      <div>
                        <Paragraph 
                          ellipsis={{ rows: 3 }} 
                          style={{ marginBottom: '16px', color: '#666' }}
                        >
                          {article.summary}
                        </Paragraph>
                        <div className="article-tags">
                          {article.tags.map((tag) => (
                            <Tag key={tag} size="small" style={{ marginBottom: '4px' }}>
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* 查看更多按钮 */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button 
              type="primary" 
              size="large"
              style={{ 
                padding: '12px 40px', 
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              查看更多资讯
            </Button>
          </div>
        </div>
      </section>

      {/* 精彩校园生活 */}
      <section className="campus-life-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} className="section-title">精彩校园生活</Title>
            <Paragraph style={{ fontSize: '1.2rem', color: 'rgba(0,0,0,0.7)', maxWidth: '700px', margin: '20px auto 0', lineHeight: '1.6' }}>
              感受全球顶尖大学的校园氛围，提前了解留学生活的多彩体验。
            </Paragraph>
          </div>
          <div className="photo-gallery">
            <div className="gallery-row">
              <div className="gallery-item large">
                <div className="photo-overlay">
                  <div className="photo-caption">哈佛大学校园</div>
                </div>
                <img src="https://picsum.photos/id/152/800/600" alt="哈佛大学校园" />
              </div>
              <div className="gallery-item small">
                <div className="photo-overlay">
                  <div className="photo-caption">牛津大学图书馆</div>
                </div>
                <img src="https://picsum.photos/id/24/600/400" alt="牛津大学图书馆" />
              </div>
              <div className="gallery-item medium">
                <div className="photo-overlay">
                  <div className="photo-caption">剑桥大学赛艇队</div>
                </div>
                <img src="https://picsum.photos/id/36/700/500" alt="剑桥大学赛艇队" />
              </div>
            </div>
            <div className="gallery-row">
              <div className="gallery-item small">
                <div className="photo-overlay">
                  <div className="photo-caption">MIT实验室</div>
                </div>
                <img src="https://picsum.photos/id/48/600/400" alt="MIT实验室" />
              </div>
              <div className="gallery-item medium">
                <div className="photo-overlay">
                  <div className="photo-caption">校园社团活动</div>
                </div>
                <img src="https://picsum.photos/id/60/700/500" alt="校园社团活动" />
              </div>
              <div className="gallery-item large">
                <div className="photo-overlay">
                  <div className="photo-caption">留学生交流</div>
                </div>
                <img src="https://picsum.photos/id/82/800/600" alt="留学生交流" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的优势 */}
      <section className="features-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} className="section-title">我们的优势</Title>
            <Paragraph style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '700px', margin: '20px auto 0', lineHeight: '1.6' }}>
              借助全球顶尖教育资源与AI技术，我们为您提供个性化的留学申请服务，让申请过程更简单、成功率更高。
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12} lg={6}>
              <div className="feature-card feature-card-1">
                <Typography.Text>
                  <DatabaseOutlined style={{ fontSize: '2.5rem', color: 'white' }} />
                  <Typography.Title level={4}>全球院校数据库</Typography.Title>
                  <Typography.Paragraph>
                    我们拥有涵盖全球200多个国家和地区的顶尖院校数据库，提供最新的专业排名与申请要求，帮助您找到最适合的留学目标。
                  </Typography.Paragraph>
                </Typography.Text>
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="feature-card feature-card-2">
                <Typography.Text>
                  <BorderOutlined style={{ fontSize: '2.5rem', color: 'white' }} />
                  <Typography.Title level={4}>智能申请评估</Typography.Title>
                  <Typography.Paragraph>
                    基于人工智能算法，我们能根据您的学术背景、语言能力和个人特点，预测申请成功率并提供针对性改进建议。
                  </Typography.Paragraph>
                </Typography.Text>
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="feature-card feature-card-3">
                <Typography.Text>
                  <FileTextOutlined style={{ fontSize: '2.5rem', color: 'white' }} />
                  <Typography.Title level={4}>文书指导服务</Typography.Title>
                  <Typography.Paragraph>
                    我们的专业团队将为您提供个性化的留学文书指导，包括个人陈述、推荐信和简历优化，帮助您在众多申请者中脱颖而出。
                  </Typography.Paragraph>
                </Typography.Text>
              </div>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <div className="feature-card feature-card-4">
                <Typography.Text>
                  <UserOutlined style={{ fontSize: '2.5rem', color: 'white' }} />
                  <Typography.Title level={4}>专属留学顾问</Typography.Title>
                  <Typography.Paragraph>
                    每位申请者都将获得一位经验丰富的专属留学顾问，全程指导申请流程，解答疑问并提供专业建议。
                  </Typography.Paragraph>
                </Typography.Text>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 成功案例 */}
      <section className="success-stories-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} className="section-title success-title">成功案例</Title>
            <Paragraph style={{ fontSize: '1.2rem', color: 'rgba(0,0,0,0.7)', maxWidth: '700px', margin: '20px auto 0', lineHeight: '1.6' }}>
              看看我们帮助的学生如何成功申请到全球顶尖院校，实现留学梦想。
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            {successStories.map((story) => (
              <Col key={story.id} xs={24} sm={12} md={8} lg={6}>
                <div className="success-story-card">
                  <div className="success-story-image-container">
                    <img 
                      className="success-story-image" 
                      alt={story.name} 
                      src={story.image} 
                    />
                  </div>
                  <div className="success-story-info">
                    <h3 className="success-story-name">{story.name}</h3>
                    <p className="success-story-major">{story.major}</p>
                    <div className="success-story-university">
                      <TrophyOutlined style={{ fontSize: 16, color: '#667eea' }} />
                      {story.university}
                    </div>
                    <div className="success-story-country">
                      <GlobalOutlined style={{ fontSize: 16, color: '#999' }} />
                      {story.country}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 留学申请流程 */}
      <section className="process-section">
        <div className="process-container">
          <h2 className="process-title">留学申请流程</h2>
          <p className="process-subtitle">
            我们简化了复杂的留学申请流程，通过以下四个步骤，让您轻松实现留学梦想。每一步都有专业顾问全程指导。
          </p>
          <div className="timeline-container">
            <div className="timeline">
              <div className="timeline-progress"></div>
            </div>
            <div className="process-steps">
              {[
                { id: 1, title: '免费评估', description: '专业顾问为您进行留学评估' },
                { id: 2, title: '院校匹配', description: '根据成绩智能匹配适合的院校' },
                { id: 3, title: '材料准备', description: '指导您准备申请所需材料' },
                { id: 4, title: '提交申请', description: '帮助您提交申请并跟踪进度' }
              ].map((step, index) => (
                <div key={step.id} className="process-step">
                  <div className="process-step-icon">
                    <span className="process-step-number">{index + 1}</span>
                  </div>
                  <div className="process-step-inner">
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <Title level={2}>准备好开启您的留学之旅了吗？</Title>
            <Paragraph>立即开始免费评估，获取个性化留学方案</Paragraph>
            <Space>
              <Button type="primary" size="large">
                <Link to="/search" className="white-link">开始查询</Link>
              </Button>
              <Button size="large">
                <Link to="/customer-service">联系顾问</Link>
              </Button>
            </Space>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage