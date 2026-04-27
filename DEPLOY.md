# Hướng dẫn Deploy lên Vercel

## Cấu hình API

### 1. Lấy Groq API Key
1. Truy cập https://console.groq.com/
2. Đăng ký tài khoản (miễn phí)
3. Tạo API Key mới từ "API Keys" section
4. Copy API Key

### 2. Deploy lên Vercel

**Cách 1: Deploy từ GitHub**
1. Push code lên GitHub repository
2. Truy cập https://vercel.com
3. Import repository
4. Thêm Environment Variable:
   - Name: `GROQ_API_KEY`
   - Value: API Key vừa lấy
5. Deploy

**Cách 2: Deploy từ local**
1. Cài Vercel CLI: `npm i -g vercel`
2. Chạy: `vercel`
3. Thêm Environment Variable khi được hỏi

## Cấu trúc API

API endpoint: `/api/chat`

**Request:**
```json
{
  "messages": [
    { "role": "system", "content": "Bạn là trợ lý AI..." },
    { "role": "user", "content": "Câu hỏi của user" }
  ]
}
```

**Response:**
```json
{
  "text": "Nội dung trả lời từ AI"
}
```

## Chạy local

```bash
npm install
npm run dev
```

Truy cập http://localhost:3000

## Lưu ý

- API Groq miễn phí có giới hạn requests/phút
- Nếu gặp lỗi "API key not configured", kiểm tra lại Environment Variables trên Vercel