import { useState } from "react";
import { Shield, AlertTriangle, TrendingUp, Users, Bell, Phone, MessageSquare, ChevronRight, Star, X, CheckCircle, ArrowLeft, Search, Image as ImageIcon, Flame, Crown, Lightbulb, MessageCircle } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  const [showAllTips, setShowAllTips] = useState(false);
  const [reportType, setReportType] = useState<"phone" | "website">("phone");
  const [reportInput, setReportInput] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const [maxProtection, setMaxProtection] = useState(false);
  const [showProtectionPopup, setShowProtectionPopup] = useState(false);
  const [protectionPopupType, setProtectionPopupType] = useState<"enabled" | "disabled">("enabled");

  const handleSubmitReport = () => {
    if (reportInput.trim()) {
      // Show success popup
      setShowSuccessPopup(true);
      // Reset form
      setReportInput("");
      setReportDescription("");
      // Auto close popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
  };

  const handleSubmitFeedback = () => {
    if (feedbackRating > 0 && feedbackMessage.trim()) {
      // Show success popup
      setShowFeedbackSuccess(true);
      // Reset form
      setFeedbackRating(0);
      setFeedbackMessage("");
      // Auto close popup after 3 seconds
      setTimeout(() => {
        setShowFeedbackSuccess(false);
      }, 3000);
    }
  };

  const handleToggleMaxProtection = () => {
    const newState = !maxProtection;
    setMaxProtection(newState);
    setProtectionPopupType(newState ? "enabled" : "disabled");
    setShowProtectionPopup(true);
    // Auto close popup after 3 seconds
    setTimeout(() => {
      setShowProtectionPopup(false);
    }, 3000);
  };

  const antiScamTips = [
    {
      icon: "⭐",
      title: "Không bao giờ cung cấp mã OTP",
      description: "Ngân hàng không bao giờ yêu cầu mã OTP qua điện thoại",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: "🔒",
      title: "Kiểm tra kỹ đờng link trước khi click",
      description: "Lừa đảo thường dùng domain giả mạo rất giống thật",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: "📞",
      title: "Cẩn thận với cuộc gọi lạ",
      description: "Không tin tưởng người tự xưng nhân viên ngân hàng, công an",
      color: "from-purple-400 to-purple-500"
    },
    {
      icon: "💳",
      title: "Không chia sẻ thông tin thẻ ngân hàng",
      description: "Số thẻ, CVV, ngày hết hạn là thông tin tuyệt mật",
      color: "from-red-400 to-red-500"
    },
    {
      icon: "🎁",
      title: "Nghi ngờ các chương trình quà tặng hấp dẫn",
      description: "Trúng thưởng đột xuất thường là chiêu lừa đảo phổ biến",
      color: "from-green-400 to-green-500"
    },
    {
      icon: "👨‍👩‍👧",
      title: "Chia sẻ với người thân",
      description: "Giúp ba mẹ, ông bà nhận biết các thủ đoạn lừa đảo mới",
      color: "from-pink-400 to-pink-500"
    }
  ];

  const displayedTips = showAllTips ? antiScamTips : antiScamTips.slice(0, 1);

  return (
    <div className="h-full flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <h1 className="text-3xl font-bold text-white">Xin chào!</h1>
            </div>
            <div className="relative">
              {/* Family Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">👨‍👩‍👧</span>
              </div>
              {/* Badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                2
              </div>
            </div>
          </div>

          {/* Main Check Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-white/20">
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-5">
              {/* Shield Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                <Shield className="w-9 h-9 text-white relative z-10" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-red-400/30 blur-xl"></div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">Bảo vệ tối đa</h2>
                <p className="text-sm text-gray-300 leading-relaxed">Tự động chặn số điện thoại, link và hành động đáng ngờ</p>
              </div>
            </div>

            {/* Main Protection Toggle */}
            <div className="mb-4">
              <button
                onClick={handleToggleMaxProtection}
                className={`w-full font-bold text-lg py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 relative overflow-hidden ${
                  maxProtection
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                <span className="relative z-10">
                  {maxProtection ? "TẮT BẢO VỆ TỐI ĐA" : "BẬT BẢO VỆ TỐI ĐA"}
                </span>
              </button>

              {/* Status Indicator */}
              {maxProtection && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Bảo vệ tối đa đang hoạt động</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20 mb-4">
              <button 
                onClick={() => navigate("/check")}
                className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Search className="w-6 h-6 text-red-300" />
                <span className="text-sm font-medium text-gray-300">Link lạ</span>
              </button>
              
              <button 
                onClick={() => navigate("/check")}
                className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-6 h-6 text-red-300" />
                <span className="text-sm font-medium text-gray-300">Số lạ</span>
              </button>
              
              <button 
                onClick={() => navigate("/check")}
                className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <ImageIcon className="w-6 h-6 text-red-300" />
                <span className="text-sm font-medium text-gray-300">Ảnh AI</span>
              </button>
            </div>

            {/* Real-time Alerts Toggle */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-green-400/30 relative overflow-hidden">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h4 className="font-bold text-white text-sm leading-tight">Cảnh báo real-time</h4>
                      {/* PREMIUM Badge - Inline */}
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full shadow-lg border border-white/40">
                        <Crown className="w-2.5 h-2.5 text-yellow-200" strokeWidth={3} />
                        <span className="text-[8px] font-extrabold text-white tracking-wider whitespace-nowrap">PREMIUM</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-tight">Tự động thông báo khi có dấu hiệu đáng ngờ</p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={() => setRealTimeAlerts(!realTimeAlerts)}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    realTimeAlerts
                      ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30"
                      : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      realTimeAlerts ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
              
              {/* Status Text */}
              {realTimeAlerts && (
                <div className="mt-3 pt-3 border-t border-green-400/20">
                  <div className="flex items-center gap-2 text-xs text-green-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Đang bảo vệ bạn 24/7</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Community Alerts */}
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border-2 border-orange-400/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-300" />
                </div>
                <h3 className="font-bold text-white">Cảnh báo từ cộng đồng</h3>
              </div>
              <button 
                onClick={() => navigate("/community")}
                className="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Alert Items */}
            <div className="space-y-3">
              {/* Alert 1 - Domain */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Flame className="w-5 h-5 text-red-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Domain Label */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-red-500/20 border border-red-400/30 rounded-md text-[10px] font-bold text-red-300">
                        DOMAIN LẠ
                      </span>
                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-400/30 rounded-md text-[10px] font-bold text-green-300 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        XÁC MINH
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium text-white mb-1 break-all">
                      vietcombank-secure-login<span className="text-red-400">[.]</span>xyz
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>
                        Được báo cáo bởi <span className="text-red-300 font-bold">47 người</span>
                      </span>
                      <span>15 phút trước</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert 2 - Phone */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Flame className="w-5 h-5 text-orange-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Phone Label */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-400/30 rounded-md text-[10px] font-bold text-orange-300">
                        SỐ LẠ
                      </span>
                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-400/30 rounded-md text-[10px] font-bold text-green-300 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        XÁC MINH
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium text-white mb-1">
                      Số <span className="text-orange-400 font-bold">0886 234 567</span> lừa đảo
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        Được báo cáo bởi <span className="text-orange-300 font-bold">23 người</span>
                      </span>
                      <span>1 giờ trước</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Family Protection Card */}
          <button 
            onClick={() => navigate("/family")}
            className="w-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border-2 border-blue-400/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                  <Shield className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 bg-blue-400/30 blur-lg"></div>
                </div>
                <span className="font-bold text-white text-lg">Bảo vệ gia đình</span>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300" />
            </div>
          </button>

          {/* Report Form Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Gửi báo cáo</h3>
            
            {/* Type Selector */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setReportType("phone")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  reportType === "phone"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                📞 Số điện thoại
              </button>
              <button
                onClick={() => setReportType("website")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  reportType === "website"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                🌐 Website
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {reportType === "phone" ? "Số điện thoại lừa đảo" : "Đường link website"}
              </label>
              <input
                type="text"
                value={reportInput}
                onChange={(e) => setReportInput(e.target.value)}
                placeholder={
                  reportType === "phone"
                    ? "Ví dụ: 0912 345 678"
                    : "Ví dụ: https://fake-bank.com"
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-all"
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mô tả (tùy chọn)
              </label>
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Mô tả chi tiết về hành vi lừa đảo..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReport}
              disabled={!reportInput.trim()}
              className={`w-full font-bold py-3 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden ${
                reportInput.trim()
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:scale-[1.02] active:scale-95"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              {reportInput.trim() && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                GỬI BÁO CÁO
              </span>
            </button>
          </div>

          {/* Anti-Scam Tips */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border-2 border-yellow-400/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500/30 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-yellow-300" />
                </div>
                <h3 className="font-bold text-white">Mẹo chống lừa đảo</h3>
              </div>
              <button 
                onClick={() => setShowAllTips(!showAllTips)}
                className="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                {showAllTips ? "Ẩn bớt" : "Xem thêm"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Tip Items */}
            <div className="space-y-3">
              {displayedTips.map((tip, index) => (
                <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-all duration-300 ${showAllTips && index > 0 ? 'animate-fadeIn' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${tip.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <span className="text-xl">{tip.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-300">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Form Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Phản hồi</h3>
            
            {/* Rating Selector */}
            <div className="flex gap-3 mb-4">
              <Star className={`w-6 h-6 ${feedbackRating >= 1 ? "text-yellow-400" : "text-gray-400"}`} onClick={() => setFeedbackRating(1)} />
              <Star className={`w-6 h-6 ${feedbackRating >= 2 ? "text-yellow-400" : "text-gray-400"}`} onClick={() => setFeedbackRating(2)} />
              <Star className={`w-6 h-6 ${feedbackRating >= 3 ? "text-yellow-400" : "text-gray-400"}`} onClick={() => setFeedbackRating(3)} />
              <Star className={`w-6 h-6 ${feedbackRating >= 4 ? "text-yellow-400" : "text-gray-400"}`} onClick={() => setFeedbackRating(4)} />
              <Star className={`w-6 h-6 ${feedbackRating >= 5 ? "text-yellow-400" : "text-gray-400"}`} onClick={() => setFeedbackRating(5)} />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mô tả (tùy chọn)
              </label>
              <textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Mô tả chi tiết về phản hồi của bạn..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitFeedback}
              disabled={feedbackRating <= 0 || !feedbackMessage.trim()}
              className={`w-full font-bold py-3 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden ${
                feedbackRating > 0 && feedbackMessage.trim()
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:scale-[1.02] active:scale-95"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
            >
              {feedbackRating > 0 && feedbackMessage.trim() && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                GỬI PHẢN HỒI
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 max-w-sm w-full animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg relative">
                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl animate-pulse"></div>
                <CheckCircle className="w-12 h-12 text-white relative z-10" strokeWidth={2.5} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Cảm ơn bạn!
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-center mb-2">
              Báo cáo của bạn đã được gửi thành công.
            </p>
            <p className="text-gray-400 text-sm text-center">
              Chúng tôi sẽ xử lý và xác minh thông tin trong thời gian sớm nhất.
            </p>

            {/* OK Button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Feedback Success Popup */}
      {showFeedbackSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 max-w-sm w-full animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setShowFeedbackSuccess(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg relative">
                <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl animate-pulse"></div>
                <CheckCircle className="w-12 h-12 text-white relative z-10" strokeWidth={2.5} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Cảm ơn bạn!
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-center mb-2">
              Phản hồi của bạn đã được gửi thành công.
            </p>
            <p className="text-gray-400 text-sm text-center">
              Chúng tôi sẽ xem xét và phản hồi lại sớm nhất có thể.
            </p>

            {/* OK Button */}
            <button
              onClick={() => setShowFeedbackSuccess(false)}
              className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Max Protection Toggle Popup */}
      {showProtectionPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 max-w-sm w-full animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={() => setShowProtectionPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative ${
                protectionPopupType === "enabled"
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : "bg-gradient-to-br from-red-500 to-red-600"
              }`}>
                <div className={`absolute inset-0 rounded-full blur-xl animate-pulse ${
                  protectionPopupType === "enabled" ? "bg-green-400/30" : "bg-red-400/30"
                }`}></div>
                <Shield className="w-12 h-12 text-white relative z-10" strokeWidth={2.5} />
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-2xl font-bold text-center mb-3 ${
              protectionPopupType === "enabled" ? "text-green-300" : "text-red-300"
            }`}>
              {protectionPopupType === "enabled" ? "Đã bật bảo vệ tối đa!" : "Đã tắt bảo vệ tối đa!"}
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-center mb-2">
              {protectionPopupType === "enabled"
                ? "Hệ thống đang tự động chặn số điện thoại, link và hành động đáng ngờ."
                : "Bảo vệ tự động đã được tắt. Bạn sẽ không nhận được cảnh báo tự động."}
            </p>
            <p className="text-gray-400 text-sm text-center">
              {protectionPopupType === "enabled"
                ? "Bạn được bảo vệ 24/7."
                : "Hãy cẩn thận khi sử dụng điện thoại."}
            </p>

            {/* OK Button */}
            <button
              onClick={() => setShowProtectionPopup(false)}
              className={`w-full mt-6 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                protectionPopupType === "enabled"
                  ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}