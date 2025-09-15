"use client";

import '../globals.css';
import AnimatedContent from '../../../components/reactbits/AnimatedContent/AnimatedContent';
import { useEffect, useState } from "react";
import { ChevronDown } from 'lucide-react';

interface QAItemProps {
  question: string;
  answer: string;
}

const QAItem: React.FC<QAItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 hover:bg-gray-100 flex justify-between items-center text-left transition-colors duration-200"
        style={{backgroundColor: "#eeffcc"}}
      >
        <span className="font-medium" style={{fontFamily: "Barlow"}}>{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 text-gray-700 border-t border-gray-200" style={{fontFamily: "Barlow", backgroundColor: "#ffffff"}}>
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-b-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <AnimatedContent  
          distance={50}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0.0}
          animateOpacity
          scale={1.0}
          threshold={0.2}
          delay={0.0}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl text-gray-800 text-center mb-8 header-1">
            Frequently Asked Questions
          </h1>
          
          <div className="rounded-lg shadow-sm p-6" style={{background: "#fafffa"}}>

            <QAItem
              question="GreenPod Organic là gì?"
              answer="GreenPod Organic là giải pháp nông nghiệp thông minh giúp hạt giống nảy mầm nhanh hơn, giảm cây chết non, tiết kiệm chi phí và thân thiện với môi trường."
            />

            <QAItem
              question="Sản phẩm hoạt động dựa trên công nghệ nào?"
              answer="GreenPod sử dụng 3 công nghệ: vật liệu sinh học tiên tiến, Bio-Molding (ép nóng/lạnh) và phủ màng Nano Bio-Coating giúp giữ ẩm, chống nấm và bảo vệ hạt giống."
            />

            <QAItem
              question="Thành phần của viên ươm gồm những gì?"
              answer="Nguyên liệu tự nhiên như xơ dừa, tro trấu, phân trùn quế, rong biển, vỏ trứng, xương cá và than củi. Tất cả được bọc bởi vỏ sinh học phân hủy hoàn toàn."
            />

            <QAItem
              question="Kết quả thử nghiệm ra sao?"
              answer="Tỷ lệ nảy mầm đạt 96%, tỷ lệ cây sống sau 20 ngày đạt 90–92%. Cây phát triển đồng đều, rễ khỏe và không bị thối."
            />

            <QAItem
              question="Sản phẩm mang lại những lợi ích gì?"
              answer="Giúp cây phát triển khỏe mạnh, giảm chi phí chăm sóc, hoàn toàn phân hủy sinh học, an toàn cho sức khỏe và môi trường."
            />

            <QAItem
              question="Ai có thể sử dụng GreenPod Organic?"
              answer="Phù hợp cho nông dân, vườn ươm, hợp tác xã và cả người dân thành thị muốn trồng cây sạch tại nhà."
            />

          </div>
        </div>
      </AnimatedContent>
    </main>
  );
}