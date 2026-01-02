'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. 初始化 Supabase 客户端 (自动读取 .env.local 里的钥匙)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  // 2. 加载数据：页面一打开，就去 Supabase 查表
  useEffect(() => {
    fetchSnippets();
  }, []);

  async function fetchSnippets() {
    const { data } = await supabase.from('snippets').select('*').order('created_at', { ascending: false });
    if (data) setSnippets(data);
  }

  // 3. 提交数据：点击按钮，把数据存进 Supabase
  async function handleSubmit() {
    if (!title || !code) return alert('请填写完整！');
    
    const { error } = await supabase.from('snippets').insert([{ title, code }]);
    
    if (error) {
      console.error(error);
      alert('保存失败，请检查控制台');
    } else {
      setTitle(''); // 清空输入框
      setCode('');
      fetchSnippets(); // 刷新列表
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">BlueTerm Snippets</h1>

        {/* --- 输入区域 --- */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
          <input
            className="w-full bg-gray-900 text-white p-3 rounded mb-4 border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="给代码起个标题 (例如: Git 常用命令)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full bg-gray-900 text-white p-3 rounded mb-4 border border-gray-600 font-mono h-32 focus:outline-none focus:border-blue-500"
            placeholder="粘贴代码在这里..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition"
          >
            保存到云端
          </button>
        </div>

        {/* --- 展示区域 --- */}
        <div className="space-y-4">
          {snippets.map((item) => (
            <div key={item.id} className="bg-gray-800 p-4 rounded border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <pre className="bg-black p-3 rounded text-sm text-gray-300 overflow-x-auto">
                <code>{item.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}