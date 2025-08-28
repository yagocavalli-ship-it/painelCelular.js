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

    // ===== REDAHACK SCREEN =====
    function mostrarRedaHack(){
        const overlay=document.createElement('div');
        Object.assign(overlay.style,{
            position:'fixed',top:0,left:0,width:'100%',height:'100%',
            backgroundColor:'#000',color:'#FFD700',display:'flex',
            alignItems:'center',justifyContent:'center',
            fontSize:'60px',fontWeight:'bold',
            zIndex:9999999,textAlign:'center',
            animation:'fadeOutOverlay 4s forwards'
        });
        overlay.innerHTML="REDAHACK";
        document.body.appendChild(overlay);

        const style=document.createElement('style');
        style.innerHTML=`@keyframes fadeOutOverlay{0%{opacity:1}80%{opacity:1}100%{opacity:0;display:none}}`;
        document.head.appendChild(style);
    }

    // ===== CRÉDITOS FIXO =====
    let creditoAberto=false;
    function mostrarCreditos(){
        if(creditoAberto) return;
        creditoAberto=true;
        sendToast({
            text:`✨ <b>CRÉDITOS DO SCRIPT</b> ✨<br>👨‍💻 Dev: Mano Rick<br>🌐 Servidor: <a href='https://discord.gg/2Hzv9FAjzm' target='_blank' style='color:#FFD700;text-decoration:underline;'>discord.gg/2Hzv9FAjzm</a><br>📦 Versão: 2.0`,
            duration:6000,
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
        setTimeout(()=>{creditoAberto=false;},6000);
    }

    // ===== DARK MODE =====
    function ativarDarkMode(){
        const darkStyle=document.createElement('style');
        darkStyle.id='darkModeReda';
        darkStyle.innerHTML=`html,body,*{background-color:#121212 !important;color:#fff !important;border-color:#333 !important}a{color:#FFD700 !important}`;
        document.head.appendChild(darkStyle);
        sendToast({text:"🌙 Dark Mode ativado!",duration:2000});
    }

    // ===== DIGITADOR TURBO BONITO =====
    function iniciarDigitador(){
        const modal=document.createElement('div');
        Object.assign(modal.style,{
            position:'fixed',top:'50%',left:'50%',
            transform:'translate(-50%,-50%)',background:'#222',
            padding:'20px',borderRadius:'15px',color:'#fff',zIndex:99999999,
            display:'flex',flexDirection:'column',gap:'10px',alignItems:'center',
            boxShadow:'0 10px 30px rgba(0,0,0,0.5)'
        });

        const title=document.createElement('div');
        title.textContent="✍️ Digitador Turbo";
        Object.assign(title.style,{fontSize:'20px',fontWeight:'bold',marginBottom:'10px',color:'#FFD700'});
        modal.appendChild(title);

        const textarea=document.createElement('textarea');
        textarea.placeholder="Cole ou digite seu texto aqui...";
        Object.assign(textarea.style,{width:'300px',height:'100px',borderRadius:'10px',padding:'10px',fontSize:'16px'});
        modal.appendChild(textarea);

        const speedDiv=document.createElement('div');
        speedDiv.style.display='flex';
        speedDiv.style.gap='10px';
        ['Normal','Rápido','Super Rápido'].forEach((s,i)=>{
            const btn=document.createElement('button');
            btn.textContent=s;
            Object.assign(btn.style,{
                padding:'8px 12px',borderRadius:'10px',cursor:'pointer',border:'none',fontWeight:'bold'
            });
            btn.onclick=()=>startTyping(textarea.value,[40,20,5][i]);
            speedDiv.appendChild(btn);
        });
        modal.appendChild(speedDiv);

        function startTyping(text,vel){
            if(!text)return;
            document.body.removeChild(modal);
            const el=document.activeElement;
            if(!(el.isContentEditable||el.tagName==='INPUT'||el.tagName==='TEXTAREA')){sendToast({text:"❌ Clique em um campo para digitar!",duration:2000});return;}

            let i=0;
            const progresso=document.createElement('div');
            Object.assign(progresso.style,{
                position:'fixed',top:'50%',left:'50%',
                transform:'translate(-50%,-50%)',
                background:'rgba(0,0,0,0.85)',
                color:'#fff',padding:'12px 22px',
                borderRadius:'10px',zIndex:9999999,fontSize:'18px',fontWeight:'bold',
                textAlign:'center',boxShadow:'0 8px 20px rgba(0,0,0,0.3)'
            });
            document.body.appendChild(progresso);

            const interval=setInterval(()=>{
                if(i<text.length){
                    const c=text[i++];
                    if(el.isContentEditable) el.innerText+=c;
                    else el.value+=c;
                    progresso.textContent=`⌛ ${Math.round(i/text.length*100)}%`;
                    el.dispatchEvent(new Event('input',{bubbles:true}));
                }else{
                    clearInterval(interval);
                    progresso.remove();
                    el.blur();
                    sendToast({text:"✅ Texto digitado com sucesso!",duration:2000});
                    criarBotaoFlutuante();
                }
            },vel);
        }

        document.body.appendChild(modal);
    }

    // ===== CRIAR MENU FUNCIONAL =====
    let fundo,janela;
    function criarMenu(){
        fundo=document.createElement('div');
        Object.assign(fundo.style,{
            position:'fixed',top:0,left:0,width:'100%',height:'100%',
            backgroundColor:'rgba(0,0,0,0.85)',zIndex:999999,
            display:'flex',alignItems:'center',justifyContent:'center'
        });

        janela=document.createElement('div');
        Object.assign(janela.style,{
            background:'rgba(0,0,0,0.95)',
            backdropFilter:'blur(12px)',
            borderRadius:'15px',
            padding:'25px',
            maxWidth:'90%',
            width:'380px',
            textAlign:'center',
            color:'#fff',
            boxShadow:'0 10px 40px rgba(0,0,0,0.4)',
            transform:'translateY(0)',
            opacity:1,
            transition:'all 0.4s ease'
        });

        const titulo=document.createElement('div');
        titulo.textContent="PAINEL CELULAR v3.0";
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
        criarBotao('💻 Dark Mode',()=>{ativarDarkMode();},'#34495e');
        criarBotao('💳 Créditos', mostrarCreditos,'#9b59b6');
        criarBotao('❌ Fechar Menu',()=>{fundo.remove();criarBotaoFlutuante();},'#c0392b');

        janela.append(titulo,botoes);
        fundo.append(janela);
        document.body.append(fundo);
    }

    // ===== BOTÃO FLUTUANTE =====
    let posX=localStorage.getItem("posX")||"20px";
    let posY=localStorage.getItem("posY")||"20px";
    function criarBotaoFlutuante(){
        const b=document.createElement('div');
        b.textContent="Painel";
        Object.assign(b.style,{
            position:'fixed',left:posX,top:posY,
            background:'#27ae60',padding:'10px 18px',
            borderRadius:'25px',cursor:'grab',zIndex:999999,
            fontWeight:'bold',color:'#fff',userSelect:'none',
            transition:'all 0.2s',boxShadow:'0 6px 20px rgba(0,0,0,0.3)'
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

    // ===== SCRIPT AUTOMÁTICO =====
    mostrarRedaHack();
    setTimeout(()=>sendToast({text:"🚀 Script executado com sucesso...",duration:2000,gravity:"bottom"}),500);
    setTimeout(()=>sendToast({text:"⏳ Carregando...",duration:2000,gravity:"bottom"}),1500);
    setTimeout(()=>sendToast({text:"✅ Script carregado com sucesso!\n💳 Créditos: Mano Rick",duration:3000,gravity:"bottom"}),3000);

    // ===== INICIAR =====
    criarBotaoFlutuante();
})();
