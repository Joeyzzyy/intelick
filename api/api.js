import axios from 'axios';

// 创建一个 axios 实例
const apiClient = axios.create({
  baseURL: 'https://sheet2email.com', // 替换为实际的 API 基础地址
  timeout: 10000,
});

// 用于存储当前用户ID
let currentUserId = null;

// 设置请求拦截器来自动附加 accessToken 和 userId
apiClient.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    // 如果存在当前用户ID,则添加到请求头中
    if (currentUserId) {
      config.headers['X-User-ID'] = currentUserId;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加设置用户ID的方法
const setUserId = (userId) => {
  currentUserId = userId;
  localStorage.setItem('currentUserId', userId);
};

// 添加获取用户ID的方法
const getUserId = () => {
  return currentUserId || localStorage.getItem('currentUserId');
};

// 在导出时,将 setUserId 和 getUserId 方法添加到 apiClient 对象中
export default {
  ...apiClient,
  setUserId,
  getUserId,
};
