'use client'

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import AnimatedContent from '../../../components/reactbits/AnimatedContent/AnimatedContent';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const knowledgeBase: KnowledgeItem[] = [
  {
    id: '1',
    question: 'GreenPod Organic là gì?',
    answer: 'GreenPod Organic là giải pháp nông nghiệp thông minh, giúp tăng tỷ lệ nảy mầm, giảm cây chết non, tiết kiệm chi phí và hoàn toàn phân hủy sinh học, thân thiện với môi trường.',
    keywords: ['GreenPod', 'giải pháp', 'nông nghiệp thông minh', 'nảy mầm', 'phân hủy sinh học']
  },
  {
    id: '2',
    question: 'Giá trị cốt lõi của sản phẩm là gì?',
    answer: 'Tăng tỷ lệ nảy mầm, giảm cây chết non. Giảm chi phí đầu vào, tiết kiệm công chăm sóc. Hoàn toàn phân hủy sinh học, bảo vệ môi trường. Không dùng hóa chất độc hại, an toàn sức khỏe.',
    keywords: ['giá trị', 'cốt lõi', 'môi trường', 'chi phí', 'an toàn']
  },
  {
    id: '3',
    question: 'Công nghệ chính được áp dụng?',
    answer: 'GreenPod sử dụng 3 công nghệ: (1) Công nghệ vật liệu sinh học tiên tiến, (2) Công nghệ định hình sinh học (Bio-Molding: ép nóng và ép lạnh liên kết chéo), (3) Công nghệ phủ màng nano sinh học (Nano Bio-Coating Film).',
    keywords: ['công nghệ', 'bio-molding', 'nano', 'ép nóng', 'ép lạnh']
  },
  {
    id: '4',
    question: 'Công nghệ Bio-Molding hoạt động thế nào?',
    answer: 'Ép nóng: trộn nguyên liệu ở 90–120°C, sấy khô, cho sản xuất quy mô lớn. Ép lạnh + liên kết chéo: dùng enzym/acid hữu cơ, không cần nhiệt độ cao, phù hợp mô hình cộng đồng, tiết kiệm chi phí.',
    keywords: ['bio-molding', 'ép nóng', 'ép lạnh', 'quy mô lớn', 'chi phí thấp']
  },
  {
    id: '5',
    question: 'Công nghệ phủ màng Nano Bio-Coating Film có tác dụng gì?',
    answer: 'Tạo màng siêu mỏng (30–60µm) từ gelatin + chitosan + glycerin, bổ sung nano đồng hữu cơ, rong biển, acid humic → giữ ẩm vi mô, chống nấm, chống côn trùng hại rễ, tăng tỷ lệ nảy mầm.',
    keywords: ['nano', 'bio-coating', 'màng phủ', 'chitosan', 'giữ ẩm', 'nấm bệnh']
  },
  {
    id: '6',
    question: 'Thành phần chính của viên ươm là gì?',
    answer: 'Xơ dừa, tro trấu, phân trùn quế, rong biển, vỏ trứng + xương cá, than củi. Mỗi thành phần đóng vai trò riêng: giữ ẩm, điều hòa pH, bổ sung vi sinh, hormone sinh trưởng, Ca & P, vi lượng chống nấm.',
    keywords: ['thành phần', 'xơ dừa', 'tro trấu', 'phân trùn', 'rong biển', 'vỏ trứng']
  },
  {
    id: '7',
    question: 'Vỏ bọc phân hủy sinh học làm từ gì?',
    answer: 'Tinh bột sắn biến tính, chitosan, cellulose, gelatin, PLA/PHA. Tác dụng: tạo lớp bảo vệ, kháng khuẩn, giữ form, tan đều trong đất, phân hủy sinh học hoàn toàn.',
    keywords: ['vỏ bọc', 'phân hủy sinh học', 'tinh bột', 'chitosan', 'PLA', 'PHA']
  },
  {
    id: '8',
    question: 'Kết quả thử nghiệm thực tế thế nào?',
    answer: 'Tỷ lệ nảy mầm đạt 96%. Tỷ lệ cây sống sau 20 ngày đạt 90–92%. Rễ phát triển khỏe, cây đồng đều, không thối rễ.',
    keywords: ['thử nghiệm', 'nảy mầm', 'tỷ lệ sống', 'rễ phát triển']
  },
  {
    id: '9',
    question: 'Sản phẩm mang lại những lợi ích gì?',
    answer: 'Hiệu quả sinh học: cây khỏe, rễ mạnh, giảm nấm bệnh. Hiệu quả kinh tế: giảm nhân công, chi phí. Bền vững môi trường: phân hủy sinh học, không tạo rác. Tùy biến: theo cây trồng & khí hậu.',
    keywords: ['lợi ích', 'hiệu quả', 'sinh học', 'kinh tế', 'môi trường']
  },
  {
    id: '10',
    question: 'Đối tác và hoạt động chính của GreenPod là gì?',
    answer: 'Đối tác: cơ sở nguyên liệu (xơ dừa, vỏ trứng, than củi), viện nghiên cứu, NGO, hợp tác xã, KOL ngành nông nghiệp. Hoạt động: R&D, sản xuất – kiểm định, marketing đa kênh, xây dựng cộng đồng, quản lý chuỗi tái chế.',
    keywords: ['đối tác', 'R&D', 'sản xuất', 'marketing', 'cộng đồng', 'chuỗi tái chế']
  }
];



// Simple text similarity function
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\W+/);
  const words2 = text2.toLowerCase().split(/\W+/);
  
  const intersection = words1.filter(word => words2.includes(word));
  const union = [...new Set([...words1, ...words2])];
  
  return intersection.length / union.length;
}

function findRelevantKnowledge(query: string, limit: number = 2): KnowledgeItem[] {
  const queryLower = query.toLowerCase();
  
  const scored = knowledgeBase.map(item => {
    let score = 0;
    
    score += item.keywords.filter(keyword => 
      queryLower.includes(keyword.toLowerCase())
    ).length * 0.3;
    
    score += calculateSimilarity(query, item.question) * 0.4;
    
    score += calculateSimilarity(query, item.answer) * 0.3;
    
    return { item, score };
  });
  
  return scored
    .filter(({ score }) => score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

export default function RAGChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là K.T.N.K AI Assistant. Tôi có thể hỗ trợ bạn giải đáp các câu hỏi về sản phẩm và dịch vụ của chúng tôi!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Find relevant knowledge
      const relevantKnowledge = findRelevantKnowledge(currentInput);
      
      // Create context from relevant knowledge
      let context = '';
      if (relevantKnowledge.length > 0) {
        context = 'Relevant information from knowledge base:\n\n';
        relevantKnowledge.forEach(item => {
          context += `Q: ${item.question}\nA: ${item.answer}\n\n`;
        });
      }

      const prompt = `${context}User question: ${currentInput}

Please provide a helpful and accurate response based on the knowledge base information provided above. If the question is not covered in the knowledge base, provide a general helpful response and mention that for specific information, the user should contact support.

Response:`;

      // Get response from Gemini
      const botResponse = await callGeminiAPI(prompt);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4" style={{fontFamily: "Mozilla", marginTop: 40}}>
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="text-white p-4" style={{backgroundColor: "#339933"}}>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bot className="w-6 h-6" />
              K.T.N.K AI Support
            </h2>
            <p className="text-yellow-100 text-sm mt-1">Powered by Google Gemini</p>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`flex max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-400 text-white'
                  }`}
                >
                  <div className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}>
                    <div className="flex-shrink-0 mt-1">
                      {message.isBot ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
}