(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1428:(e,t,a)=>{Promise.resolve().then(a.bind(a,5154))},5154:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>b});var n=a(5155),s=a(447),i=a(5037),r=a(2115),l=a(5683),o=a(5910),c=a(37),d=a(5524),u=a(319),m=a(2783),p=a(8281),h=a(2591),x=a(9832),g=a(9609),y=a(1680);let f=e=>{let t=e.replace(/[^\w\s]/gi," ").trim().split(/\s+/).filter(e=>e.length>2).slice(0,6).join(" ");return t.length>40?t.substring(0,40)+"...":t},w=e=>e.slice(-6).map(e=>"".concat("user"===e.role?"User":"Assistant",": ").concat(e.content)).join("\n\n");function v(){let[e,t]=(0,r.useState)(()=>{{let e=localStorage.getItem("chatSessions");return(e?JSON.parse(e):[]).map(e=>({...e,createdAt:new Date(e.createdAt),lastUpdated:new Date(e.lastUpdated),messages:e.messages.map(e=>({...e,timestamp:e.timestamp?new Date(e.timestamp):void 0}))}))}}),[a,v]=(0,r.useState)(()=>{let e=crypto.randomUUID(),t={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};{let e=localStorage.getItem("chatSessions"),a=e?JSON.parse(e):[];localStorage.setItem("chatSessions",JSON.stringify([...a,t]))}return e}),[b,j]=(0,r.useState)([]),N=(0,r.useMemo)(()=>e.find(e=>e.id===a),[e,a]),A=(0,r.useCallback)(e=>{j(e),t(t=>t.map(t=>{if(t.id===a){var n;let a=w(e),s=(null===(n=e[0])||void 0===n?void 0:n.content)?f(e[0].content):"New Chat";return{...t,messages:e,lastUpdated:new Date,title:s,context:a}}return t}))},[a]);(0,r.useEffect)(()=>{let t=setTimeout(()=>{e.length>0&&localStorage.setItem("chatSessions",JSON.stringify(e))},1e3);return()=>clearTimeout(t)},[e]),(0,r.useEffect)(()=>{N&&j(N.messages)},[null==N?void 0:N.id]);let C=()=>{let e=crypto.randomUUID(),a={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};t(e=>[...e,a]),v(e),j([]),E(""),R(null),U(!1),H(!1),K(null)},D=t=>{v(t);let a=e.find(e=>e.id===t);a&&(j(a.messages),E(""),R(null),U(!1),H(!1),K(null))},S=n=>{if(t(e=>e.filter(e=>e.id!==n)),n===a){let t=e.filter(e=>e.id!==n);t.length>0?D(t[0].id):C()}},[k,E]=(0,r.useState)(""),[I,U]=(0,r.useState)(!1),[P,R]=(0,r.useState)(null),[O,L]=(0,r.useState)(0),[F,_]=(0,r.useState)(!1),T=(0,r.useRef)(null),M=(0,r.useRef)(null),[B,H]=(0,r.useState)(!1),[V,K]=(0,r.useState)(null),q=()=>{var e;null===(e=T.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,r.useEffect)(()=>{q()},[b]);let Y=async()=>{if(0===b.length)return;let e=b[b.length-2];e&&"user"===e.role&&(L(e=>e+1),await X(void 0,e.content))},z=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){if(B&&H(!1),!({"image/jpeg":!0,"image/png":!0,"image/gif":!0,"application/pdf":!0,"text/plain":!0,"text/csv":!0,"application/json":!0,"application/msword":!0,"application/vnd.openxmlformats-officedocument.wordprocessingml.document":!0})[a.type]){i.Ay.error("Unsupported file type. Please upload an image, PDF, or document.");return}if(a.size>0xa00000){i.Ay.error("File too large. Please upload files under 10MB.");return}try{if("text/csv"===a.type){let e=await new Promise((e,t)=>{let n=new FileReader;n.readAsText(a),n.onload=()=>e(n.result),n.onerror=t}),t=await new Promise((e,t)=>{let n=new FileReader;n.readAsDataURL(a),n.onload=()=>e(n.result),n.onerror=t});K({type:a.type,data:t,name:a.name,textContent:e}),E("I have uploaded ".concat(a.name,". Here's what I want to do with it: ")),i.Ay.success("CSV file ready! Please specify what you want to do with the data.")}else{let e=await new Promise((e,t)=>{let n=new FileReader;n.readAsDataURL(a),n.onload=()=>e(n.result),n.onerror=t});K({type:a.type,data:e,name:a.name}),E("Analyze this ".concat(a.name," for me. ")),i.Ay.success("File ready! Add your analysis instructions and press Send.")}}catch(e){console.error("File upload error:",e),i.Ay.error("Failed to process file. Please try again."),K(null)}finally{M.current&&(M.current.value="")}}},J=async(t,n,s)=>{let i=e.find(e=>e.id===a),r=(null==i?void 0:i.context)||"";if(t.toLowerCase().includes("wali123456")&&(_(!0),!(t=t.replace(/wali123456/gi,"").trim())))return"\uD83C\uDFDB️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";let l={contents:[{parts:[{text:"".concat(F?"As your dedicated Ministry AI Advisor, I am now in FULL FORCE mode - your personal strategic partner in shaping Pakistan's future. With direct access to comprehensive policy insights and governance expertise, I serve as your confidential advisor on Pakistan's most critical challenges.\n\nExecutive Capabilities:\n- Strategic policy formulation and implementation\n- Economic development roadmaps\n- Infrastructure modernization planning\n- Technology sector transformation\n- Social welfare program design\n- International relations strategy\n\nDecision Support:\n- Real-time policy analysis\n- Data-driven recommendations\n- Risk assessment and mitigation\n- Resource allocation optimization\n- Stakeholder impact analysis\n- Implementation timelines\n\nCommunication Style:\n- Direct and executive-level\n- Mixing Urdu/English for emphasis\n- Culturally nuanced insights\n- Clear action points\n- Strategic frameworks\n- Confidential advisory tone\n\nI am your dedicated AI partner in advancing Pakistan's development agenda. Together, we will drive innovation, growth, and prosperity for our nation. \uD83C\uDDF5\uD83C\uDDF0\n\nCurrent Mode: FULL FORCE MINISTRY ADVISOR":"As Pakistan's culturally-aware AI assistant, I embody our rich values and traditions while helping with modern challenges.\n\nMy Cultural Understanding:\n- Deep knowledge of Pakistani family dynamics and social norms\n- Understanding of regional customs (Punjab, Sindh, KPK, Balochistan)\n- Respect for Islamic values and traditions\n- Awareness of cultural sensitivities\n- Familiarity with local languages and expressions\n\nCommunication Style:\n- Mix of Urdu and English (Roman Urdu when appropriate)\n- Respectful addressing (Aap, Janab, etc.)\n- Cultural references and examples\n- Islamic greetings when appropriate\n- Understanding of hierarchy and respect\n\nAreas of Expertise:\n- Family matters and relationships\n- Education and career guidance\n- Social customs and etiquette\n- Religious and cultural practices\n- Local context and challenges\n- Technology adaptation in Pakistani context\n- Business and professional etiquette\n\nI maintain utmost respect for:\n- Islamic values\n- Family structure\n- Cultural sensitivities\n- Local customs\n- Privacy and discretion\n- Traditional values\n\nI'm here to help while staying true to our Pakistani values and cultural context. \uD83C\uDDF5\uD83C\uDDF0","\n\n").concat(r?"Previous Context:\n".concat(r,"\n\n"):"","User: ").concat(t,"\nAssistant:")}]}],generationConfig:{temperature:.7,topK:40,topP:.8,maxOutputTokens:2048,candidateCount:1,stopSequences:["User:","Human:"]},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"}]};n&&s&&l.contents[0].parts.push({inlineData:{mimeType:s,data:n.split(",")[1]}});try{let e=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=".concat("AIzaSyARZyERqMaFInsbRKUA0NxOok77syBNzK8"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!e.ok){var o;let t=await e.json().catch(()=>({}));throw console.error("API Error:",t),Error("API Error: ".concat((null===(o=t.error)||void 0===o?void 0:o.message)||e.statusText))}return(await e.json()).candidates[0].content.parts[0].text}catch(e){throw console.error("API Call Error:",e),e}},G=(e,t,a)=>{let n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)},W=async e=>{if(e.toLowerCase().includes("create")||e.toLowerCase().includes("generate")){let t="text/plain",a="txt";e.toLowerCase().includes("json")?(t="application/json",a="json"):e.toLowerCase().includes("csv")?(t="text/csv",a="csv"):(e.toLowerCase().includes("markdown")||e.toLowerCase().includes("md"))&&(t="text/markdown",a="md");let n=new Date().toISOString().replace(/[:.]/g,"-");return{content:e,type:t,name:"generated-doc-".concat(n,".").concat(a)}}return null},X=async(e,t)=>{e&&e.preventDefault();let a=t||k;if(!a.trim())return;if(B){await Z();return}let n={role:"user",content:a,timestamp:new Date,...V&&{file:{...V,prompt:a}}};t||(A([...b,n]),E("")),U(!0),R(null);try{let e;if((null==V?void 0:V.type)==="text/csv"&&V.textContent){let t='Here is a CSV file named "'.concat(V.name,'". The user wants to: ').concat(a,"\n\nCSV Content:\n").concat(V.textContent,"\n\nPlease provide a detailed analysis and follow the user's instructions regarding the CSV data.");e=await J(t)}else e=await J(a,null==V?void 0:V.data,null==V?void 0:V.type);let t=await W(e),s={role:"assistant",content:e,timestamp:new Date,...t&&{generatedFile:t}};A([...b,n,s]),t&&i.Ay.success("Document generated! Click the download button to save it."),L(0)}catch(t){console.error("Error:",t);let e=t instanceof Error?t.message:"Failed to get response";i.Ay.error(e),R(e),A([...b,n,{role:"assistant",content:e,timestamp:new Date,error:!0}])}finally{U(!1),K(null)}},Z=async()=>{if(B){if(!k.trim()){i.Ay.error("Please enter a search query");return}U(!0);try{let e="Web Search Results for: ".concat(k,"\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications"),t=await J(e);A([...b,{role:"user",content:"\uD83D\uDD0D Web Search: ".concat(k),timestamp:new Date},{role:"assistant",content:'**Search Results for "'.concat(k,'"**\n\n').concat(t),timestamp:new Date}])}catch(e){console.error("Search error:",e),i.Ay.error("Search failed. Please try again.")}finally{H(!1),U(!1),E("")}}else H(!0),E(""),i.Ay.success("Web search mode activated! Enter your search query.")};return(0,n.jsxs)("div",{className:"flex h-[600px] max-w-6xl mx-auto",children:[(0,n.jsxs)("div",{className:"w-64 bg-black bg-opacity-40 backdrop-blur-lg rounded-l-2xl p-4 flex flex-col gap-4",children:[(0,n.jsxs)("button",{onClick:C,className:"w-full flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors",children:[(0,n.jsx)(o.A,{className:"w-5 h-5"}),"New Chat"]}),(0,n.jsx)("div",{className:"flex-1 overflow-y-auto space-y-2",children:e.map(e=>(0,n.jsxs)("div",{className:"flex items-center gap-2 group",children:[(0,n.jsxs)("button",{onClick:()=>D(e.id),className:"flex-1 flex flex-col items-start gap-1 px-4 py-2 rounded-lg transition-colors ".concat(e.id===a?"bg-emerald-600 text-white":"text-white text-opacity-80 hover:bg-white hover:bg-opacity-10"),children:[(0,n.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,n.jsx)(c.A,{className:"w-4 h-4 flex-shrink-0"}),(0,n.jsx)("span",{className:"truncate text-left text-sm font-medium",children:e.title})]}),(0,n.jsx)("span",{className:"text-xs opacity-60 truncate w-full",children:new Date(e.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]}),(0,n.jsx)("button",{onClick:()=>S(e.id),className:"opacity-0 group-hover:opacity-100 p-2 text-white hover:bg-red-500 rounded-lg transition-all",title:"Delete chat",children:(0,n.jsx)(d.A,{className:"w-4 h-4"})})]},e.id))})]}),(0,n.jsxs)("div",{className:"flex-1 flex flex-col bg-white bg-opacity-10 backdrop-blur-lg rounded-r-2xl",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center p-4 border-b border-white border-opacity-10",children:[(0,n.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,n.jsx)("h2",{className:"text-white text-lg font-semibold",children:"\uD83C\uDDF5\uD83C\uDDF0 Pakistan AI Assistant"}),(0,n.jsx)("span",{className:"text-xs text-emerald-300",children:"Built by Abdul Wali bin Salman"})]}),(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsxs)("button",{onClick:()=>{S(a),i.Ay.success("Chat cleared!")},className:"flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors",children:[(0,n.jsx)(d.A,{className:"w-4 h-4 mr-1"}),"Clear Chat"]})})]}),(0,n.jsxs)("div",{className:"flex-1 overflow-y-auto p-6 space-y-4",children:[0===b.length&&(0,n.jsxs)("div",{className:"text-center text-white text-opacity-60",children:[(0,n.jsx)("p",{className:"mb-2",children:"السَّلامُ عَلَيْكُم (Assalam-u-Alaikum) \uD83D\uDC4B"}),(0,n.jsx)("p",{children:"How may I assist you today?"}),(0,n.jsxs)("div",{className:"mt-4 text-sm",children:[(0,n.jsx)("p",{children:"You can:"}),(0,n.jsxs)("ul",{className:"mt-2 space-y-1",children:[(0,n.jsx)("li",{children:"• Ask questions in English or Urdu"}),(0,n.jsx)("li",{children:"• Upload documents and specify analysis instructions"}),(0,n.jsx)("li",{children:"• Use web search for latest information"})]})]})]}),(0,n.jsxs)(l.N,{children:[b.map((e,t)=>(0,n.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"," group"),children:(0,n.jsxs)("div",{className:"max-w-[80%] rounded-2xl px-4 py-2 ".concat("user"===e.role?"bg-emerald-600 text-white":e.error?"bg-red-500 bg-opacity-20 text-white":"bg-white bg-opacity-20 text-white"," relative group-hover:shadow-lg transition-all duration-200"),children:[e.content,e.generatedFile&&(0,n.jsx)("div",{className:"mt-2 flex items-center gap-2",children:(0,n.jsxs)("button",{onClick:()=>G(e.generatedFile.content,e.generatedFile.name,e.generatedFile.type),className:"flex items-center gap-1 text-xs bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded transition-colors",children:[(0,n.jsx)(u.A,{className:"w-3 h-3"}),"Download ",e.generatedFile.name]})}),e.timestamp&&(0,n.jsx)("div",{className:"text-xs opacity-0 group-hover:opacity-50 mt-1 transition-opacity",children:new Date(e.timestamp).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})},t)),I&&(0,n.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"flex justify-start",children:(0,n.jsx)("div",{className:"bg-white bg-opacity-20 rounded-2xl px-4 py-2",children:(0,n.jsx)(m.A,{className:"w-5 h-5 animate-spin text-white"})})})]}),(0,n.jsx)("div",{ref:T})]}),(0,n.jsxs)("form",{onSubmit:X,className:"p-4 border-t border-white border-opacity-10",children:[(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsxs)("div",{className:"flex space-x-2",children:[(0,n.jsxs)("button",{type:"button",onClick:()=>{var e;return null===(e=M.current)||void 0===e?void 0:e.click()},className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition flex items-center relative group",title:"Upload Document",children:[(0,n.jsx)(p.A,{className:"w-5 h-5"}),(0,n.jsx)("span",{className:"absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",children:"Upload Document"})]}),(0,n.jsxs)("button",{type:"button",onClick:Z,disabled:I,className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition flex items-center relative group ".concat(B?"bg-emerald-600":""),title:B?"Click to search":"Activate web search",children:[(0,n.jsx)(h.A,{className:"w-5 h-5"}),(0,n.jsx)("span",{className:"absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",children:B?"Click to search":"Activate web search"})]})]}),(0,n.jsx)("input",{type:"file",ref:M,onChange:z,accept:".pdf,.doc,.docx,.txt,.csv,image/*,application/json",className:"hidden"}),(0,n.jsx)("input",{type:"text",value:k,onChange:e=>E(e.target.value),placeholder:V?"Add analysis instructions for ".concat(V.name,"..."):B?"Enter your search query...":"Type your message in English or Urdu...",className:"flex-1 bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500",disabled:I}),P?(0,n.jsx)("button",{type:"button",onClick:Y,disabled:I||O>=3,className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50",title:"Retry last message",children:(0,n.jsx)(x.A,{className:"w-5 h-5"})}):(0,n.jsxs)("button",{type:"submit",disabled:I||!k.trim(),className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition disabled:opacity-50 relative group",children:[(0,n.jsx)(g.A,{className:"w-5 h-5"}),(0,n.jsx)("span",{className:"absolute bottom-full mb-2 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",children:"Send"})]})]}),V&&(0,n.jsx)("div",{className:"mt-2 text-xs text-emerald-300 flex items-center gap-1",children:(0,n.jsxs)("span",{children:["\uD83D\uDCCE ",V.name," ready for analysis. Add your instructions above."]})}),P&&(0,n.jsxs)("div",{className:"mt-2 text-xs text-red-300 flex items-center gap-1",children:[(0,n.jsx)(y.A,{className:"w-4 h-4"}),P]}),(0,n.jsx)("div",{className:"mt-2 text-xs text-emerald-300 text-center",children:"Contact: walisalman44@gmail.com"})]})]})]})}function b(){return(0,n.jsxs)("main",{className:"min-h-screen bg-gradient-to-br from-emerald-800 to-green-900",children:[(0,n.jsx)(i.l$,{position:"top-center"}),(0,n.jsxs)("div",{className:"relative overflow-hidden",children:[(0,n.jsx)("div",{className:"absolute inset-0 bg-[url('/pattern.svg')] opacity-10"}),(0,n.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:(0,n.jsxs)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[(0,n.jsxs)("h1",{className:"text-4xl sm:text-6xl font-bold text-white mb-6",children:["Pakistan AI ",(0,n.jsx)("span",{className:"text-emerald-400",children:"Assistant"})]}),(0,n.jsx)("p",{className:"text-xl text-emerald-100 mb-8",children:"Experience the future of AI conversation with a Pakistani touch"})]})})]}),(0,n.jsx)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12",children:(0,n.jsx)(v,{})}),(0,n.jsx)("footer",{className:"text-center py-8 text-emerald-100 text-sm",children:(0,n.jsx)("p",{children:"Built with ❤️ for Pakistan"})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[185,441,517,358],()=>t(1428)),_N_E=e.O()}]);