// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // DOM elements
  const urlInput = document.getElementById('youtube-url');
  const convertBtn = document.getElementById('convert-btn');
  const previewSection = document.getElementById('preview-section');
  const videoPreview = document.getElementById('video-preview');
  const embedCode = document.getElementById('embed-code');
  const copyEmbedBtn = document.getElementById('copy-embed');
  const copySuccess = document.getElementById('copy-success');
  const videoInfo = document.getElementById('video-info');
  const exampleButtons = document.querySelectorAll('.example-btn');
  const playlistSettings = document.getElementById('playlist-settings');
  
  // Options
  const autoplay = document.getElementById('autoplay');
  const controls = document.getElementById('controls');
  const modestbranding = document.getElementById('modestbranding');
  const rel = document.getElementById('rel');
  const playlistIndex = document.getElementById('playlist-index');
  const playlistLoop = document.getElementById('playlist-loop');
  
  // Patterns
  const youtubePatterns = {
    standard: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    shorts: /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    live: /youtube\.com\/live\/([a-zA-Z0-9_-]+)/,
    playlist: /(?:youtube\.com\/playlist\?list=|youtube\.com\/watch\?.*list=)([a-zA-Z0-9_-]+)/
  };
  
  function extractId(url) {
    const playlistMatch = url.match(youtubePatterns.playlist);
    if (playlistMatch && playlistMatch[1]) return { id: playlistMatch[1], type: 'playlist' };
    
    for (const [type, pattern] of Object.entries(youtubePatterns)) {
      if (type === 'playlist') continue;
      const match = url.match(pattern);
      if (match && match[1]) return { id: match[1], type: type };
    }
    return null;
  }
  
  function getVideoType(url) {
    if (url.includes('youtube.com/shorts/')) return 'shorts';
    if (url.includes('youtube.com/live/')) return 'live';
    if (url.includes('youtube.com/playlist') || url.includes('list=')) return 'playlist';
    return 'standard';
  }
  
  function generateEmbedUrl(id, videoType) {
    let embedUrl = videoType === 'playlist' 
      ? `https://www.youtube.com/embed/videoseries?list=${id}`
      : `https://www.youtube.com/embed/${id}`;
    
    const params = [];
    if (autoplay.checked) params.push('autoplay=1');
    if (!controls.checked) params.push('controls=0');
    if (modestbranding.checked) params.push('modestbranding=1');
    if (rel.checked) params.push('rel=1');
    
    if (videoType === 'playlist') {
      if (playlistIndex.checked) params.push('index=1');
      if (playlistLoop.checked) params.push('loop=1');
    }
    
    if (params.length > 0) {
      embedUrl += (embedUrl.includes('?') ? '&' : '?') + params.join('&');
    }
    return embedUrl;
  }
  
  // Generate static iframe code
  function generateEmbedCode(embedUrl, videoType) {
    let width = 560;
    let height = 315;

    // แก้ไขขนาด Shorts ให้เป็นมาตรฐาน (ไม่ยาวเกินไป)
    if (videoType === 'shorts') {
      width = 315;
      height = 560;
    }

    return `<iframe width="${width}" height="${height}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }
  
  // Generate responsive div code
  function generateResponsiveEmbedCode(embedUrl, videoType) {
    if (videoType === 'shorts') {
      return `<div class="shorts-container">
  <iframe src="${embedUrl}" title="YouTube Shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>`;
    } else {
      return `<div class="iframe-container">
  <iframe src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>`;
    }
  }
  
  function updateVideoInfo(id, videoType, url) {
    const typeNames = {'standard': 'คลิปมาตรฐาน', 'shorts': 'YouTube Shorts', 'live': 'ไลฟ์สด', 'playlist': 'เพลย์ลิสต์'};
    const iconType = {'standard': 'video', 'shorts': 'smartphone', 'live': 'radio', 'playlist': 'list-video'};
    
    const shortsTips = videoType === 'shorts' ? `
      <div class="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
        <div class="flex items-center gap-2 text-purple-800 mb-1">
          <i data-lucide="info" class="w-4 h-4"></i>
          <span class="font-medium">ขนาดสำหรับ Shorts</span>
        </div>
        <p class="text-purple-700 text-sm">ปรับขนาดเป็น <strong>315x560px</strong> เพื่อให้ดูสมส่วนและไม่ยาวเกินไป</p>
      </div>
    ` : '';
    
    videoInfo.innerHTML = `
      <h4 class="font-medium text-gray-700 mb-2">ข้อมูลวิดีโอ</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <i data-lucide="${iconType[videoType] || 'video'}" class="w-5 h-5 text-red-500"></i>
          <div><p class="text-sm text-gray-500">ประเภท</p><p class="font-medium">${typeNames[videoType] || 'Video'}</p></div>
        </div>
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <i data-lucide="fingerprint" class="w-5 h-5 text-blue-500"></i>
          <div><p class="text-sm text-gray-500">ID</p><p class="font-mono font-medium">${id}</p></div>
        </div>
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <i data-lucide="layout" class="w-5 h-5 text-purple-500"></i>
          <div><p class="text-sm text-gray-500">ขนาด (px)</p><p class="font-medium">${videoType === 'shorts' ? '315 x 560' : '560 x 315'}</p></div>
        </div>
        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <i data-lucide="link" class="w-5 h-5 text-green-500"></i>
          <div><p class="text-sm text-gray-500">ลิงก์ต้นฉบับ</p><p class="text-sm truncate w-32 text-blue-600">${url}</p></div>
        </div>
      </div>
      ${shortsTips}
    `;
    if (window.lucide) window.lucide.createIcons();
  }
  
  function convertUrl() {
    const url = urlInput.value.trim();
    if (!url) return alert('กรุณาใส่ลิงก์ YouTube');
    
    const idData = extractId(url);
    if (!idData) return alert('ลิงก์ไม่ถูกต้อง');
    
    const { id, type } = idData;
    const videoType = type || getVideoType(url);
    const embedUrl = generateEmbedUrl(id, videoType);
    
    videoPreview.innerHTML = '';
    
    // ตั้งค่า Class สำหรับ Container Preview
    if (videoType === 'shorts') {
      videoPreview.classList.add('shorts-mode');
    } else {
      videoPreview.classList.remove('shorts-mode');
    }
    
    const container = document.createElement('div');
    container.className = videoType === 'shorts' ? 'shorts-container' : 'iframe-container';
    
    if (videoType === 'shorts') {
      const badge = document.createElement('div');
      badge.className = 'shorts-badge';
      badge.innerHTML = `<i data-lucide="smartphone" class="w-3 h-3"></i> Shorts`;
      container.appendChild(badge);
    }
    
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    
    container.appendChild(iframe);
    videoPreview.appendChild(container);
    
    embedCode.textContent = generateResponsiveEmbedCode(embedUrl, videoType);
    updateVideoInfo(id, videoType, url);
    previewSection.classList.remove('hidden');
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (window.lucide) window.lucide.createIcons();
  }

  // Event Listeners (เหมือนเดิม)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode.textContent).then(() => {
      copySuccess.classList.remove('hidden', 'fade-in');
      void copySuccess.offsetWidth; // trigger reflow
      copySuccess.classList.add('fade-in'); // removed 'hidden' implies visible
      
      const originalText = copyEmbedBtn.innerHTML;
      copyEmbedBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> คัดลอกแล้ว!';
      copyEmbedBtn.classList.add('bg-green-100', 'text-green-800');
      
      setTimeout(() => {
        copySuccess.classList.add('hidden');
        copyEmbedBtn.innerHTML = originalText;
        copyEmbedBtn.classList.remove('bg-green-100', 'text-green-800');
        if (window.lucide) window.lucide.createIcons();
      }, 3000);
    });
  };

  convertBtn.addEventListener('click', convertUrl);
  urlInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') convertUrl(); });
  urlInput.addEventListener('input', () => { 
    const url = urlInput.value.trim();
    if (getVideoType(url) === 'playlist') playlistSettings.classList.remove('hidden');
    else playlistSettings.classList.add('hidden');
  });
  copyEmbedBtn.addEventListener('click', copyToClipboard);
  exampleButtons.forEach(btn => btn.addEventListener('click', () => {
    urlInput.value = btn.getAttribute('data-example');
    convertUrl();
  }));
  [autoplay, controls, modestbranding, rel, playlistIndex, playlistLoop].forEach(opt => {
    opt.addEventListener('change', () => { if (!previewSection.classList.contains('hidden')) convertUrl(); });
  });

  // Init
  setTimeout(() => { if (!urlInput.value) urlInput.value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; }, 500);
});