# 🎬 YouTube Embed Converter

**เครื่องมือแปลงลิงก์ YouTube เป็นโค้ด Embed สำหรับวิดีโอทุกรูปแบบ (Shorts, Standard, Live, Playlist)**

เครื่องมือเว็บแอปพลิเคชันที่ช่วยให้การนำวิดีโอจาก YouTube ไปวางบนเว็บไซต์ของคุณเป็นเรื่องง่ายขึ้น โดยเน้นความเร็ว (Performance), ความ Local และ รองรับ SEO อย่างเต็มรูปแบบ

----------

## 🇹🇭 ภาษาไทย (Thai)

### ✨ คุณสมบัติเด่น
    
-   **📱 รองรับ YouTube Shorts:** มีระบบตรวจจับและปรับสัดส่วนคลิปสั้น (9:16) ให้อัตโนมัติ เพื่อการแสดงผลที่สวยงามเหมือนดูบนมือถือ
    
-   **🛠️ ปรับแต่งได้ตามใจ:** เลือกเปิด-ปิด Autoplay, Controls, Modest Branding และอื่นๆ ได้ง่ายๆ
    
-   **🔍 SEO & Social Optimized:** ติดตั้ง Meta Tags สำหรับการทำอันดับบน Google และการแชร์ลงโซเชียลมีเดีย
    
-   **🔋 Offline Friendly:** ใช้ Library ไอคอน (Lucide) แบบ Local ไม่ต้องพึ่งอินเทอร์เน็ตภายนอกในการโหลดไอคอน
    

### 📂 โครงสร้างโปรเจกต์

Plaintext

```
├── index.html       # หน้าหลักและโครงสร้าง SEO
├── robots.txt       # ไฟล์กำหนดสิทธิ์การเข้าถึงสำหรับบอท (Search Engine)
└── src/
    ├── style.css    # สไตล์การปรับแต่งและระบบ Responsive
    ├── index.js     # ระบบประมวลผลการแปลงลิงก์และ Logic พรีวิว
    └── lucide.js    # ไฟล์ไอคอนแบบ Local

```

### 🚀 วิธีการใช้งาน

1.  **Clone หรือดาวน์โหลด** โฟลเดอร์โปรเจกต์นี้
    
2.  เปิดไฟล์ `index.html` ผ่านเว็บเบราว์เซอร์ (หรือใช้ Live Server)
    
3.  คัดลอกลิงก์ YouTube (คลิปปกติ, Shorts หรือ Playlist) มาวางในช่องรับข้อมูล
    
4.  กดปุ่ม **"แปลงเป็น Embed"**
    
5.  คัดลอกโค้ดไปใช้งานในเว็บไซต์ของคุณได้ทันที!
    

----------

## 🇺🇸 English

### ✨ Key Features

-   **📱 Shorts Support:** Automatically detects and scales YouTube Shorts to a vertical 9:16 aspect ratio, ensuring a native mobile-like experience.
    
-   **🛠️ Fully Customizable:** Easily toggle settings like Autoplay, Player Controls, Modest Branding, and Related Videos.
    
-   **🔍 SEO & Social Optimized:** Pre-configured with Meta Tags for better Google rankings and Social Media snippets (Open Graph).
    
-   **🔋 Offline Friendly:** Utilizes a local copy of Lucide Icons, ensuring icons load instantly without an external CDN connection.
    

### 📂 Project Structure

Plaintext

```
├── index.html       # Core structure and SEO configuration
├── robots.txt       # Search engine crawler instructions
└── src/
    ├── style.css    # Custom styling and responsive design
    ├── index.js     # Conversion logic and preview management
    └── lucide.js    # Local icons library

```

### 🚀 Getting Started

1.  **Clone or download** the project folder.
    
2.  Open `index.html` in any web browser (or use a Live Server extension).
    
3.  Paste any YouTube URL (Standard, Shorts, Live, or Playlist) into the input field.
    
4.  Click **"Convert to Embed"**.
    
5.  Copy the generated code snippet and paste it into your website.
    

----------

## 🛠️ Tech Stack

-   **Markup:** HTML5 (Semantic)
    
-   **Styling:** Tailwind CSS
    
-   **Scripting:** Vanilla JavaScript (ES6+)
    
-   **Icons:** Lucide Icons (Local)
    
-   **Optimization:** Lazy Loading, Preconnect hints
    

----------

### 📝 License

โปรเจกต์นี้พัฒนาขึ้นเพื่อเป็นเครื่องมืออำนวยความสะดวกแบบ Open Source สามารถนำไปปรับแต่งและใช้งานต่อได้ตามต้องการ

This project is an open-source utility tool. Feel free to modify and use it as needed.

----------

**Created with ❤️ by Shoper Team**
