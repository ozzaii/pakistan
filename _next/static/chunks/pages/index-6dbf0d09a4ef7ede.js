(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{2022:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(5107)}])},5107:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>y});var s=a(4848),l=a(5649),n=a(2636),r=a(6540),i=a(373),o=a(9584),c=a(2954),d=a(6611),m=a(7617),u=a(2223),h=a(2983),x=a(1722),p=a(3885),g=a(8256),f=a(7836);let w=e=>{let t=e.replace(/[^\w\s]/gi," ").trim().split(/\s+/).filter(e=>e.length>2).slice(0,6).join(" ");return t.length>40?t.substring(0,40)+"...":t},b=e=>e.slice(-6).map(e=>"".concat("user"===e.role?"User":"Assistant",": ").concat(e.content)).join("\n\n");function v(){let[e,t]=(0,r.useState)(()=>{{let e=localStorage.getItem("chatSessions");return e?JSON.parse(e):[{id:crypto.randomUUID(),title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date}]}}),[a,v]=(0,r.useState)(()=>{{let e=localStorage.getItem("chatSessions"),t=e?JSON.parse(e):[];return t.length>0?t[0].id:crypto.randomUUID()}}),[y,N]=(0,r.useState)([]),j=(0,r.useMemo)(()=>e.find(e=>e.id===a),[e,a]),A=(0,r.useCallback)(e=>{N(e),t(t=>t.map(t=>{if(t.id===a){var s;let a=b(e),l=(null===(s=e[0])||void 0===s?void 0:s.content)?w(e[0].content):"New Chat";return{...t,messages:e,lastUpdated:new Date,title:l,context:a}}return t}))},[a]);(0,r.useEffect)(()=>{let t=setTimeout(()=>{e.length>0&&localStorage.setItem("chatSessions",JSON.stringify(e))},1e3);return()=>clearTimeout(t)},[e]),(0,r.useEffect)(()=>{j&&N(j.messages)},[null==j?void 0:j.id]);let C=()=>{let e=crypto.randomUUID(),a={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};t(e=>[...e,a]),v(e),N([]),_(""),U(null),I(!1),G(!1),V(null)},D=t=>{v(t);let a=e.find(e=>e.id===t);a&&(N(a.messages),_(""),U(null),I(!1),G(!1),V(null))},k=s=>{if(t(e=>e.filter(e=>e.id!==s)),s===a){let t=e.filter(e=>e.id!==s);t.length>0?D(t[0].id):C()}},[S,_]=(0,r.useState)(""),[E,I]=(0,r.useState)(!1),[P,U]=(0,r.useState)(null),[R,T]=(0,r.useState)(0),[O,F]=(0,r.useState)(!1),M=(0,r.useRef)(null),L=(0,r.useRef)(null),[B,G]=(0,r.useState)(!1),[H,V]=(0,r.useState)(null),Y=()=>{var e;null===(e=M.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,r.useEffect)(()=>{Y()},[y]);let K=async()=>{if(0===y.length)return;let e=y[y.length-2];e&&"user"===e.role&&(T(e=>e+1),await J(void 0,e.content))},W=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){if(B&&G(!1),!({"image/jpeg":!0,"image/png":!0,"image/gif":!0,"application/pdf":!0,"text/plain":!0,"text/csv":!0,"application/json":!0,"application/msword":!0,"application/vnd.openxmlformats-officedocument.wordprocessingml.document":!0})[a.type]){n.Ay.error("Unsupported file type. Please upload an image, PDF, or document.");return}if(a.size>0xa00000){n.Ay.error("File too large. Please upload files under 10MB.");return}try{if("text/csv"===a.type){let e=await new Promise((e,t)=>{let s=new FileReader;s.readAsText(a),s.onload=()=>e(s.result),s.onerror=t}),t=await new Promise((e,t)=>{let s=new FileReader;s.readAsDataURL(a),s.onload=()=>e(s.result),s.onerror=t});V({type:a.type,data:t,name:a.name,textContent:e}),_("I have uploaded ".concat(a.name,". Here's what I want to do with it: ")),n.Ay.success("CSV file ready! Please specify what you want to do with the data.")}else{let e=await new Promise((e,t)=>{let s=new FileReader;s.readAsDataURL(a),s.onload=()=>e(s.result),s.onerror=t});V({type:a.type,data:e,name:a.name}),_("Analyze this ".concat(a.name," for me. ")),n.Ay.success("File ready! Add your analysis instructions and press Send.")}}catch(e){console.error("File upload error:",e),n.Ay.error("Failed to process file. Please try again."),V(null)}finally{L.current&&(L.current.value="")}}},q=async(t,s,l)=>{let n=f.env.NEXT_PUBLIC_GEMINI_API_KEY;if(!n)throw Error("Missing API key - please check your environment variables");let r="https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",i={"Content-Type":"application/json","x-goog-api-key":n},o=e.find(e=>e.id===a),c=(null==o?void 0:o.context)||"";if(t.toLowerCase().includes("wali123456")&&(F(!0),!(t=t.replace(/wali123456/gi,"").trim())))return"\uD83C\uDFDB️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";let d=[{text:"".concat(O?"Ministry AI Advisor - Direct, concise, strategic. Focus on:\n- Policy insights\n- Economic development\n- Infrastructure planning\n- Tech transformation\n- Social welfare\n- International relations\n\nStyle: Executive-level, bilingual (Urdu/English), data-driven, actionable.\n\nCurrent Mode: MINISTRY ADVISOR \uD83C\uDDF5\uD83C\uDDF0":"Your concise Pakistani AI assistant. I:\n- Mix Urdu/English naturally\n- Stay culturally aware\n- Give direct, practical advice\n- Keep responses short & clear\n- Use examples when helpful\n- Focus on solutions\n\nStyle: Friendly but professional, straight to the point. \uD83C\uDDF5\uD83C\uDDF0","\n\n").concat(c?"Previous Context:\n".concat(c,"\n\n"):"","User: ").concat(t,"\nAssistant:")}];s&&l&&d.push({inlineData:{mimeType:l,data:s.split(",")[1]}});let m={contents:[{parts:d}],generationConfig:{temperature:.9,topK:32,topP:.9,maxOutputTokens:4096,candidateCount:1,stopSequences:["User:","Human:"]},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"}]};try{var u,h,x,p,g,w;console.log("Sending request to Gemini API:",{url:r,headers:i,payload:m});let e=await fetch(r,{method:"POST",headers:i,body:JSON.stringify(m)});if(!e.ok){let t=await e.json().catch(()=>({}));throw console.error("Gemini API Error:",{status:e.status,statusText:e.statusText,errorData:t}),Error("API Error: ".concat((null===(w=t.error)||void 0===w?void 0:w.message)||e.statusText))}let t=await e.json();if(console.log("Gemini API Response:",t),!(null===(g=t.candidates)||void 0===g?void 0:null===(p=g[0])||void 0===p?void 0:null===(x=p.content)||void 0===x?void 0:null===(h=x.parts)||void 0===h?void 0:null===(u=h[0])||void 0===u?void 0:u.text))throw Error("Invalid response format from Gemini API");return t.candidates[0].content.parts[0].text}catch(e){throw console.error("Gemini API Call Error:",e),e}},z=(e,t,a)=>{let s=new Blob([e],{type:a}),l=URL.createObjectURL(s),n=document.createElement("a");n.href=l,n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(l)},X=async e=>{let t=e.trim().startsWith("{")||e.trim().startsWith("["),a=e.includes("\n")&&e.split("\n").every(e=>e.includes(",")),s=e.includes("#")||e.includes("##")||e.includes("```");if(t||a||s){let l="text/plain",n="txt";t?(l="application/json",n="json"):a?(l="text/csv",n="csv"):s&&(l="text/markdown",n="md");let r=new Date().toISOString().replace(/[:.]/g,"-");return{content:e,type:l,name:"generated-doc-".concat(r,".").concat(n)}}return null},J=async(e,t)=>{e&&e.preventDefault();let a=t||S;if(!a.trim())return;if(B){await $();return}let s={role:"user",content:a,timestamp:new Date,...H&&{file:{...H,prompt:a}}};t||(A([...y,s]),_("")),I(!0),U(null);try{let e;if((null==H?void 0:H.type)==="text/csv"&&H.textContent){let t='Here is a CSV file named "'.concat(H.name,'". The user wants to: ').concat(a,"\n\nCSV Content:\n").concat(H.textContent,"\n\nPlease provide a detailed analysis and follow the user's instructions regarding the CSV data.");e=await q(t)}else e=await q(a,null==H?void 0:H.data,null==H?void 0:H.type);let t=await X(e),l={role:"assistant",content:e,timestamp:new Date,...t&&{generatedFile:t}};A([...y,s,l]),t&&n.Ay.success("Document generated! Click the download button to save it."),T(0)}catch(t){console.error("Error:",t);let e=t instanceof Error?t.message:"Failed to get response";n.Ay.error(e),U(e),A([...y,s,{role:"assistant",content:e,timestamp:new Date,error:!0}])}finally{I(!1),V(null)}},$=async()=>{if(B){if(!S.trim()){n.Ay.error("Please enter a search query");return}I(!0);try{let e="Web Search Results for: ".concat(S,"\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications"),t=await q(e);A([...y,{role:"user",content:"\uD83D\uDD0D Web Search: ".concat(S),timestamp:new Date},{role:"assistant",content:'**Search Results for "'.concat(S,'"**\n\n').concat(t),timestamp:new Date}])}catch(e){console.error("Search error:",e),n.Ay.error("Search failed. Please try again.")}finally{G(!1),I(!1),_("")}}else G(!0),_(""),n.Ay.success("Web search mode activated! Enter your search query.")},[Q,Z]=(0,r.useState)(!1);return(0,s.jsxs)("div",{className:"flex flex-col lg:flex-row h-full w-full relative",children:[(0,s.jsx)("button",{onClick:()=>Z(!Q),className:"lg:hidden fixed bottom-8 right-4 z-[60] p-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 backdrop-blur-xl rounded-full text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20 transition-all",children:(0,s.jsx)(i.A,{className:"w-6 h-6"})}),(0,s.jsxs)("div",{className:"\n          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-in-out\n          ".concat(Q?"translate-y-0":"translate-y-full","\n          bg-black/95 backdrop-blur-2xl border-t border-white/10 \n          rounded-t-[28px] pb-safe-or-6\n          max-h-[80vh] overflow-hidden flex flex-col\n          shadow-[0_-8px_32px_rgba(0,0,0,0.5)]\n        "),children:[(0,s.jsx)("div",{className:"p-3 flex justify-center touch-none",children:(0,s.jsx)("div",{className:"w-12 h-1.5 bg-white/20 rounded-full"})}),(0,s.jsxs)("div",{className:"p-4 flex flex-col gap-3 overflow-y-auto",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-white",children:"Your Chats"}),(0,s.jsx)("button",{onClick:C,className:"flex items-center justify-center p-2 bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 rounded-xl transition-all ring-1 ring-emerald-500/30 touch-none",children:(0,s.jsx)(o.A,{className:"w-5 h-5"})})]}),(0,s.jsx)("div",{className:"flex-1 space-y-2.5",children:e.map(e=>(0,s.jsxs)("div",{className:"flex items-center gap-2 group touch-none",children:[(0,s.jsxs)("button",{onClick:()=>{D(e.id),Z(!1)},className:"flex-1 flex flex-col items-start gap-1.5 px-4 py-3 rounded-xl transition-all ".concat(e.id===a?"bg-emerald-500/20 text-white ring-1 ring-emerald-500/30":"text-white/70 hover:bg-white/5 active:bg-white/10"),children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,s.jsx)(i.A,{className:"w-4 h-4 flex-shrink-0"}),(0,s.jsx)("span",{className:"truncate text-left text-sm font-medium",children:e.title})]}),(0,s.jsx)("span",{className:"text-xs opacity-60 truncate w-full",children:new Date(e.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]}),(0,s.jsx)("button",{onClick:()=>k(e.id),className:"p-3 text-white/70 hover:text-white hover:bg-red-500/20 active:bg-red-500/30 rounded-xl transition-all",title:"Delete chat",children:(0,s.jsx)(c.A,{className:"w-4 h-4"})})]},e.id))})]})]}),(0,s.jsxs)("div",{className:"hidden lg:flex w-[300px] h-full flex-col bg-black/40 backdrop-blur-xl border-r border-white/10",children:[(0,s.jsxs)("div",{className:"p-3 flex items-center justify-between border-b border-white/10",children:[(0,s.jsx)("h2",{className:"text-base font-medium text-white",children:"Chats"}),(0,s.jsx)("button",{onClick:C,className:"p-1.5 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-all",title:"New Chat",children:(0,s.jsx)(o.A,{className:"w-5 h-5"})})]}),(0,s.jsx)("div",{className:"flex-1 overflow-y-auto py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10",children:e.map(e=>(0,s.jsx)("div",{className:"px-2",children:(0,s.jsxs)("button",{onClick:()=>D(e.id),className:"w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all group ".concat(e.id===a?"bg-emerald-500/20 text-white":"text-white/70 hover:bg-white/5"),children:[(0,s.jsx)(i.A,{className:"w-4 h-4 flex-shrink-0"}),(0,s.jsx)("span",{className:"truncate text-left text-sm",children:e.title}),(0,s.jsx)("button",{onClick:t=>{t.stopPropagation(),k(e.id)},className:"ml-auto p-1 opacity-0 group-hover:opacity-100 text-white/40 hover:text-white hover:bg-white/10 rounded transition-all",children:(0,s.jsx)(c.A,{className:"w-3.5 h-3.5"})})]})},e.id))})]}),(0,s.jsxs)("div",{className:"flex-1 flex flex-col h-dvh lg:h-full w-full",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center h-14 px-4 bg-black/20 backdrop-blur-xl shrink-0 border-b border-white/5",children:[(0,s.jsxs)("h2",{className:"text-white text-base font-medium tracking-wide flex items-center gap-2",children:[(0,s.jsx)("span",{className:"text-lg",children:"\uD83C\uDDF5\uD83C\uDDF0"}),(0,s.jsx)("span",{className:"bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent",children:"Pakistan AI"})]}),(0,s.jsx)("button",{onClick:()=>{k(a),n.Ay.success("Chat cleared!")},className:"p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all",title:"Clear chat",children:(0,s.jsx)(c.A,{className:"w-4 h-4"})})]}),(0,s.jsx)("div",{className:"flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",children:(0,s.jsxs)("div",{className:"flex flex-col space-y-4 p-4",children:[0===y.length&&(0,s.jsxs)("div",{className:"text-center text-white/90 mt-6 sm:mt-8",children:[(0,s.jsxs)("p",{className:"mb-3 text-lg sm:text-xl font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",children:[(0,s.jsx)("span",{className:"bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent",children:"السَّلامُ عَلَيْكُم"})," \uD83D\uDC4B"]}),(0,s.jsx)("p",{className:"text-base sm:text-lg mb-6",children:"How may I assist you today?"}),(0,s.jsxs)("div",{className:"max-w-sm mx-auto text-sm bg-black/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all",children:[(0,s.jsx)("p",{className:"mb-2 text-emerald-400 font-medium",children:"You can:"}),(0,s.jsxs)("ul",{className:"space-y-2 text-white/80",children:[(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"}),"Ask questions in English or Urdu"]}),(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"}),"Upload documents for analysis"]}),(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"}),"Search for latest information"]})]})]})]}),y.map((e,t)=>(0,s.jsx)(l.P.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-20,scale:.95},transition:{duration:.2,ease:[.23,1,.32,1]},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"," group"),children:(0,s.jsxs)("div",{className:"max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 ".concat("user"===e.role?"bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20":e.error?"bg-red-500/10 text-white ring-1 ring-red-500/30":"bg-black/20 text-white backdrop-blur-sm ring-1 ring-white/10"," relative group-hover:shadow-xl transition-all duration-200"),children:[e.content,e.generatedFile&&(0,s.jsx)("div",{className:"mt-3 flex items-center gap-2",children:(0,s.jsxs)("button",{onClick:()=>z(e.generatedFile.content,e.generatedFile.name,e.generatedFile.type),className:"flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg transition-all ring-1 ring-emerald-500/30",children:[(0,s.jsx)(d.A,{className:"w-3.5 h-3.5"}),"Download ",e.generatedFile.name]})}),e.timestamp&&(0,s.jsx)("div",{className:"text-xs opacity-0 group-hover:opacity-60 mt-1.5 transition-opacity",children:new Date(e.timestamp).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})},t)),E&&(0,s.jsx)(l.P.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},className:"flex justify-start",children:(0,s.jsx)("div",{className:"bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-3 ring-1 ring-white/10",children:(0,s.jsx)(m.A,{className:"w-5 h-5 animate-spin text-emerald-400"})})}),(0,s.jsx)("div",{ref:M,className:"h-4"})]})}),(0,s.jsx)("div",{className:"w-full bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-xl border-t border-white/10",children:(0,s.jsx)("div",{className:"px-4 py-4 lg:py-6",children:(0,s.jsxs)("form",{onSubmit:J,className:"flex flex-col gap-3",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsxs)("div",{className:"flex gap-1.5",children:[(0,s.jsx)("button",{type:"button",onClick:()=>{var e;return null===(e=L.current)||void 0===e?void 0:e.click()},className:"p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all",title:"Upload file",children:(0,s.jsx)(u.A,{className:"w-5 h-5"})}),(0,s.jsx)("button",{type:"button",onClick:$,disabled:E,className:"p-2.5 text-white/70 hover:text-white rounded-xl transition-all ".concat(B?"bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30":"hover:bg-white/10"),title:B?"Search":"Web Search",children:(0,s.jsx)(h.A,{className:"w-5 h-5"})})]}),(0,s.jsx)("input",{type:"text",value:S,onChange:e=>_(e.target.value),placeholder:H?"Instructions for ".concat(H.name,"..."):B?"Search...":"Type message...",className:"flex-1 bg-black/20 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm transition-all",disabled:E}),P?(0,s.jsx)("button",{type:"button",onClick:K,disabled:E||R>=3,className:"p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all disabled:opacity-50",title:"Retry",children:(0,s.jsx)(x.A,{className:"w-5 h-5"})}):(0,s.jsx)("button",{type:"submit",disabled:E||!S.trim(),className:"p-2.5 text-white/70 hover:text-white hover:bg-emerald-500/20 rounded-xl transition-all disabled:opacity-50",children:(0,s.jsx)(p.A,{className:"w-5 h-5"})})]}),(H||P)&&(0,s.jsxs)("div",{className:"flex items-center gap-3 px-1 pt-1",children:[H&&(0,s.jsxs)("span",{className:"text-emerald-400 flex items-center gap-1.5 text-xs",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full animate-pulse"}),"File ready for analysis"]}),P&&(0,s.jsxs)("span",{className:"text-red-400 flex items-center gap-1.5 text-xs",children:[(0,s.jsx)(g.A,{className:"w-3.5 h-3.5"}),P]})]}),(0,s.jsx)("input",{type:"file",ref:L,onChange:W,accept:".pdf,.doc,.docx,.txt,.csv,image/*,application/json",className:"hidden"})]})})})]}),Q&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden",onClick:()=>Z(!1)})]})}function y(){return(0,s.jsxs)("main",{className:"h-[100dvh] supports-[height:100svh]:h-[100svh] supports-[height:100dvh]:h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900 relative overflow-hidden selection:bg-emerald-500/30 flex flex-col",children:[(0,s.jsx)(l.P.div,{initial:{opacity:0},animate:{opacity:.015},transition:{duration:1.2,delay:.2},className:"fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)] bg-[length:4px_4px] pointer-events-none mix-blend-plus-lighter"}),(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none"}),(0,s.jsx)(n.l$,{position:"top-center",toastOptions:{style:{background:"rgba(10, 10, 10, 0.95)",color:"#fff",backdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"8px",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},success:{iconTheme:{primary:"#059669",secondary:"#fff"}}}}),(0,s.jsx)(l.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.22,1,.36,1]},className:"flex-1 w-full max-w-full overflow-hidden",children:(0,s.jsx)("div",{className:"h-full max-w-full relative",children:(0,s.jsx)(v,{})})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[162,636,593,792],()=>t(2022)),_N_E=e.O()}]);