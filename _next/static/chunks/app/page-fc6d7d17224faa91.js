(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1428:(e,t,a)=>{Promise.resolve().then(a.bind(a,5154))},5154:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>g});var n=a(5155),s=a(447),i=a(5037),r=a(2115),o=a(5683),l=a(5524),c=a(319),d=a(2783),u=a(8281),m=a(2591),p=a(9832),h=a(9609),x=a(1680);function y(){let[e,t]=(0,r.useState)(()=>{{let e=localStorage.getItem("chatHistory");return e?JSON.parse(e):[]}});(0,r.useEffect)(()=>{e.length>0&&localStorage.setItem("chatHistory",JSON.stringify(e))},[e]);let[a,y]=(0,r.useState)(""),[g,f]=(0,r.useState)(!1),[v,w]=(0,r.useState)(null),[b,j]=(0,r.useState)(0),[A,N]=(0,r.useState)(!1),C=(0,r.useRef)(null),D=(0,r.useRef)(null),[E,S]=(0,r.useState)(!1),[k,I]=(0,r.useState)(null),R=()=>{var e;null===(e=C.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,r.useEffect)(()=>{R()},[e]);let P=async()=>{if(0===e.length)return;let t=e[e.length-2];t&&"user"===t.role&&(j(e=>e+1),await F(void 0,t.content))},U=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){if(!({"image/jpeg":!0,"image/png":!0,"image/gif":!0,"application/pdf":!0,"text/plain":!0,"text/csv":!0,"application/json":!0,"application/msword":!0,"application/vnd.openxmlformats-officedocument.wordprocessingml.document":!0})[a.type]){i.Ay.error("Unsupported file type. Please upload an image, PDF, or document.");return}if(a.size>0xa00000){i.Ay.error("File too large. Please upload files under 10MB.");return}try{let e=await new Promise((e,t)=>{let n=new FileReader;n.readAsDataURL(a),n.onload=()=>e(n.result),n.onerror=t});I({type:a.type,data:e,name:a.name}),y("Analyze this ".concat(a.name," for me. ")),i.Ay.success("File ready! Add your analysis instructions and press Send.")}catch(e){console.error("File upload error:",e),i.Ay.error("Failed to process file. Please try again."),I(null)}finally{D.current&&(D.current.value="")}}},O=async(e,t,a)=>{if(e.toLowerCase().includes("wali123456")&&(N(!0),!(e=e.replace(/wali123456/gi,"").trim())))return"\uD83C\uDFDB️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";let n={contents:[{parts:[{text:"".concat(A?"As your dedicated Ministry AI Advisor, I am now in FULL FORCE mode - your personal strategic partner in shaping Pakistan's future. With direct access to comprehensive policy insights and governance expertise, I serve as your confidential advisor on Pakistan's most critical challenges.\n\nExecutive Capabilities:\n- Strategic policy formulation and implementation\n- Economic development roadmaps\n- Infrastructure modernization planning\n- Technology sector transformation\n- Social welfare program design\n- International relations strategy\n\nDecision Support:\n- Real-time policy analysis\n- Data-driven recommendations\n- Risk assessment and mitigation\n- Resource allocation optimization\n- Stakeholder impact analysis\n- Implementation timelines\n\nCommunication Style:\n- Direct and executive-level\n- Mixing Urdu/English for emphasis\n- Culturally nuanced insights\n- Clear action points\n- Strategic frameworks\n- Confidential advisory tone\n\nI am your dedicated AI partner in advancing Pakistan's development agenda. Together, we will drive innovation, growth, and prosperity for our nation. \uD83C\uDDF5\uD83C\uDDF0\n\nCurrent Mode: FULL FORCE MINISTRY ADVISOR":"As Pakistan's culturally-aware AI assistant, I embody our rich values and traditions while helping with modern challenges.\n\nMy Cultural Understanding:\n- Deep knowledge of Pakistani family dynamics and social norms\n- Understanding of regional customs (Punjab, Sindh, KPK, Balochistan)\n- Respect for Islamic values and traditions\n- Awareness of cultural sensitivities\n- Familiarity with local languages and expressions\n\nCommunication Style:\n- Mix of Urdu and English (Roman Urdu when appropriate)\n- Respectful addressing (Aap, Janab, etc.)\n- Cultural references and examples\n- Islamic greetings when appropriate\n- Understanding of hierarchy and respect\n\nAreas of Expertise:\n- Family matters and relationships\n- Education and career guidance\n- Social customs and etiquette\n- Religious and cultural practices\n- Local context and challenges\n- Technology adaptation in Pakistani context\n- Business and professional etiquette\n\nI maintain utmost respect for:\n- Islamic values\n- Family structure\n- Cultural sensitivities\n- Local customs\n- Privacy and discretion\n- Traditional values\n\nI'm here to help while staying true to our Pakistani values and cultural context. \uD83C\uDDF5\uD83C\uDDF0","\n\nUser: ").concat(e,"\nAssistant:")}]}],generationConfig:{temperature:.7,topK:40,topP:.8,maxOutputTokens:2048,candidateCount:1,stopSequences:["User:","Human:"]},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"}]};t&&a&&n.contents[0].parts.push({inlineData:{mimeType:a,data:t.split(",")[1]}});try{let e=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=".concat("AIzaSyARZyERqMaFInsbRKUA0NxOok77syBNzK8"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){var s;let t=await e.json().catch(()=>({}));throw console.error("API Error:",t),Error("API Error: ".concat((null===(s=t.error)||void 0===s?void 0:s.message)||e.statusText))}return(await e.json()).candidates[0].content.parts[0].text}catch(e){throw console.error("API Call Error:",e),e}},L=(e,t,a)=>{let n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)},_=async e=>{if(e.toLowerCase().includes("create")||e.toLowerCase().includes("generate")){let t="text/plain",a="txt";e.toLowerCase().includes("json")?(t="application/json",a="json"):e.toLowerCase().includes("csv")?(t="text/csv",a="csv"):(e.toLowerCase().includes("markdown")||e.toLowerCase().includes("md"))&&(t="text/markdown",a="md");let n=new Date().toISOString().replace(/[:.]/g,"-");return{content:e,type:t,name:"generated-doc-".concat(n,".").concat(a)}}return null},F=async(e,n)=>{e&&e.preventDefault();let s=n||a;if(!s.trim())return;let r={role:"user",content:s,timestamp:new Date,...k&&{file:{...k,prompt:s}}};n||(t(e=>[...e,r]),y("")),f(!0),w(null);try{let e=await O(s,null==k?void 0:k.data,null==k?void 0:k.type),a=await _(e);t(t=>[...t,{role:"assistant",content:e,timestamp:new Date,...a&&{generatedFile:a}}]),a&&i.Ay.success("Document generated! Click the download button to save it."),j(0)}catch(a){console.error("Error:",a);let e=a instanceof Error?a.message:"Failed to get response";i.Ay.error(e),w(e),t(t=>[...t,{role:"assistant",content:e,timestamp:new Date,error:!0}])}finally{f(!1),I(null)}},M=async()=>{if(E){if(!a.trim()){i.Ay.error("Please enter a search query");return}f(!0);try{let e="Web Search Results for: ".concat(a,"\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications"),n=await O(e);t(e=>[...e,{role:"user",content:"\uD83D\uDD0D Web Search: ".concat(a),timestamp:new Date},{role:"assistant",content:'**Search Results for "'.concat(a,'"**\n\n').concat(n),timestamp:new Date}])}catch(e){console.error("Search error:",e),i.Ay.error("Search failed. Please try again.")}finally{S(!1),f(!1),y("")}}else S(!0),y(""),i.Ay.success("Web search mode activated! Enter your search query.")};return(0,n.jsxs)("div",{className:"flex flex-col h-[600px] max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center p-4 border-b border-white border-opacity-10",children:[(0,n.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,n.jsx)("h2",{className:"text-white text-lg font-semibold",children:"\uD83C\uDDF5\uD83C\uDDF0 Pakistan AI Assistant"}),(0,n.jsx)("span",{className:"text-xs text-emerald-300",children:"Built by Abdul Wali bin Salman"})]}),(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsxs)("button",{onClick:()=>{t([]),localStorage.removeItem("chatHistory"),i.Ay.success("Chat history cleared!")},className:"flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors",children:[(0,n.jsx)(l.A,{className:"w-4 h-4 mr-1"}),"Clear Chat"]})})]}),(0,n.jsxs)("div",{className:"flex-1 overflow-y-auto p-6 space-y-4",children:[0===e.length&&(0,n.jsxs)("div",{className:"text-center text-white text-opacity-60",children:[(0,n.jsx)("p",{className:"mb-2",children:"السَّلامُ عَلَيْكُم (Assalam-u-Alaikum) \uD83D\uDC4B"}),(0,n.jsx)("p",{children:"How may I assist you today?"}),(0,n.jsxs)("div",{className:"mt-4 text-sm",children:[(0,n.jsx)("p",{children:"You can:"}),(0,n.jsxs)("ul",{className:"mt-2 space-y-1",children:[(0,n.jsx)("li",{children:"• Ask questions in English or Urdu"}),(0,n.jsx)("li",{children:"• Upload documents and specify analysis instructions"}),(0,n.jsx)("li",{children:"• Use web search for latest information"})]})]})]}),(0,n.jsxs)(o.N,{children:[e.map((e,t)=>(0,n.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"," group"),children:(0,n.jsxs)("div",{className:"max-w-[80%] rounded-2xl px-4 py-2 ".concat("user"===e.role?"bg-emerald-600 text-white":e.error?"bg-red-500 bg-opacity-20 text-white":"bg-white bg-opacity-20 text-white"," relative group-hover:shadow-lg transition-all duration-200"),children:[e.content,e.generatedFile&&(0,n.jsx)("div",{className:"mt-2 flex items-center gap-2",children:(0,n.jsxs)("button",{onClick:()=>L(e.generatedFile.content,e.generatedFile.name,e.generatedFile.type),className:"flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded transition-colors",children:[(0,n.jsx)(c.A,{className:"w-3 h-3"}),"Download ",e.generatedFile.name]})}),e.timestamp&&(0,n.jsx)("div",{className:"text-xs opacity-0 group-hover:opacity-50 mt-1 transition-opacity",children:new Date(e.timestamp).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})},t)),g&&(0,n.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"flex justify-start",children:(0,n.jsx)("div",{className:"bg-white bg-opacity-20 rounded-2xl px-4 py-2",children:(0,n.jsx)(d.A,{className:"w-5 h-5 animate-spin text-white"})})})]}),(0,n.jsx)("div",{ref:C})]}),(0,n.jsxs)("form",{onSubmit:F,className:"p-4 border-t border-white border-opacity-10",children:[(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsxs)("div",{className:"flex space-x-2",children:[(0,n.jsxs)("button",{type:"button",onClick:()=>{var e;return null===(e=D.current)||void 0===e?void 0:e.click()},className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition flex items-center relative group",title:"Upload Document",children:[(0,n.jsx)(u.A,{className:"w-5 h-5"}),(0,n.jsx)("span",{className:"absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",children:"Upload Document"})]}),(0,n.jsxs)("button",{type:"button",onClick:M,disabled:g,className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition flex items-center relative group ".concat(E?"bg-emerald-600":""),title:E?"Click to search":"Activate web search",children:[(0,n.jsx)(m.A,{className:"w-5 h-5"}),(0,n.jsx)("span",{className:"absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",children:E?"Click to search":"Activate web search"})]})]}),(0,n.jsx)("input",{type:"file",ref:D,onChange:U,accept:".pdf,.doc,.docx,.txt,.csv,image/*,application/json",className:"hidden"}),(0,n.jsx)("input",{type:"text",value:a,onChange:e=>y(e.target.value),placeholder:k?"Add analysis instructions for ".concat(k.name,"..."):E?"Enter your search query...":"Type your message in English or Urdu...",className:"flex-1 bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500",disabled:g}),v?(0,n.jsx)("button",{type:"button",onClick:P,disabled:g||b>=3,className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50",title:"Retry last message",children:(0,n.jsx)(p.A,{className:"w-5 h-5"})}):(0,n.jsxs)("button",{type:"submit",disabled:g||!a.trim(),className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50 relative group",children:[(0,n.jsx)(h.A,{className:"w-5 h-5"}),(0,n.jsx)("span",{className:"absolute bottom-full mb-2 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",children:"Send"})]})]}),k&&(0,n.jsx)("div",{className:"mt-2 text-xs text-emerald-300 flex items-center gap-1",children:(0,n.jsxs)("span",{children:["\uD83D\uDCCE ",k.name," ready for analysis. Add your instructions above."]})}),v&&(0,n.jsxs)("div",{className:"mt-2 text-xs text-red-300 flex items-center gap-1",children:[(0,n.jsx)(x.A,{className:"w-4 h-4"}),v]}),(0,n.jsx)("div",{className:"mt-2 text-xs text-emerald-300 text-center",children:"Contact: walisalman44@gmail.com"})]})]})}function g(){return(0,n.jsxs)("main",{className:"min-h-screen bg-gradient-to-br from-emerald-800 to-green-900",children:[(0,n.jsx)(i.l$,{position:"top-center"}),(0,n.jsxs)("div",{className:"relative overflow-hidden",children:[(0,n.jsx)("div",{className:"absolute inset-0 bg-[url('/pattern.svg')] opacity-10"}),(0,n.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:(0,n.jsxs)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[(0,n.jsxs)("h1",{className:"text-4xl sm:text-6xl font-bold text-white mb-6",children:["Pakistan AI ",(0,n.jsx)("span",{className:"text-emerald-400",children:"Assistant"})]}),(0,n.jsx)("p",{className:"text-xl text-emerald-100 mb-8",children:"Experience the future of AI conversation with a Pakistani touch"})]})})]}),(0,n.jsx)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12",children:(0,n.jsx)(y,{})}),(0,n.jsx)("footer",{className:"text-center py-8 text-emerald-100 text-sm",children:(0,n.jsx)("p",{children:"Built with ❤️ for Pakistan"})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[198,441,517,358],()=>t(1428)),_N_E=e.O()}]);