import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, Database, Upload, Search, Settings, Link as LinkIcon, 
  Code, FileText, ExternalLink, CheckCircle, AlertTriangle, 
  Shield, BarChart3, ImageIcon, Download, Trash2, Edit, Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ImageBank = () => {
  const { isAuthenticated, isStaff, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'upload' | 'config' | 'stats'>('browse');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-emerald-400 text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">您没有权限访问此页面</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 py-8 px-4">
      <div className="max-w-8xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                图库管理中心
              </h1>
              <p className="text-emerald-300 mt-1">管理和配置图片资源 API</p>
            </div>
          </div>
        </motion.div>

        {/* 标签页 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8"
        >
          {[
            { id: 'browse', label: '图片浏览', icon: Image },
            { id: 'upload', label: '上传图片', icon: Upload },
            { id: 'config', label: 'API 配置', icon: Settings },
            { id: 'stats', label: '使用统计', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* 内容区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'browse' && <BrowseSection />}
          {activeTab === 'upload' && <UploadSection />}
          {activeTab === 'config' && <ConfigSection />}
          {activeTab === 'stats' && <StatsSection />}
        </motion.div>
      </div>
    </div>
  );
};

const BrowseSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setImages([
      { id: 1, url: 'https://via.placeholder.com/300x200', name: '数学公式示例', subject: 'math', tags: ['公式', '代数'] },
      { id: 2, url: 'https://via.placeholder.com/300x200', name: '几何图形', subject: 'math', tags: ['几何', '图形'] },
      { id: 3, url: 'https://via.placeholder.com/300x200', name: '化学实验', subject: 'chemistry', tags: ['实验', '化学'] },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* 搜索栏 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索图片..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <motion.button
            onClick={handleSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl"
          >
            搜索
          </motion.button>
        </div>
      </div>

      {/* 图片网格 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">图片库</h3>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-slate-400">搜索中...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">输入关键词搜索图片</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all"
              >
                <img src={img.url} alt={img.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="text-white font-medium mb-2">{img.name}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {img.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors">
                      复制链接
                    </button>
                    <button className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`bg-white/10 backdrop-blur-xl rounded-2xl p-12 border-2 border-dashed transition-all ${
          dragActive ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/20'
        }`}
      >
        <div className="text-center">
          <Upload className={`w-16 h-16 mx-auto mb-4 ${dragActive ? 'text-emerald-400' : 'text-slate-400'}`} />
          <h3 className="text-xl font-semibold text-white mb-2">
            拖拽图片到此处上传
          </h3>
          <p className="text-slate-400 mb-4">支持 JPG、PNG、GIF、WebP 格式</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl"
          >
            选择文件
          </motion.button>
        </div>
      </div>

      {/* 上传队列 */}
      {files.length > 0 && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">上传队列 ({files.length})</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
                <Image className="w-10 h-10 text-emerald-400" />
                <div className="flex-1">
                  <p className="text-white text-sm">{file.name}</p>
                  <p className="text-slate-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl"
          >
            开始上传
          </motion.button>
        </div>
      )}
    </div>
  );
};

const ConfigSection = () => {
  const [apiConfig, setApiConfig] = useState({
    endpoint: '',
    apiKey: '',
    provider: 'unsplash'
  });

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          API 配置
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">图库提供商</label>
            <select
              value={apiConfig.provider}
              onChange={(e) => setApiConfig({...apiConfig, provider: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="unsplash">Unsplash</option>
              <option value="pexels">Pexels</option>
              <option value="pixabay">Pixabay</option>
              <option value="custom">自定义图库</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">API Endpoint</label>
            <input
              type="text"
              value={apiConfig.endpoint}
              onChange={(e) => setApiConfig({...apiConfig, endpoint: e.target.value})}
              placeholder="https://api.example.com/v1/images"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
            <input
              type="password"
              value={apiConfig.apiKey}
              onChange={(e) => setApiConfig({...apiConfig, apiKey: e.target.value})}
              placeholder="输入您的 API Key"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl"
          >
            保存配置
          </motion.button>
        </div>
      </div>

      {/* API 文档 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-400" />
          API 端点文档
        </h3>
        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-emerald-400 text-sm">
{`// 搜索图片
GET /api/images/search?q={query}&page=1&limit=20

// 上传图片
POST /api/images/upload
Content-Type: multipart/form-data

// 获取图片
GET /api/images/:id

// 删除图片
DELETE /api/images/:id

// 获取统计
GET /api/images/stats`}
          </pre>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="bg-amber-500/10 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <div>
            <h4 className="text-amber-400 font-semibold mb-2">配置提示</h4>
            <ul className="text-amber-200/80 text-sm space-y-1">
              <li>• 请确保 API Key 具有足够的访问权限</li>
              <li>• 部分图库 API 有调用频率限制</li>
              <li>• 建议配置图片缓存以提高访问速度</li>
              <li>• 定期更新 API Key 以确保安全</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { label: '图片总数', value: '1,234', change: '+12%', positive: true },
    { label: '本月上传', value: '89', change: '+23%', positive: true },
    { label: 'API 调用', value: '45.2K', change: '+8%', positive: true },
    { label: '存储使用', value: '2.3 GB', change: '-5%', positive: false }
  ];

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <span className={`text-sm ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 使用趋势图表占位 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          使用趋势
        </h3>
        <div className="h-64 bg-slate-800/50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">图表展示区域</p>
            <p className="text-slate-500 text-sm mt-1">最近30天的图片使用统计</p>
          </div>
        </div>
      </div>

      {/* 热门图片 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">热门图片 TOP 5</h3>
        <div className="space-y-3">
          {[
            { name: '数学公式集合', views: '1,234', uses: '89' },
            { name: '化学实验图', views: '987', uses: '67' },
            { name: '物理原理图', views: '876', uses: '54' },
            { name: '历史时间线', views: '765', uses: '43' },
            { name: '地理地图集', views: '654', uses: '32' }
          ].map((img, index) => (
            <div key={index} className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
              <span className="text-2xl font-bold text-emerald-400 w-8">#{index + 1}</span>
              <div className="flex-1">
                <p className="text-white font-medium">{img.name}</p>
                <p className="text-slate-400 text-sm">浏览 {img.views} · 使用 {img.uses} 次</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBank;
