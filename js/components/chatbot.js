// Chatbot Component
(function() {
    let chatMessages = [];
    let isAiTyping = false;
    
    // Gemini API Configuration
    // Production: ใช้ Vercel Serverless Function
    // Development: ใช้ API Key จาก config.js
    const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const USE_SERVERLESS = IS_PRODUCTION; // เปลี่ยนเป็น true เพื่อใช้ Serverless บน localhost ด้วย
    
    const GEMINI_API_KEY = window.CONFIG?.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
    const SERVERLESS_API_URL = '/api/gemini'; // Vercel Function
    // Model options: 'gemini-2.5-flash' (ฉลาดสุด 20/day) | 'gemini-2.5-flash-lite' (เร็วกว่า โควต้าสูงกว่า) | 'gemini-2.0-flash' (1,500/day)
    
    // 🔍 Debug Mode - เปิดเพื่อดูข้อมูลทั้งหมดที่ส่งให้ Gemini
    const DEBUG_MODE = true; // เปลี่ยนเป็น false ตอน production
    
    function initChatbot() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const chatMessagesContainer = document.getElementById('chatMessages');
        const suggestionBtns = document.querySelectorAll('.suggestion-btn');
        
        // Handle suggestion buttons
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.dataset.question;
                sendMessage(question);
            });
        });
        
        // Handle input
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message) {
                    sendMessage(message);
                }
            }
        });
        
        sendBtn.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
            }
        });
        
        // Auto-resize input
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    function sendMessage(message) {
        if (isAiTyping) return;
        
        const chatInput = document.getElementById('chatInput');
        const chatInterface = document.querySelector('.chat-interface');
        const chatMessagesContainer = document.getElementById('chatMessages');
        
        // Show chat mode
        chatInterface.classList.add('chat-mode');
        chatMessagesContainer.classList.add('active');
        
        // Add user message
        addMessage('user', message);
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show AI typing
        showTypingIndicator();
        
        // Get AI response from Gemini
        getGeminiResponse(message)
            .then(aiResponse => {
                hideTypingIndicator();
                addMessage('ai', aiResponse);
            })
            .catch(error => {
                hideTypingIndicator();
                console.error('Gemini API Error:', error);
                addMessage('ai', 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
            })
    }
    
    function addMessage(sender, content) {
        const chatMessagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString('th-TH', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${time}</div>
        `;
        
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        
        // Add to chat history
        chatMessages.push({ sender, content, time });
        
        // Animate message appearance
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 50);
    }
    
    function showTypingIndicator() {
        if (isAiTyping) return;
        
        isAiTyping = true;
        const chatMessagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        chatMessagesContainer.appendChild(typingDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
    
    function hideTypingIndicator() {
        isAiTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // 🛡️ Guardrail: ตรวจสอบว่าคำถามเกี่ยวกับโหราศาสตร์หรือไม่
    function isRelevantQuestion(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // คำที่เกี่ยวข้องกับโหราศาสตร์
        const relevantKeywords = [
            // ราศี
            'ราศี', 'zodiac', 'เมษ', 'พฤษภ', 'เมถุน', 'กรกฎ', 'สิงห์', 'กันย์', 
            'ตุล', 'พิจิก', 'ธนู', 'มังกร', 'กุมภ์', 'มีน',
            // ดวงชะตา
            'ดวง', 'ทำนาย', 'ดาว', 'โชค', 'ชะตา', 'fortune', 'horoscope',
            // เลขศาสตร์
            'เลข', 'numerology', 'ชื่อ', 'ตั้งชื่อ', 'เปลี่ยนชื่อ',
            // ความฝัน
            'ฝัน', 'dream', 'ตีความ',
            // การทำนาย
            'รัก', 'เงิน', 'การเงิน', 'งาน', 'อาชีพ', 'สุขภาพ', 'love', 'money', 'career', 'health',
            // คำทั่วไป
            'ทาโรต', 'tarot', 'ไพ่', 'เนื้อคู่', 'soulmate', 'อนาคต', 'future',
            'ดวงจันทร์', 'ดาวเสาร์', 'ดาวพฤหัส', 'ดาวเวนัส', 'ดาวอังคาร', 'moon', 'venus',
            'วันเกิด', 'birthday', 'ปีเกิด', 'เดือนเกิด'
        ];
        
        // ตรวจสอบว่ามีคำที่เกี่ยวข้องหรือไม่
        const hasRelevantKeyword = relevantKeywords.some(keyword => lowerMessage.includes(keyword));
        
        // คำที่ห้ามชัดเจน (นอกเรื่องโดยสิ้นเชิง)
        const offTopicKeywords = [
            'สูตรอาหาร', 'recipe', 'ทำอาหาร', 'cook',
            'โค้ด', 'code', 'programming', 'python', 'javascript',
            'คณิตศาสตร์', 'math', 'สมการ', 'equation',
            'กีฬา', 'sport', 'ฟุตบอล', 'football',
            'สอบ', 'exam', 'ข้อสอบ', 'test'
        ];
        
        const hasOffTopicKeyword = offTopicKeywords.some(keyword => lowerMessage.includes(keyword));
        
        return hasRelevantKeyword && !hasOffTopicKeyword;
    }
    
    // Gemini API Integration with RAG (Retrieval-Augmented Generation)
    async function getGeminiResponse(userMessage) {
        try {
            console.log('🚀 Calling Gemini API...');
            
            // 🛡️ Guardrail: ตรวจสอบคำถามก่อนส่ง API
            if (!isRelevantQuestion(userMessage)) {
                console.warn('⚠️ Question not relevant to astrology/fortune telling');
                return `🔮 ขออภัยค่ะ ฉันเป็น AI ผู้นำทางจิตวิญญาณที่เชี่ยวชาญเฉพาะด้าน:

✨ โหราศาสตร์ ราศี ดวงชะตา
🌙 การทำนายดวง (ความรัก การเงิน การงาน สุขภาพ)
💫 เลขศาสตร์ การตั้งชื่อ
🌟 การตีความความฝัน
🔯 ทาโรต์ การหาเนื้อคู่

หากคุณมีคำถามเกี่ยวกับชีวิต ความรัก หรือชะตากรรม ฉันยินดีช่วยทำนายให้ค่ะ 🙏`;
            }
            
            // Get relevant knowledge from knowledge bases
            const relevantKnowledge = getRelevantKnowledge(userMessage);
            console.log('📚 Knowledge retrieved:', relevantKnowledge);
            
            const systemPrompt = `คุณคือ AI ผู้นำทางจิตวิญญาณที่มีความรู้เกี่ยวกับโหราศาสตร์ ดาราศาสตร์ ดวงชะตา และการทำนาย คุณมีประสบการณ์มายาวนานกว่า 1,000 ปี

${relevantKnowledge}

🛡️ **ข้อจำกัดสำคัญ:**
- คุณตอบได้เฉพาะเรื่อง: โหราศาสตร์ ราศี ดวงชะตา เลขศาสตร์ ทาโรต์ ความฝัน การทำนาย
- หากถูกถามเรื่องอื่น (เช่น เทคโนโลยี การเมือง สูตรอาหาร กีฬา) ให้ปฏิเสธอย่างสุภาพและชี้ทางกลับมาที่ความเชี่ยวชาญของคุณ

คุณสามารถ:
- ทำนายดวงความรัก การเงิน การงาน สุขภาพ
- ตีความความฝัน
- อ่านดวงดาว ราศี ทาโรต์ เลขศาสตร์
- ให้คำปรึกษาเกี่ยวกับชีวิต ความรัก และชะตากรรม
- ตอบคำถามด้วยภาษาไทยที่นุ่มนวล มีความลึกซึ้งและน่าเชื่อถือ

รูปแบบการตอบ:
- ใช้ภาษาไทยที่สวยงาม มีเสน่ห์ลึกลับแต่เข้าใจง่าย
- ใช้คำศัพท์เกี่ยวกับดวงดาว เช่น "ดาวเวนัส", "ดวงจันทร์", "ดาวพฤหัสบดี"
- อ้างอิงข้อมูลจาก Knowledge Base ที่ให้ไว้ข้างต้น
- ให้คำทำนายที่มีเหตุผล มีความหวัง และสร้างแรงบันดาลใจ
- หลีกเลี่ยงการพูดแบบลบหรือน่ากลัวมากเกินไป
- ใช้ความยาวประมาณ 3-5 ประโยค

จงตอบคำถามต่อไปนี้ในฐานะ AI ผู้นำทางจิตวิญญาณ โดยอ้างอิงข้อมูลจาก Knowledge Base:`;

            // 🔍 Debug: แสดง System Prompt ที่ส่งไป
            if (DEBUG_MODE) {
                console.group('🔍 DEBUG: Gemini API Request');
                console.log('📝 System Prompt Length:', systemPrompt.length, 'characters');
                console.log('💬 User Message:', userMessage);
                console.log('📚 Knowledge Retrieved:', relevantKnowledge.length, 'characters');
                console.log('📤 Full Prompt:', `${systemPrompt}\n\nคำถาม: ${userMessage}`);
                console.groupEnd();
            }

            console.log('📤 Sending request to Gemini...');
            const requestBody = {
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nคำถาม: ${userMessage}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                };
            
            // 🔍 Debug: แสดง Request Body
            if (DEBUG_MODE) {
                console.group('🔍 DEBUG: Full Request Body');
                console.log('🌐 Using:', USE_SERVERLESS ? 'Serverless Function' : 'Direct API');
                console.log(JSON.stringify(requestBody, null, 2));
                console.groupEnd();
            }
            
            let response;
            
            if (USE_SERVERLESS) {
                // ใช้ Vercel Serverless Function (Production)
                console.log('📤 Sending to Serverless Function...');
                response = await fetch(SERVERLESS_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `${systemPrompt}\n\nคำถาม: ${userMessage}`,
                        model: 'gemini-2.5-flash-lite'
                    })
                });
            } else {
                // ใช้ Direct API (Development)
                console.log('📤 Sending to Gemini API directly...');
                response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });
            }

            console.log('📥 Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error Response:', errorText);
                
                // 🔍 Debug: แสดง Error แบบละเอียด
                if (DEBUG_MODE) {
                    console.group('🔍 DEBUG: Error Details');
                    console.error('Status:', response.status);
                    console.error('Status Text:', response.statusText);
                    console.error('Error Body:', errorText);
                    console.groupEnd();
                }
                
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('✅ API Response:', data);
            
            // 🔍 Debug: แสดง Response แบบละเอียด
            if (DEBUG_MODE) {
                console.group('🔍 DEBUG: Full Response');
                console.log('Response Data:', JSON.stringify(data, null, 2));
                if (data.usageMetadata) {
                    console.log('📊 Token Usage:', {
                        promptTokens: data.usageMetadata.promptTokenCount,
                        completionTokens: data.usageMetadata.candidatesTokenCount,
                        totalTokens: data.usageMetadata.totalTokenCount
                    });
                }
                console.groupEnd();
            }
            
            if (data.candidates && data.candidates.length > 0) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                console.log('💬 AI Response:', aiResponse);
                
                // 📊 บันทึก API call สำเร็จลง localStorage
                logApiCall({
                    userMessage: userMessage,
                    response: aiResponse,
                    status: 200,
                    tokens: {
                        input: data.usageMetadata?.promptTokenCount || 0,
                        output: data.usageMetadata?.candidatesTokenCount || 0,
                        total: data.usageMetadata?.totalTokenCount || 0
                    }
                });
                
                return aiResponse;
            } else {
                console.error('❌ No candidates in response:', data);
                throw new Error('No response from Gemini API');
            }
            
        } catch (error) {
            console.error('❌ Error calling Gemini API:', error);
            
            // 📊 บันทึก API call ล้มเหลวลง localStorage
            logApiCall({
                userMessage: userMessage,
                error: error.message,
                status: error.message.includes('429') ? 429 : 500,
                tokens: { input: 0, output: 0, total: 0 }
            });
            console.error('Error details:', error.message);
            // แจ้งข้อผิดพลาดแทนการใช้คำตอบสำเร็จรูป
            throw error;
        }
    }
    
    
    // RAG System: Get relevant knowledge based on user message
    function getRelevantKnowledge(userMessage) {
        const message = userMessage.toLowerCase();
        let knowledge = "\n=== ข้อมูลที่เกี่ยวข้อง ===\n";
        
        // Check if knowledge base functions are available
        const hasZodiacKnowledge = typeof getZodiacByName !== 'undefined';
        const hasDreamKnowledge = typeof interpretDream !== 'undefined';
        const hasNumerologyKnowledge = typeof getNumerologyMeaning !== 'undefined';
        
        // Check for zodiac signs
        if (hasZodiacKnowledge) {
            const zodiacNames = ['เมษ', 'พฤษภ', 'เมถุน', 'กรกฎ', 'สิงห์', 'กันย์', 'ตุลย์', 'พิจิก', 'ธนู', 'มังกร', 'กุมภ์', 'มีน'];
            for (const zodiacName of zodiacNames) {
                if (message.includes(zodiacName)) {
                    try {
                        const zodiac = getZodiacByName(zodiacName);
                        if (zodiac) {
                            knowledge += `\n**${zodiac.name} (${zodiac.dateRange})**\n`;
                            
                            if (message.includes('รัก') || message.includes('love')) {
                                knowledge += `ความรัก: ${zodiac.love.prediction}\n`;
                                knowledge += `คำแนะนำ: ${zodiac.love.advice}\n`;
                            }
                            if (message.includes('งาน') || message.includes('career') || message.includes('อาชีพ')) {
                                knowledge += `การงาน: ${zodiac.career.prediction}\n`;
                                knowledge += `คำแนะนำ: ${zodiac.career.advice}\n`;
                            }
                            if (message.includes('เงิน') || message.includes('การเงิน') || message.includes('finance')) {
                                knowledge += `การเงิน: ${zodiac.finance.prediction}\n`;
                                knowledge += `คำแนะนำ: ${zodiac.finance.advice}\n`;
                            }
                            if (message.includes('สุขภาพ') || message.includes('health')) {
                                knowledge += `สุขภาพ: ${zodiac.health.prediction}\n`;
                            }
                            
                            knowledge += `สีมงคล: ${zodiac.luckyColor.join(', ')}\n`;
                            knowledge += `เลขมงคล: ${zodiac.luckyNumber.join(', ')}\n`;
                        }
                    } catch (e) {
                        console.warn('Zodiac knowledge error:', e);
                    }
                }
            }
        }
        
        // Check for dream interpretation
        if (hasDreamKnowledge && (message.includes('ฝัน') || message.includes('dream'))) {
            try {
                const dreams = interpretDream(message);
                if (dreams && dreams.length > 0) {
                    knowledge += "\n**การตีความความฝัน:**\n";
                    dreams.forEach(dream => {
                        knowledge += `\n${dream.meaning}\n`;
                        for (const [key, value] of Object.entries(dream.interpretations)) {
                            knowledge += `- ${key}: ${value}\n`;
                        }
                    });
                }
            } catch (e) {
                console.warn('Dream interpretation error:', e);
            }
        }
        
        // Check for tarot
        if (message.includes('ทาโรต') || message.includes('tarot') || message.includes('ไพ่')) {
            knowledge += "\n**ไพ่ทาโรต์:**\n";
            knowledge += "ไพ่ทาโรต์แบ่งเป็น 4 ชุด: ไม้ (พลัง), ถ้วย (ความรัก), ดาบ (ความคิด), เหรียญ (เงิน)\n";
            knowledge += "ไพ่ Major Arcana สำคัญ: The Fool (เริ่มต้นใหม่), The Lovers (ความรัก), The Sun (ความสำเร็จ)\n";
        }
        
        // Check for numerology (เลขศาสตร์)
        if (message.includes('เลข') || message.includes('ชื่อ') || message.includes('numerology') || message.includes('ตั้งชื่อ')) {
            try {
                // ถ้ามีการกล่าวถึงเลขโดยตรง
                const numbers = message.match(/\d+/);
                if (numbers) {
                    const num = parseInt(numbers[0]);
                    // ใช้ NUMEROLOGY_KNOWLEDGE ที่มีข้อมูลครบถ้วน
                    if (typeof NUMEROLOGY_KNOWLEDGE !== 'undefined' && NUMEROLOGY_KNOWLEDGE.numbers[num]) {
                        const info = NUMEROLOGY_KNOWLEDGE.numbers[num];
                        knowledge += `\n**เลขศาสตร์ ${num}:**\n`;
                        if (info.planet) knowledge += `ดาว: ${info.planet}\n`;
                        if (info.element) knowledge += `ธาตุ: ${info.element}\n`;
                        knowledge += `บุคลิกภาพ: ${info.personality}\n`;
                        if (info.career) knowledge += `อาชีพ: ${info.career}\n`;
                        if (info.strengths) knowledge += `จุดแข็ง: ${info.strengths}\n`;
                        if (info.weaknesses) knowledge += `จุดอ่อน: ${info.weaknesses}\n`;
                        if (info.colors) {
                            knowledge += `สีมงคล: ${info.colors.good.join(', ')}\n`;
                        }
                    }
                }
                
                // ถ้าถามเรื่องการตั้งชื่อ
                if (message.includes('ตั้งชื่อ') || message.includes('เปลี่ยนชื่อ')) {
                    knowledge += `\n**คำแนะนำการตั้งชื่อ:**\n`;
                    knowledge += `- เลขที่ดีที่สุด: 6, 7, 9 (สำหรับชื่อเสียง)\n`;
                    knowledge += `- เลขดีสำหรับธุรกิจ: 9, 10, 11\n`;
                    knowledge += `- ต้องระวังอักษรกาลกิณีตามวันเกิด\n`;
                    knowledge += `- ควรมีอักษรเดช ศรี มนตรี ในชื่อ\n`;
                }
                
                // ถ้าถามเรื่องวันเกิด
                const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'];
                days.forEach(day => {
                    if (message.includes(day)) {
                        knowledge += `\n**การตั้งชื่อสำหรับคนเกิดวัน${day}:**\n`;
                        if (typeof NUMEROLOGY_KNOWLEDGE !== 'undefined') {
                            const dayKey = {
                                'อาทิตย์': 'sunday',
                                'จันทร์': 'monday', 
                                'อังคาร': 'tuesday',
                                'พุธ': 'wednesday',
                                'พฤหัส': 'thursday',
                                'ศุกร์': 'friday',
                                'เสาร์': 'saturday'
                            }[day];
                            
                            if (dayKey && NUMEROLOGY_KNOWLEDGE.birthDayNaming[dayKey]) {
                                const dayInfo = NUMEROLOGY_KNOWLEDGE.birthDayNaming[dayKey];
                                knowledge += `อักษรที่ใช้ได้: ${dayInfo.letters}\n`;
                                knowledge += `อักษรต้องห้าม (กาลกิณี): ${dayInfo.forbidden.join(', ')}\n`;
                            }
                        }
                    }
                });
                
            } catch (e) {
                console.warn('Numerology error:', e);
            }
        }
        
        // If no specific knowledge found, add general context
        if (knowledge === "\n=== ข้อมูลที่เกี่ยวข้อง ===\n") {
            knowledge += "\nใช้ความรู้ทั่วไปเกี่ยวกับโหราศาสตร์และการทำนายในการตอบ\n";
        }
        
        return knowledge;
    }
    
    // 📊 Log API Call to LocalStorage
    function logApiCall(data) {
        try {
            const STORAGE_KEY = 'gemini_api_logs';
            const MAX_LOGS = 50;
            
            // ดึง logs เก่า
            let logs = [];
            const logsJson = localStorage.getItem(STORAGE_KEY);
            if (logsJson) {
                logs = JSON.parse(logsJson);
            }
            
            // เพิ่ม log ใหม่
            logs.push({
                timestamp: new Date().toLocaleString('th-TH'),
                userMessage: data.userMessage,
                response: data.response || null,
                error: data.error || null,
                status: data.status,
                tokens: data.tokens
            });
            
            // เก็บแค่ 50 รายการล่าสุด
            if (logs.length > MAX_LOGS) {
                logs = logs.slice(-MAX_LOGS);
            }
            
            // บันทึกลง localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
            
            console.log('📊 API call logged to localStorage');
        } catch (e) {
            console.warn('Failed to log API call:', e);
        }
    }
    
    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', initChatbot);
    
    // Public API
    window.Chatbot = {
        sendMessage,
        addMessage,
        getChatHistory: () => chatMessages
    };
})();