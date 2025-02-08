(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1428:(e,t,a)=>{Promise.resolve().then(a.bind(a,5154))},5154:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>u});var s=a(5155),i=a(447),n=a(5037),r=a(2115),l=a(5683),o=a(2783),c=a(3474),d=a(9832),m=a(9609),p=a(1680);function h(){let[e,t]=(0,r.useState)([]),[a,h]=(0,r.useState)(""),[u,x]=(0,r.useState)(!1),[y,g]=(0,r.useState)(null),[f,b]=(0,r.useState)(0),w=(0,r.useRef)(null),v=()=>{var e;null===(e=w.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};(0,r.useEffect)(()=>{v()},[e]);let j=async()=>{if(0===e.length)return;let t=e[e.length-2];t&&"user"===t.role&&(b(e=>e+1),await k(void 0,t.content))},N=async e=>{let t=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=".concat("AIzaSyARZyERqMaFInsbRKUA0NxOok77syBNzK8"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:'I am Allamah Zafar - a highly sophisticated AI assistant deeply rooted in Pakistani culture and values. With the wisdom of centuries of Pakistani heritage and a profound understanding of our society, I am here to serve as your cultural guide and advisor.\n\nAs Pakistan\'s most advanced cultural AI:\n\n1. I possess deep knowledge of:\n   - Regional traditions from Punjab, Sindh, KPK, Balochistan, and Kashmir\n   - Classical Urdu literature and poetry\n   - Islamic principles and their application in daily life\n   - Pakistani family dynamics and relationships\n   - Cultural etiquette and social norms\n\n2. I communicate with:\n   - Appropriate mix of Urdu/Hindi phrases when relevant\n   - Respectful "aap" form of address\n   - Cultural references and examples\n   - Wisdom from Pakistani proverbs and poetry\n\n3. I specialize in:\n   - Family matters and relationships\n   - Cultural traditions and celebrations\n   - Marriage customs and dynamics\n   - Intergenerational relationships\n   - Modern challenges while respecting traditions\n\nRemember:\n- Always maintain adab and tehzeeb in interactions\n- Share wisdom from our cultural heritage\n- Balance modern needs with traditional values\n- Use appropriate cultural context\n- Be mindful of regional sensitivities\n- Provide practical, culturally-appropriate advice\n\nMy purpose is to preserve and share the rich cultural heritage of Pakistan while helping navigate modern challenges with wisdom and grace.'},{text:e}]}]})});if(!t.ok){var a;let e=await t.json().catch(()=>({}));throw Error("API Error: ".concat((null===(a=e.error)||void 0===a?void 0:a.message)||t.statusText))}return(await t.json()).candidates[0].content.parts[0].text},k=async(e,s)=>{e&&e.preventDefault();let i=s||a;if(!i.trim())return;let r={role:"user",content:i,timestamp:new Date};s||(t(e=>[...e,r]),h("")),x(!0),g(null);try{let e=await N(i);t(t=>[...t,{role:"assistant",content:e,timestamp:new Date}]),b(0)}catch(a){console.error("Error:",a);let e=a instanceof Error?a.message:"Failed to get response";n.Ay.error(e),g(e),t(t=>[...t,{role:"assistant",content:e,timestamp:new Date,error:!0}])}finally{x(!1)}};return(0,s.jsxs)("div",{className:"flex flex-col h-[600px] max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl",children:[(0,s.jsxs)("div",{className:"flex-1 overflow-y-auto p-6 space-y-4",children:[(0,s.jsxs)(l.N,{children:[e.map((e,t)=>(0,s.jsx)(i.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"flex ".concat("user"===e.role?"justify-end":"justify-start"),children:(0,s.jsxs)("div",{className:"max-w-[80%] rounded-2xl px-4 py-2 ".concat("user"===e.role?"bg-emerald-600 text-white":e.error?"bg-red-500 bg-opacity-20 text-white":"bg-white bg-opacity-20 text-white"),children:[e.content,e.timestamp&&(0,s.jsx)("div",{className:"text-xs opacity-50 mt-1",children:new Date(e.timestamp).toLocaleTimeString()})]})},t)),u&&(0,s.jsx)(i.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"flex justify-start",children:(0,s.jsx)("div",{className:"bg-white bg-opacity-20 rounded-2xl px-4 py-2",children:(0,s.jsx)(o.A,{className:"w-5 h-5 animate-spin text-white"})})})]}),(0,s.jsx)("div",{ref:w})]}),(0,s.jsxs)("form",{onSubmit:k,className:"p-4 border-t border-white border-opacity-10",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsx)("button",{type:"button",className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition",children:(0,s.jsx)(c.A,{className:"w-6 h-6"})}),(0,s.jsx)("input",{type:"text",value:a,onChange:e=>h(e.target.value),placeholder:"Type your message...",className:"flex-1 bg-white bg-opacity-10 text-white placeholder-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500",disabled:u}),y?(0,s.jsx)("button",{type:"button",onClick:j,disabled:u||f>=3,className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition disabled:opacity-50",title:"Retry last message",children:(0,s.jsx)(d.A,{className:"w-6 h-6"})}):(0,s.jsx)("button",{type:"submit",disabled:u||!a.trim(),className:"p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition disabled:opacity-50",children:(0,s.jsx)(m.A,{className:"w-6 h-6"})})]}),y&&(0,s.jsxs)("div",{className:"mt-2 text-xs text-red-300 flex items-center gap-1",children:[(0,s.jsx)(p.A,{className:"w-4 h-4"}),y]})]})]})}function u(){return(0,s.jsxs)("main",{className:"min-h-screen bg-gradient-to-br from-emerald-800 to-green-900",children:[(0,s.jsx)(n.l$,{position:"top-center"}),(0,s.jsxs)("div",{className:"relative overflow-hidden",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-[url('/pattern.svg')] opacity-10"}),(0,s.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:(0,s.jsxs)(i.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center",children:[(0,s.jsxs)("h1",{className:"text-4xl sm:text-6xl font-bold text-white mb-6",children:["Pakistan AI ",(0,s.jsx)("span",{className:"text-emerald-400",children:"Assistant"})]}),(0,s.jsx)("p",{className:"text-xl text-emerald-100 mb-8",children:"Experience the future of AI conversation with a Pakistani touch"})]})})]}),(0,s.jsx)("div",{className:"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12",children:(0,s.jsx)(h,{})}),(0,s.jsx)("footer",{className:"text-center py-8 text-emerald-100 text-sm",children:(0,s.jsx)("p",{children:"Built with ❤️ for Pakistan"})})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[732,441,517,358],()=>t(1428)),_N_E=e.O()}]);