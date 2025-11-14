import { useState, useEffect } from 'react';
import { Menu, Button, Layout, Typography, Avatar } from 'antd';
import { HomeOutlined, SearchOutlined, BarChartOutlined, MessageOutlined, LogoutOutlined, MenuOutlined, XOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import './Navbar.css';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // 模拟登录状态
  const isLoggedIn = false
  const username = '用户名'

  // 菜单项
  const menuItems: MenuProps['items'] = [
    { 
      key: 'home', 
      icon: <HomeOutlined />, 
      label: <Link to="/" onClick={() => setMobileMenuOpen(false)}>首页</Link> 
    },
    { 
      key: 'search', 
      icon: <SearchOutlined />, 
      label: <Link to="/search" onClick={() => setMobileMenuOpen(false)}>院校查询</Link> 
    },
    { 
      key: 'application', 
      icon: <GlobalOutlined />, 
      label: <Link to="/application" onClick={() => setMobileMenuOpen(false)}>在线申请</Link> 
    },
    { 
      key: 'qs-ranking', 
      icon: <BarChartOutlined />, 
      label: <Link to="/qs-ranking" onClick={() => setMobileMenuOpen(false)}>QS排名</Link> 
    },
    { 
      key: 'customer-service', 
      icon: <MessageOutlined />, 
      label: <Link to="/customer-service" onClick={() => setMobileMenuOpen(false)}>在线客服</Link> 
    }
  ]

  // 获取当前选中的菜单键
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    const key = path.split('/')[1];
    return menuItems.some((item) => item && item.key === key) ? key : '';
  };

  return (
    <Header className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ padding: 0, background: 'transparent' }}>
      <div className="container navbar-container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo区域 */}
        <div className="logo" style={{ display: 'flex', alignItems: 'center', height: '64px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <div 
                  className="logo-icon"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    boxShadow: '0 4px 20px rgba(26, 115, 232, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <GlobalOutlined style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }} />
                </div>
            <Title 
              level={4} 
              style={{ 
                margin: 0, 
                color: 'var(--text-primary, #262626)', 
                fontWeight: 700,
                fontSize: '1.25rem'
              }}
            >
              留学服务平台
            </Title>
          </Link>
        </div>
        
        {/* 桌面菜单 */}
        <div className="desktop-menu" style={{ display: 'flex', flex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <Menu 
            mode="horizontal" 
            selectedKeys={[getSelectedKey()]} 
            items={menuItems} 
            style={{ borderBottom: 0, background: 'transparent', justifyContent: 'center', flex: 1 }}
          />
        </div>
        
        {/* 用户菜单和客服按钮 */}
        <div className="user-menu" style={{ display: 'flex', alignItems: 'center' }}>
          {isLoggedIn ? (
            <Menu mode="horizontal" style={{ borderBottom: 0, background: 'transparent' }}>
              <Menu.SubMenu title={<span><Avatar>{username[0]}</Avatar> {username}</span>}>
                <Menu.Item key="user-center">个人中心</Menu.Item>
                <Menu.Item key="applications">我的申请</Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>退出登录</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/login" style={{ marginRight: 8 }}><Button type="text">登录</Button></Link>
              <Link to="/register">
                <Button 
                  type="primary" 
                  className="register-button"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    borderRadius: '8px',
                    fontWeight: 600,
                    padding: '8px 20px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  注册
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* 移动端菜单按钮 */}
        <div className="mobile-menu-button" style={{ display: 'none' }}>
          <Button
            type="text"
            icon={mobileMenuOpen ? <XOutlined /> : <MenuOutlined />}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ fontSize: '1.5rem', padding: 8 }}
          />
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          background: 'white',
          zIndex: 999,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: 16
        }}>
          <Menu mode="vertical" selectedKeys={[getSelectedKey()]} items={menuItems} style={{ borderRight: 0 }} />
          <div className="mobile-user-menu" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
            {isLoggedIn ? (
              <div className="user-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar>{username[0]}</Avatar>
                  <span style={{ marginLeft: 8 }}>{username}</span>
                </div>
                <Button type="text" icon={<LogoutOutlined />}>退出登录</Button>
              </div>
            ) : (
              <div className="mobile-auth-buttons" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}><Button block>登录</Button></Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}><Button block type="primary">注册</Button></Link>
              </div>
            )}
          </div>
        </div>
      )}
    </Header>
  )
}

export default Navbar