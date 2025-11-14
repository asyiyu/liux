import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Select, Card, Typography, Row, Col, Empty, Spin } from 'antd';
import { TrophyOutlined, FlagOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './QSRankingPage.css';

const { Title, Text } = Typography
const { Option } = Select
const { Search } = Input

// 模拟QS排名数据
interface University {
  id: string
  rank: number
  university: string
  country: string
  countryCode: string
  overallScore: number
  rankChange?: number
  researchScore: number
  teachingScore: number
  citationsScore: number
  internationalScore: number
  employerScore: number
}

// 生成模拟数据
const generateMockData = (): University[] => {
  // QS 2026世界大学排名前100名数据
  const qs2026TopUniversities = [
    // 前30名 - 更新为2026年最新排名
    { id: 'uni-1', rank: 1, university: '麻省理工学院', country: '美国', countryCode: 'US', overallScore: 100, rankChange: 0, researchScore: 100, teachingScore: 100, citationsScore: 100, internationalScore: 100, employerScore: 100 },
    { id: 'uni-2', rank: 2, university: '帝国理工学院', country: '英国', countryCode: 'UK', overallScore: 99.4, rankChange: 0, researchScore: 100, teachingScore: 100, citationsScore: 97.5, internationalScore: 100, employerScore: 100 },
    { id: 'uni-3', rank: 3, university: '斯坦福大学', country: '美国', countryCode: 'US', overallScore: 98.9, rankChange: 3, researchScore: 100, teachingScore: 100, citationsScore: 96.5, internationalScore: 94.2, employerScore: 95 },
    { id: 'uni-4', rank: 4, university: '牛津大学', country: '英国', countryCode: 'UK', overallScore: 97.9, rankChange: 0, researchScore: 100, teachingScore: 100, citationsScore: 100, internationalScore: 98.8, employerScore: 100 },
    { id: 'uni-5', rank: 5, university: '哈佛大学', country: '美国', countryCode: 'US', overallScore: 97.7, rankChange: -1, researchScore: 100, teachingScore: 100, citationsScore: 99.4, internationalScore: 79.1, employerScore: 98 },
    { id: 'uni-6', rank: 6, university: '剑桥大学', country: '英国', countryCode: 'UK', overallScore: 97.2, rankChange: -1, researchScore: 100, teachingScore: 100, citationsScore: 99.2, internationalScore: 100, employerScore: 100 },
    { id: 'uni-7', rank: 7, university: '苏黎世联邦理工大学（瑞士联邦理工学院）', country: '瑞士', countryCode: 'CH', overallScore: 96.7, rankChange: 0, researchScore: 99.3, teachingScore: 95.8, citationsScore: 90, internationalScore: 100, employerScore: 95 },
    { id: 'uni-8', rank: 8, university: '新加坡国立大学', country: '新加坡', countryCode: 'SG', overallScore: 95.9, rankChange: 0, researchScore: 96.9, teachingScore: 92.4, citationsScore: 85, internationalScore: 100, employerScore: 97 },
    { id: 'uni-9', rank: 9, university: '伦敦大学学院', country: '英国', countryCode: 'UK', overallScore: 95.8, rankChange: 0, researchScore: 100, teachingScore: 99.9, citationsScore: 95, internationalScore: 99.6, employerScore: 96 },
    { id: 'uni-10', rank: 10, university: '加州理工大学（Caltech)', country: '美国', countryCode: 'US', overallScore: 94.3, rankChange: 0, researchScore: 90.7, teachingScore: 61.8, citationsScore: 95, internationalScore: 100, employerScore: 98 },
    { id: 'uni-11', rank: 11, university: '香港大学（HKU）', country: '中国香港', countryCode: 'HK', overallScore: 94.2, rankChange: 7, researchScore: 100, teachingScore: 82.3, citationsScore: 90, internationalScore: 100, employerScore: 96 },
    { id: 'uni-12', rank: 12, university: '南洋理工大学', country: '新加坡', countryCode: 'SG', overallScore: 93.7, rankChange: 4, researchScore: 93.1, teachingScore: 86.9, citationsScore: 85, internationalScore: 100, employerScore: 95 },
    { id: 'uni-13', rank: 13, university: '芝加哥大学', country: '美国', countryCode: 'US', overallScore: 93, rankChange: 6, researchScore: 92.8, teachingScore: 87.7, citationsScore: 90, internationalScore: 86.1, employerScore: 96 },
    { id: 'uni-14', rank: 14, university: '北京大学', country: '中国', countryCode: 'CN', overallScore: 92.6, rankChange: 0, researchScore: 37.3, teachingScore: 83.2, citationsScore: 88, internationalScore: 59.9, employerScore: 94 },
    { id: 'uni-15', rank: 15, university: '宾夕法尼亚大学', country: '美国', countryCode: 'US', overallScore: 92.5, rankChange: -4, researchScore: 76.3, teachingScore: 89.4, citationsScore: 88, internationalScore: 96.9, employerScore: 97 },
    { id: 'uni-16', rank: 16, university: '康奈尔大学', country: '美国', countryCode: 'US', overallScore: 91.6, rankChange: 8, researchScore: 75.7, teachingScore: 93, citationsScore: 85, internationalScore: 57.6, employerScore: 95 },
    { id: 'uni-17', rank: 17, university: '加州大学伯克利分校', country: '美国', countryCode: 'US', overallScore: 91.2, rankChange: -5, researchScore: 70.6, teachingScore: 96.7, citationsScore: 90, internationalScore: 95.6, employerScore: 98 },
    { id: 'uni-17-2', rank: 17, university: '清华大学', country: '中国', countryCode: 'CN', overallScore: 91.2, rankChange: 3, researchScore: 31.9, teachingScore: 80.4, citationsScore: 85, internationalScore: 39.5, employerScore: 94 },
    { id: 'uni-19', rank: 19, university: '墨尔本大学', country: '澳大利亚', countryCode: 'AU', overallScore: 90.8, rankChange: 6, researchScore: 100, teachingScore: 96.9, citationsScore: 88, internationalScore: 96.7, employerScore: 96 },
    { id: 'uni-20', rank: 20, university: '新南威尔士大学（UNSW）', country: '澳大利亚', countryCode: 'AU', overallScore: 90.7, rankChange: 3, researchScore: 99.9, teachingScore: 97.6, citationsScore: 88, internationalScore: 100, employerScore: 96 },
    { id: 'uni-21', rank: 21, university: '耶鲁大学', country: '美国', countryCode: 'US', overallScore: 90.4, rankChange: 6, researchScore: 72.7, teachingScore: 92.9, citationsScore: 85, internationalScore: 86.7, employerScore: 97 },
    { id: 'uni-22', rank: 22, university: '洛桑联邦理工学院（EPFL)', country: '瑞士', countryCode: 'CH', overallScore: 90.2, rankChange: 10, researchScore: 100, teachingScore: 83.6, citationsScore: 85, internationalScore: 100, employerScore: 93 },
    { id: 'uni-23', rank: 22, university: '慕尼黑工业大学', country: '德国', countryCode: 'DE', overallScore: 90.2, rankChange: 10, researchScore: 98.9, teachingScore: 95.9, citationsScore: 85, internationalScore: 86.3, employerScore: 94 },
    { id: 'uni-24', rank: 24, university: '约翰霍普金斯大学', country: '美国', countryCode: 'US', overallScore: 89.7, rankChange: 10, researchScore: 94.2, teachingScore: 97.4, citationsScore: 85, internationalScore: 70.8, employerScore: 95 },
    { id: 'uni-25', rank: 25, university: '普林斯顿大学', country: '美国', countryCode: 'US', overallScore: 89.4, rankChange: -1, researchScore: 70, teachingScore: 82.6, citationsScore: 85, internationalScore: 12.7, employerScore: 97 },
    
    // 26-50名
    { id: 'uni-26', rank: 26, university: '麦吉尔大学', country: '加拿大', countryCode: 'CA', overallScore: 89.2, rankChange: 0, researchScore: 95, teachingScore: 92, citationsScore: 85, internationalScore: 90, employerScore: 94 },
    { id: 'uni-27', rank: 27, university: '东京大学', country: '日本', countryCode: 'JP', overallScore: 89.0, rankChange: 1, researchScore: 99.1, teachingScore: 91.2, citationsScore: 85, internationalScore: 84, employerScore: 93 },
    { id: 'uni-28', rank: 28, university: '伦敦国王学院', country: '英国', countryCode: 'UK', overallScore: 88.8, rankChange: 1, researchScore: 96.8, teachingScore: 92.5, citationsScore: 85, internationalScore: 95, employerScore: 93 },
    { id: 'uni-29', rank: 29, university: '香港科技大学', country: '中国香港', countryCode: 'HK', overallScore: 88.5, rankChange: 1, researchScore: 96.1, teachingScore: 89.3, citationsScore: 85, internationalScore: 92, employerScore: 95 },
    { id: 'uni-30', rank: 30, university: '爱丁堡大学', country: '英国', countryCode: 'UK', overallScore: 88.2, rankChange: -17, researchScore: 99.1, teachingScore: 94.5, citationsScore: 85, internationalScore: 96, employerScore: 94 },
    { id: 'uni-31', rank: 31, university: '昆士兰大学', country: '澳大利亚', countryCode: 'AU', overallScore: 83.7, rankChange: 3, researchScore: 94.5, teachingScore: 88.7, citationsScore: 35.2, internationalScore: 90, employerScore: 92 },
    { id: 'uni-32', rank: 32, university: '瑞士洛桑联邦理工学院', country: '瑞士', countryCode: 'CH', overallScore: 83.5, rankChange: 0, researchScore: 97.2, teachingScore: 85.8, citationsScore: 72.3, internationalScore: 96, employerScore: 93 },
    { id: 'uni-33', rank: 33, university: '慕尼黑工业大学', country: '德国', countryCode: 'DE', overallScore: 83.2, rankChange: 2, researchScore: 95.6, teachingScore: 83.4, citationsScore: 86.7, internationalScore: 91, employerScore: 94 },
    { id: 'uni-34', rank: 34, university: '新加坡管理大学', country: '新加坡', countryCode: 'SG', overallScore: 83.0, rankChange: 5, researchScore: 88.7, teachingScore: 92.1, citationsScore: 68.5, internationalScore: 94, employerScore: 97 },
    { id: 'uni-35', rank: 35, university: '阿姆斯特丹大学', country: '荷兰', countryCode: 'NL', overallScore: 82.8, rankChange: -1, researchScore: 96.2, teachingScore: 86.8, citationsScore: 91.4, internationalScore: 92, employerScore: 91 },
    { id: 'uni-36', rank: 36, university: '加利福尼亚大学洛杉矶分校', country: '美国', countryCode: 'US', overallScore: 82.6, rankChange: -3, researchScore: 98.5, teachingScore: 91.2, citationsScore: 45.3, internationalScore: 93, employerScore: 95 },
    { id: 'uni-37', rank: 37, university: '香港中文大学', country: '中国香港', countryCode: 'HK', overallScore: 82.4, rankChange: -2, researchScore: 94.7, teachingScore: 86.5, citationsScore: 84.1, internationalScore: 90, employerScore: 93 },
    { id: 'uni-38', rank: 38, university: '加州大学圣地亚哥分校', country: '美国', countryCode: 'US', overallScore: 82.2, rankChange: 0, researchScore: 97.8, teachingScore: 89.4, citationsScore: 62.1, internationalScore: 92, employerScore: 93 },
    { id: 'uni-39', rank: 39, university: '复旦大学', country: '中国', countryCode: 'CN', overallScore: 82.0, rankChange: 9, researchScore: 97.3, teachingScore: 92.8, citationsScore: 89.4, internationalScore: 84, employerScore: 92 },
    { id: 'uni-40', rank: 40, university: '阿尔伯塔大学', country: '加拿大', countryCode: 'CA', overallScore: 81.8, rankChange: 4, researchScore: 92.5, teachingScore: 85.7, citationsScore: 76.3, internationalScore: 88, employerScore: 90 },
    { id: 'uni-41', rank: 41, university: '纽约大学', country: '美国', countryCode: 'US', overallScore: 81.6, rankChange: -5, researchScore: 95.2, teachingScore: 88.9, citationsScore: 83.7, internationalScore: 94, employerScore: 96 },
    { id: 'uni-42', rank: 42, university: '布里斯托大学', country: '英国', countryCode: 'UK', overallScore: 81.4, rankChange: -1, researchScore: 94.3, teachingScore: 89.2, citationsScore: 85.1, internationalScore: 91, employerScore: 92 },
    { id: 'uni-43', rank: 43, university: '密歇根大学安娜堡分校', country: '美国', countryCode: 'US', overallScore: 81.2, rankChange: -3, researchScore: 97.6, teachingScore: 90.8, citationsScore: 78.5, internationalScore: 91, employerScore: 94 },
    { id: 'uni-44', rank: 44, university: '慕尼黑大学', country: '德国', countryCode: 'DE', overallScore: 81.0, rankChange: 1, researchScore: 96.8, teachingScore: 87.3, citationsScore: 88.5, internationalScore: 90, employerScore: 91 },
    { id: 'uni-45', rank: 45, university: '上海交通大学', country: '中国', countryCode: 'CN', overallScore: 80.8, rankChange: 0, researchScore: 98.5, teachingScore: 94.1, citationsScore: 91.6, internationalScore: 83, employerScore: 92 },
    { id: 'uni-46', rank: 46, university: '北卡罗来纳大学教堂山分校', country: '美国', countryCode: 'US', overallScore: 80.6, rankChange: 2, researchScore: 93.4, teachingScore: 88.7, citationsScore: 81.2, internationalScore: 89, employerScore: 92 },
    { id: 'uni-47', rank: 47, university: '浙江大学', country: '中国', countryCode: 'CN', overallScore: 80.4, rankChange: -1, researchScore: 96.9, teachingScore: 92.3, citationsScore: 87.8, internationalScore: 82, employerScore: 91 },
    { id: 'uni-48', rank: 48, university: '京都大学', country: '日本', countryCode: 'JP', overallScore: 80.2, rankChange: -2, researchScore: 98.3, teachingScore: 88.5, citationsScore: 92.1, internationalScore: 86, employerScore: 92 },
    { id: 'uni-49', rank: 49, university: '苏黎世大学', country: '瑞士', countryCode: 'CH', overallScore: 80.0, rankChange: -1, researchScore: 95.2, teachingScore: 88.4, citationsScore: 86.7, internationalScore: 93, employerScore: 90 },
    { id: 'uni-50', rank: 50, university: '悉尼科技大学', country: '澳大利亚', countryCode: 'AU', overallScore: 79.8, rankChange: 7, researchScore: 89.6, teachingScore: 87.2, citationsScore: 45.8, internationalScore: 89, employerScore: 91 },
    
    // 51-75名
    { id: 'uni-51', rank: 51, university: '韩国科学技术院', country: '韩国', countryCode: 'KR', overallScore: 79.6, rankChange: 3, researchScore: 96.4, teachingScore: 85.3, citationsScore: 88.7, internationalScore: 84, employerScore: 92 },
    { id: 'uni-52', rank: 52, university: '威斯康星大学麦迪逊分校', country: '美国', countryCode: 'US', overallScore: 79.4, rankChange: -4, researchScore: 95.8, teachingScore: 87.6, citationsScore: 83.2, internationalScore: 88, employerScore: 91 },
    { id: 'uni-53', rank: 53, university: '谢菲尔德大学', country: '英国', countryCode: 'UK', overallScore: 79.2, rankChange: -2, researchScore: 92.7, teachingScore: 87.9, citationsScore: 84.5, internationalScore: 89, employerScore: 90 },
    { id: 'uni-54', rank: 54, university: '华威大学', country: '英国', countryCode: 'UK', overallScore: 79.0, rankChange: -1, researchScore: 93.5, teachingScore: 90.1, citationsScore: 82.3, internationalScore: 88, employerScore: 93 },
    { id: 'uni-55', rank: 55, university: '巴黎综合理工学院', country: '法国', countryCode: 'FR', overallScore: 78.8, rankChange: 2, researchScore: 91.4, teachingScore: 92.3, citationsScore: 85.6, internationalScore: 87, employerScore: 94 },
    { id: 'uni-56', rank: 56, university: '香港城市大学', country: '中国香港', countryCode: 'HK', overallScore: 78.6, rankChange: -3, researchScore: 92.3, teachingScore: 84.7, citationsScore: 79.5, internationalScore: 88, employerScore: 91 },
    { id: 'uni-57', rank: 57, university: '格拉斯哥大学', country: '英国', countryCode: 'UK', overallScore: 78.4, rankChange: -2, researchScore: 92.8, teachingScore: 86.4, citationsScore: 83.1, internationalScore: 87, employerScore: 90 },
    { id: 'uni-58', rank: 58, university: '根特大学', country: '澳大利亚', countryCode: 'AU', overallScore: 78.2, rankChange: 4, researchScore: 87.6, teachingScore: 85.4, citationsScore: 52.3, internationalScore: 88, employerScore: 92 },
    { id: 'uni-59', rank: 59, university: '大阪大学', country: '日本', countryCode: 'JP', overallScore: 78.0, rankChange: 0, researchScore: 94.2, teachingScore: 84.6, citationsScore: 86.7, internationalScore: 82, employerScore: 89 },
    { id: 'uni-60', rank: 60, university: '台湾大学', country: '中国台湾', countryCode: 'TW', overallScore: 77.8, rankChange: -1, researchScore: 93.5, teachingScore: 83.7, citationsScore: 85.4, internationalScore: 78, employerScore: 88 },
    { id: 'uni-61', rank: 61, university: '都柏林三一学院', country: '爱尔兰', countryCode: 'IE', overallScore: 77.6, rankChange: 2, researchScore: 90.4, teachingScore: 88.5, citationsScore: 80.2, internationalScore: 91, employerScore: 89 },
    { id: 'uni-62', rank: 62, university: '昆士兰科技大学', country: '澳大利亚', countryCode: 'AU', overallScore: 77.4, rankChange: 5, researchScore: 86.5, teachingScore: 84.3, citationsScore: 48.7, internationalScore: 87, employerScore: 90 },
    { id: 'uni-63', rank: 63, university: '马里兰大学帕克分校', country: '美国', countryCode: 'US', overallScore: 77.2, rankChange: -3, researchScore: 92.6, teachingScore: 85.8, citationsScore: 79.4, internationalScore: 87, employerScore: 90 },
    { id: 'uni-64', rank: 64, university: '伯明翰大学', country: '英国', countryCode: 'UK', overallScore: 77.0, rankChange: -2, researchScore: 91.8, teachingScore: 86.2, citationsScore: 81.3, internationalScore: 86, employerScore: 89 },
    { id: 'uni-65', rank: 65, university: '伊利诺伊大学厄巴纳-香槟分校', country: '美国', countryCode: 'US', overallScore: 76.8, rankChange: -5, researchScore: 94.7, teachingScore: 87.2, citationsScore: 76.5, internationalScore: 86, employerScore: 92 },
    { id: 'uni-66', rank: 66, university: '南安普顿大学', country: '英国', countryCode: 'UK', overallScore: 76.6, rankChange: 0, researchScore: 90.6, teachingScore: 85.4, citationsScore: 82.7, internationalScore: 85, employerScore: 88 },
    { id: 'uni-67', rank: 67, university: '佐治亚理工学院', country: '美国', countryCode: 'US', overallScore: 76.4, rankChange: -2, researchScore: 95.2, teachingScore: 86.8, citationsScore: 78.3, internationalScore: 85, employerScore: 94 },
    { id: 'uni-68', rank: 68, university: '卡内基梅隆大学', country: '美国', countryCode: 'US', overallScore: 76.2, rankChange: -4, researchScore: 97.3, teachingScore: 90.5, citationsScore: 72.4, internationalScore: 87, employerScore: 96 },
    { id: 'uni-69', rank: 69, university: '柏林洪堡大学', country: '德国', countryCode: 'DE', overallScore: 76.0, rankChange: 1, researchScore: 93.4, teachingScore: 85.2, citationsScore: 87.6, internationalScore: 88, employerScore: 88 },
    { id: 'uni-70', rank: 70, university: '马来亚大学', country: '马来西亚', countryCode: 'MY', overallScore: 75.8, rankChange: 3, researchScore: 91.2, teachingScore: 81.4, citationsScore: 83.5, internationalScore: 85, employerScore: 87 },
    { id: 'uni-71', rank: 71, university: '伦敦玛丽女王大学', country: '英国', countryCode: 'UK', overallScore: 75.6, rankChange: -1, researchScore: 90.3, teachingScore: 84.7, citationsScore: 84.1, internationalScore: 86, employerScore: 88 },
    { id: 'uni-72', rank: 72, university: '亚琛工业大学', country: '德国', countryCode: 'DE', overallScore: 75.4, rankChange: 2, researchScore: 91.5, teachingScore: 83.2, citationsScore: 82.6, internationalScore: 85, employerScore: 90 },
    { id: 'uni-73', rank: 73, university: '蒙特利尔大学', country: '加拿大', countryCode: 'CA', overallScore: 75.2, rankChange: -2, researchScore: 92.1, teachingScore: 84.6, citationsScore: 86.3, internationalScore: 83, employerScore: 87 },
    { id: 'uni-74', rank: 74, university: '乌得勒支大学', country: '荷兰', countryCode: 'NL', overallScore: 75.0, rankChange: 0, researchScore: 92.6, teachingScore: 86.4, citationsScore: 85.2, internationalScore: 87, employerScore: 88 },
    { id: 'uni-75', rank: 75, university: '哥本哈根大学', country: '丹麦', countryCode: 'DK', overallScore: 74.8, rankChange: -1, researchScore: 93.8, teachingScore: 85.7, citationsScore: 88.4, internationalScore: 86, employerScore: 87 },
    
    // 76-100名
    { id: 'uni-76', rank: 76, university: '曼彻斯特大学', country: '英国', countryCode: 'UK', overallScore: 74.6, rankChange: -3, researchScore: 92.3, teachingScore: 86.8, citationsScore: 83.5, internationalScore: 87, employerScore: 89 },
    { id: 'uni-77', rank: 77, university: '莫纳什大学', country: '澳大利亚', countryCode: 'AU', overallScore: 74.4, rankChange: -4, researchScore: 91.8, teachingScore: 85.3, citationsScore: 25.6, internationalScore: 88, employerScore: 90 },
    { id: 'uni-78', rank: 78, university: '根特大学', country: '比利时', countryCode: 'BE', overallScore: 74.2, rankChange: 2, researchScore: 90.4, teachingScore: 84.2, citationsScore: 86.7, internationalScore: 85, employerScore: 86 },
    { id: 'uni-79', rank: 79, university: '法国巴黎高等师范学院', country: '法国', countryCode: 'FR', overallScore: 74.0, rankChange: 1, researchScore: 94.2, teachingScore: 92.5, citationsScore: 89.3, internationalScore: 84, employerScore: 91 },
    { id: 'uni-80', rank: 80, university: '斯德哥尔摩大学', country: '瑞典', countryCode: 'SE', overallScore: 73.8, rankChange: 0, researchScore: 91.5, teachingScore: 85.3, citationsScore: 87.6, internationalScore: 87, employerScore: 86 },
    { id: 'uni-81', rank: 81, university: '宾夕法尼亚州立大学', country: '美国', countryCode: 'US', overallScore: 73.6, rankChange: -2, researchScore: 90.8, teachingScore: 83.7, citationsScore: 79.4, internationalScore: 84, employerScore: 89 },
    { id: 'uni-82', rank: 82, university: '维也纳大学', country: '奥地利', countryCode: 'AT', overallScore: 73.4, rankChange: 1, researchScore: 90.3, teachingScore: 84.6, citationsScore: 85.7, internationalScore: 86, employerScore: 85 },
    { id: 'uni-83', rank: 83, university: '利兹大学', country: '英国', countryCode: 'UK', overallScore: 73.2, rankChange: -3, researchScore: 90.1, teachingScore: 84.2, citationsScore: 82.3, internationalScore: 85, employerScore: 88 },
    { id: 'uni-84', rank: 84, university: '以色列理工学院', country: '以色列', countryCode: 'IL', overallScore: 73.0, rankChange: 4, researchScore: 93.2, teachingScore: 82.8, citationsScore: 88.4, internationalScore: 83, employerScore: 90 },
    { id: 'uni-85', rank: 85, university: '赫尔辛基大学', country: '芬兰', countryCode: 'FI', overallScore: 72.8, rankChange: -1, researchScore: 90.6, teachingScore: 85.3, citationsScore: 86.2, internationalScore: 87, employerScore: 86 },
    { id: 'uni-86', rank: 86, university: '瑞士巴塞尔大学', country: '瑞士', countryCode: 'CH', overallScore: 72.6, rankChange: 0, researchScore: 91.4, teachingScore: 84.8, citationsScore: 87.3, internationalScore: 86, employerScore: 87 },
    { id: 'uni-87', rank: 87, university: '伦敦大学皇家霍洛威学院', country: '英国', countryCode: 'UK', overallScore: 72.4, rankChange: 2, researchScore: 88.7, teachingScore: 84.3, citationsScore: 82.5, internationalScore: 85, employerScore: 86 },
    { id: 'uni-88', rank: 88, university: '波士顿大学', country: '美国', countryCode: 'US', overallScore: 72.2, rankChange: -4, researchScore: 91.3, teachingScore: 86.4, citationsScore: 80.1, internationalScore: 87, employerScore: 89 },
    { id: 'uni-89', rank: 89, university: '代尔夫特理工大学', country: '荷兰', countryCode: 'NL', overallScore: 72.0, rankChange: 0, researchScore: 92.1, teachingScore: 83.5, citationsScore: 78.6, internationalScore: 85, employerScore: 90 },
    { id: 'uni-90', rank: 90, university: '香港理工大学', country: '中国香港', countryCode: 'HK', overallScore: 71.8, rankChange: -3, researchScore: 89.2, teachingScore: 82.7, citationsScore: 76.4, internationalScore: 86, employerScore: 88 },
    { id: 'uni-91', rank: 91, university: '里昂第一大学', country: '法国', countryCode: 'FR', overallScore: 71.6, rankChange: 2, researchScore: 88.6, teachingScore: 83.4, citationsScore: 84.2, internationalScore: 84, employerScore: 86 },
    { id: 'uni-92', rank: 92, university: '塔夫茨大学', country: '美国', countryCode: 'US', overallScore: 71.4, rankChange: -2, researchScore: 89.7, teachingScore: 87.6, citationsScore: 78.3, internationalScore: 85, employerScore: 88 },
    { id: 'uni-93', rank: 93, university: '诺丁汉大学', country: '英国', countryCode: 'UK', overallScore: 71.2, rankChange: -4, researchScore: 89.3, teachingScore: 84.1, citationsScore: 80.5, internationalScore: 85, employerScore: 87 },
    { id: 'uni-94', rank: 94, university: '圣保罗大学', country: '巴西', countryCode: 'BR', overallScore: 71.0, rankChange: 5, researchScore: 87.3, teachingScore: 78.5, citationsScore: 85.2, internationalScore: 82, employerScore: 84 },
    { id: 'uni-95', rank: 95, university: '阿德莱德大学', country: '澳大利亚', countryCode: 'AU', overallScore: 70.8, rankChange: -2, researchScore: 88.6, teachingScore: 83.2, citationsScore: 35.8, internationalScore: 86, employerScore: 88 },
    { id: 'uni-96', rank: 96, university: '柏林自由大学', country: '德国', countryCode: 'DE', overallScore: 70.4, rankChange: 1, researchScore: 89.5, teachingScore: 83.4, citationsScore: 84.6, internationalScore: 85, employerScore: 86 },
    { id: 'uni-97', rank: 97, university: '法兰克福大学', country: '德国', countryCode: 'DE', overallScore: 69.8, rankChange: 2, researchScore: 89.1, teachingScore: 82.7, citationsScore: 85.3, internationalScore: 84, employerScore: 86 },
    { id: 'uni-98', rank: 98, university: '海德堡大学', country: '德国', countryCode: 'DE', overallScore: 69.6, rankChange: -1, researchScore: 88.7, teachingScore: 82.3, citationsScore: 84.8, internationalScore: 83, employerScore: 85 },
    { id: 'uni-99', rank: 99, university: '乔治亚大学', country: '美国', countryCode: 'US', overallScore: 69.4, rankChange: -3, researchScore: 88.2, teachingScore: 84.3, citationsScore: 77.6, internationalScore: 83, employerScore: 87 },
    { id: 'uni-100', rank: 100, university: '科隆大学', country: '德国', countryCode: 'DE', overallScore: 69.2, rankChange: 1, researchScore: 89.1, teachingScore: 82.7, citationsScore: 85.3, internationalScore: 84, employerScore: 86 }
  ]

  // 2026年QS排名数据更新：
  // - 麻省理工连续第14年位居榜首
  // - 中国共有11所高校入围QS前100：香港大学、北京大学、清华大学、复旦大学、香港中文大学、香港科技大学、上海交通大学、浙江大学、香港理工大学、香港城市大学、台湾大学
  // - 北京大学位列第14位，为中国内地大学第一名
  // - 清华大学位列第17位，与加利福尼亚大学伯克利分校并列，较2025年上升3位
  // - 复旦大学较2025年前进9位

  return qs2026TopUniversities
}

const QSRankingPage = () => {
  const [data, setData] = useState<University[]>([])
  const [filteredData, setFilteredData] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: keyof University; direction: 'ascend' | 'descend' | undefined }>({ key: 'rank', direction: 'ascend' })

  // 获取国家列表
  const countryList = Array.from(new Set(data.map(item => item.country)))

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      const mockData = generateMockData()
      setData(mockData)
      setFilteredData(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // 应用过滤和排序
    let result = [...data]

    // 搜索过滤
    if (searchText) {
      result = result.filter(item => 
        item.university.toLowerCase().includes(searchText.toLowerCase()) ||
        item.country.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    // 国家过滤
    if (selectedCountry) {
      result = result.filter(item => item.country === selectedCountry)
    }

    // 排序
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) {
          return sortConfig.direction === 'ascend' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascend' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(result)
    setCurrentPage(1)
  }, [searchText, selectedCountry, data, sortConfig])

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
  }

  const handleTableChange = (pagination: any, _filters: any, sorter: any) => {
    // 更新当前页码
    if (pagination && pagination.current !== undefined) {
      setCurrentPage(pagination.current)
    }
    
    // 更新排序配置
    if (sorter && sorter.field) {
      setSortConfig({
        key: sorter.field as keyof University,
        direction: sorter.order
      })
    }
  }

  const getRankChangeIcon = (change?: number) => {
    if (change === undefined || change === 0) return null
    return change > 0 ? 
      <ArrowUpOutlined className="rank-up" /> : 
      <ArrowDownOutlined className="rank-down" />
  }

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      fixed: 'left' as const,
      sorter: true,
      render: (rank: number) => (
        <div className="rank-column">
          {rank <= 10 ? (
            <span className="top-rank top-10">{rank}</span>
          ) : rank <= 30 ? (
            <span className="top-rank top-30">{rank}</span>
          ) : (
            <span className="regular-rank">{rank}</span>
          )}
        </div>
      )
    },
    {
      title: '大学名称',
      dataIndex: 'university',
      key: 'university',
      sorter: true,
      render: (name: string, record: University) => (
        <Link to={`/university/${record.id}`} className="university-link">
          <div className="university-info">
            <div>
              <Text strong className="university-name">{name}</Text>
              <div className="university-country">
                <FlagOutlined className="country-icon" /> {record.country}
              </div>
            </div>
          </div>
        </Link>
      )
    },
    {
      title: '国家/地区',
      dataIndex: 'country',
      key: 'country',
      sorter: true,
      render: (country: string) => (
        <div className="country-column">
          <FlagOutlined className="flag-icon" />
          <span>{country}</span>
        </div>
      )
    },
    {
      title: '总分',
      dataIndex: 'overallScore',
      key: 'overallScore',
      sorter: true,
      render: (score: number) => score.toFixed(1)
    },
    {
      title: '排名变化',
      dataIndex: 'rankChange',
      key: 'rankChange',
      width: 100,
      render: (change?: number) => (
        <div className="rank-change">
          {getRankChangeIcon(change)}
          {change && <span>{change > 0 ? `+${change}` : change}</span>}
        </div>
      )
    },
    {
      title: '科研得分',
      dataIndex: 'researchScore',
      key: 'researchScore',
      sorter: true,
      render: (score: number) => score.toFixed(1)
    },
    {
      title: '教学得分',
      dataIndex: 'teachingScore',
      key: 'teachingScore',
      sorter: true,
      render: (score: number) => score.toFixed(1)
    },
    {
      title: '雇主声誉',
      dataIndex: 'employerScore',
      key: 'employerScore',
      sorter: true,
      render: (score: number) => score.toFixed(1)
    }
  ]

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large">
          <div className="spin-tip">加载QS排名数据中...</div>
        </Spin>
      </div>
    )
  }

  return (
    <div className="qs-ranking-page">
      <div className="container">
        <div className="page-header">
          <Title level={2} className="page-title">
            <TrophyOutlined className="title-icon" /> QS世界大学排名®
          </Title>
          <Text className="page-subtitle">
          2026年度QS世界大学排名®前100强，受到世界各地的学生、雇主和学校的信任
        </Text>
        </div>

        <Card className="filter-card">
          <Row gutter={16} align="middle">
            <Col xs={24} md={8}>
              <Search
                placeholder="搜索大学名称或国家"
                allowClear
                enterButton="搜索"
                size="large"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                placeholder="选择国家/地区"
                allowClear
                showSearch
                size="large"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                {countryList.map(country => (
                  <Option key={country} value={country}>{country}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={10} className="search-info">
              <Text>
                共找到 <Text mark>{filteredData.length}</Text> 所大学
                {selectedCountry && <Text>, 国家/地区：{selectedCountry}</Text>}
                {searchText && <Text>, 搜索：{searchText}</Text>}
              </Text>
            </Col>
          </Row>
        </Card>

        <div className="ranking-content">
          {filteredData.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              pagination={{
                pageSize: 20,
                current: currentPage,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条数据`,
                pageSizeOptions: ['10', '20', '50', '100']
              }}
              onChange={handleTableChange}
              scroll={{ x: 1200 }}
              className="ranking-table"
            />
          ) : (
            <Empty
              description="没有找到符合条件的大学"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>

        <div className="ranking-info">
          <Card className="info-card">
            <Title level={4}>关于QS排名</Title>
            <Text className="info-text">
              QS世界大学排名®是由英国一家国际教育市场咨询公司Quacquarelli Symonds（简称QS）所发表的年度世界大学排名。
              我们致力于提供客观专业的高等教育资讯，通过2025年的QS世界大学排名®，帮助学生发现世界顶尖大学。
            </Text>
            <Title level={4} className="metrics-title">排名方法</Title>
            <Text className="info-text">
              QS世界大学排名®使用六个简单的指标进行编制，有效地评估大学的表现。
            </Text>
            <ul className="metrics-list">
              <li>学术声誉（40%）</li>
              <li>雇主声誉（10%）</li>
              <li>师生比例（20%）</li>
              <li>每位教师的引用次数（20%）</li>
              <li>国际教师比例（5%）</li>
              <li>国际学生比例（5%）</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QSRankingPage