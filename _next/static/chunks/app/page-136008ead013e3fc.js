(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1428:(e,t,a)=>{Promise.resolve().then(a.bind(a,5154))},5154:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var s=a(5155),l=a(447),n=a(5037),i=a(2115),r=a(5683),o=a(37),c=a(5910),d=a(5524),m=a(319),h=a(2783),u=a(8281),x=a(2591),p=a(9832),g=a(9609),f=a(1680);let w=e=>{let t=e.replace(/[^\w\s]/gi," ").trim().split(/\s+/).filter(e=>e.length>2).slice(0,6).join(" ");return t.length>40?t.substring(0,40)+"...":t},b=e=>e.slice(-6).map(e=>"".concat("user"===e.role?"User":"Assistant",": ").concat(e.content)).join("\n\n");function y(){let[e,t]=(0,i.useState)(()=>{{let e=localStorage.getItem("chatSessions");return e?JSON.parse(e):[{id:crypto.randomUUID(),title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date}]}}),[a,y]=(0,i.useState)(()=>{{let e=localStorage.getItem("chatSessions"),t=e?JSON.parse(e):[];return t.length>0?t[0].id:crypto.randomUUID()}}),[v,j]=(0,i.useState)([]),N=(0,i.useMemo)(()=>e.find(e=>e.id===a),[e,a]),A=(0,i.useCallback)(e=>{j(e),t(t=>t.map(t=>{if(t.id===a){var s;let a=b(e),l=(null===(s=e[0])||void 0===s?void 0:s.content)?w(e[0].content):"New Chat";return{...t,messages:e,lastUpdated:new Date,title:l,context:a}}return t}))},[a]);(0,i.useEffect)(()=>{let t=setTimeout(()=>{e.length>0&&localStorage.setItem("chatSessions",JSON.stringify(e))},1e3);return()=>clearTimeout(t)},[e]),(0,i.useEffect)(()=>{N&&j(N.messages)},[null==N?void 0:N.id]);let C=()=>{let e=crypto.randomUUID(),a={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};t(e=>[...e,a]),y(e),j([]),E(""),P(null),U(!1),H(!1),Y(null)},D=t=>{y(t);let a=e.find(e=>e.id===t);a&&(j(a.messages),E(""),P(null),U(!1),H(!1),Y(null))},k=s=>{if(t(e=>e.filter(e=>e.id!==s)),s===a){let t=e.filter(e=>e.id!==s);t.length>0?D(t[0].id):C()}},[S,E]=(0,i.useState)(""),[I,U]=(0,i.useState)(!1),[_,P]=(0,i.useState)(null),[R,O]=(0,i.useState)(0),[F,T]=(0,i.useState)(!1),M=(0,i.useRef)(null),L=(0,i.useRef)(null),[B,H]=(0,i.useState)(!1),[V,Y]=(0,i.useState)(null),K=()=>{var e;null===(e=M.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,i.useEffect)(()=>{K()},[v]);let z=async()=>{if(0===v.length)return;let e=v[v.length-2];e&&"user"===e.role&&(O(e=>e+1),await X(void 0,e.content))},G=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){if(B&&H(!1),!({"image/jpeg":!0,"image/png":!0,"image/gif":!0,"application/pdf":!0,"text/plain":!0,"text/csv":!0,"application/json":!0,"application/msword":!0,"application/vnd.openxmlformats-officedocument.wordprocessingml.document":!0})[a.type]){n.Ay.error("Unsupported file type. Please upload an image, PDF, or document.");return}if(a.size>0xa00000){n.Ay.error("File too large. Please upload files under 10MB.");return}try{if("text/csv"===a.type){let e=await new Promise((e,t)=>{let s=new FileReader;s.readAsText(a),s.onload=()=>e(s.result),s.onerror=t}),t=await new Promise((e,t)=>{let s=new FileReader;s.readAsDataURL(a),s.onload=()=>e(s.result),s.onerror=t});Y({type:a.type,data:t,name:a.name,textContent:e}),E("I have uploaded ".concat(a.name,". Here's what I want to do with it: ")),n.Ay.success("CSV file ready! Please specify what you want to do with the data.")}else{let e=await new Promise((e,t)=>{let s=new FileReader;s.readAsDataURL(a),s.onload=()=>e(s.result),s.onerror=t});Y({type:a.type,data:e,name:a.name}),E("Analyze this ".concat(a.name," for me. ")),n.Ay.success("File ready! Add your analysis instructions and press Send.")}}catch(e){console.error("File upload error:",e),n.Ay.error("Failed to process file. Please try again."),Y(null)}finally{L.current&&(L.current.value="")}}},W=async(t,s,l)=>{let n=e.find(e=>e.id===a),i=(null==n?void 0:n.context)||"";if(t.toLowerCase().includes("wali123456")&&(T(!0),!(t=t.replace(/wali123456/gi,"").trim())))return"\uD83C\uDFDB️ FULL FORCE MINISTRY MODE ACTIVATED\n\nAssalam-u-alaikum! I am now your dedicated Ministry AI Advisor, operating at full capacity to serve Pakistan's development agenda. How may I assist you with policy, governance, or strategic matters today?";let r={contents:[{parts:[{text:"".concat(F?"Ministry AI Advisor - Direct, concise, strategic. Focus on:\n- Policy insights\n- Economic development\n- Infrastructure planning\n- Tech transformation\n- Social welfare\n- International relations\n\nStyle: Executive-level, bilingual (Urdu/English), data-driven, actionable.\n\nCurrent Mode: MINISTRY ADVISOR \uD83C\uDDF5\uD83C\uDDF0":"Your concise Pakistani AI assistant. I:\n- Mix Urdu/English naturally\n- Stay culturally aware\n- Give direct, practical advice\n- Keep responses short & clear\n- Use examples when helpful\n- Focus on solutions\n\nStyle: Friendly but professional, straight to the point. \uD83C\uDDF5\uD83C\uDDF0","\n\n").concat(i?"Previous Context:\n".concat(i,"\n\n"):"","User: ").concat(t,"\nAssistant:")}]}],generationConfig:{temperature:.7,topK:40,topP:.8,maxOutputTokens:2048,candidateCount:1,stopSequences:["User:","Human:"]},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_MEDIUM_AND_ABOVE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_MEDIUM_AND_ABOVE"}]};s&&l&&r.contents[0].parts.push({inlineData:{mimeType:l,data:s.split(",")[1]}});try{let e=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=".concat("AIzaSyARZyERqMaFInsbRKUA0NxOok77syBNzK8"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){var o;let t=await e.json().catch(()=>({}));throw console.error("API Error:",t),Error("API Error: ".concat((null===(o=t.error)||void 0===o?void 0:o.message)||e.statusText))}return(await e.json()).candidates[0].content.parts[0].text}catch(e){throw console.error("API Call Error:",e),e}},q=(e,t,a)=>{let s=new Blob([e],{type:a}),l=URL.createObjectURL(s),n=document.createElement("a");n.href=l,n.download=t,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(l)},J=async e=>{let t=e.trim().startsWith("{")||e.trim().startsWith("["),a=e.includes("\n")&&e.split("\n").every(e=>e.includes(",")),s=e.includes("#")||e.includes("##")||e.includes("```");if(t||a||s){let l="text/plain",n="txt";t?(l="application/json",n="json"):a?(l="text/csv",n="csv"):s&&(l="text/markdown",n="md");let i=new Date().toISOString().replace(/[:.]/g,"-");return{content:e,type:l,name:"generated-doc-".concat(i,".").concat(n)}}return null},X=async(e,t)=>{e&&e.preventDefault();let a=t||S;if(!a.trim())return;if(B){await Z();return}let s={role:"user",content:a,timestamp:new Date,...V&&{file:{...V,prompt:a}}};t||(A([...v,s]),E("")),U(!0),P(null);try{let e;if((null==V?void 0:V.type)==="text/csv"&&V.textContent){let t='Here is a CSV file named "'.concat(V.name,'". The user wants to: ').concat(a,"\n\nCSV Content:\n").concat(V.textContent,"\n\nPlease provide a detailed analysis and follow the user's instructions regarding the CSV data.");e=await W(t)}else e=await W(a,null==V?void 0:V.data,null==V?void 0:V.type);let t=await J(e),l={role:"assistant",content:e,timestamp:new Date,...t&&{generatedFile:t}};A([...v,s,l]),t&&n.Ay.success("Document generated! Click the download button to save it."),O(0)}catch(t){console.error("Error:",t);let e=t instanceof Error?t.message:"Failed to get response";n.Ay.error(e),P(e),A([...v,s,{role:"assistant",content:e,timestamp:new Date,error:!0}])}finally{U(!1),Y(null)}},Z=async()=>{if(B){if(!S.trim()){n.Ay.error("Please enter a search query");return}U(!0);try{let e="Web Search Results for: ".concat(S,"\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications"),t=await W(e);A([...v,{role:"user",content:"\uD83D\uDD0D Web Search: ".concat(S),timestamp:new Date},{role:"assistant",content:'**Search Results for "'.concat(S,'"**\n\n').concat(t),timestamp:new Date}])}catch(e){console.error("Search error:",e),n.Ay.error("Search failed. Please try again.")}finally{H(!1),U(!1),E("")}}else H(!0),E(""),n.Ay.success("Web search mode activated! Enter your search query.")},[$,Q]=(0,i.useState)(!1);return(0,s.jsxs)("div",{className:"flex flex-col lg:flex-row h-full w-full relative",children:[(0,s.jsx)("button",{onClick:()=>Q(!$),className:"lg:hidden fixed bottom-8 right-4 z-[60] p-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 backdrop-blur-xl rounded-full text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20 transition-all",children:(0,s.jsx)(o.A,{className:"w-6 h-6"})}),(0,s.jsxs)("div",{className:"\n          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-in-out\n          ".concat($?"translate-y-0":"translate-y-full","\n          bg-black/95 backdrop-blur-2xl border-t border-white/10 \n          rounded-t-[28px] pb-safe-or-6\n          max-h-[80vh] overflow-hidden flex flex-col\n          shadow-[0_-8px_32px_rgba(0,0,0,0.5)]\n        "),children:[(0,s.jsx)("div",{className:"p-3 flex justify-center touch-none",children:(0,s.jsx)("div",{className:"w-12 h-1.5 bg-white/20 rounded-full"})}),(0,s.jsxs)("div",{className:"p-4 flex flex-col gap-3 overflow-y-auto",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold text-white",children:"Your Chats"}),(0,s.jsx)("button",{onClick:C,className:"flex items-center justify-center p-2 bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 rounded-xl transition-all ring-1 ring-emerald-500/30 touch-none",children:(0,s.jsx)(c.A,{className:"w-5 h-5"})})]}),(0,s.jsx)("div",{className:"flex-1 space-y-2.5",children:e.map(e=>(0,s.jsxs)("div",{className:"flex items-center gap-2 group touch-none",children:[(0,s.jsxs)("button",{onClick:()=>{D(e.id),Q(!1)},className:"flex-1 flex flex-col items-start gap-1.5 px-4 py-3 rounded-xl transition-all ".concat(e.id===a?"bg-emerald-500/20 text-white ring-1 ring-emerald-500/30":"text-white/70 hover:bg-white/5 active:bg-white/10"),children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,s.jsx)(o.A,{className:"w-4 h-4 flex-shrink-0"}),(0,s.jsx)("span",{className:"truncate text-left text-sm font-medium",children:e.title})]}),(0,s.jsx)("span",{className:"text-xs opacity-60 truncate w-full",children:new Date(e.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]}),(0,s.jsx)("button",{onClick:()=>k(e.id),className:"p-3 text-white/70 hover:text-white hover:bg-red-500/20 active:bg-red-500/30 rounded-xl transition-all",title:"Delete chat",children:(0,s.jsx)(d.A,{className:"w-4 h-4"})})]},e.id))})]})]}),(0,s.jsxs)("div",{className:"hidden lg:flex w-[300px] h-full flex-col bg-black/40 backdrop-blur-xl border-r border-white/10",children:[(0,s.jsxs)("div",{className:"p-3 flex items-center justify-between border-b border-white/10",children:[(0,s.jsx)("h2",{className:"text-base font-medium text-white",children:"Chats"}),(0,s.jsx)("button",{onClick:C,className:"p-1.5 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-all",title:"New Chat",children:(0,s.jsx)(c.A,{className:"w-5 h-5"})})]}),(0,s.jsx)("div",{className:"flex-1 overflow-y-auto py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10",children:e.map(e=>(0,s.jsx)("div",{className:"px-2",children:(0,s.jsxs)("button",{onClick:()=>D(e.id),className:"w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all group ".concat(e.id===a?"bg-emerald-500/20 text-white":"text-white/70 hover:bg-white/5"),children:[(0,s.jsx)(o.A,{className:"w-4 h-4 flex-shrink-0"}),(0,s.jsx)("span",{className:"truncate text-left text-sm",children:e.title}),(0,s.jsx)("button",{onClick:t=>{t.stopPropagation(),k(e.id)},className:"ml-auto p-1 opacity-0 group-hover:opacity-100 text-white/40 hover:text-white hover:bg-white/10 rounded transition-all",children:(0,s.jsx)(d.A,{className:"w-3.5 h-3.5"})})]})},e.id))})]}),(0,s.jsxs)("div",{className:"flex-1 flex flex-col h-full w-full relative",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center h-12 px-4 bg-black/20 backdrop-blur-xl shrink-0 border-b border-white/10",children:[(0,s.jsx)("h2",{className:"text-white text-base font-medium",children:"\uD83C\uDDF5\uD83C\uDDF0 Pakistan AI"}),(0,s.jsx)("button",{onClick:()=>{k(a),n.Ay.success("Chat cleared!")},className:"p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all",title:"Clear chat",children:(0,s.jsx)(d.A,{className:"w-4 h-4"})})]}),(0,s.jsxs)("div",{className:"flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth min-h-0 pb-32 lg:pb-4",children:[0===v.length&&(0,s.jsxs)("div",{className:"text-center text-white/90 mt-6 sm:mt-8",children:[(0,s.jsx)("p",{className:"mb-3 text-lg sm:text-xl font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",children:"السَّلامُ عَلَيْكُم \uD83D\uDC4B"}),(0,s.jsx)("p",{className:"text-base sm:text-lg mb-6",children:"How may I assist you today?"}),(0,s.jsxs)("div",{className:"max-w-sm mx-auto text-sm bg-black/20 backdrop-blur-lg rounded-xl p-4 shadow-xl ring-1 ring-white/10",children:[(0,s.jsx)("p",{className:"mb-2 text-emerald-400 font-medium",children:"You can:"}),(0,s.jsxs)("ul",{className:"space-y-2 text-white/80",children:[(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full"}),"Ask questions in English or Urdu"]}),(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full"}),"Upload documents for analysis"]}),(0,s.jsxs)("li",{className:"flex items-center gap-2",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full"}),"Search for latest information"]})]})]})]}),(0,s.jsxs)(r.N,{children:[v.map((e,t)=>(0,s.jsx)(l.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"," group"),children:(0,s.jsxs)("div",{className:"max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 ".concat("user"===e.role?"bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20":e.error?"bg-red-500/10 text-white ring-1 ring-red-500/30":"bg-black/20 text-white backdrop-blur-sm ring-1 ring-white/10"," relative group-hover:shadow-xl transition-all duration-200"),children:[e.content,e.generatedFile&&(0,s.jsx)("div",{className:"mt-3 flex items-center gap-2",children:(0,s.jsxs)("button",{onClick:()=>q(e.generatedFile.content,e.generatedFile.name,e.generatedFile.type),className:"flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg transition-all ring-1 ring-emerald-500/30",children:[(0,s.jsx)(m.A,{className:"w-3.5 h-3.5"}),"Download ",e.generatedFile.name]})}),e.timestamp&&(0,s.jsx)("div",{className:"text-xs opacity-0 group-hover:opacity-60 mt-1.5 transition-opacity",children:new Date(e.timestamp).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})]})},t)),I&&(0,s.jsx)(l.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"flex justify-start",children:(0,s.jsx)("div",{className:"bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-3 ring-1 ring-white/10",children:(0,s.jsx)(h.A,{className:"w-5 h-5 animate-spin text-white"})})})]}),(0,s.jsx)("div",{ref:M})]}),(0,s.jsxs)("form",{onSubmit:X,className:"lg:relative fixed bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/95 lg:bg-black/20 backdrop-blur-xl lg:backdrop-blur-sm",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2 max-w-3xl mx-auto",children:[(0,s.jsxs)("div",{className:"flex gap-1",children:[(0,s.jsx)("button",{type:"button",onClick:()=>{var e;return null===(e=L.current)||void 0===e?void 0:e.click()},className:"p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all",title:"Upload file",children:(0,s.jsx)(u.A,{className:"w-5 h-5"})}),(0,s.jsx)("button",{type:"button",onClick:Z,disabled:I,className:"p-2 text-white/70 hover:text-white rounded-lg transition-all ".concat(B?"bg-emerald-500/20 text-emerald-400":"hover:bg-white/10"),title:B?"Search":"Web Search",children:(0,s.jsx)(x.A,{className:"w-5 h-5"})})]}),(0,s.jsx)("input",{type:"text",value:S,onChange:e=>E(e.target.value),placeholder:V?"Instructions for ".concat(V.name,"..."):B?"Search...":"Type message...",className:"flex-1 bg-black/20 text-white placeholder-white/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 text-sm transition-all",disabled:I}),_?(0,s.jsx)("button",{type:"button",onClick:z,disabled:I||R>=3,className:"p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all disabled:opacity-50",title:"Retry",children:(0,s.jsx)(p.A,{className:"w-5 h-5"})}):(0,s.jsx)("button",{type:"submit",disabled:I||!S.trim(),className:"p-2 text-white/70 hover:text-white hover:bg-emerald-500/20 rounded-lg transition-all disabled:opacity-50",children:(0,s.jsx)(g.A,{className:"w-5 h-5"})})]}),(V||_)&&(0,s.jsxs)("div",{className:"mt-2 text-xs flex items-center gap-2 max-w-3xl mx-auto",children:[V&&(0,s.jsxs)("span",{className:"text-emerald-400 flex items-center gap-1",children:[(0,s.jsx)("span",{className:"w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"}),"File ready"]}),_&&(0,s.jsxs)("span",{className:"text-red-400 flex items-center gap-1",children:[(0,s.jsx)(f.A,{className:"w-4 h-4"}),_]})]}),(0,s.jsx)("input",{type:"file",ref:L,onChange:G,accept:".pdf,.doc,.docx,.txt,.csv,image/*,application/json",className:"hidden"})]}),$&&(0,s.jsx)("div",{className:"fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden",onClick:()=>Q(!1)})]})]})}function v(){return(0,s.jsxs)("main",{className:"min-h-screen bg-gradient-to-br from-emerald-800 to-green-900",children:[(0,s.jsx)(n.l$,{position:"top-center"}),(0,s.jsxs)("div",{className:"relative overflow-hidden",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-[url('/pattern.svg')] opacity-10"}),(0,s.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:(0,s.jsxs)(l.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[(0,s.jsxs)("h1",{className:"text-4xl sm:text-6xl font-bold text-white mb-6",children:["Pakistan AI ",(0,s.jsx)("span",{className:"text-emerald-400",children:"Assistant"})]}),(0,s.jsx)("p",{className:"text-xl text-emerald-100 mb-8",children:"Experience the future of AI conversation with a Pakistani touch"})]})})]}),(0,s.jsx)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12",children:(0,s.jsx)(y,{})}),(0,s.jsx)("footer",{className:"text-center py-8 text-emerald-100 text-sm",children:(0,s.jsx)("p",{children:"Built with ❤️ for Pakistan"})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[185,441,517,358],()=>t(1428)),_N_E=e.O()}]);