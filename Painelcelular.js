javascript:(function(){
    // ===== TOAST NOTIFICATIONS =====
    function sendToast(text,duration=3000){
        if(typeof Toastify==='undefined'){
            const link=document.createElement('link');
            link.rel='stylesheet';
            link.href='https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
            document.head.appendChild(link);

            const script=document.createElement('script');
            script.src='https://cdn.jsdelivr.net/npm/toastify-js';
            document.head.appendChild(script);

            setTimeout(()=>sendToast(text,duration),500);
            return;
        }
        Toastify({text,duration,gravity:"bottom",position:"center",style:{background:"#000"}}).showToast();
    }

    // ===== CRÉDITOS =====
    function mostrarCreditos(){
        if(typeof Toastify==='undefined'){
            sendToast("💳 Carregando créditos...", 2000);
            return;
        }
        Toastify({
            text: "✨ *CRÉDITOS DO SCRIPT* ✨\n\n👨‍💻 Dev: Mano Rick\n🌐 Servidor: discord.gg/2Hzv9FAjzm\n📦 Versão: 1.0\n💡 Obrigado por usar!",
            duration: 6000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(90deg, #4b6cb7, #182848)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "15px 25px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
            }
        }).showToast();
    }

    // ===== DIGITADOR TURBO =====
    function iniciarDigitador(){
        sendToast("✍️ Toque no campo para digitar o texto",3000);
        const handler=(e)=>{
            e.preventDefault();
            document.removeEventListener('click',handler,true);
            const el=e.target;
            if(!(el.isContentEditable||el.tagName==='INPUT'||el.tagName==='TEXTAREA')){
                sendToast("❌ Esse não é um campo válido",2000);
                criarBotaoFlutuante();
                return;
            }
            const texto=prompt("📋 Cole ou digite o texto:");
            if(!texto){criarBotaoFlutuante();return;}

            el.focus();
            let i=0;
            const progresso=document.createElement('div');
            Object.assign(progresso.style,{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'rgba(0,0,0,0.8)',color:'#fff',padding:'10px 20px',borderRadius:'8px',zIndex:9999999,fontSize:'18px'});
            document.body.append(progresso);

            const intervalo=setInterval(()=>{
                if(i<texto.length){
                    const c=texto[i++];
                    document.execCommand('insertText',false,c);
                    progresso.textContent=`${Math.round(i/texto.length*100)}%`;
                }else{
                    clearInterval(intervalo);
                    progresso.remove();
                    el.blur();
                    setTimeout(()=>{
                        el.dispatchEvent(new Event('input',{bubbles:true}));
                        el.dispatchEvent(new Event('change',{bubbles:true}));
                        sendToast("✅ Texto digitado com sucesso!",3000);
                        setTimeout(()=>criarBotaoFlutuante(),500);
                    },100);
                }
            },40);
        };
        document.addEventListener('click',handler,true);
    }

    // ===== CRIAR MENU =====
    let fundo,janela;
    function criarMenu(){
        fundo=document.createElement('div');
        Object.assign(fundo.style,{position:'fixed',top:0,left:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.85)',zIndex:999999,display:'flex',alignItems:'center',justifyContent:'center'});

        janela=document.createElement('div');
        Object.assign(janela.style,{background:'rgba(0,0,0,0.85)',backdropFilter:'blur(10px)',borderRadius:'15px',padding:'20px',maxWidth:'90%',width:'350px',textAlign:'center',color:'#fff',boxShadow:'0 8px 30px rgba(0,0,0,0.3)'});

        const titulo=document.createElement('div');
        titulo.textContent="PAINEL CELULAR";
        Object.assign(titulo.style,{fontSize:'20px',fontWeight:'bold',marginBottom:'15px'});

        const botoes=document.createElement('div');
        Object.assign(botoes.style,{display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'});

        function criarBotao(texto,func){
            const b=document.createElement('button');
            b.textContent=texto;
            Object.assign(b.style,{padding:'10px 15px',background:'#222',color:'#fff',border:'none',borderRadius:'30px',cursor:'pointer',fontWeight:'bold',width:'90%'});
            b.onclick=func;
            botoes.appendChild(b);
        }

        criarBotao('✍️ Digitador Turbo',()=>{fundo.remove();iniciarDigitador();});
        criarBotao('📄 Criar Texto com Tema',()=>{
            const tema=prompt("Qual tema?");
            if(!tema)return;
            const palavras=prompt("Número mínimo de palavras?");
            if(!palavras)return;
            const url=`https://www.perplexity.ai/search?q=${encodeURIComponent(`Crie um texto com o tema "${tema}" com no mínimo ${palavras} palavras.`)}`;
            window.open(url,'_blank');
        });
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
                sendToast(marcada?'✅ Resposta marcada!':'❌ Nenhuma correspondente encontrada.',2000);
            });
        });
        criarBotao('💳 Créditos', mostrarCreditos);
        criarBotao('❌ Fechar Menu',()=>{fundo.remove();criarBotaoFlutuante();});

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
        Object.assign(b.style,{position:'fixed',left:posX,top:posY,background:'#0f0',padding:'12px 20px',borderRadius:'30px',cursor:'grab',zIndex:999999,fontWeight:'bold',userSelect:'none'});
        document.body.appendChild(b);

        let isDragging=false,startX,startY,initialX,initialY;
        b.addEventListener('touchstart',startDrag,{passive:false});
        function startDrag(e){
            const t=e.touches[0];
            startX=t.clientX;startY=t.clientY;
            initialX=parseFloat(b.style.left);initialY=parseFloat(b.style.top);
            isDragging=false;
            document.addEventListener('touchmove',handleDrag,{passive:false});
            document.addEventListener('touchend',endDrag);
        }
        function handleDrag(e){
            const t=e.touches[0];
            const dx=t.clientX-startX,dy=t.clientY-startY;
            if(!isDragging&&Math.sqrt(dx*dx+dy*dy)>5)isDragging=true;
            if(isDragging){b.style.left=`${initialX+dx}px`;b.style.top=`${initialY+dy}px`;}
        }
        function endDrag(){
            if(!isDragging){b.remove();criarMenu();}
            else{posX=b.style.left;posY=b.style.top;localStorage.setItem("posX",posX);localStorage.setItem("posY",posY);}
            document.removeEventListener('touchmove',handleDrag);
            document.removeEventListener('touchend',endDrag);
        }
    }

    // ===== INICIAR =====
    criarBotaoFlutuante();
})();
