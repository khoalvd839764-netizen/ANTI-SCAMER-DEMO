import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API Key - Thay thế bằng API key của bạn
const GEMINI_API_KEY = 'AIzaSyDhd-zGTG-_KOp0_t_4vy6vTdG9f30gDDk';

// Khởi tạo Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  // Vietnamese keywords and responses
  'lừa đảo': 'Các dấu hiệu nhận biết lừa đảo:\n• Yêu cầu chuyển tiền gấp\n• Hứa hẹn lợi nhuận cao\n• Đòi thông tin cá nhân\n• Liên kết đáng ngờ\n• Số điện thoại lạ',
  'scam': 'Dấu hiệu nhận biết lừa đảo:\n• Yêu cầu chuyển tiền gấp\n• Hứa hẹn lợi nhuận cao\n• Đòi thông tin cá nhân\n• Liên kết đáng ngờ\n• Số điện thoại lạ',
  'bị lừa': '⚠️ Nếu đã bị lừa, hãy làm ngay:\n\n1. DỪNG GIAO DỊCH ngay lập tức\n2. BÁO CÁO cho ngân hàng để khóa giao dịch\n3. LƯU LẠI bằng chứng (tin nhắn, chuyển khoản)\n4. BÁO CÔNG AN tại địa phương hoặc gọi 113\n5. THÔNG BÁO cho gia đình để được hỗ trợ\n\n📞 Hotline hỗ trợ: 113 (Công an)',
  'xử lý': '⚠️ Các bước xử lý khi bị lừa đảo:\n\n1. GIỮ BÌNH TĨNH\n2. BÁO CÁO ngân hàng ngay để phong tỏa tài khoản\n3. THU THẬP bằng chứng:\n   - Ảnh chụp màn hình\n   - Tin nhắn, cuộc gọi\n   - Lịch sử giao dịch\n4. LÀM ĐơN tố cáo tại Công an\n5. CHIA SẺ câu chuyện để cảnh báo người khác',
  'ngân hàng': '🏦 Ngay khi phát hiện bị lừa:\n\n• GọI HOTLINE ngân hàng để khóa tài khoản\n• YÊU CẦU phong tỏa giao dịch đáng ngờ\n• THÔNG BÁO thông tin tài khoản lừa đảo\n• ĐỀ NGHỊ ngân hàng hỗ trợ điều tra\n\nCác ngân hàng lớn:\n- Vietcombank: 1900 54 54 13\n- VietinBank: 1900 55 88 68\n- BIDV: 1900 9247',
  'công an': '👮 Báo cáo Công an:\n\n• GỌI NGAY 113 (miễn phí)\n• ĐẾN Công an phường/xã làm đơn tố cáo\n• MANG THEO:\n  - CMND/CCCD\n  - Bằng chứng (tin nhắn, ảnh chụp)\n  - Lịch sử giao dịch\n\n📍 Cổng thông tin điện tử Công an:\nhttps://www.bocongan.gov.vn',
  'chuyển tiền': '⚠️ CẢNH BÁO chuyển tiền:\n\nKHÔNG BAO GIỜ chuyển tiền khi:\n• Không biết rõ người nhận\n• Bị thúc ép gấp gáp\n• Hứa hẹn lợi nhuận cao\n• Yêu cầu giữ bí mật\n• Liên hệ qua mạng xã hội\n\n✅ LUÔN LUÔN:\n• Xác minh thông tin người nhận\n• Hỏi ý kiến người thân\n• Kiểm tra kỹ trước khi chuyển',
  'phòng tránh': '🛡️ Cách phòng tránh lừa đảo:\n\n1. KHÔNG chia sẻ thông tin cá nhân\n2. KHÔNG click vào link lạ\n3. XÁC MINH nguồn gốc tin nhắn/cuộc gọi\n4. BẬT xác thực 2 lớp cho tài khoản\n5. CẬP NHẬT kiến thức về lừa đảo\n6. THAM KHẢO gia đình trước khi quyết định\n7. SỬ DỤNG ứng dụng này để kiểm tra',
  'số điện thoại': '📱 Kiểm tra số điện thoại lạ:\n\n• SỬ DỤNG tính năng "Kiểm tra" trong app\n• TÌM KIẾM trên Google\n• KIỂM TRA cộng đồng cảnh báo\n• KHÔNG TRẢ LỜI số lạ yêu cầu tiền\n• CHẶN số ngay nếu nghi ngờ\n\n⚠️ Các đầu số lừa đảo thường gặp:\n- Số nước ngoài (+84...)\n- Số ảo (10 chữ số không đúng quy tắc)',
  'link': '🔗 Kiểm tra link đáng ngờ:\n\n• KHÔNG CLICK vào link lạ\n• KIỂM TRA tên miền (domain)\n• XEM URL có lỗi chính tả không\n• DÙNG công cụ kiểm tra link an toàn\n• BÁO CÁO link lừa đảo cho cộng đồng\n\n✅ Link an toàn thường:\n- Có https://\n- Tên miền chính xác\n- Không có ký tự lạ',
  'thông tin': '🔐 Bảo mật thông tin cá nhân:\n\nKHÔNG BAO GIỜ chia sẻ:\n• Số CMND/CCCD đầy đủ\n• Mã OTP/mã xác thực\n• Thông tin thẻ ngân hàng\n• Mật khẩu tài khoản\n• Địa chỉ nhà chi tiết\n\n✅ Chỉ cung cấp khi:\n• Giao dịch chính thức\n• Đã xác minh đối tác\n• Có sự hiện diện của người thân',
  'help': '🤖 Tôi có thể giúp bạn:\n\n• Nhận biết dấu hiệu lừa đảo\n• Hướng dẫn xử lý khi bị lừa\n• Cách báo cáo Công an\n• Liên hệ ngân hàng\n• Phòng tránh lừa đảo\n• Kiểm tra số điện thoại/link\n\nHãy hỏi tôi bất kỳ điều gì!',
  'default': '🤖 Xin chào! Tôi là trợ lý AI chống lừa đảo.\n\nBạn có thể hỏi tôi về:\n• Dấu hiệu nhận biết lừa đảo\n• Cách xử lý khi bị lừa\n• Báo cáo cho cơ quan chức năng\n• Bảo vệ thông tin cá nhân\n• Phòng tránh lừa đảo\n\nHãy gõ câu hỏi của bạn!'
};

export function ChatAI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! 👋 Tôi là trợ lý AI chống lừa đảo. Tôi có thể giúp bạn nhận biết và xử lý các tình huống lừa đảo. Hãy hỏi tôi bất kỳ điều gì!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const getBotResponse = async (userMessage: string): Promise<string> => {
  try {
    // Sử dụng API route tương đối - hoạt động cả local và Vercel
    const apiUrl = '/api/chat';
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [
          { role: 'system', content: 'Bạn là trợ lý AI chống lừa đảo tiếng Việt. Hãy trả lời ngắn gọn, hữu ích.' },
          { role: 'user', content: userMessage }
        ]
      }),
    });
    const data = await res.json();
    return data.text || 'Không nhận được phản hồi từ AI.';
  } catch (error) {
    return 'Xin lỗi, hiện tại tôi đang gặp sự cố kết nối. Vui lòng thử lại sau hoặc liên hệ hotline 113 để được hỗ trợ.';
  }
};

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Gọi Gemini API
    try {
      const responseText = await getBotResponse(inputValue);
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại!',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { icon: '⚠️', text: 'Dấu hiệu lừa đảo' },
    { icon: '🆘', text: 'Bị lừa phải làm gì?' },
    { icon: '👮', text: 'Báo công an' },
    { icon: '🛡️', text: 'Cách phòng tránh' }
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900/50 to-slate-900/80">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white flex items-center gap-2">
              Trợ lý AI Chống Lừa Đảo
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-xs text-blue-300">Luôn sẵn sàng hỗ trợ bạn 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/10'
              }`}
            >
              {message.sender === 'bot' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-blue-400">AI Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-blue-400" />
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-400 mb-3">Câu hỏi nhanh:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.text)}
                className="bg-white/5 backdrop-blur-sm text-white px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 text-xs font-medium flex items-center gap-2 hover:scale-105"
              >
                <span className="text-base">{question.icon}</span>
                <span className="text-left">{question.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 pb-24 pt-3 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent backdrop-blur-xl border-t border-white/10">
        <div className="flex gap-2 items-end">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 resize-none bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-400 max-h-24"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 shadow-lg disabled:shadow-none hover:scale-105 disabled:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
