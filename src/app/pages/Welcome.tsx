import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Shield, Crown, ArrowRight, Bell, Phone, Link } from "lucide-react";
import { motion } from "motion/react";

export function Welcome() {
  const navigate = useNavigate();
  const [showModeSelector, setShowModeSelector] = useState(false);

  const handleStartProtection = () => {
    setShowModeSelector(true);
  };

  const handleSelectMode = (mode: "normal" | "elder") => {
    if (mode === "elder") {
      localStorage.setItem('elderMode', 'true');
      navigate("/elder-home");
    } else {
      localStorage.setItem('elderMode', 'false');
      navigate("/home");
    }
  };

  return (
    <div className="h-full flex flex-col justify-between px-6 py-8 overflow-y-auto">
      {/* Logo and Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <motion.div 
            className="relative"
            animate={{ 
              rotateY: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Outer glow rings */}
            <div className="absolute inset-0 w-24 h-24 -left-2 -top-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-2xl animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-red-400/20 animate-spin" style={{ animationDuration: '8s' }}></div>
            </div>
            
            {/* Main logo container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-shine"></div>
              
              {/* 3D depth layers */}
              <div className="absolute inset-1 bg-gradient-to-br from-red-400/50 to-transparent rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              
              {/* Shield with checkmark icon */}
              <div className="relative z-10">
                <svg className="w-12 h-12 text-white drop-shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {/* Shield outline */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                
                {/* Inner glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-full blur-md"></div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-white/60 to-transparent rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-gradient-to-tr from-white/40 to-transparent rounded-full"></div>
            </div>
            
            {/* Floating particles */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full shadow-lg shadow-orange-500/50"
              animate={{
                y: [-3, 3, -3],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-300 rounded-full shadow-lg shadow-red-400/50"
              animate={{
                y: [3, -3, 3],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.div>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent mb-2 drop-shadow-lg">
          Anti Scamer
        </h1>
        <p className="text-sm text-gray-300 mb-3">Bảo vệ bạn khỏi lừa đảo trực tuyến</p>

        {/* Vietnam Badge */}
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500/20 to-yellow-500/20 backdrop-blur-sm border-2 border-red-400/30 rounded-full px-4 py-2 inline-flex shadow-lg">
          <div className="w-6 h-4 bg-red-600 relative overflow-hidden rounded shadow-sm">
            <svg className="w-4 h-4 text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
            </svg>
          </div>
          <span className="text-xs font-bold text-red-200">Sản phẩm của người Việt Nam</span>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="space-y-3"
      >
        <h2 className="text-center text-sm font-bold text-gray-200 mb-2">Chức năng bảo vệ</h2>
        <div className="grid grid-cols-3 gap-3">
          {/* Feature 1: Cảnh báo sớm */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 rounded-2xl p-3 text-center shadow-lg hover:bg-white/15 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-400/50">
              <Bell className="w-6 h-6 text-blue-300 stroke-[1.5]" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Cảnh báo</h3>
            <p className="text-[10px] text-gray-300 leading-tight">Thông báo ngay khi phát hiện lừa đảo</p>
          </motion.div>

          {/* Feature 2: Nhận diện cuộc gọi/SMS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm border-2 border-purple-400/30 rounded-2xl p-3 text-center shadow-lg hover:bg-white/15 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-400/50">
              <Phone className="w-6 h-6 text-purple-300 stroke-[1.5]" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Cuộc gọi</h3>
            <p className="text-[10px] text-gray-300 leading-tight">Nhận diện số điện thoại & SMS lừa đảo</p>
          </motion.div>

          {/* Feature 3: Nhận diện link */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm border-2 border-red-400/30 rounded-2xl p-3 text-center shadow-lg hover:bg-white/15 transition-all"
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-xl flex items-center justify-center border border-red-400/50">
              <Link className="w-6 h-6 text-red-300 stroke-[1.5]" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">Link an toàn</h3>
            <p className="text-[10px] text-gray-300 leading-tight">Kiểm tra link web độc hại tức thì</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Account Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-4 border-2 border-blue-100"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Nguyễn Văn An</h3>
              <p className="text-xs text-gray-500">user@antiscamer.vn</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-xl px-3 py-1.5 shadow-md">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700">Premium</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-green-600 font-semibold">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Được bảo vệ tối đa
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative"
      >
        {/* Glow effect - Always animated */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
        
        <Button
          onClick={handleStartProtection}
          className="relative w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 active:from-red-700 active:via-red-800 active:to-red-900 text-white py-6 text-lg font-bold rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-red-400/50 active:border-red-300 overflow-hidden group"
        >
          {/* Shine effect - Continuous animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-5 h-5" />
          </motion.div>
          
          <span className="relative z-10">Bắt đầu bảo vệ</span>
          
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Mode Selector Popup */}
      {showModeSelector && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-white/30 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-white text-center mb-3">Chọn chế độ sử dụng</h2>
            <p className="text-sm text-gray-300 text-center mb-6">
              Chọn giao diện phù hợp với bạn
            </p>

            {/* Normal Mode */}
            <button
              onClick={() => handleSelectMode("normal")}
              className="w-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-5 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border-2 border-blue-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-bold mb-1">Chế độ bình thường</h3>
                  <p className="text-sm text-blue-100">Đầy đủ tính năng bảo vệ</p>
                </div>
              </div>
            </button>

            {/* Elder Mode */}
            <button
              onClick={() => handleSelectMode("elder")}
              className="w-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 border-2 border-green-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">👴</span>
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-bold mb-1">Chế độ dễ dùng</h3>
                  <p className="text-sm text-green-100">Giao diện đơn giản, chữ to</p>
                </div>
              </div>
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowModeSelector(false)}
              className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all"
            >
              Hủy
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
