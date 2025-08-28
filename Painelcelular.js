// ===== [SISTEMA DE TOAST NOTIFICATIONS] ===== //
async function loadToastify() {
    if (typeof Toastify !== 'undefined') return Promise.resolve();

    return new Promise((resolve, reject) => {
        // Carregar CSS do Toastify
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
        document.head.appendChild(cssLink);

        // Carregar JS do Toastify
        const jsScript = document.createElement('script');
        jsScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
        jsScript.onload = resolve;
        jsScript.onerror = reject;
        document.head.appendChild(jsScript);
    });
}

async function sendToast(text, duration = 5000, gravity = 'bottom') {
    try {
        await loadToastify();
        Toastify({
            text,
            duration,
            gravity,
            position: "center",
            stopOnFocus: true,
            style: { background: "#000000" }
        }).showToast();
    } catch (error) {
        console.error('Erro ao carregar Toastify:', error);
    }
}

function showWelcomeToasts() {
    sendToast("iniciando painel");
    
    setTimeout(() => {
        sendToast("puxando dados", 2500);
    }, 1000);
    
    setTimeout(() => {
        sendToast("carregado!", 2500);
    }, 1000);
}

// ===== [CÓDIGO PRINCIPAL] ===== //
(async function(){
    // Carregar Toastify quando o script for executado
    await loadToastify();
    
    // Mostrar toasts de boas-vindas após um breve delay
    setTimeout(showWelcomeToasts, 500);
    
    let fundo, janela, nome, relogio;
    let senhaLiberada = false;
    let abaAtiva = 'textos';
    let posX = localStorage.getItem("dhonatanX") || "20px";
    let posY = localStorage.getItem("dhonatanY") || "20px";
    let corBotao = localStorage.getItem("corBotaoDhonatan") || "#0f0f0f";
    
    // Estilo moderno para todos os botões
    const aplicarEstiloBotao = (elemento, gradiente = false) => {
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
    };

    // Estilo para elementos de texto
    const aplicarEstiloTexto = (elemento, tamanho = '18px') => {
        Object.assign(elemento.style, {
            color: '#fff',
            fontSize: tamanho,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '10px 0',
            userSelect: 'none'
        });
    };

    // Estilo para container
    const aplicarEstiloContainer = (elemento) => {
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
    };

    const mostrarInfoDono = () => {
        if (fundo) fundo.remove();
        
        const container = document.createElement('div');
        aplicarEstiloContainer(container);
        container.style.zIndex = '1000001';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        
        const titulo = document.createElement('div');
        titulo.textContent = '👑';
        aplicarEstiloTexto(titulo, '20px');
        
        const insta = document.createElement('div');
        insta.textContent = 'VERSÃO 1.1';
        aplicarEstiloTexto(insta);
        
        const info = document.createElement('div');
        info.textContent = '💻 Mod exclusivo e protegido, feito para poupar seu tempo';
        aplicarEstiloTexto(info);
        
        const btnFechar = document.createElement('button');
        btnFechar.textContent = 'Fechar';
        aplicarEstiloBotao(btnFechar, true);
        btnFechar.onclick = () => {
            container.remove();
            criarMenu();
        };
        
        container.append(titulo, insta, info, btnFechar);
        document.body.appendChild(container);
    };

    const trocarCorBotao = () => {
        if (fundo) fundo.remove();
        
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
        aplicarEstiloTexto(titulo, '18px');

        const seletor = document.createElement("input");
        seletor.type = "color";
        seletor.value = corBotao;
        Object.assign(seletor.style, {
            width: "100px",
            height: "100px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            margin: '15px 0'
        });

        seletor.addEventListener("input", (e) => {
            novaCorTemp = e.target.value;
        });

        const btnContainer = document.createElement('div');
        Object.assign(btnContainer.style, {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '15px'
        });

        const btnAplicar = document.createElement('button');
        btnAplicar.textContent = '✅ Aplicar';
        aplicarEstiloBotao(btnAplicar, true);
        btnAplicar.onclick = () => {
            if (!novaCorTemp || novaCorTemp === corBotao) return;
            corBotao = novaCorTemp;
            localStorage.setItem("corBotaoDhonatan", corBotao);
            document.querySelectorAll("#dhonatanBotao").forEach(btn => {
                btn.style.background = corBotao;
            });
            container.remove();
            
            sendToast('✅ Cor alterada com sucesso!', 2000);
            setTimeout(() => criarMenu(), 2000);
        };

        const btnCancelar = document.createElement('button');
        btnCancelar.textContent = '❌ Cancelar';
        aplicarEstiloBotao(btnCancelar);
        btnCancelar.onclick = () => {
            container.remove();
            criarMenu();
        };
        
        btnContainer.append(btnAplicar, btnCancelar);
        container.append(titulo, seletor, btnContainer);
        document.body.appendChild(container);
    };

    const coletarPerguntaEAlternativas = () => {
        const perguntaEl = document.querySelector('.question-text, .question-container, [data-qa*="question"]');
        const pergunta = perguntaEl ? perguntaEl.innerText.trim() :
            (document.body.innerText.split('\n').find(t => t.includes('?') && t.length < 200) || '').trim();
        const alternativasEl = Array.from(document.querySelectorAll('[role="option"], .options div, .choice, .answer-text, label, span, p'));
        const alternativasFiltradas = alternativasEl.map(el => el.innerText.trim()).filter(txt =>
            txt.length > 20 && txt.length < 400 && !txt.includes('?') && !txt.toLowerCase().includes(pergunta.toLowerCase())
        );
        const letras = ['a', 'b', 'c', 'd', 'e', 'f'];
        const alternativas = alternativasFiltradas.map((txt, i) => `${letras[i]}) ${txt}`).join('\n');
        return { pergunta, alternativas };
    };

    const encontrarRespostaColar = () => {
        sendToast('⏳ Carregando script...', 3000);

        const scriptURL = "https://raw.githubusercontent.com/auxpainel/2050/refs/heads/main/coletarperguntaeresposta.js?" + Date.now();

        fetch(scriptURL)
            .then(response => {
                if (!response.ok) throw new Error('Falha ao carregar o script');
                return response.text();
            })
            .then(scriptContent => {
                const script = document.createElement('script');
                script.textContent = scriptContent;
                document.head.appendChild(script);
                sendToast('✅ Script carregado com sucesso!', 3000);
            })
            .catch(error => {
                console.error('Erro ao carregar script:', error);
                sendToast('❌ Erro ao carregar o script. Verifique o console.', 3000);
            });
    };

    const encontrarRespostaDigitar = () => {
        const pergunta = prompt("Digite a pergunta:");
        if (!pergunta) return;
        const promptFinal = `Responda de forma direta e clara sem ponto final: ${pergunta}`;
        window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(promptFinal)}`, "_blank");
    };

    const marcarResposta = (resposta) => {
        resposta = resposta.trim().replace(/\.+$/, '').toLowerCase();
        const alternativas = document.querySelectorAll('[role="option"], .options div, .choice, .answer-text, label, span, p');
        let marcada = false;
        alternativas.forEach(el => {
            const txt = el.innerText.trim().toLowerCase();
            if (txt.includes(resposta)) {
                el.style.backgroundColor = '#00ff00';
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                marcada = true;
            }
        });
        
        if (marcada) {
            sendToast('✅ Resposta marcada!', 2000);
        } else {
            sendToast('❌ Nenhuma correspondente encontrada.', 2000);
        }
    };

    const iniciarMod = () => {
        sendToast("✍️ Toque no campo onde deseja digitar o texto.", 3000);
        const handler = (e) => {
            e.preventDefault();
            document.removeEventListener('click', handler, true);
            const el = e.target;
            if (!(el.isContentEditable || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
                sendToast("❌ Esse não é um campo válido.", 2000);
                criarBotaoFlutuante();
                return;
            }
            const texto = prompt("📋 Cole ou digite o texto:");
            if (!texto) return criarBotaoFlutuante();

            el.focus();
            let i = 0;
            const progresso = document.createElement('div');
            Object.assign(progresso.style, {
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.8)', color: '#fff',
                padding: '10px 20px', borderRadius: '8px',
                zIndex: 9999999, fontSize: '20px'
            });
            document.body.append(progresso);

            const intervalo = setInterval(() => {
                if (i < texto.length) {
                    const c = texto[i++];
                    document.execCommand('insertText', false, c);
                    progresso.textContent = `${Math.round(i / texto.length * 100)}%`;
                } else {
                    clearInterval(intervalo);
                    progresso.remove();
                    el.blur();
                    setTimeout(() => {
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                        sendToast("✅ Texto digitado com sucesso!", 3000);
                        setTimeout(() => criarBotaoFlutuante(), 3000);
                    }, 100);
                }
            }, 40);
        };
        document.addEventListener('click', handler, true);
    };

    const criarTextoComTema = () => {
        const tema = prompt("Qual tema deseja?");
        if (!tema) return;
        const palavras = prompt("Número mínimo de palavras?");
        if (!palavras) return;
        const promptFinal = `Crie um texto com o tema "${tema}" com no mínimo ${palavras} palavras. Seja claro e criativo.`;
        const url = `https://www.perplexity.ai/search?q=${encodeURIComponent(promptFinal)}`;
        window.open(url, "_blank");
    };

    const abrirReescritor = () => {
        window.open(`https://www.reescrevertexto.net`, "_blank");
    };

    criarAbas = () => {
        const botoes = {
            scripts: [
                {
                    nome: 'Ingles Parana',
                    func: () => window.open('https://speakify.cupiditys.lol', '_blank')
                },
                {
                    nome: 'Khan Academy',
                    func: () => {
                        const scriptURL = "https://raw.githubusercontent.com/auxpainel/2050/main/script.js?" + Date.now();
                        fetch(scriptURL)
                            .then(response => response.text())
                            .then(scriptContent => {
                                const script = document.createElement('script');
                                script.textContent = scriptContent;
                                document.head.appendChild(script);
                                sendToast('✅ Script Khan Academy carregado!', 3000);
                            })
                            .catch(error => {
                                console.error('Erro ao carregar script:', error);
                                sendToast('❌ Erro ao carregar script. Verifique o console.', 3000);
                            });
                    }
                }
            ],
            textos: [
                { nome: 'Digitador v1', func: () => { fundo.remove(); iniciarMod(); } },
                {
                    nome: 'Digitador v2',
                    func: () => {
                        fundo.remove();
                        criarBotaoFlutuante();
                        const scriptURL = "https://raw.githubusercontent.com/auxpainel/2050/main/autodigitador.js?" + Date.now();
                        fetch(scriptURL)
                            .then(response => response.text())
                            .then(scriptContent => {
                                const script = document.createElement('script');
                                script.textContent = scriptContent;
                                document.head.appendChild(script);
                                sendToast('Nada Carregado!', 3000);
                            })
                            .catch(error => {
                                console.error('Erro ao carregar Kahoot script:', error);
                                sendToast('❌ Erro ao carregar o Kahoot script. Verifique o console.', 3000);
                            });
                    }
                },
                { nome: '📄 Criar Texto com Tema', func: criarTextoComTema },
                { nome: '🔁 Reescrever Texto', func: abrirReescritor }
            ],
            respostas: [
                { nome: '📡 Encontrar Resposta', func: encontrarRespostaColar },
                { nome: '✍️ Encontrar Resposta (Digitar)', func: encontrarRespostaDigitar },
                { nome: '🎯 Marcar Resposta (Colar)', func: () => navigator.clipboard.readText().then(r => marcarResposta(r)) },
                { nome: '✍️ Marcar Resposta (Digitar)', func: () => {
                    const r = prompt("Digite a resposta:");
                    if (r) marcarResposta(r);
                }}
            ],
            outros: [
                { 
                    nome: 'Extensão libera bloqueio Wifi', 
                    func: () => window.open('https://chromewebstore.google.com/detail/x-vpn-free-vpn-chrome-ext/flaeifplnkmoagonpbjmedjcadegiigl', '_blank') 
                },
                { 
                    nome: '🎮 Jogo da Velha',
                    func: () => {
                        const scriptURL = "https://raw.githubusercontent.com/auxpainel/2050/main/jogodavelha.js?" + Date.now();
                        fetch(scriptURL)
                            .then(response => response.text())
                            .then(scriptContent => {
                                const script = document.createElement('script');
                                script.textContent = scriptContent;
                                document.head.appendChild(script);
                                sendToast('Carregado!', 3000);
                            })
                            .catch(error => {
                                console.error('Erro ao carregar Kahoot script:', error);
                                sendToast('❌ Erro ao carregar o Kahoot script. Verifique o console.', 3000);
                            });
                    }
                },
            ],
            config: [
                { nome: 'ℹ️ Sobre o Mod', func: mostrarInfoDono },
                { nome: '🎨 Cor do Botão Flutuante', func: trocarCorBotao },
                { nome: '🔃 Resetar', func: () => { fundo.remove(); criarInterface(); } }
            ]
        };

        const botoesAbas = document.createElement('div');
        Object.assign(botoesAbas.style, {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '5px',
            marginBottom: '15px'
        });

        ['scripts', 'textos', 'respostas', 'outros', 'config'].forEach(id => {
            const botaoAba = document.createElement('button');
            botaoAba.textContent = id.toUpperCase();
            aplicarEstiloBotao(botaoAba, abaAtiva === id);
            botaoAba.onclick = () => {
                abaAtiva = id;
                fundo.remove();
                criarMenu();
            };
            botoesAbas.appendChild(botaoAba);
        });

        janela.appendChild(botoesAbas);

        // Linha de separação entre abas e funções
        const separador = document.createElement('hr');
        Object.assign(separador.style, {
            width: '100%',
            border: '1px solid rgba(255,255,255,0.1)',
            margin: '10px 0'
        });
        janela.appendChild(separador);

        const containerBotoes = document.createElement('div');
        Object.assign(containerBotoes.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        });

        if (botoes[abaAtiva]) {
            botoes[abaAtiva].forEach(b => {
                const btn = document.createElement('button');
                btn.textContent = b.nome;
                aplicarEstiloBotao(btn);
                btn.onclick = b.func;
                containerBotoes.appendChild(btn);
            });
        }

        janela.appendChild(containerBotoes);

        // Botões de ação no final
        const botoesAcao = document.createElement('div');
        Object.assign(botoesAcao.style, {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            marginTop: '15px',
            width: '100%'
        });

        const btnEsconder = document.createElement('button');
        btnEsconder.textContent = '👁️ Fechar Menu';
        aplicarEstiloBotao(btnEsconder);
        btnEsconder.onclick = () => {
            fundo.remove();
            const botaoFlutuante = document.getElementById('dhonatanBotao');
            if (botaoFlutuante) botaoFlutuante.remove();
        };

        const btnFechar = document.createElement('button');
        btnFechar.textContent = '❌ Minimizar Menu';
        aplicarEstiloBotao(btnFechar);
        btnFechar.onclick = () => {
            fundo.remove();
            criarBotaoFlutuante();
        };

        botoesAcao.append(btnEsconder, btnFechar);
        janela.appendChild(botoesAcao);
    };

    const criarMenu = () => {
        fundo = document.createElement('div');
        Object.assign(fundo.style, {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: '999999',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        });

        janela = document.createElement('div');
        aplicarEstiloContainer(janela);

        const titulo = document.createElement('div');
        titulo.textContent = 'PAINEL AUXÍLIO';
        aplicarEstiloTexto(titulo, '20px');

        let h = 0;
        setInterval(() => {
            titulo.style.color = `hsl(${h++ % 360},100%,60%)`;
        }, 30);

        relogio = document.createElement('div');
        relogio.textContent = '🕒 ' + new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        aplicarEstiloTexto(relogio, '16px');
        setInterval(() => {
            relogio.textContent = '🕒 ' + new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        }, 1000);

        janela.append(titulo, relogio);
        criarAbas();
        fundo.append(janela);
        document.body.append(fundo);
    };

    const criarInterface = () => {
        fundo = document.createElement('div');
        Object.assign(fundo.style, {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: '999999',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        });
        
        janela = document.createElement('div');
        aplicarEstiloContainer(janela);

        // Container principal
        nome = document.createElement('div');
        Object.assign(nome.style, {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px'
        });

        // Texto SUPERIOR
        const textoCima = document.createElement('div');
        textoCima.textContent = 'Painel Funções';
        aplicarEstiloTexto(textoCima, '20px');

        // Texto INFERIOR
        const textoBaixo = document.createElement('div');
        textoBaixo.textContent = 'tudo para suas atividades de escola aqui!';
        aplicarEstiloTexto(textoBaixo, '17px');

        // Adiciona os textos ao container
        nome.appendChild(textoCima);
        nome.appendChild(textoBaixo);

        // Animação de cores apenas no texto inferior
        let hue = 0;
        setInterval(() => {
            const corAtual = `hsl(${hue % 360}, 100%, 60%)`;
            textoBaixo.style.color = corAtual;
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
        
        // Botão do Discord
        const btnDiscord = document.createElement('button');
        btnDiscord.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" style="margin-right:8px"><path fill="currentColor" d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.566-.406.825a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.825.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.05.05 0 0 0-.028.019C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.326a.05.05 0 0 0-.02-.069.07.07 0 0 0-.041-.012 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.043c0-.003.002-.006.005-.009a.05.05 0 0 1 .015-.011c.17-.1.335-.206.495-.32.01-.008.022-.01.033-.003l.006.004c.013.008.02.022.017.035a10.2 10.2 0 0 0 3.172 1.525.05.05 0 0 0 .04-.01 7.96 7.96 0 0 0 3.07-1.525.05.05 0 0 0 .017-.035l.006-.004c.01-.007.022-.005.033.003.16.114.326.22.495.32a.05.05 0 0 1 .015.01c.003.004.005.007.005.01a.05.05 0 0 1-.02.042 8.875 8.875 0 0 1-1.248.595.05.05 0 0 0-.041.012.05.05 0 0 0-.02.07c.236.462.51.905.818 1.325a.05.05 0 0 0 .056.02 13.23 13.23 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.05.05 0 0 0-.028-.019zM5.525 9.992c-.889 0-1.613-.774-1.613-1.727 0-.953.724-1.727 1.613-1.727.89 0 1.613.774 1.613 1.727s-.723 1.727-1.613 1.727zm4.95 0c-.889 0-1.613-.774-1.613-1.727 0-.953.724-1.727 1.613-1.727.89 0 1.613.774 1.613 1.727s-.723 1.727-1.613 1.727z"/></svg> Discord';
        aplicarEstiloBotao(btnDiscord);
        btnDiscord.style.background = '#5865F2';
        btnDiscord.onclick = () => {
            window.open('https://discord.gg/NfVKXRSvYK', '_blank');
        };

        // Botão do YouTube
        const btnYouTube = document.createElement('button');
        btnYouTube.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" style="margin-right:8px"><path fill="currentColor" d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg> YouTube';
        aplicarEstiloBotao(btnYouTube);
        btnYouTube.style.background = 'linear-gradient(135deg, #c42b2b, #782b2b)';
        btnYouTube.onclick = () => {
            window.open('https://youtube.com/@manorickzin?si=V_71STAk8DLJNhtd', '_blank');
        };

        // Container para os botões
        const botoesContainer = document.createElement('div');
        Object.assign(botoesContainer.style, {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            width: '100%'
        });

        botoesContainer.append(botao, btnDiscord, btnYouTube);

        const erro = document.createElement('div');
        erro.textContent = '❌ Senha incorreta. Clique no botão do Discord para suporte.';
        Object.assign(erro.style, {
            display: 'none', 
            color: '#ff5555', 
            marginTop: '15px',
            fontSize: '14px'
        });

        // Sistema de senhas
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
                // Fallback com senhas locais
                window.verificarSenha = function(senha) {
                    const senhasBackup = [
                        "admin",
                        "Teste24",
                        "adm",
                        "tainara",
                        "vitor",
                        "pablo",
                        "rafael"
                    ];
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
                sendToast("Bem vindo ao Painel de Funções! 👋", 3000);
                criarMenu();
            } else {
                erro.style.display = 'block';
            }
        };

        janela.append(nome, input, botoesContainer, erro);
        fundo.append(janela);
        document.body.append(fundo);
    };

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

        let isDragging = false;
        let startX, startY;
        let initialX, initialY;
        let xOffset = 0, yOffset = 0;
        const DRAG_THRESHOLD = 5;

        b.addEventListener('mousedown', startDrag);
        b.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            
            startX = clientX;
            startY = clientY;
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
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (!isDragging && distance > DRAG_THRESHOLD) {
                isDragging = true;
            }
            
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
                posX = b.style.left;
                posY = b.style.top;
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

    // Iniciar o botão flutuante
    criarBotaoFlutuante();
})();
