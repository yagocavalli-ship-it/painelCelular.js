// ===== [SISTEMA DE TOAST NOTIFICATIONS] ===== //
function sendToast(text, duration = 5000, gravity = 'bottom') {
    if (typeof Toastify === 'undefined') {
        loadToastify();
        setTimeout(() => sendToast(text, duration, gravity), 300);
        return;
    }
    
    Toastify({
        text,
        duration,
        gravity,
        position: "center",
        stopOnFocus: true,
        style: { background: "#000000" }
    }).showToast();
}

function loadToastify() {
    if (typeof Toastify !== 'undefined') return;

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
    document.head.appendChild(cssLink);

    const jsScript = document.createElement('script');
    jsScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
    document.head.appendChild(jsScript);
}

function aplicarEstiloBotao(elemento, gradiente = false) {
    Object.assign(elemento.style, {
        padding: '10px 15px',
        background: gradiente ? 'linear-gradient(135deg, #8A2BE2, #4B0082)' : '#222',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        outline: 'none',
        userSelect: 'none',
        margin: '8px 0'
    });
}

function aplicarEstiloTexto(elemento, tamanho = '18px') {
    Object.assign(elemento.style, {
        color: '#fff',
        fontSize: tamanho,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '10px 0',
        userSelect: 'none'
    });
}

function aplicarEstiloContainer(elemento) {
    Object.assign(elemento.style, {
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        maxWidth: '350px',
        width: '90%',
        textAlign: 'center'
    });
}

// ===== [PARTE 1 – LOGIN, DISCORD, YOUTUBE] ===== //
(function(){
    let fundo, janela, nome, relogio;
    let senhaLiberada = false;
    let posX = localStorage.getItem("dhonatanX") || "20px";
    let posY = localStorage.getItem("dhonatanY") || "20px";
    let corBotao = localStorage.getItem("corBotaoDhonatan") || "#0f0f0f";

    const criarInterface = () => {
        fundo = document.createElement('div');
        Object.assign(fundo.style, {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: '999999',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        });

        janela = document.createElement('div');
        aplicarEstiloContainer(janela);

        nome = document.createElement('div');
        Object.assign(nome.style, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' });

        const textoCima = document.createElement('div');
        textoCima.textContent = 'Painel Funções';
        aplicarEstiloTexto(textoCima, '20px');

        const textoBaixo = document.createElement('div');
        textoBaixo.textContent = 'Tudo para suas atividades de escola aqui!';
        aplicarEstiloTexto(textoBaixo, '17px');

        nome.appendChild(textoCima);
        nome.appendChild(textoBaixo);

        // Animação de cor no texto inferior
        let hue = 0;
        setInterval(() => {
            textoBaixo.style.color = `hsl(${hue % 360}, 100%, 60%)`;
            hue++;
        }, 30);

        const input = document.createElement('input');
        Object.assign(input.style, {
            padding: '12px',
            width: '80%',
            margin: '15px 0',
            background: '#222',
            color: '#fff',
            border: '1px solid #444',
            borderRadius: '30px',
            textAlign: 'center',
            fontSize: '16px'
        });
        input.type = 'password';
        input.placeholder = 'Digite a senha';

        const botao = document.createElement('button');
        botao.textContent = 'Acessar';
        aplicarEstiloBotao(botao, true);

        // Botão Discord
        const btnDiscord = document.createElement('button');
        btnDiscord.textContent = 'Servidor Discord';
        aplicarEstiloBotao(btnDiscord, true);
        btnDiscord.style.background = 'linear-gradient(135deg, #7289DA, #5b6eae)';
        btnDiscord.onclick = () => window.open('https://discord.gg/NfVKXRSvYK', '_blank');

        // Botão YouTube
        const btnYoutube = document.createElement('button');
        btnYoutube.textContent = 'Canal no YouTube';
        aplicarEstiloBotao(btnYoutube, true);
        btnYoutube.style.background = 'linear-gradient(135deg, #c42b2b, #782b2b)';
        btnYoutube.onclick = () => window.open('https://youtube.com/@manorickzin?si=V_71STAk8DLJNhtd', '_blank');

        const botoesContainer = document.createElement('div');
        Object.assign(botoesContainer.style, { display: 'flex', justifyContent: 'space-between', gap: '10px', width: '100%' });
        botoesContainer.append(botao, btnDiscord, btnYoutube);

        const erro = document.createElement('div');
        erro.textContent = '❌ Senha incorreta, entre no nosso Discord para pegar a senha.';
        Object.assign(erro.style, { display: 'none', color: '#ff5555', marginTop: '15px', fontSize: '14px' });

        // Sistema de senhas remoto
        let senhasCarregadas = false;
        const carregarSenhasRemotas = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/auxpainel/2050/main/senhas.js?' + Date.now());
                if (!response.ok) throw new Error('Erro HTTP: ' + response.status);
                const scriptContent = await response.text();
                const script = document.createElement('script');
                script.textContent = scriptContent;
                document.head.appendChild(script);
                senhasCarregadas = true;
            } catch (error) {
                console.error('Falha ao carregar senhas:', error);
                window.verificarSenha = function(senha) {
                    const senhasBackup = ["admin","Teste24","adm","tainara","vitor","pablo","rafael"];
                    return senhasBackup.includes(senha);
                };
                senhasCarregadas = true;
            }
        };
        carregarSenhasRemotas();

        botao.onclick = async () => {
            if (!senhasCarregadas) {
                sendToast('🔒 Carregando sistema de senhas...', 2000);
                await carregarSenhasRemotas();
            }

            if (verificarSenha(input.value)) {
                senhaLiberada = true;
                fundo.remove();
                sendToast("Bem-vindo ao Painel de Funções! 👋", 3000);
                criarBotaoFlutuante();
            } else {
                erro.style.display = 'block';
            }
        };

        janela.append(nome, input, botoesContainer, erro);
        fundo.append(janela);
        document.body.append(fundo);
    };

    // A Parte 2 vai conter o menu completo, abas, scripts, respostas e botão flutuante arrastável
})();

// ===== [PARTE 2 – MENU, ABAS E BOTÃO FLUTUANTE] ===== //
(function(){
    let fundo, janela, abaAtiva = 'textos';
    let posX = localStorage.getItem("dhonatanX") || "20px";
    let posY = localStorage.getItem("dhonatanY") || "20px";
    let corBotao = localStorage.getItem("corBotaoDhonatan") || "#0f0f0f";

    const criarBotaoFlutuante = () => {
        const b = document.createElement('div');
        b.id = "dhonatanBotao";
        b.textContent = "Painel";
        Object.assign(b.style, {
            position: 'fixed',
            left: posX,
            top: posY,
            background: corBotao,
            padding: '12px 20px',
            borderRadius: '30px',
            cursor: 'grab',
            zIndex: '999999',
            fontWeight: 'bold',
            userSelect: 'none',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
        });

        let isDragging = false, startX, startY, initialX, initialY;
        const DRAG_THRESHOLD = 5;

        b.addEventListener('mousedown', startDrag);
        b.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            startX = clientX; startY = clientY;
            initialX = clientX - (parseFloat(b.style.left) || 0);
            initialY = clientY - (parseFloat(b.style.top) || 0);
            isDragging = false;

            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('touchmove', handleDragMove, { passive: false });
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        }

        function handleDragMove(e) {
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;
            const distance = Math.sqrt(dx*dx + dy*dy);

            if (!isDragging && distance > DRAG_THRESHOLD) isDragging = true;

            if (isDragging) {
                const currentX = clientX - initialX;
                const currentY = clientY - initialY;
                b.style.left = `${currentX}px`;
                b.style.top = `${currentY}px`;
                b.style.cursor = 'grabbing';
            }
        }

        function endDrag() {
            if (isDragging) {
                posX = b.style.left; posY = b.style.top;
                localStorage.setItem("dhonatanX", posX);
                localStorage.setItem("dhonatanY", posY);
            } else {
                b.remove();
                senhaLiberada ? criarMenu() : criarInterface();
            }
            b.style.cursor = 'grab';
            isDragging = false;

            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('touchmove', handleDragMove);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
        }

        document.body.append(b);
    };

    const mostrarInfoDono = () => {
        if(fundo) fundo.remove();
        const container = document.createElement('div');
        aplicarEstiloContainer(container);
        container.style.zIndex = '1000001';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';

        const titulo = document.createElement('div'); titulo.textContent = '👑'; aplicarEstiloTexto(titulo,'20px');
        const insta = document.createElement('div'); insta.textContent = 'VERSÃO 1.1'; aplicarEstiloTexto(insta);
        const info = document.createElement('div'); info.textContent = '💻 Mod exclusivo e protegido, feito para poupar seu tempo'; aplicarEstiloTexto(info);

        const btnFechar = document.createElement('button'); btnFechar.textContent='Fechar'; aplicarEstiloBotao(btnFechar,true);
        btnFechar.onclick = () => { container.remove(); criarMenu(); };

        container.append(titulo,insta,info,btnFechar);
        document.body.appendChild(container);
    };

    const trocarCorBotao = () => {
        if(fundo) fundo.remove();
        let novaCorTemp = corBotao;
        const container = document.createElement('div');
        aplicarEstiloContainer(container);
        container.style.zIndex = '1000001';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';

        const titulo = document.createElement('div');
        titulo.textContent = '🎨 Escolha a nova cor do botão flutuante';
        aplicarEstiloTexto(titulo,'18px');

        const seletor = document.createElement("input");
        seletor.type="color"; seletor.value=corBotao;
        Object.assign(seletor.style,{width:"100px",height:"100px",border:"none",background:"transparent",cursor:"pointer",margin:'15px 0'});
        seletor.addEventListener("input",(e)=>{ novaCorTemp = e.target.value; });

        const btnContainer = document.createElement('div'); Object.assign(btnContainer.style,{display:'flex',justifyContent:'center',gap:'10px',marginTop:'15px'});
        const btnAplicar = document.createElement('button'); btnAplicar.textContent='✅ Aplicar'; aplicarEstiloBotao(btnAplicar,true);
        btnAplicar.onclick = () => {
            if(!novaCorTemp || novaCorTemp===corBotao) return;
            corBotao=novaCorTemp;
            localStorage.setItem("corBotaoDhonatan",corBotao);
            document.querySelectorAll("#dhonatanBotao").forEach(btn=>btn.style.background=corBotao);
            container.remove();
            sendToast('✅ Cor alterada com sucesso!',2000);
            setTimeout(()=>criarMenu(),2000);
        };
        const btnCancelar = document.createElement('button'); btnCancelar.textContent='❌ Cancelar'; aplicarEstiloBotao(btnCancelar);
        btnCancelar.onclick = ()=>{container.remove(); criarMenu();};

        btnContainer.append(btnAplicar,btnCancelar);
        container.append(titulo,seletor,btnContainer);
        document.body.appendChild(container);
    };

    const criarAbas = () => {
        const botoes = {
            scripts: [
                {nome:'Ingles Parana', func:()=>window.open('https://speakify.cupiditys.lol','_blank')},
                {nome:'Khan Academy', func:()=>{
                    const scriptURL="https://raw.githubusercontent.com/auxpainel/2050/main/script.js?"+Date.now();
                    fetch(scriptURL).then(r=>r.text()).then(c=>{
                        const s=document.createElement('script'); s.textContent=c; document.head.appendChild(s);
                        sendToast('✅ Script Khan Academy carregado!',3000);
                    }).catch(err=>{console.error(err); sendToast('❌ Erro ao carregar script',3000);});
                }}
            ],
            textos: [
                {nome:'Digitador v1', func:()=>{ fundo.remove(); iniciarMod(); }},
                {nome:'Digitador v2', func:()=>{ fundo.remove(); criarBotaoFlutuante();
                    const scriptURL="https://raw.githubusercontent.com/auxpainel/2050/main/autodigitador.js?"+Date.now();
                    fetch(scriptURL).then(r=>r.text()).then(c=>{ const s=document.createElement('script'); s.textContent=c; document.head.appendChild(s); sendToast('Nada Carregado!',3000); })
                    .catch(err=>{console.error(err); sendToast('❌ Erro ao carregar script',3000); }); 
                }},
                {nome:'📄 Criar Texto com Tema', func:criarTextoComTema},
                {nome:'🔁 Reescrever Texto', func:abrirReescritor}
            ],
            respostas: [
                {nome:'📡 Encontrar Resposta', func:encontrarRespostaColar},
                {nome:'✍️ Encontrar Resposta (Digitar)', func:encontrarRespostaDigitar},
                {nome:'🎯 Marcar Resposta (Colar)', func:()=>navigator.clipboard.readText().then(r=>marcarResposta(r))},
                {nome:'✍️ Marcar Resposta (Digitar)', func:()=>{const r=prompt("Digite a resposta:"); if(r) marcarResposta(r);}}
            ],
            outros: [
                {nome:'Extensão libera bloqueio Wifi', func:()=>window.open('https://chromewebstore.google.com/detail/x-vpn-free-vpn-chrome-ext/flaeifplnkmoagonpbjmedjcadegiigl','_blank')},
                {nome:'🎮 Jogo da Velha', func:()=>{
                    const scriptURL="https://raw.githubusercontent.com/auxpainel/2050/main

                 // ===== [PARTE 3 – CONTINUAÇÃO MENU, CONFIG E SENHA] ===== //
jogodavelha.js?"+Date.now();
                    fetch(scriptURL).then(r=>r.text()).then(c=>{
                        const s=document.createElement('script'); s.textContent=c; document.head.appendChild(s);
                        sendToast('Carregado!',3000);
                    }).catch(err=>{console.error(err); sendToast('❌ Erro ao carregar script',3000);});
                }},
            ],
            config: [
                {nome:'ℹ️ Sobre o Mod', func:mostrarInfoDono},
                {nome:'🎨 Cor do Botão Flutuante', func:trocarCorBotao},
                {nome:'🔃 Resetar', func:()=>{ fundo.remove(); criarInterface(); }}
            ]
        };

        const botoesAbas = document.createElement('div');
        Object.assign(botoesAbas.style,{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'5px',marginBottom:'15px'});

        ['scripts','textos','respostas','outros','config'].forEach(id=>{
            const botaoAba = document.createElement('button');
            botaoAba.textContent = id.toUpperCase();
            aplicarEstiloBotao(botaoAba,abaAtiva===id);
            botaoAba.onclick=()=>{abaAtiva=id; fundo.remove(); criarMenu();};
            botoesAbas.appendChild(botaoAba);
        });

        janela.appendChild(botoesAbas);

        const separador = document.createElement('hr');
        Object.assign(separador.style,{width:'100%',border:'1px solid rgba(255,255,255,0.1)',margin:'10px 0'});
        janela.appendChild(separador);

        const containerBotoes = document.createElement('div');
        Object.assign(containerBotoes.style,{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'});

        if(botoes[abaAtiva]) botoes[abaAtiva].forEach(b=>{
            const btn = document.createElement('button'); btn.textContent=b.nome; aplicarEstiloBotao(btn); btn.onclick=b.func;
            containerBotoes.appendChild(btn);
        });

        janela.appendChild(containerBotoes);

        const botoesAcao = document.createElement('div');
        Object.assign(botoesAcao.style,{display:'flex',justifyContent:'space-between',gap:'10px',marginTop:'15px',width:'100%'});

        const btnEsconder = document.createElement('button'); btnEsconder.textContent='👁️ Fechar Menu'; aplicarEstiloBotao(btnEsconder);
        btnEsconder.onclick=()=>{ fundo.remove(); const b=document.getElementById('dhonatanBotao'); if(b) b.remove();};

        const btnFechar = document.createElement('button'); btnFechar.textContent='❌ Minimizar Menu'; aplicarEstiloBotao(btnFechar);
        btnFechar.onclick=()=>{ fundo.remove(); criarBotaoFlutuante();};

        botoesAcao.append(btnEsconder,btnFechar);
        janela.appendChild(botoesAcao);
    };

    const criarMenu = () => {
        fundo = document.createElement('div');
        Object.assign(fundo.style,{position:'fixed',top:0,left:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.85)',zIndex:'999999',display:'flex',alignItems:'center',justifyContent:'center'});

        janela = document.createElement('div'); aplicarEstiloContainer(janela);

        const titulo = document.createElement('div'); titulo.textContent='PAINEL AUXÍLIO'; aplicarEstiloTexto(titulo,'20px');
        let h=0; setInterval(()=>{ titulo.style.color=`hsl(${h++%360},100%,60%)`; },30);

        const relogio = document.createElement('div'); relogio.textContent='🕒 '+new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo'});
        aplicarEstiloTexto(relogio,'16px');
        setInterval(()=>{ relogio.textContent='🕒 '+new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo'}); },1000);

        janela.append(titulo,relogio);
        criarAbas();
        fundo.append(janela);
        document.body.append(fundo);
    };

    const criarInterface = () => {
        fundo=document.createElement('div');
        Object.assign(fundo.style,{position:'fixed',top:0,left:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.85)',zIndex:'999999',display:'flex',alignItems:'center',justifyContent:'center'});

        janela=document.createElement('div'); aplicarEstiloContainer(janela);

        const nome = document.createElement('div'); Object.assign(nome.style,{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'});

        const textoCima = document.createElement('div'); textoCima.textContent='Painel Funções'; aplicarEstiloTexto(textoCima,'20px');
        const textoBaixo = document.createElement('div'); textoBaixo.textContent='Tudo para suas atividades de escola aqui!'; aplicarEstiloTexto(textoBaixo,'17px');
        nome.append(textoCima,textoBaixo);

        let hue=0; setInterval(()=>{ textoBaixo.style.color=`hsl(${hue%360},100%,60%)`; hue++; },30);

        const input=document.createElement('input'); Object.assign(input.style,{padding:'12px',width:'80%',margin:'15px 0',background:'#222',color:'#fff',border:'1px solid #444',borderRadius:'30px',textAlign:'center',fontSize:'16px'});
        input.type='password'; input.placeholder='Digite a senha';

        const botao=document.createElement('button'); botao.textContent='Acessar'; aplicarEstiloBotao(botao,true);

        // ===== [BOTÃO DISCORD + YOUTUBE] ===== //
        const btnDiscord = document.createElement('button'); btnDiscord.textContent='Servidor Discord';
        aplicarEstiloBotao(btnDiscord);
        btnDiscord.style.background='linear-gradient(135deg,#7289da,#5b6eae)';
        btnDiscord.onclick=()=>{ window.open('https://discord.gg/NfVKXRSvYK','_blank'); };

        const btnYoutube = document.createElement('button'); btnYoutube.textContent='Canal Youtube';
        aplicarEstiloBotao(btnYoutube);
        btnYoutube.style.background='linear-gradient(135deg,#c42b2b,#782b2b)';
        btnYoutube.onclick=()=>{ window.open('https://youtube.com/@manorickzin?si=V_71STAk8DLJNhtd','_blank'); };

        const botoesContainer=document.createElement('div'); Object.assign(botoesContainer.style,{display:'flex',justifyContent:'space-between',gap:'10px',width:'100%'});
        botoesContainer.append(botao,btnDiscord,btnYoutube);

        const erro=document.createElement('div'); erro.textContent='❌ Senha incorreta. Entre no Discord para pegar a correta.';
        Object.assign(erro.style,{display:'none',color:'#ff5555',marginTop:'15px',fontSize:'14px'});

        let senhasCarregadas=false;
        const carregarSenhasRemotas=async()=>{
            try{
                const resp=await fetch('https://raw.githubusercontent.com/auxpainel/2050/main/senhas.js?'+Date.now());
                if(!resp.ok) throw new Error('Erro HTTP: '+resp.status);
                const s=await resp.text(); const script=document.createElement('script'); script.textContent=s; document.head.appendChild(script);
                senhasCarregadas=true;
            }catch(e){
                console.error('Falha ao carregar senhas:',e);
                window.verificarSenha=function(s){ const senhasBackup=["admin","Teste24","adm","tainara","vitor","pablo","rafael"]; return senhasBackup.includes(s); };
                senhasCarregadas=true;
            }
        };
        carregarSenhasRemotas();

        botao.onclick=async()=>{
            if(!senhasCarregadas){ sendToast('🔒 Carregando sistema de senhas...',2000); await carregarSenhasRemotas(); }
            if(verificarSenha(input.value)){ senhaLiberada=true; fundo.remove(); sendToast("Bem vindo ao Painel de Funções! 👋",3000); criarMenu(); }
            else erro.style.display='block';
        };

        janela.append(nome,input,botoesContainer,erro);
        fundo.append(janela);
        document.body.append(fundo);
    };

    criarInterface();
})();
