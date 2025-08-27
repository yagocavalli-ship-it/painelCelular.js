javascript:(function(){
    // ===== TOAST NOTIFICATIONS =====
    function sendToast({text,duration=3000,gravity="bottom",position="center",style={},html=false}){
        if(typeof Toastify==='undefined'){
            const link=document.createElement('link');
            link.rel='stylesheet';
            link.href='https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
            document.head.appendChild(link);

            const script=document.createElement('script');
            script.src='https://cdn.jsdelivr.net/npm/toastify-js';
            document.head.appendChild(script);

            setTimeout(()=>sendToast({text,duration,gravity,position,style,html}),500);
            return;
        }
        Toastify({
            text,
            duration,
            gravity,
            position,
            style,
            escapeMarkup: !html
        }).showToast();
    }

    // ===== CRÉDITOS AVANÇADOS =====
    function mostrarCreditos(){
        let duracao=6; // segundos
        let contador=duracao;
        const intervalo=setInterval(()=>{
            sendToast({
                text:`✨ *CRÉDITOS DO SCRIPT* ✨\n\n👨‍💻 Dev: Mano Rick\n🌐 Servidor: <a href='https://discord.gg/2Hzv9FAjzm' target='_blank' style='color:#FFD700;text-decoration:underline;'>discord.gg/2Hzv9FAjzm</a>\n📦 Versão: 2.0\n⏱ Duração: ${contador--}s`,
                duration:1000,
                gravity:"top",
                position:"center",
                style:{
                    background:"linear-gradient(90deg, #4b6cb7, #182848)",
                    color:"#fff",
                    fontWeight:"bold",
                    fontSize:"16px",
                    padding:"15px 25px",
                    borderRadius:"12px",
                    textAlign:"center",
                    boxShadow:"0 8px 30px rgba(0,0,0,0.3)"
                },
                html:true
            });
            if(contador<0) clearInterval(intervalo);
        },1000);
    }

    // ===== DIGITADOR TURBO APRIMORADO =====
    function iniciarDigitador(){
        sendToast({text:"✍️ Toque no campo para digitar o texto",duration:3000});
        const handler=(e)=>{
            e.preventDefault();
            document.removeEventListener('click',handler,true);
            const el=e.target;
            if(!(el.isContentEditable||el.tagName==='INPUT'||el.tagName==='TEXTAREA')){
                sendToast({text:"❌ Esse não é um campo válido",duration:2000});
                criarBotaoFlutuante();
                return;
            }
            const texto=prompt("📋 Cole ou digite o texto:");
            if(!texto){criarBotaoFlutuante();return;}
            const velocidade=parseInt(prompt("⚡ Velocidade de digitação (ms por caractere, padrão 40):")||40);

            el.focus();
            let i=0;
            const progresso=document.createElement('div');
            Object.assign(progresso.style,{
                position:'fixed',top:'50%',left:'50%',
                transform:'translate(-50%,-50%)',
                background:'rgba(0,0,0,0.85)',
                color:'#fff',
                padding:'12px 22px',
                borderRadius:'10px',
                zIndex:9999999,
                fontSize:'18px',
                fontWeight:'bold',
                textAlign:'center',
                boxShadow:'0 8px 20px rgba(0,0,0,0.3)'
            });
            document.body.append(progresso);

            const intervalo=setInterval(()=>{
                if(i<texto.length){
                    const c=texto[i++];
                    if(el.isContentEditable) el.innerText+=c;
                    else el.value+=c;
                    progresso.textContent=`⌛ ${Math.round(i/texto.length*100)}%`;
                    el.dispatchEvent(new Event('input',{bubbles:true}));
                }else{
                    clearInterval(intervalo);
                    progresso.remove();
                    el.blur();
                    sendToast({text:"✅ Texto digitado com sucesso!",duration:3000});
                    setTimeout(()=>criarBotaoFlutuante(),500);
                }
            },velocidade);
        };
        document.addEventListener('click',handler,true);
    }

    // ===== DARK MODE =====
    let darkMode=false;
    function toggleDarkMode(){
        darkMode=!darkMode;
        if(darkMode){
            const style=document.createElement('style');
            style.id='painel-darkmode';
            style.innerHTML=`html, body {background:#121212 !important; color:#eee !important;} a {color:#FFD700 !important;}`;
            document.head.appendChild(style);
            sendToast({text:"🌙 Dark mode ativado!",duration:2000});
        } else {
            const s=document.getElementById('painel-darkmode');
            if(s) s.remove();
            sendToast({text:"☀️ Dark mode desativado!",duration:2000});
        }
    }

    // ===== CRIAR MENU MODERNO =====
    let fundo,janela;
    function criarMenu(){
        fundo=document.createElement('div');
        Object.assign(fundo.style,{
            position:'fixed',top:0,left:0,width:'100%',height:'100%',
            backgroundColor:'rgba(0,0,0,0.85)',zIndex:999999,
            display:'flex',alignItems:'center',justifyContent:'center',
            animation:'fadeIn 0.3s'
        });

        janela=document.createElement('div');
        Object.assign(janela.style,{
            background:'rgba(0,0,0,0.9)',
            backdropFilter:'blur(12px)',
            borderRadius:'15px',
            padding:'25px',
            maxWidth:'90%',
            width:'380px',
            textAlign:'center',
            color:'#fff',
            boxShadow:'0 10px 40px rgba(0,0,0,0.4)',
            animation:'slideDown 0.3s'
        });

        const titulo=document.createElement('div');
        titulo.textContent="PAINEL CELULAR v2.0";
        Object.assign(titulo.style,{fontSize:'22px',fontWeight:'bold',marginBottom:'20px',color:'#FFD700'});

        const botoes=document.createElement('div');
        Object.assign(botoes.style,{display:'flex',flexDirection:'column',gap:'12px',alignItems:'center'});

        function criarBotao(texto,func,cor='#222'){
            const b=document.createElement('button');
            b.innerHTML=texto;
            Object.assign(b.style,{
                padding:'12px 20px',
                background:cor,
                color:'#fff',
                border:'none',
                borderRadius:'30px',
                cursor:'pointer',
                fontWeight:'bold',
                width:'95%',
                transition:'all 0.2s',
                fontSize:'16px'
            });
            b.onmouseover=()=>b.style.transform='scale(1.05)';
            b.onmouseleave=()=>b.style.transform='scale(1)';
            b.onclick=func;
            botoes.appendChild(b);
        }

        criarBotao('✍️ Digitador Turbo',()=>{fundo.remove();iniciarDigitador();},'#1abc9c');
        criarBotao('📄 Criar Texto com Tema',()=>{
            const tema=prompt("Qual tema?");
            if(!tema)return;
            const tamanho=prompt("Tamanho do texto: curto, médio ou longo?")||'médio';
            const url=`https://www.perplexity.ai/search?q=${encodeURIComponent(`Crie um texto com o tema "${tema}" com tamanho ${tamanho}`)}`;
            window.open(url,'_blank');
        },'#3498db');
        criarBotao('🎯 Marcar Resposta (Colar)',()=>{
            navigator.clipboard.readText().then(r=>{
                const alternativas=document.querySelectorAll('[role="option"], .options div, .choice, .answer-text, label, span, p');
                let marcada=false;
                alternativas.forEach(el=>{
                    if(el.innerText.toLowerCase().includes(r.toLowerCase())){
                        el.style.backgroundColor='#0f0';
                        el.scrollIntoView({behavior:'smooth',block:'center'});
                        marcada=true;
                    }
                });
                sendToast({text:marcada?'✅ Resposta marcada!':'❌ Nenhuma correspondente encontrada.',duration:2000});
            });
        },'#e67e22');
        criarBotao('💳 Créditos', mostrarCreditos,'#9b59b6');
        criarBotao('🌙 Dark Mode', toggleDarkMode,'#34495e');
        criarBotao('❌ Fechar Menu',()=>{fundo.remove();criarBotaoFlutuante();},'#c0392b');

        janela.append(titulo,botoes);
        fundo.append(janela);
        document.body.append(fundo);
    }

    // ===== BOTÃO FLUTUANTE APRIMORADO =====
    let posX=localStorage.getItem("posX")||"20px";
    let posY=localStorage.getItem("posY")||"20px";
    function criarBotaoFlutuante(){
        const b=document.createElement('div');
        b.textContent="Painel";
        Object.assign(b.style,{
            position:'fixed',
            left:posX,
            top:posY,
            background:'#27ae60',
            padding:'10px 18px',
            borderRadius:'25px',
            cursor:'grab',
            zIndex:999999,
            fontWeight:'bold',
            color:'#fff',
            userSelect:'none',
            transition:'all 0.2s',
            boxShadow:'0 6px 20px rgba(0,0,0,0.3)'
        });
        document.body.appendChild(b);

        let isDragging=false,startX,startY,initialX,initialY;
        b.addEventListener('touchstart',startDrag,{passive:false});
        b.addEventListener('mousedown',startDrag);
        function startDrag(e){
            const t = e.touches ? e.touches[0] : e;
            startX=t.clientX; startY=t.clientY;
            initialX=parseFloat(b.style.left); initialY=parseFloat(b.style.top);
            isDragging=false;
            document.addEventListener(e.touches?'touchmove':'mousemove',handleDrag,{passive:false});
            document.addEventListener(e.touches?'touchend':'mouseup',endDrag);
        }
        function handleDrag(e){
            const t = e.touches ? e.touches[0] : e;
            const dx=t.clientX-startX,dy=t.clientY-startY;
            if(!isDragging&&Math.sqrt(dx*dx+dy*dy)>5) isDragging=true;
            if(isDragging){b.style.left=`${initialX+dx}px`; b.style.top=`${initialY+dy}px`;}
        }
        function endDrag(e){
            if(!isDragging){b.remove(); criarMenu();}
            else{posX=b.style.left; posY=b.style.top; localStorage.setItem("posX",posX); localStorage.setItem("posY",posY);}
            document.removeEventListener(e.changedTouches?'touchmove':'mousemove',handleDrag);
            document.removeEventListener(e.changedTouches?'touchend':'mouseup',endDrag);
        }
    }

    // ===== INICIAR =====
    criarBotaoFlutuante();

    // ===== ANIMAÇÕES =====
    const styleAnim=document.createElement('style');
    styleAnim.innerHTML=`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideDown{from{transform:translateY(-50px);opacity:0}to{transform:translateY(0);opacity:1}}
    `;
    document.head.appendChild(styleAnim);

})();
