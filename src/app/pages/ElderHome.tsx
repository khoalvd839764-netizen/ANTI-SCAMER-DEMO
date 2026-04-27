import { useState, useEffect } from "react";
import { Shield, Phone, MessageSquare, AlertTriangle, Plus, X } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function ElderHome() {
  const navigate = useNavigate();

  // Load realTimeAlerts from localStorage
  const [realTimeAlerts, setRealTimeAlerts] = useState(() => {
    const saved = localStorage.getItem('realTimeAlerts');
    return saved !== 'false'; // default true
  });

  // Save realTimeAlerts to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('realTimeAlerts', realTimeAlerts.toString());
  }, [realTimeAlerts]);

  // Mock family members
  const [familyMembers] = useState([
    { id: 1, name: "Ba", phone: "0912 345 678", avatar: "👨" },
    { id: 2, name: "Mẹ", phone: "0923 456 789", avatar: "👩" },
    { id: 3, name: "Con", phone: "0934 567 890", avatar: "👧" },
  ]);

  const [showAddContact, setShowAddContact] = useState(false);

  const handleExitElderMode = () => {
    localStorage.setItem('elderMode', 'false');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="p-6 space-y-8">
          {/* Header with Exit Button */}
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-bold text-white">Bảo vệ</h1>
            <button
              onClick={handleExitElderMode}
              className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-7 h-7 text-white" />
            </button>
          </div>

          {/* Animated Shield Logo */}
          <div className="flex justify-center">
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
              <div className="absolute inset-0 w-32 h-32 -left-4 -top-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-3xl animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border-2 border-red-400/20 animate-spin" style={{ animationDuration: '8s' }}></div>
              </div>

              {/* Main logo container */}
              <div className="relative w-28 h-28 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-shine"></div>

                {/* 3D depth layers */}
                <div className="absolute inset-1 bg-gradient-to-br from-red-400/50 to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>

                {/* Shield with checkmark icon */}
                <div className="relative z-10">
                  <svg className="w-16 h-16 text-white drop-shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>

                  {/* Inner glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/30 rounded-full blur-md"></div>
                </div>
              </div>

              {/* Floating particles */}
              <motion.div
                className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full shadow-lg shadow-orange-500/50"
                animate={{
                  y: [-4, 4, -4],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Real-time Alerts Toggle */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/20">
            <div className="flex items-center justify-between gap-6 mb-6">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-3">Bảo vệ tự động</h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Thông báo khi có nguy hiểm
                </p>
              </div>

              {/* Toggle Switch - Larger */}
              <button
                onClick={() => setRealTimeAlerts(!realTimeAlerts)}
                className={`relative w-24 h-12 rounded-full transition-all duration-300 flex-shrink-0 ${
                  realTimeAlerts
                    ? "bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30"
                    : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-1.5 w-9 h-9 bg-white rounded-full shadow-md transition-all duration-300 ${
                    realTimeAlerts ? "left-12" : "left-1.5"
                  }`}
                />
              </button>
            </div>

            {/* Status Indicator */}
            {realTimeAlerts && (
              <div className="pt-6 border-t border-white/20">
                <div className="flex items-center gap-3 text-xl text-green-300">
                  <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-bold">Đang bảo vệ</span>
                </div>
              </div>
            )}
          </div>

          {/* Family Members Section */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">Danh bạ</h3>
              <button
                onClick={() => setShowAddContact(true)}
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Family List */}
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg text-3xl">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                      <p className="text-xl text-gray-300">{member.phone}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    {/* SMS Button */}
                    <a
                      href={`sms:${member.phone.replace(/\s/g, '')}`}
                      className="bg-gradient-to-br from-blue-500/30 to-blue-600/30 border-2 border-blue-400/50 rounded-xl py-4 flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <MessageSquare className="w-8 h-8 text-blue-300" />
                      <span className="text-sm font-bold text-white">Nhắn tin</span>
                    </a>

                    {/* Call Button */}
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="bg-gradient-to-br from-green-500/30 to-green-600/30 border-2 border-green-400/50 rounded-xl py-4 flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Phone className="w-8 h-8 text-green-300" />
                      <span className="text-sm font-bold text-white">Gọi điện</span>
                    </a>

                    {/* Help Button */}
                    <button
                      onClick={() => {
                        // Send help SMS
                        window.location.href = `sms:${member.phone.replace(/\s/g, '')}?body=Tôi cần trợ giúp!`;
                      }}
                      className="bg-gradient-to-br from-orange-500/30 to-red-600/30 border-2 border-orange-400/50 rounded-xl py-4 flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                    >
                      <AlertTriangle className="w-8 h-8 text-orange-300" />
                      <span className="text-sm font-bold text-white">Trợ giúp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Popup */}
      {showAddContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 max-w-md w-full"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-6">Thêm người thân</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xl font-bold text-white mb-3">Tên</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ba"
                  className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-white mb-3">Số điện thoại</label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0912 345 678"
                  className="w-full px-6 py-4 text-xl rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => setShowAddContact(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xl py-4 rounded-2xl transition-all"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // Add contact logic here
                  setShowAddContact(false);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl py-4 rounded-2xl shadow-lg transition-all"
              >
                Thêm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
