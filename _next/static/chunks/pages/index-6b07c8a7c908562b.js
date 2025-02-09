(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{2022:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(5107)}])},5107:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>y});var l=a(4848),s=a(5649),r=a(2636),i=a(6540),n=a(7617),o=a(373),c=a(9584),d=a(2954),m=a(6611),h=a(2223),x=a(2983),u=a(1722),p=a(3885),g=a(8256);let f=e=>{let t=e.replace(/[^\w\s]/gi," ").trim().split(/\s+/).filter(e=>e.length>2).slice(0,6).join(" ");return t.length>40?t.substring(0,40)+"...":t},b=e=>e.slice(-6).map(e=>"".concat("user"===e.role?"User":"Assistant",": ").concat(e.content)).join("\n\n"),w=e=>{let{initialSessions:t,initialSessionId:a}=e,[w,v]=(0,i.useState)(t),[y,j]=(0,i.useState)(a),[N,k]=(0,i.useState)([]),S=(0,i.useMemo)(()=>w.find(e=>e.id===y),[w,y]),C=(0,i.useRef)(!0);(0,i.useEffect)(()=>(C.current=!0,()=>{C.current=!1}),[]);let A=(0,i.useCallback)(e=>{C.current&&k(e)},[]),D=(0,i.useCallback)(e=>{C.current&&L(e)},[]),_=(0,i.useCallback)(e=>{C.current&&z(e)},[]),P=(0,i.useCallback)(e=>{C.current&&T(e)},[]),U=(0,i.useCallback)(e=>{A(e),v(t=>t.map(t=>{if(t.id===y){var a;let l=b(e),s=(null===(a=e[0])||void 0===a?void 0:a.content)?f(e[0].content):"New Chat";return{...t,messages:e,lastUpdated:new Date,title:s,context:l}}return t}))},[y,A]);(0,i.useEffect)(()=>{let e=setTimeout(()=>{w.length>0&&localStorage.setItem("chatSessions",JSON.stringify(w))},1e3);return()=>clearTimeout(e)},[w]),(0,i.useEffect)(()=>{S&&k(S.messages)},[null==S?void 0:S.id]);let E=()=>{let e=crypto.randomUUID(),t={id:e,title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date};v(e=>[...e,t]),j(e),k([]),L(""),z(null),T(!1),X(!1),$(null)},F=e=>{j(e);let t=w.find(t=>t.id===e);t&&(k(t.messages),L(""),z(null),T(!1),X(!1),$(null))},R=e=>{if(v(t=>t.filter(t=>t.id!==e)),e===y){let t=w.filter(t=>t.id!==e);t.length>0?F(t[0].id):E()}},[I,L]=(0,i.useState)(""),[O,T]=(0,i.useState)(!1),[W,z]=(0,i.useState)(null),[V,q]=(0,i.useState)(0),[B,H]=(0,i.useState)(!1),M=(0,i.useRef)(null),J=(0,i.useRef)(null),[K,X]=(0,i.useState)(!1),[Y,$]=(0,i.useState)(null),[G,Q]=(0,i.useState)({});(0,i.useEffect)(()=>{(()=>{let e={};w.forEach(t=>{e[t.id]=new Date(t.lastUpdated).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}),Q(e)})()},[w]);let[Z,ee]=(0,i.useState)({});(0,i.useEffect)(()=>{(()=>{let e={};N.forEach((t,a)=>{t.timestamp&&(e[a]=new Date(t.timestamp).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),ee(e)})()},[N]);let et=()=>{var e;null===(e=M.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,i.useEffect)(()=>{et()},[N]);let ea=async()=>{if(0===N.length)return;let e=N[N.length-2];e&&"user"===e.role&&(q(e=>e+1),await en(void 0,e.content))},el=async e=>{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){if(K&&X(!1),!({"image/jpeg":!0,"image/png":!0,"image/gif":!0,"application/pdf":!0,"text/plain":!0,"text/csv":!0,"application/json":!0,"application/msword":!0,"application/vnd.openxmlformats-officedocument.wordprocessingml.document":!0})[a.type]){r.Ay.error("Unsupported file type. Please upload an image, PDF, or document.");return}if(a.size>0xa00000){r.Ay.error("File too large. Please upload files under 10MB.");return}try{if("text/csv"===a.type){let e=await new Promise((e,t)=>{let l=new FileReader;l.readAsText(a),l.onload=()=>e(l.result),l.onerror=t}),t=await new Promise((e,t)=>{let l=new FileReader;l.readAsDataURL(a),l.onload=()=>e(l.result),l.onerror=t});$({type:a.type,data:t,name:a.name,textContent:e}),L("I have uploaded ".concat(a.name,". Here's what I want to do with it: ")),r.Ay.success("CSV file ready! Please specify what you want to do with the data.")}else{let e=await new Promise((e,t)=>{let l=new FileReader;l.readAsDataURL(a),l.onload=()=>e(l.result),l.onerror=t});$({type:a.type,data:e,name:a.name}),L("Analyze this ".concat(a.name," for me. ")),r.Ay.success("File ready! Add your analysis instructions and press Send.")}}catch(e){console.error("File upload error:",e),r.Ay.error("Failed to process file. Please try again."),$(null)}finally{J.current&&(J.current.value="")}}},es=async(e,t,a)=>{throw console.log("Using API Key:","".substring(0,8)+"..."),Error("Missing API key - please check your .env.local file")},er=(e,t,a)=>{let l=new Blob([e],{type:a}),s=URL.createObjectURL(l),r=document.createElement("a");r.href=s,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)},ei=async e=>{let t=e.trim().startsWith("{")||e.trim().startsWith("["),a=e.includes("\n")&&e.split("\n").every(e=>e.includes(",")),l=e.includes("#")||e.includes("##")||e.includes("```");if(t||a||l){let s="text/plain",r="txt";t?(s="application/json",r="json"):a?(s="text/csv",r="csv"):l&&(s="text/markdown",r="md");let i=new Date().toISOString().replace(/[:.]/g,"-");return{content:e,type:s,name:"generated-doc-".concat(i,".").concat(r)}}return null},en=async(e,t)=>{e&&e.preventDefault();let a=t||I;if(!a.trim())return;if(K){await eo();return}let l={role:"user",content:a,timestamp:new Date,...Y&&{file:{...Y,prompt:a}}};t||(U([...N,l]),D("")),P(!0),_(null);try{let e;if((null==Y?void 0:Y.type)==="text/csv"&&Y.textContent){let t='Here is a CSV file named "'.concat(Y.name,'". The user wants to: ').concat(a,"\n\nCSV Content:\n").concat(Y.textContent,"\n\nPlease provide a detailed analysis and follow the user's instructions regarding the CSV data.");e=await es(t)}else e=await es(a,null==Y?void 0:Y.data,null==Y?void 0:Y.type);if(C.current){let t=await ei(e),a={role:"assistant",content:e,timestamp:new Date,...t&&{generatedFile:t}};U([...N,l,a]),t&&r.Ay.success("Document generated! Click the download button to save it."),q(0)}}catch(t){console.error("Error:",t);let e=t instanceof Error?t.message:"Failed to get response";C.current&&(r.Ay.error(e),_(e),U([...N,l,{role:"assistant",content:e,timestamp:new Date,error:!0}]))}finally{C.current&&(P(!1),$(null))}},eo=async()=>{if(K){if(!I.trim()){r.Ay.error("Please enter a search query");return}P(!0);try{let e="Web Search Results for: ".concat(I,"\n\nPlease provide comprehensive information about this topic, focusing on Pakistani context where relevant. Include:\n- Key facts and details\n- Local perspectives and examples\n- Recent developments\n- Cultural considerations\n- Practical implications"),t=await es(e);U([...N,{role:"user",content:"\uD83D\uDD0D Web Search: ".concat(I),timestamp:new Date},{role:"assistant",content:'**Search Results for "'.concat(I,'"**\n\n').concat(t),timestamp:new Date}])}catch(e){console.error("Search error:",e),r.Ay.error("Search failed. Please try again.")}finally{X(!1),P(!1),D("")}}else X(!0),D(""),r.Ay.success("Web search mode activated! Enter your search query.")},[ec,ed]=(0,i.useState)(!1);return(0,l.jsxs)("div",{className:"flex flex-col lg:flex-row h-full w-full relative",children:[(0,l.jsx)("button",{onClick:()=>ed(!ec),className:"lg:hidden fixed bottom-8 right-4 z-[60] p-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 backdrop-blur-xl rounded-full text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20 transition-all",children:(0,l.jsx)(o.A,{className:"w-6 h-6"})}),(0,l.jsxs)("div",{className:"\n          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ease-in-out\n          ".concat(ec?"translate-y-0":"translate-y-full","\n          bg-black/95 backdrop-blur-2xl border-t border-white/10 \n          rounded-t-[28px] pb-safe-or-6\n          max-h-[80vh] overflow-hidden flex flex-col\n          shadow-[0_-8px_32px_rgba(0,0,0,0.5)]\n        "),children:[(0,l.jsx)("div",{className:"p-3 flex justify-center touch-none",children:(0,l.jsx)("div",{className:"w-12 h-1.5 bg-white/20 rounded-full"})}),(0,l.jsxs)("div",{className:"p-4 flex flex-col gap-3 overflow-y-auto",children:[(0,l.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,l.jsx)("h2",{className:"text-lg font-semibold text-white",children:"Your Chats"}),(0,l.jsx)("button",{onClick:E,className:"flex items-center justify-center p-2 bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 rounded-xl transition-all ring-1 ring-emerald-500/30 touch-none",children:(0,l.jsx)(c.A,{className:"w-5 h-5"})})]}),(0,l.jsx)("div",{className:"flex-1 space-y-2.5",children:w.map(e=>(0,l.jsxs)("div",{className:"flex items-center gap-2 group touch-none",children:[(0,l.jsxs)("div",{onClick:()=>{F(e.id),ed(!1)},className:"flex-1 flex flex-col items-start gap-1.5 px-4 py-3 rounded-xl transition-all cursor-pointer ".concat(e.id===y?"bg-emerald-500/20 text-white ring-1 ring-emerald-500/30":"text-white/70 hover:bg-white/5 active:bg-white/10"),children:[(0,l.jsxs)("div",{className:"flex items-center gap-2 w-full",children:[(0,l.jsx)(o.A,{className:"w-4 h-4 flex-shrink-0"}),(0,l.jsx)("span",{className:"truncate text-left text-sm font-medium",children:e.title})]}),(0,l.jsx)("span",{className:"text-xs opacity-60 truncate w-full",children:G[e.id]||""})]}),(0,l.jsx)("button",{onClick:()=>R(e.id),className:"p-3 text-white/70 hover:text-white hover:bg-red-500/20 active:bg-red-500/30 rounded-xl transition-all",title:"Delete chat",children:(0,l.jsx)(d.A,{className:"w-4 h-4"})})]},e.id))})]})]}),(0,l.jsxs)("div",{className:"hidden lg:flex w-[300px] h-full flex-col bg-black/40 backdrop-blur-xl border-r border-white/10",children:[(0,l.jsxs)("div",{className:"p-3 flex items-center justify-between border-b border-white/10",children:[(0,l.jsx)("h2",{className:"text-base font-medium text-white",children:"Chats"}),(0,l.jsx)("button",{onClick:E,className:"p-1.5 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-all",title:"New Chat",children:(0,l.jsx)(c.A,{className:"w-5 h-5"})})]}),(0,l.jsx)("div",{className:"flex-1 overflow-y-auto py-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10",children:w.map(e=>(0,l.jsx)("div",{className:"px-2",children:(0,l.jsxs)("div",{onClick:()=>F(e.id),className:"w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all group cursor-pointer ".concat(e.id===y?"bg-emerald-500/20 text-white":"text-white/70 hover:bg-white/5"),children:[(0,l.jsx)(o.A,{className:"w-4 h-4 flex-shrink-0"}),(0,l.jsx)("span",{className:"truncate text-left text-sm",children:e.title}),(0,l.jsx)("span",{className:"text-xs opacity-60 ml-auto",children:G[e.id]||""}),(0,l.jsx)("button",{onClick:t=>{t.stopPropagation(),R(e.id)},className:"ml-2 p-1 opacity-0 group-hover:opacity-100 text-white/40 hover:text-white hover:bg-white/10 rounded transition-all",children:(0,l.jsx)(d.A,{className:"w-3.5 h-3.5"})})]})},e.id))})]}),(0,l.jsxs)("div",{className:"flex-1 flex flex-col h-dvh lg:h-full w-full",children:[(0,l.jsxs)("div",{className:"flex justify-between items-center h-14 px-4 bg-black/20 backdrop-blur-xl shrink-0 border-b border-white/5",children:[(0,l.jsxs)("h2",{className:"text-white text-base font-medium tracking-wide flex items-center gap-2",children:[(0,l.jsx)("span",{className:"text-lg",children:"\uD83C\uDDF5\uD83C\uDDF0"}),(0,l.jsx)("span",{className:"bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent",children:"Pakistan AI"})]}),(0,l.jsx)("button",{onClick:()=>{R(y),r.Ay.success("Chat cleared!")},className:"p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all",title:"Clear chat",children:(0,l.jsx)(d.A,{className:"w-4 h-4"})})]}),(0,l.jsx)("div",{className:"flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",children:(0,l.jsxs)("div",{className:"flex flex-col space-y-4 p-4",children:[0===N.length&&(0,l.jsxs)("div",{className:"text-center text-white/90 mt-6 sm:mt-8",children:[(0,l.jsxs)("p",{className:"mb-3 text-lg sm:text-xl font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]",children:[(0,l.jsx)("span",{className:"bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent",children:"السَّلامُ عَلَيْكُم"})," \uD83D\uDC4B"]}),(0,l.jsx)("p",{className:"text-base sm:text-lg mb-6",children:"How may I assist you today?"}),(0,l.jsxs)("div",{className:"max-w-sm mx-auto text-sm bg-black/20 backdrop-blur-lg rounded-2xl p-4 shadow-xl ring-1 ring-white/10 hover:ring-white/20 transition-all",children:[(0,l.jsx)("p",{className:"mb-2 text-emerald-400 font-medium",children:"You can:"}),(0,l.jsxs)("ul",{className:"space-y-2 text-white/80",children:[(0,l.jsxs)("li",{className:"flex items-center gap-2",children:[(0,l.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"}),"Ask questions in English or Urdu"]}),(0,l.jsxs)("li",{className:"flex items-center gap-2",children:[(0,l.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"}),"Upload documents for analysis"]}),(0,l.jsxs)("li",{className:"flex items-center gap-2",children:[(0,l.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full"}),"Search for latest information"]})]})]})]}),N.map((e,t)=>(0,l.jsx)(s.P.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-20,scale:.95},transition:{duration:.2,ease:[.23,1,.32,1]},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"," group"),children:(0,l.jsxs)("div",{className:"max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 ".concat("user"===e.role?"bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/20":e.error?"bg-red-500/10 text-white ring-1 ring-red-500/30":"bg-black/20 text-white backdrop-blur-sm ring-1 ring-white/10"," relative group-hover:shadow-xl transition-all duration-200"),children:[e.content,e.generatedFile&&(0,l.jsx)("div",{className:"mt-3 flex items-center gap-2",children:(0,l.jsxs)("button",{onClick:()=>er(e.generatedFile.content,e.generatedFile.name,e.generatedFile.type),className:"flex items-center gap-1.5 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-lg transition-all ring-1 ring-emerald-500/30",children:[(0,l.jsx)(m.A,{className:"w-3.5 h-3.5"}),"Download ",e.generatedFile.name]})}),e.timestamp&&(0,l.jsx)("div",{className:"text-xs opacity-0 group-hover:opacity-60 mt-1.5 transition-opacity",children:Z[t]||""})]})},t)),O&&(0,l.jsx)(s.P.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},className:"flex justify-start",children:(0,l.jsx)("div",{className:"bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-3 ring-1 ring-white/10",children:(0,l.jsx)(n.A,{className:"w-5 h-5 animate-spin text-emerald-400"})})}),(0,l.jsx)("div",{ref:M,className:"h-4"})]})}),(0,l.jsx)("div",{className:"w-full bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-xl border-t border-white/10",children:(0,l.jsx)("div",{className:"px-4 py-4 lg:py-6",children:(0,l.jsxs)("form",{onSubmit:en,className:"flex flex-col gap-3",children:[(0,l.jsxs)("div",{className:"flex items-center gap-2",children:[(0,l.jsxs)("div",{className:"flex gap-1.5",children:[(0,l.jsx)("button",{type:"button",onClick:()=>{var e;return null===(e=J.current)||void 0===e?void 0:e.click()},className:"p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all",title:"Upload file",children:(0,l.jsx)(h.A,{className:"w-5 h-5"})}),(0,l.jsx)("button",{type:"button",onClick:eo,disabled:O,className:"p-2.5 text-white/70 hover:text-white rounded-xl transition-all ".concat(K?"bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30":"hover:bg-white/10"),title:K?"Search":"Web Search",children:(0,l.jsx)(x.A,{className:"w-5 h-5"})})]}),(0,l.jsx)("input",{type:"text",value:I,onChange:e=>D(e.target.value),placeholder:Y?"Instructions for ".concat(Y.name,"..."):K?"Search...":"Type message...",className:"flex-1 bg-black/20 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm transition-all",disabled:O}),W?(0,l.jsx)("button",{type:"button",onClick:ea,disabled:O||V>=3,className:"p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all disabled:opacity-50",title:"Retry",children:(0,l.jsx)(u.A,{className:"w-5 h-5"})}):(0,l.jsx)("button",{type:"submit",disabled:O||!I.trim(),className:"p-2.5 text-white/70 hover:text-white hover:bg-emerald-500/20 rounded-xl transition-all disabled:opacity-50",children:(0,l.jsx)(p.A,{className:"w-5 h-5"})})]}),(Y||W)&&(0,l.jsxs)("div",{className:"flex items-center gap-3 px-1 pt-1",children:[Y&&(0,l.jsxs)("span",{className:"text-emerald-400 flex items-center gap-1.5 text-xs",children:[(0,l.jsx)("span",{className:"w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full animate-pulse"}),"File ready for analysis"]}),W&&(0,l.jsxs)("span",{className:"text-red-400 flex items-center gap-1.5 text-xs",children:[(0,l.jsx)(g.A,{className:"w-3.5 h-3.5"}),W]})]}),(0,l.jsx)("input",{type:"file",ref:J,onChange:el,accept:".pdf,.doc,.docx,.txt,.csv,image/*,application/json",className:"hidden"})]})})})]}),ec&&(0,l.jsx)("div",{className:"fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden",onClick:()=>ed(!1)})]})},v=()=>{let[e,t]=(0,i.useState)([]),[a,s]=(0,i.useState)(""),[r,o]=(0,i.useState)(!1);return((0,i.useEffect)(()=>{var e;let a=localStorage.getItem("chatSessions"),l=a?JSON.parse(a):[{id:crypto.randomUUID(),title:"New Chat",messages:[],createdAt:new Date,lastUpdated:new Date}];t(l),s((null===(e=l[0])||void 0===e?void 0:e.id)||""),o(!0)},[]),r)?(0,l.jsx)(w,{initialSessions:e,initialSessionId:a}):(0,l.jsx)("div",{className:"flex items-center justify-center h-screen bg-black",children:(0,l.jsx)(n.A,{className:"w-8 h-8 animate-spin text-emerald-400"})})};function y(){return(0,l.jsxs)("main",{className:"h-[100dvh] supports-[height:100svh]:h-[100svh] supports-[height:100dvh]:h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900 relative overflow-hidden selection:bg-emerald-500/30 flex flex-col",children:[(0,l.jsx)(s.P.div,{initial:{opacity:0},animate:{opacity:.015},transition:{duration:1.2,delay:.2},className:"fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)] bg-[length:4px_4px] pointer-events-none mix-blend-plus-lighter"}),(0,l.jsx)("div",{className:"absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none"}),(0,l.jsx)(r.l$,{position:"top-center",toastOptions:{style:{background:"rgba(10, 10, 10, 0.95)",color:"#fff",backdropFilter:"blur(12px)",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"8px",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"},success:{iconTheme:{primary:"#059669",secondary:"#fff"}}}}),(0,l.jsx)(s.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,ease:[.22,1,.36,1]},className:"flex-1 w-full max-w-full overflow-hidden",children:(0,l.jsx)("div",{className:"h-full max-w-full relative",children:(0,l.jsx)(v,{})})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[162,636,593,792],()=>t(2022)),_N_E=e.O()}]);