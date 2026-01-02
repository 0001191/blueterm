'use client';
import { useEffect } from 'react';

export default function Home() {
  
  // 1. 加载 Tally 的脚本
  useEffect(() => {
    // 这是一个标准动作，用来加载外部脚本
    const script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      {/* 您的产品文案 */}
      <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        BlueTerm
      </h1>
      <p className="text-xl text-gray-400 mb-8 max-w-lg text-center">
        The Digital Twin for Developers. <br/>
        Train an AI with your code snippets to answer questions in your style.
      </p>

      {/* 关键按钮：
         data-tally-open="您的FormID" 
         这个 ID 在您的 Tally 链接里能找到，比如 tally.so/r/3xjo9e，ID 就是 3xjo9e
      */}
      <button
        data-tally-open="rjaP9X"  // ⚠️ 记得把这里换成您自己的 Tally ID
        data-tally-layout="modal"
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
        className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition transform hover:scale-105"
      >
        Get Early Access
      </button>

    </div>
  );
}