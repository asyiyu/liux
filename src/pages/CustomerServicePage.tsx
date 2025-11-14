import React, { useState } from 'react'
import { Card, Input, Button } from 'antd'
import './CustomerServicePage.css'

// const { Title } = Typography
const { TextArea } = Input

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
}

const CustomerServicePage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: '您好！欢迎咨询留学服务。', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { id: Date.now().toString(), content: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      let reply = '感谢您的咨询，我们的顾问将尽快为您提供帮助。'
      if (input.includes('费用')) reply = '不同国家留学费用不同，详情请咨询我们的顾问。'
      if (input.includes('申请')) reply = '留学申请需要准备简历、推荐信等材料。'
      
      const botMessage: Message = { id: (Date.now() + 1).toString(), content: reply, sender: 'bot' }
      setMessages(prev => [...prev, botMessage])
      setLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="simple-chat-container">
      <Card title="在线客服"
        style={{ maxWidth: 800, margin: '0 auto', marginTop: 50 }}
      >
        <div className="message-list"
          style={{
            height: 400,
            overflowY: 'auto',
            padding: 16,
            marginBottom: 16
          }}
        >
          {messages.map(msg => (
            <div 
              key={msg.id}
              style={{
                marginBottom: 16,
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: msg.sender === 'user' ? '#1890ff' : '#f0f0f0',
                  color: msg.sender === 'user' ? 'white' : 'black'
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="input-area"
          style={{ display: 'flex', gap: 8 }}
        >
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="请输入您的问题..."
            rows={2}
            style={{ flex: 1 }}
            disabled={loading}
          />
          <Button 
            type="primary" 
            onClick={handleSend}
            loading={loading}
            disabled={!input.trim() || loading}
          >
            发送
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CustomerServicePage