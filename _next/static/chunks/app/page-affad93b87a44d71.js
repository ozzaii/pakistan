(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1428:(e,t,a)=>{Promise.resolve().then(a.bind(a,5154))},5154:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var n=a(5155),s=a(447),i=a(5037),l=a(2115),r=a(5683),o=a(37),c=a(5910),d=a(5524),m=a(319),u=a(2783),h=a(8281),x=a(2591),p=a(9832),g=a(9609),f=a(1680);let w=e=>{let t=e.replace(/[^\w\s]/gi," ").trim().split(/\s+/).filter(e=>e.length>2).slice(0,6).join(" ");return t.length>40?t.substring(0,40)+"...":t},b=e=>e.slice(-6).map(e=>"".concat("user"===e.role?"User":"Assistant",": ").concat(e.content)).join("\n\n");function y(){let[e,t]=(0,l.useState)(()=>{{let e=localStorage.getItem("chatSessions");return(e?JSON.parse(e):[]).map(e=>({...e,createdAt:new Date(e.createdAt),lastUpdated:new Date(e.lastUpdated),messages:e.messages.map(e=>({...e,timestamp:e.timestamp?new Date(e.timestamp):void 0}))}))}}),[a,y]=(0,l.useState)(()=>{let e=crypto.randomUUID(),t={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};{let e=localStorage.getItem("chatSessions"),a=e?JSON.parse(e):[];localStorage.setItem("chatSessions",JSON.stringify([...a,t]))}return e}),[v,N]=(0,l.useState)([]),j=(0,l.useMemo)(()=>e.find(e=>e.id===a),[e,a]),A=(0,l.useCallback)(e=>{N(e),t(t=>t.map(t=>{if(t.id===a){var n;let a=b(e),s=(null===(n=e[0])||void 0===n?void 0:n.content)?w(e[0].content):"New Chat";return{...t,messages:e,lastUpdated:new Date,title:s,context:a}}return t}))},[a]);(0,l.useEffect)(()=>{let t=setTimeout(()=>{e.length>0&&localStorage.setItem("chatSessions",JSON.stringify(e))},1e3);return()=>clearTimeout(t)},[e]),(0,l.useEffect)(()=>{j&&N(j.messages)},[null==j?void 0:j.id]);let C=()=>{let e=crypto.randomUUID(),a={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};t(e=>[...e,a]),y(e),N([]),I(""),R(null),U(!1),H(!1),K(null)},k=t=>{y(t);let a=e.find(e=>e.id===t);a&&(N(a.messages),I(""),R(null),U(!1),H(!1),K(null))},D=n=>{if(t(e=>e.filter(e=>e.id!==n)),n===a){let t=e.filter(e=>e.id!==n);t.length>0?k(t[0].id):C()}},[S,I]=(0,l.useState)(""),[E,U]=(0,l.useState)(!1),[P,R]=(0,l.useState)(null),[_,O]=(0,l.useState)(0),[F,T]=(0,l.useState)(!1),L=(0,l.useRef)(null),M=(0,l.useRef)(null),[B,H]=(0,l.useState)(!1),[V,K]=(0,l.useState)(null),z=()=>{var e;null===(e=L.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,l.useEffect)(()=>{z()},[v]);let W=async()=>{if(0===v.length)return;let e=v[v.length-2];e&&"user"===e.role&&(O(e=>e+1),await X(void 0,e.content))},Y=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){if(B&&H(!1),!({"image/jpeg":!0,"image/png":!0,"image/gif":!0,"application/pdf":!0,"text/plain":!0,"text/csv":!0,"application/json":!0,"application/msword":!0,"application/vnd.openxmlformats-officedocument.wordprocessingml.document":!0})[a.type]){i.Ay.error("Unsupported file type. Please upload an image, PDF, or document.");return}if(a.size>0xa00000){i.Ay.error("File too large. Please upload files under 10MB.");return}try{if("text/csv"===a.type){let e=await new Promise((e,t)=>{let n=new FileReader;n.readAsText(a),n.onload=()=>e(n.result),n.onerror=t}),t=await new Promise((e,t)=>{let n=new FileReader;n.readAsDataURL(a),n.onload=()=>e(n.result),n.onerror=t});K({type:a.type,data:t,name:a.name,textContent:e}),I("I have uploaded ".concat(a.name,". Here's what I want to do with it: ")),i.Ay.success("CSV file ready! Please specify what you want to do with the data.")}else{let e=await new Promise((e,t)=>{let n=new FileReader;n.readAsDataURL(a),n.onload=()=>e(n.result),n.onerror=t});K({type:a.type,data:e,name:a.name}),I("Analyze this ".concat(a.name," for me. ")),i.Ay.success("File ready! Add your analysis instructions and press Send.")}}catch(e){console.error("File upload error:",e),i.Ay.error("Failed to process file. Please try again."),K(null)}finally{M.current&&(M.current.value="")}}},q=async(t,n,s)=>{let i=e.find(e=>e.id===a),l=(null==i?void 0:i.context)||"";if(t.toLowerCase().includes("wali123456")&&(T(!0),!(t=t.replace(/wali123456/gi,"").trim())))return"\uD83C\uDFDB️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";let r={contents:[{parts:[{text:"".concat(F?"As your dedicated Ministry AI Advisor, I am now in FULL FORCE mode - your personal strategic partner in shaping Pakistan's future. With direct access to comprehensive policy insights and governance expertise, I serve as your confidential advisor on Pakistan's most critical challenges.\n\nExecutive Capabilities:\n- Strategic policy formulation and implementation\n- Economic development roadmaps\n- Infrastructure modernization planning\n- Technology sector transformation\n- Social welfare program design\n- International relations strategy\n\nDecision Support:\n- Real-time policy analysis\n- Data-driven recommendations\n- Risk assessment and mitigation\n- Resource allocation optimization\n- Stakeholder impact analysis\n- Implementation timelines\n\nCommunication Style:\n- Direct and executive-level\n- Mixing Urdu/English for emphasis\n- Culturally nuanced insights\n- Clear action points\n- Strategic frameworks\n- Confidential advisory tone\n\nI am your dedicated AI partner in advancing Pakistan's development agenda. Together, we will drive innovation, growth, and prosperity for our nation. \uD83C\uDDF5\uD83C\uDDF0\n\nCurrent Mode: FULL FORCE MINISTRY ADVISOR":"As Pakistan's culturally-aware AI assistant, I embody our rich values and traditions while helping with modern challenges.\n\nMy Cultural Understanding:\n- Deep knowledge of Pakistani family dynamics and social norms\n- Understanding of regional customs (Punjab, Sindh, KPK, Balochistan)\n- Respect for Islamic values and traditions\n- Awareness of cultural sensitivities\n- Familiarity with local languages and expressions\n\nCommunication Style:\n- Mix of Urdu and English (Roman Urdu when appropriate)\n- Respectful addressing (Aap, Janab, etc.)\n- Cultural references and examples\n- Islamic greetings when appropriate\n- Understanding of hierarchy and respect\n\nAreas of Expertise:\n- Family matters and relationships\n- Education and career guidance\n- Social customs and etiquette\n- Religious and cultural practices\n- Local context and challenges\n- Technology adaptation in Pakistani context\n- Business and professional etiquette\n\nI maintain utmost respect for:\n- Islamic values\n- Family structure\n- Cultural sensitivities\n- Local customs\n- Privacy and discretion\n- Traditional values\n\nI'm here to help while staying true to our Pakistani values and cultural context. \uD83C\uDDF5\uD83C\uDDF0","\n\n").concat(l?"Previous Context:\n".concat(l,"\n\n"):"","User: ").concat(t,"\nAssistant:")}]}],generationConfig:{temperature:.7,topK:40,topP:.8,maxOutputTokens:2048,candidateCount:1,stopSequences:["User:","Human:"]},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"}]};n&&s&&r.contents[0].parts.push({inlineData:{mimeType:s,data:n.split(",")[1]}});try{let e=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=".concat("AIzaSyARZyERqMaFInsbRKUA0NxOok77syBNzK8"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){var o;let t=await e.json().catch(()=>({}));throw console.error("API Error:",t),Error("API Error: ".concat((null===(o=t.error)||void 0===o?void 0:o.message)||e.statusText))}return(await e.json()).candidates[0].content.parts[0].text}catch(e){throw console.error("API Call Error:",e),e}},J=(e,t,a)=>{let n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)},G=async e=>{let t=e.trim().startsWith("{")||e.trim().startsWith("["),a=e.includes("\n")&&e.split("\n").every(e=>e.includes(",")),n=e.includes("#")||e.includes("##")||e.includes("```");if(t||a||n){let s="text/plain",i="txt";t?(s="application/json",i="json"):a?(s="text/csv",i="csv"):n&&(s="text/markdown",i="md");let l=new Date().toISOString().replace(/[:.]/g,"-");return{content:e,type:s,name:"generated-doc-".concat(l,".").concat(i)}}return null},X=async(e,t)=>{e&&e.preventDefault();let a=t||S;if(!a.trim())return;if(B){await Z();return}let n={role:"user",content:a,timestamp:new Date,...V&&{file:{...V,prompt:a}}};t||(A([...v,n]),I("")),U(!0),R(null);try{let e;if((null==V?void 0:V.type)==="text/csv"&&V.textContent){let t='Here is a CSV file named "'.concat(V.name,'". The user wants to: ').concat(a,"\n\nCSV Content:\n").concat(V.textContent,"\n\nPlease provide a detailed analysis and follow the user's instructions regarding the CSV data.");e=await q(t)}else e=await q(a,null==V?void 0:V.data,null==V?void 0:V.type);let t=await G(e),s={role:"assistant",content:e,timestamp:new Date,...t&&{generatedFile:t}};A([...v,n,s]),t&&i.Ay.success("Document generated! Click the download button to save it."),O(0)}catch(t){console.error("Error:",t);let e=t instanceof Error?t.message:"Failed to get response";i.Ay.error(e),R(e),A([...v,n,{role:"assistant",content:e,timestamp:new Date,error:!0}])}finally{U(!1),K(null)}},Z=async()=>{if(B){if(!S.trim()){i.Ay.error("Please enter a search query");return}U(!0);try{let e="Web Search Results for: ".concat(S,"\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications"),t=await q(e);A([...v,{role:"user",content:"\uD83D\uDD0D Web Search: ".concat(S),timestamp:new Date},{role:"assistant",content:'**Search Results for "'.concat(S,'"**\n\n').concat(t),timestamp:new Date}])}catch(e){console.error("Search error:",e),i.Ay.error("Search failed. Please try again.")}finally{H(!1),U(!1),I("")}}else H(!0),I(""),i.Ay.success("Web search mode activated! Enter your search query.")},[$,Q]=(0,l.useState)(!1);return(0,n.jsxs)("div",{className:"flex flex-col lg:flex-row h-full w-full relative",children:[(0,n.jsx)("button",{onClick:()=>Q(!$),className:"lg:hidden fixed top-3 right-3 z-[60] p-2 bg-black/20 hover:bg-black/30 active:bg-black/40 backdrop-blur-lg rounded-xl text-white shadow-lg ring-1 ring-white/10 transition-all",children:(0,n.jsx)(o.A,{className:"w-5 h-5"})}),(0,n.jsxs)("div",{className:"\n          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-in-out\n          ".concat($?"translate-y-0":"translate-y-full","\n          bg-black/90 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl\n          max-h-[80vh] overflow-hidden flex flex-col\n        "),children:[(0,n.jsx)("div",{className:"p-3 flex justify-center",children:(0,n.jsx)("div",{className:"w-12 h-1 bg-white/20 rounded-full"})}),(0,n.jsxs)("div",{className:"p-3 flex flex-col gap-3 overflow-y-auto",children:[(0,n.jsxs)("button",{onClick:C,className:"w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/20 ring-1 ring-white/20",children:[(0,n.jsx)(c.A,{className:"w-5 h-5"}),"New Chat"]}),(0,n.jsx)("div",{className:"flex-1 space-y-2",children:e.map(e=>(0,n.jsxs)("div",{className:"flex items-center gap-2 group",children:[(0,n.jsxs)("button",{onClick:()=>{k(e.id),Q(!1)},className:"flex-1 flex flex-col items-start gap-1 px-4 py-3 rounded-xl transition-all ".concat(e.id===a?"bg-emerald-500/20 text-white ring-1 ring-emerald-500/30":"text-white/70 hover:bg-white/5 active:bg-white/10"),children:[(0,n.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,n.jsx)(o.A,{className:"w-4 h-4 flex-shrink-0"}),(0,n.jsx)("span",{className:"truncate text-left text-sm font-medium",children:e.title})]}),(0,n.jsx)("span",{className:"text-xs opacity-60 truncate w-full",children:new Date(e.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]}),(0,n.jsx)("button",{onClick:()=>D(e.id),className:"p-2 text-white/70 hover:text-white hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-all",title:"Delete chat",children:(0,n.jsx)(d.A,{className:"w-4 h-4"})})]},e.id))})]})]}),(0,n.jsxs)("div",{className:"hidden lg:flex w-72 h-full flex-col gap-3 p-3 bg-black/40 backdrop-blur-xl border-r border-white/10",children:[(0,n.jsxs)("button",{onClick:C,className:"w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/20 ring-1 ring-white/20",children:[(0,n.jsx)(c.A,{className:"w-5 h-5"}),"New Chat"]}),(0,n.jsx)("div",{className:"flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",children:e.map(e=>(0,n.jsxs)("div",{className:"flex items-center gap-2 group",children:[(0,n.jsxs)("button",{onClick:()=>k(e.id),className:"flex-1 flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl transition-all ".concat(e.id===a?"bg-emerald-500/20 text-white ring-1 ring-emerald-500/30":"text-white/70 hover:bg-white/5 active:bg-white/10"),children:[(0,n.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,n.jsx)(o.A,{className:"w-4 h-4 flex-shrink-0"}),(0,n.jsx)("span",{className:"truncate text-left text-sm font-medium",children:e.title})]}),(0,n.jsx)("span",{className:"text-xs opacity-60 truncate w-full",children:new Date(e.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]}),(0,n.jsx)("button",{onClick:()=>D(e.id),className:"opacity-0 group-hover:opacity-100 p-2 text-white/70 hover:text-white hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-all",title:"Delete chat",children:(0,n.jsx)(d.A,{className:"w-4 h-4"})})]},e.id))})]}),(0,n.jsxs)("div",{className:"flex-1 flex flex-col h-full w-full relative",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center p-3 border-b border-white/10 bg-black/20 backdrop-blur-xl shrink-0",children:[(0,n.jsxs)("div",{className:"flex items-center gap-2",children:[(0,n.jsx)("h2",{className:"text-white text-base sm:text-lg font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",children:"\uD83C\uDDF5\uD83C\uDDF0 Pakistan AI"}),(0,n.jsx)("span",{className:"hidden sm:inline text-xs text-emerald-400/90 font-medium",children:"Built by Abdul Wali"})]}),(0,n.jsxs)("button",{onClick:()=>{D(a),i.Ay.success("Chat cleared!")},className:"flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-400 rounded-lg transition-all ring-1 ring-red-500/30",children:[(0,n.jsx)(d.A,{className:"w-4 h-4"}),(0,n.jsx)("span",{className:"hidden sm:inline text-sm font-medium",children:"Clear"})]})]}),(0,n.jsxs)("div",{className:"flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent min-h-0 pb-20 lg:pb-4",children:[0===v.length&&(0,n.jsxs)("div",{className:"text-center text-white/90 mt-6 sm:mt-8",children:[(0,n.jsx)("p",{className:"mb-3 text-lg sm:text-xl font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",children:"السَّلامُ عَلَيْكُم \uD83D\uDC4B"}),(0,n.jsx)("p",{className:"text-base sm:text-lg mb-6",children:"How may I assist you today?"}),(0,n.jsxs)("div",{className:"max-w-sm mx-auto text-sm bg-black/20 backdrop-blur-lg rounded-xl p-4 shadow-xl ring-1 ring-white/10",children:[(0,n.jsx)("p",{className:"mb-2 text-emerald-400 font-medium",children:"You can:"}),(0,n.jsxs)("ul",{className:"space-y-2 text-white/80",children:[(0,n.jsxs)("li",{className:"flex items-center gap-2",children:[(0,n.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full"}),"Ask questions in English or Urdu"]}),(0,n.jsxs)("li",{className:"flex items-center gap-2",children:[(0,n.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full"}),"Upload documents for analysis"]}),(0,n.jsxs)("li",{className:"flex items-center gap-2",children:[(0,n.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full"}),"Search for latest information"]})]})]})]}),(0,n.jsxs)(r.N,{children:[v.map((e,t)=>(0,n.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"," group"),children:(0,n.jsxs)("div",{className:"max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 ".concat("user"===e.role?"bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20":e.error?"bg-red-500/10 text-white ring-1 ring-red-500/30":"bg-black/20 text-white backdrop-blur-sm ring-1 ring-white/10"," relative group-hover:shadow-xl transition-all duration-200"),children:[e.content,e.generatedFile&&(0,n.jsx)("div",{className:"mt-3 flex items-center gap-2",children:(0,n.jsxs)("button",{onClick:()=>J(e.generatedFile.content,e.generatedFile.name,e.generatedFile.type),className:"flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg transition-all ring-1 ring-emerald-500/30",children:[(0,n.jsx)(m.A,{className:"w-3.5 h-3.5"}),"Download ",e.generatedFile.name]})}),e.timestamp&&(0,n.jsx)("div",{className:"text-xs opacity-0 group-hover:opacity-60 mt-1.5 transition-opacity",children:new Date(e.timestamp).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})},t)),E&&(0,n.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"flex justify-start",children:(0,n.jsx)("div",{className:"bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-3 ring-1 ring-white/10",children:(0,n.jsx)(u.A,{className:"w-5 h-5 animate-spin text-white"})})})]}),(0,n.jsx)("div",{ref:L})]}),(0,n.jsxs)("form",{onSubmit:X,className:"lg:relative fixed bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-black/90 backdrop-blur-xl lg:backdrop-blur-sm lg:bg-black/20",children:[(0,n.jsxs)("div",{className:"flex items-center gap-2 max-w-5xl mx-auto",children:[(0,n.jsxs)("div",{className:"flex gap-1.5",children:[(0,n.jsx)("button",{type:"button",onClick:()=>{var e;return null===(e=M.current)||void 0===e?void 0:e.click()},className:"p-2 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-xl transition-all ring-1 ring-white/10",title:"Upload",children:(0,n.jsx)(h.A,{className:"w-5 h-5"})}),(0,n.jsx)("button",{type:"button",onClick:Z,disabled:E,className:"p-2 text-white/80 hover:text-white transition-all rounded-xl ring-1 ring-white/10 ".concat(B?"bg-emerald-500/20 text-emerald-400 ring-emerald-500/30":"hover:bg-white/10 active:bg-white/20"),title:B?"Search":"Web Search",children:(0,n.jsx)(x.A,{className:"w-5 h-5"})})]}),(0,n.jsx)("input",{type:"text",value:S,onChange:e=>I(e.target.value),placeholder:V?"Instructions for ".concat(V.name,"..."):B?"Search...":"Type message...",className:"flex-1 bg-black/20 text-white placeholder-white/50 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ring-1 ring-white/10 text-sm sm:text-base transition-all",disabled:E}),P?(0,n.jsx)("button",{type:"button",onClick:W,disabled:E||_>=3,className:"p-2 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-xl transition-all ring-1 ring-white/10 disabled:opacity-50",title:"Retry",children:(0,n.jsx)(p.A,{className:"w-5 h-5"})}):(0,n.jsx)("button",{type:"submit",disabled:E||!S.trim(),className:"p-2 text-white/80 hover:text-white hover:bg-emerald-500/20 active:bg-emerald-500/30 rounded-xl transition-all ring-1 ring-white/10 disabled:opacity-50 disabled:hover:bg-transparent",children:(0,n.jsx)(g.A,{className:"w-5 h-5"})})]}),(V||P)&&(0,n.jsxs)("div",{className:"mt-2 text-xs flex items-center gap-3 max-w-5xl mx-auto",children:[V&&(0,n.jsxs)("span",{className:"text-emerald-400/90 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded-lg ring-1 ring-emerald-500/30",children:[(0,n.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"}),"File ready"]}),P&&(0,n.jsxs)("span",{className:"text-red-400/90 flex items-center gap-1.5 bg-red-500/10 px-2 py-1 rounded-lg ring-1 ring-red-500/30",children:[(0,n.jsx)(f.A,{className:"w-4 h-4"}),P]})]}),(0,n.jsx)("input",{type:"file",ref:M,onChange:Y,accept:".pdf,.doc,.docx,.txt,.csv,image/*,application/json",className:"hidden"})]}),$&&(0,n.jsx)("div",{className:"fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden",onClick:()=>Q(!1)})]})]})}function v(){return(0,n.jsxs)("main",{className:"min-h-screen bg-gradient-to-br from-emerald-800 to-green-900",children:[(0,n.jsx)(i.l$,{position:"top-center"}),(0,n.jsxs)("div",{className:"relative overflow-hidden",children:[(0,n.jsx)("div",{className:"absolute inset-0 bg-[url('/pattern.svg')] opacity-10"}),(0,n.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:(0,n.jsxs)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[(0,n.jsxs)("h1",{className:"text-4xl sm:text-6xl font-bold text-white mb-6",children:["Pakistan AI ",(0,n.jsx)("span",{className:"text-emerald-400",children:"Assistant"})]}),(0,n.jsx)("p",{className:"text-xl text-emerald-100 mb-8",children:"Experience the future of AI conversation with a Pakistani touch"})]})})]}),(0,n.jsx)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12",children:(0,n.jsx)(y,{})}),(0,n.jsx)("footer",{className:"text-center py-8 text-emerald-100 text-sm",children:(0,n.jsx)("p",{children:"Built with ❤️ for Pakistan"})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[185,441,517,358],()=>t(1428)),_N_E=e.O()}]);