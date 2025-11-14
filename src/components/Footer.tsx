// 现代页脚组件 - 灵感来自Uiverse
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        {/* 品牌信息 */}
        <div className="footer-column">
          <div className="footer-brand">
            <div 
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                boxShadow: '0 10px 30px rgba(26, 115, 232, 0.3)'
              }}
            >
              <span style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>留</span>
            </div>
            <Title level={4} style={{ margin: '0 0 20px 0', fontWeight: 700, color: 'white', fontSize: '1.5rem' }}>
              留学服务平台
            </Title>
            <Paragraph style={{ margin: 0, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
              专业的留学申请服务提供商，为您的海外求学之旅保驾护航，提供全方位的留学咨询和申请服务。
            </Paragraph>
            
            {/* 社交媒体图标 */}
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FacebookOutlined />
              </a>
              <a href="#" aria-label="Twitter">
                <TwitterOutlined />
              </a>
              <a href="#" aria-label="Instagram">
                <InstagramOutlined />
              </a>
              <a href="#" aria-label="LinkedIn">
                <LinkedinOutlined />
              </a>
            </div>
          </div>
        </div>
        
        {/* 快速链接 */}
        <div className="footer-column">
          <h3>快速链接</h3>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/search">院校查询</Link>
            </li>
            <li>
              <Link to="/apply/1">在线申请</Link>
            </li>
            <li>
              <Link to="/customer-service">联系我们</Link>
            </li>
            <li>
              <Link to="/about">关于我们</Link>
            </li>
          </ul>
        </div>
        
        {/* 服务项目 */}
        <div className="footer-column">
          <h3>服务项目</h3>
          <ul>
            <li>
              <a href="#">留学咨询</a>
            </li>
            <li>
              <a href="#">院校申请</a>
            </li>
            <li>
              <a href="#">签证办理</a>
            </li>
            <li>
              <a href="#">语言培训</a>
            </li>
            <li>
              <a href="#">文书指导</a>
            </li>
          </ul>
        </div>
        
        {/* 联系我们 */}
        <div className="footer-column">
          <h3>联系我们</h3>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <PhoneOutlined style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>400-123-4567</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <MailOutlined style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>contact@studyabroad.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <EnvironmentOutlined style={{ color: 'var(--primary-color)', fontSize: '1.1rem', marginTop: '2px' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>北京市朝阳区建国路88号留学大厦15层</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* 底部版权信息 */}
      <div className="footer-bottom">
        <p>© 2024 留学服务平台. 保留所有权利.</p>
      </div>
    </footer>
  );
};

export default Footer;