import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Row, Col, Typography, Divider } from 'antd';
import { SearchOutlined, StarOutlined, RobotOutlined, BulbOutlined } from '@ant-design/icons'
import './UniversitySearchPage.css'

const { Title, Text, Paragraph } = Typography
const { Item } = Form

// 模拟大学数据 - 包含不同分数层次的院校
const mockUniversities = [
  // 顶尖院校 (650+分)
  { id: 1, name: '哈佛大学', country: '美国', ranking: 1, minScore: 650, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/177/400/300' },
  { id: 2, name: '牛津大学', country: '英国', ranking: 2, minScore: 640, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/223/400/300' },
  { id: 3, name: '麻省理工学院', country: '美国', ranking: 3, minScore: 655, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/241/400/300' },
  { id: 4, name: '剑桥大学', country: '英国', ranking: 4, minScore: 645, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/253/400/300' },
  { id: 5, name: '斯坦福大学', country: '美国', ranking: 5, minScore: 648, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/266/400/300' },
  
  // 高分院校 (600-649分)
  { id: 6, name: '清华大学', country: '中国', ranking: 15, minScore: 630, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/278/400/300' },
  { id: 7, name: '北京大学', country: '中国', ranking: 18, minScore: 625, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/290/400/300' },
  { id: 8, name: '耶鲁大学', country: '美国', ranking: 16, minScore: 635, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/301/400/300' },
  { id: 9, name: '哥伦比亚大学', country: '美国', ranking: 19, minScore: 620, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/312/400/300' },
  { id: 10, name: '帝国理工学院', country: '英国', ranking: 7, minScore: 638, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/323/400/300' },
  
  // 中高分院校 (550-599分)
  { id: 11, name: '多伦多大学', country: '加拿大', ranking: 25, minScore: 580, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/334/400/300' },
  { id: 12, name: '悉尼大学', country: '澳大利亚', ranking: 38, minScore: 560, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/345/400/300' },
  { id: 13, name: '香港大学', country: '中国香港', ranking: 22, minScore: 590, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/356/400/300' },
  { id: 14, name: '新加坡国立大学', country: '新加坡', ranking: 11, minScore: 585, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/367/400/300' },
  { id: 15, name: '东京大学', country: '日本', ranking: 23, minScore: 575, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/378/400/300' },
  
  // 中等分数院校 (500-549分)
  { id: 16, name: '墨尔本大学', country: '澳大利亚', ranking: 33, minScore: 540, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/389/400/300' },
  { id: 17, name: '英属哥伦比亚大学', country: '加拿大', ranking: 34, minScore: 535, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/390/400/300' },
  { id: 18, name: '曼彻斯特大学', country: '英国', ranking: 27, minScore: 530, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/391/400/300' },
  { id: 19, name: '加州大学圣地亚哥分校', country: '美国', ranking: 54, minScore: 525, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/392/400/300' },
  { id: 20, name: '慕尼黑工业大学', country: '德国', ranking: 50, minScore: 520, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/393/400/300' },
  
  // 中低分院校 (450-499分)
  { id: 21, name: '奥克兰大学', country: '新西兰', ranking: 68, minScore: 490, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/394/400/300' },
  { id: 22, name: '都柏林大学学院', country: '爱尔兰', ranking: 171, minScore: 485, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/395/400/300' },
  { id: 23, name: '南洋理工大学', country: '新加坡', ranking: 26, minScore: 495, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/396/400/300' },
  { id: 24, name: '昆士兰大学', country: '澳大利亚', ranking: 47, minScore: 480, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/397/400/300' },
  { id: 25, name: '阿尔伯塔大学', country: '加拿大', ranking: 110, minScore: 475, programs: ['本科', '硕士', '博士'], image: 'https://picsum.photos/id/398/400/300' },
  
  // 低分院校 (400-449分)
  { id: 26, name: ' Liverpool大学', country: '英国', ranking: 190, minScore: 440, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/399/400/300' },
  { id: 27, name: '谢菲尔德大学', country: '英国', ranking: 96, minScore: 435, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/400/400/300' },
  { id: 28, name: '诺丁汉大学', country: '英国', ranking: 114, minScore: 430, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/401/400/300' },
  { id: 29, name: '西澳大学', country: '澳大利亚', ranking: 90, minScore: 425, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/402/400/300' },
  { id: 30, name: '卡尔加里大学', country: '加拿大', ranking: 242, minScore: 420, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/403/400/300' },
  
  // 超低分院校 (350-399分) - 保底选择
  { id: 31, name: '贝尔法斯特女王大学', country: '英国', ranking: 209, minScore: 390, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/404/400/300' },
  { id: 32, name: '邓迪大学', country: '英国', ranking: 307, minScore: 385, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/405/400/300' },
  { id: 33, name: '拉籌伯大学', country: '澳大利亚', ranking: 316, minScore: 380, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/406/400/300' },
  { id: 34, name: '布鲁克大学', country: '加拿大', ranking: '1000+', minScore: 375, programs: ['本科'], image: 'https://picsum.photos/id/407/400/300' },
  { id: 35, name: '坎特伯雷大学', country: '新西兰', ranking: 384, minScore: 370, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/408/400/300' },
  
  // 极低分院校 (300-349分) - 容易录取
  { id: 36, name: '中央兰开夏大学', country: '英国', ranking: 900, minScore: 340, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/409/400/300' },
  { id: 37, name: '南威尔士大学', country: '英国', ranking: 1000, minScore: 330, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/410/400/300' },
  { id: 38, name: '格里菲斯大学', country: '澳大利亚', ranking: 300, minScore: 320, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/411/400/300' },
  { id: 39, name: '皇家墨尔本理工学院', country: '澳大利亚', ranking: 140, minScore: 310, programs: ['本科', '硕士'], image: 'https://picsum.photos/id/412/400/300' },
  { id: 40, name: '温尼伯大学', country: '加拿大', ranking: 1000, minScore: 300, programs: ['本科'], image: 'https://picsum.photos/id/413/400/300' }
]

const UniversitySearchPage: React.FC = () => {
  const [form] = Form.useForm()
  const [searchResults, setSearchResults] = useState(mockUniversities)
  const [gaokaoScore, setGaokaoScore] = useState('')
  const [languageScore, setLanguageScore] = useState('')

  const onSearch = (values: any) => {
    console.log('AI智能选校条件:', values)
    
    // AI智能选校算法 - 基于分数匹配和智能推荐
    let filtered = mockUniversities
    
    // 按照高考成绩过滤，只显示分数足够的大学
    if (values.gaokaoScore) {
      const score = parseInt(values.gaokaoScore)
      filtered = filtered.filter(uni => uni.minScore <= score)
      
      // AI智能推荐：根据分数区间进行智能排序和分类
      filtered = filtered.sort((a, b) => {
        // 优先推荐与分数最匹配的大学（分数要求接近但不超过实际分数太多）
        const aDiff = score - a.minScore
        const bDiff = score - b.minScore
        
        // 如果分数差距相近，按排名排序
        if (Math.abs(aDiff - bDiff) <= 10) {
          return a.ranking - b.ranking
        }
        
        // 否则按匹配度排序（分数要求越接近实际分数越好）
        return Math.abs(aDiff) - Math.abs(bDiff)
      })
      
      // 为每个大学添加推荐等级标签
      filtered = filtered.map(uni => {
        const diff = score - uni.minScore
        let recommendationLevel = ''
        let recommendationColor = ''
        
        if (diff >= 100) {
          recommendationLevel = '保底院校'
          recommendationColor = '#52c41a'
        } else if (diff >= 50) {
          recommendationLevel = '稳妥院校'
          recommendationColor = '#1890ff'
        } else if (diff >= 20) {
          recommendationLevel = '匹配院校'
          recommendationColor = '#faad14'
        } else if (diff >= 0) {
          recommendationLevel = '冲刺院校'
          recommendationColor = '#ff4d4f'
        }
        
        return {
          ...uni,
          recommendationLevel,
          recommendationColor,
          scoreDiff: diff
        }
      })
    }
    
    // 如果有语言成绩，可以进一步优化搜索结果
    if (values.languageScore) {
      console.log('语言成绩:', values.languageScore)
      // 这里可以添加语言成绩的匹配逻辑
    }
    
    setSearchResults(filtered)
  }

  return (
    <div className="university-search-page">
      <section className="search-section">
        <div className="container">
          <div className="ai-header">
            <Title level={1} className="ai-title">
              <RobotOutlined style={{ color: '#1890ff', marginRight: 12 }} />
              AI智能选校系统
            </Title>
            <Paragraph className="ai-description">
              <BulbOutlined style={{ color: '#faad14', marginRight: 8 }} />
              基于您的成绩，AI将为您智能推荐最适合的院校，无需复杂的筛选条件，一键获取精准匹配结果
            </Paragraph>
          </div>
          
          <Card className="ai-search-card">
            <Form form={form} layout="vertical" onFinish={onSearch}>
              <div className="score-input-section">
                <Title level={4}>
                  <StarOutlined style={{ color: '#ffd700', marginRight: 8 }} />
                  输入您的成绩
                </Title>
                
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Item 
                      label="高考成绩" 
                      name="gaokaoScore"
                      rules={[{ required: true, message: '请输入您的高考成绩' }]}
                    >
                      <Input 
                        placeholder="请输入您的高考成绩" 
                        type="number" 
                        size="large"
                        value={gaokaoScore}
                        onChange={(e) => setGaokaoScore(e.target.value)}
                        addonAfter="分"
                      />
                    </Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Item label="语言成绩（可选）" name="languageScore">
                      <Input 
                        placeholder="如雅思6.5、托福90等" 
                        size="large"
                        value={languageScore}
                        onChange={(e) => setLanguageScore(e.target.value)}
                      />
                    </Item>
                  </Col>
                </Row>
              </div>

              <Divider />

              <div className="ai-search-actions">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SearchOutlined />} 
                  size="large"
                  className="ai-search-btn"
                >
                  AI智能选校
                </Button>
                <Button 
                  onClick={() => {
                    form.resetFields()
                    setGaokaoScore('')
                    setLanguageScore('')
                    setSearchResults(mockUniversities)
                  }} 
                  size="large"
                >
                  重置
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </section>

      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <Title level={3}>
              AI为您找到 {searchResults.length} 所匹配院校
            </Title>
            <Text type="secondary">
              根据您的成绩智能推荐，按匹配度排序
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            {searchResults.map(university => (
              <Col xs={24} sm={12} md={8} key={university.id}>
                <Card hoverable className="university-card ai-recommended">
                  <div className="university-image-container">
                    <img src={university.image} alt={university.name} className="university-image" />
                    <div className="ai-badge">
                      <RobotOutlined /> AI推荐
                    </div>
                    {university.recommendationLevel && (
                      <div 
                        className="recommendation-badge" 
                        style={{ backgroundColor: university.recommendationColor }}
                      >
                        {university.recommendationLevel}
                      </div>
                    )}
                  </div>
                  <div className="university-ranking">
                    <StarOutlined style={{ color: '#ffd700' }} />
                    <Text strong>QS排名: {university.ranking}</Text>
                  </div>
                  <Title level={4} className="university-name">
                    {university.name}
                  </Title>
                  <Paragraph className="university-info">
                    国家/地区: {university.country}
                  </Paragraph>
                  <Paragraph className="university-info">
                    最低分数要求: <Text strong style={{ color: '#1890ff' }}>{university.minScore}分</Text>
                  </Paragraph>
                  {university.scoreDiff !== undefined && (
                    <Paragraph className="university-info">
                      分数优势: <Text strong style={{ 
                        color: university.scoreDiff >= 50 ? '#52c41a' : 
                               university.scoreDiff >= 20 ? '#faad14' : '#ff4d4f' 
                      }}>
                        +{university.scoreDiff}分
                      </Text>
                    </Paragraph>
                  )}
                  <Paragraph className="university-info">
                    提供课程: {university.programs.join(', ')}
                  </Paragraph>
                  <Button type="primary" block>
                    <Link to={`/university/${university.id}`}>查看详情</Link>
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          {searchResults.length === 0 && (
            <div className="no-results">
              <Title level={4}>
                <RobotOutlined style={{ marginRight: 8 }} />
                暂未找到匹配院校
              </Title>
              <Text>请尝试调整您的成绩要求，或联系我们的留学顾问获取更多建议</Text>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default UniversitySearchPage