/* ==========================================
   CONFIGURAÇÕES POR DIFICULDADE
   ========================================== */
const CONFIG = {
    facil:   { tempo: 60, penalStatus: 8,  penalPts: 5,  parcialStatus: 2, nome: 'Fácil',   cor: '#00ffcc' },
    medio:   { tempo: 45, penalStatus: 15, penalPts: 10, parcialStatus: 5, nome: 'Médio',   cor: '#fbbf24' },
    dificil: { tempo: 25, penalStatus: 22, penalPts: 15, parcialStatus: 8, nome: 'Difícil', cor: '#f87171' }
};

/* ==========================================
   ESTADO GLOBAL DO JOGO
   ========================================== */
const state = {
    rodadaAtual: 1,
    maxRodadas: 15,
    pontuacao: 0,
    statusLevel: 100,
    combo: 0,
    maxCombo: 0,
    acertos: 0,
    parciais: 0,
    erros: 0,
    eventosSofridos: 0,
    dificuldade: 'medio',
    timerInterval: null,
    timerLeft: 45,
    timerMax: 45,
    desafiosUsados: [],
    eventosUsados: [],
    desafioAtual: null,
    bonosAtivos: {
        escudoCrise: false,          // supervivente: bloqueia colapso 1x
        proximoErroProtegido: false, // otif: próximo erro sem penalidade
        eventoHalfImpact: false,     // crossdocking: próximo evento negativo -50%
    }
};

/* ==========================================
   FLUXO DE TELAS
   ========================================== */

function startRules() {
    document.getElementById('screen-start').style.display = 'none';
    document.getElementById('screen-rules').style.display = 'flex';
}

function setDificuldade(nivel) {
    state.dificuldade = nivel;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('diff-' + nivel).classList.add('active');
}

function initGame() {
    document.getElementById('screen-rules').style.display = 'none';
    document.getElementById('screen-game').style.display = 'flex';

    const cfg = CONFIG[state.dificuldade];

    // Reset completo do estado
    state.rodadaAtual = 1;
    state.pontuacao = 0;
    state.statusLevel = 100;
    state.combo = 0;
    state.maxCombo = 0;
    state.acertos = 0;
    state.parciais = 0;
    state.erros = 0;
    state.eventosSofridos = 0;
    state.timerMax = cfg.tempo;
    state.timerLeft = cfg.tempo;
    state.desafiosUsados = [];
    state.eventosUsados = [];
    state.bonosAtivos = { escudoCrise: false, proximoErroProtegido: false, eventoHalfImpact: false };

    // Reset conquistas
    conquistas.forEach(c => { c.liberada = false; });

    // Badge de dificuldade no header
    const badge = document.getElementById('header-difficulty-badge');
    badge.textContent = cfg.nome.toUpperCase();
    badge.style.borderColor = cfg.cor;
    badge.style.color = cfg.cor;
    badge.style.display = 'flex';

    // Esconder indicador de combo
    document.getElementById('combo-indicator').style.display = 'none';

    renderizarConquistas();
    buildRoundProgress();
    updateHUD();
    loadChallengeCard();
}

/* ==========================================
   BARRA DE PROGRESSO DAS RODADAS
   ========================================== */

function buildRoundProgress() {
    const container = document.getElementById('round-progress');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= state.maxRodadas; i++) {
        const dot = document.createElement('span');
        dot.className = 'round-dot';
        dot.id = 'rdot-' + i;
        // Rodadas 3, 6, 9, 12 são eventos
        if (i % 3 === 0 && i < state.maxRodadas) {
            dot.classList.add('event-dot');
            dot.title = 'Evento de Mercado';
        }
        container.appendChild(dot);
    }
    updateRoundProgress();
}

function updateRoundProgress() {
    for (let i = 1; i <= state.maxRodadas; i++) {
        const dot = document.getElementById('rdot-' + i);
        if (!dot) continue;
        dot.classList.remove('current', 'done');
        if (i < state.rodadaAtual) dot.classList.add('done');
        if (i === state.rodadaAtual) dot.classList.add('current');
    }
}

/* ==========================================
   SISTEMA DE TIMER
   ========================================== */

function startTimer() {
    stopTimer();
    state.timerLeft = state.timerMax;
    updateTimerUI();

    state.timerInterval = setInterval(() => {
        state.timerLeft--;
        updateTimerUI();
        if (state.timerLeft <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimerUI() {
    const pct = (state.timerLeft / state.timerMax) * 100;
    const timerText = document.getElementById('timer-text');
    const timerFill = document.getElementById('timer-svg-fill');
    const timerDisplay = document.getElementById('timer-display');
    if (!timerText) return;

    timerText.textContent = state.timerLeft;

    // Atualiza círculo SVG: stroke-dasharray de 100 representa 100%
    timerFill.setAttribute('stroke-dasharray', `${pct.toFixed(1)}, 100`);

    // Muda cor conforme o tempo restante
    timerDisplay.classList.remove('timer-warning', 'timer-critical');
    if (state.timerLeft <= 5) {
        timerFill.style.stroke = '#f87171';
        timerDisplay.classList.add('timer-critical');
    } else if (state.timerLeft <= Math.floor(state.timerMax * 0.35)) {
        timerFill.style.stroke = '#fbbf24';
        timerDisplay.classList.add('timer-warning');
    } else {
        timerFill.style.stroke = '#00ffcc';
    }
}

function handleTimeout() {
    // Penalidade de tempo esgotado (menos severa que errar)
    const botoes = document.querySelectorAll('.option-btn');
    botoes.forEach(b => b.style.pointerEvents = 'none');

    state.pontuacao -= 5;
    state.statusLevel -= 8;
    state.erros++;
    state.combo = 0;

    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.className = 'feedback-box incorrect';
    feedbackBox.innerHTML = `<strong>⏰ Tempo Esgotado!</strong><br>Você não tomou uma decisão a tempo. Em um CD real, a indecisão gera paradas de linha e custos extras. <span style="color:var(--danger-color)">-5 pts</span>`;

    document.getElementById('feedback-container').style.display = 'block';
    document.getElementById('btn-next').style.display = 'block';

    showPtsAnimation(-5);
    updateComboUI();
    updateHUD();
    checkGameOver();
}

/* ==========================================
   MOTOR DO JOGO - CARTAS
   ========================================== */

function getDesafioAleatorio() {
    const disponiveis = cartasDesafio.filter(c => !state.desafiosUsados.includes(c.id));
    if (disponiveis.length === 0) return null;
    const idx = Math.floor(Math.random() * disponiveis.length);
    const escolhido = disponiveis[idx];
    state.desafiosUsados.push(escolhido.id);
    return escolhido;
}

function loadChallengeCard() {
    state.desafioAtual = getDesafioAleatorio();
    if (!state.desafioAtual) { endGame(); return; }

    const cardEl = document.getElementById('challenge-card');
    cardEl.classList.remove('flip-in');
    void cardEl.offsetWidth; // Força reflow para reiniciar animação
    cardEl.classList.add('flip-in');

    document.getElementById('card-category').innerText = state.desafioAtual.categoria;
    document.getElementById('card-ticket').innerText = state.desafioAtual.ticket;
    document.getElementById('card-title').innerText = state.desafioAtual.titulo;
    document.getElementById('card-context').innerText = state.desafioAtual.contexto;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    state.desafioAtual.opcoes.forEach(opcao => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${opcao.letra}</span><span class="option-text">${opcao.texto}</span>`;
        btn.onclick = () => selectOption(opcao, btn);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('pts-animation').textContent = '';
    document.getElementById('pts-animation').className = 'pts-animation';

    updateRoundProgress();
    startTimer();
}

/* ==========================================
   SELEÇÃO DE OPÇÃO E SISTEMA DE PONTUAÇÃO
   ========================================== */

function selectOption(opcaoEscolhida, btnElement) {
    stopTimer();

    // Desabilita todos os botões
    document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');

    const cfg = CONFIG[state.dificuldade];
    const respondeuRapido = state.timerLeft > (state.timerMax * 0.5);

    // Verificar benefício de picking para limiares de combo
    const conquPicking = conquistas.find(c => c.id === 'picking' && c.liberada);
    const limiarCombo1 = conquPicking ? 2 : 3; // Mínimo de acertos para primeiro bônus
    const limiarCombo2 = conquPicking ? 4 : 5; // Mínimo para bônus épico

    let classeResult = '';
    let iconResult = '';
    let ptsDelta = 0;
    let feedbackExtras = [];

    if (opcaoEscolhida.peso === 'correta') {
        // --- Pontuação base ---
        let ptsBase = 10;

        // Bônus por categoria de conquista
        const bonusCategoria = calcularBonusCategoria(state.desafioAtual.categoria);
        if (bonusCategoria.valor > 0) {
            ptsBase += bonusCategoria.valor;
            feedbackExtras.push(`🏅 ${bonusCategoria.medalha}: +${bonusCategoria.valor} pts de bônus!`);
        }

        // Bônus de velocidade (respondeu na primeira metade do tempo)
        let ptsVelocidade = 0;
        if (respondeuRapido) {
            ptsVelocidade = 3;
            feedbackExtras.push(`⚡ Bônus de Velocidade: +${ptsVelocidade} pts`);
        }

        // Sistema de Combo
        state.combo++;
        state.maxCombo = Math.max(state.maxCombo, state.combo);
        let ptsCombo = 0;

        if (state.combo >= limiarCombo2) {
            ptsCombo = 5;
            feedbackExtras.push(`🔥 COMBO ÉPICO x${state.combo}: +${ptsCombo} pts!`);
        } else if (state.combo >= limiarCombo1) {
            ptsCombo = 2;
            feedbackExtras.push(`🔥 COMBO x${state.combo}: +${ptsCombo} pts!`);
        }

        // Auditor Rigoroso: +1 pt extra por combo ativo
        const conquRotativo = conquistas.find(c => c.id === 'rotativo' && c.liberada);
        if (conquRotativo && state.combo >= 2) {
            ptsCombo += 1;
            feedbackExtras.push(`🔍 Auditor Rigoroso: +1 pt extra por combo!`);
        }

        ptsDelta = ptsBase + ptsVelocidade + ptsCombo;
        state.acertos++;
        classeResult = 'correct';
        iconResult = '✅';

        checkConquista(state.desafioAtual.id);

    } else if (opcaoEscolhida.peso === 'parcial') {
        ptsDelta = 5;

        // Pioneiro da Reversa: parcial não drena status
        const conquReversa = conquistas.find(c => c.id === 'reversa' && c.liberada);
        if (conquReversa) {
            feedbackExtras.push(`♻️ Pioneiro da Reversa: Status protegido!`);
        } else {
            state.statusLevel -= cfg.parcialStatus;
            feedbackExtras.push(`⚠️ Status: -${cfg.parcialStatus}%`);
        }

        state.combo = 0;
        state.parciais++;
        classeResult = 'partial';
        iconResult = '⚠️';

    } else {
        // Resposta incorreta
        if (state.bonosAtivos.proximoErroProtegido) {
            // Foco no Cliente: absorve o próximo erro
            ptsDelta = 0;
            state.bonosAtivos.proximoErroProtegido = false;
            feedbackExtras.push(`🎯 Foco no Cliente: erro absorvido! Sem penalidade.`);
        } else {
            // Verificar redução de penalidade por categoria
            const reducao = calcularReducaoPenalidade(state.desafioAtual.categoria);
            if (reducao.ativo) {
                ptsDelta = -reducao.valor;
                state.statusLevel -= Math.floor(cfg.penalStatus / 2);
                feedbackExtras.push(`🏅 ${reducao.medalha}: penalidade reduzida para ${reducao.valor} pts!`);
            } else {
                ptsDelta = -cfg.penalPts;
                state.statusLevel -= cfg.penalStatus;
            }
        }

        state.combo = 0;
        state.erros++;
        classeResult = 'incorrect';
        iconResult = '❌';
    }

    state.pontuacao += ptsDelta;

    // Aplicar resultado visual na opção escolhida
    btnElement.classList.add(classeResult);

    // Destacar a opção correta quando errar
    if (classeResult === 'incorrect' || classeResult === 'partial') {
        document.querySelectorAll('.option-btn').forEach(btn => {
            const letra = btn.querySelector('.option-letter').textContent;
            const opcao = state.desafioAtual.opcoes.find(o => o.letra === letra);
            if (opcao && opcao.peso === 'correta') {
                btn.classList.add('highlight-correct');
            }
        });
    }

    // Construir feedback
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.className = 'feedback-box ' + classeResult;
    let extrasHtml = feedbackExtras.map(e => `<div class="feedback-extra">${e}</div>`).join('');
    feedbackBox.innerHTML = `<strong>${iconResult} Análise da Decisão:</strong><br>${opcaoEscolhida.feedback}${extrasHtml ? '<div class="feedback-extras-box">' + extrasHtml + '</div>' : ''}`;

    document.getElementById('feedback-container').style.display = 'block';
    document.getElementById('btn-next').style.display = 'block';

    showPtsAnimation(ptsDelta);
    updateComboUI();
    updateHUD();
    checkGameOver();
}

/* ==========================================
   CÁLCULO DE BÔNUS POR CATEGORIA
   ========================================== */

function calcularBonusCategoria(categoria) {
    // Busca conquistase do tipo bonus_categoria que correspondem à categoria atual
    for (const c of conquistas) {
        if (c.liberada && c.beneficioTipo === 'bonus_categoria' && c.beneficioCategoria === categoria) {
            return { valor: c.beneficioValor, medalha: c.nome };
        }
    }
    return { valor: 0, medalha: '' };
}

function calcularReducaoPenalidade(categoria) {
    for (const c of conquistas) {
        if (c.liberada && c.beneficioTipo === 'reducao_pena_categoria' && c.beneficioCategoria === categoria) {
            return { ativo: true, valor: c.beneficioValor, medalha: c.nome };
        }
    }
    return { ativo: false, valor: 0, medalha: '' };
}

/* ==========================================
   SISTEMA DE COMBO
   ========================================== */

function updateComboUI() {
    const indicator = document.getElementById('combo-indicator');
    const comboCount = document.getElementById('combo-count');

    if (state.combo >= 2) {
        comboCount.textContent = state.combo;
        indicator.style.display = 'flex';
        indicator.classList.remove('combo-pulse');
        void indicator.offsetWidth;
        indicator.classList.add('combo-pulse');
    } else {
        indicator.style.display = 'none';
    }
}

/* ==========================================
   ANIMAÇÃO DE PONTOS FLUTUANTES
   ========================================== */

function showPtsAnimation(pts) {
    const el = document.getElementById('pts-animation');
    const isPos = pts > 0;
    const isNeutro = pts === 0;
    el.textContent = (isPos ? '+' : '') + pts + ' pts';
    el.className = 'pts-animation ' + (isNeutro ? 'neutral' : isPos ? 'positive' : 'negative');
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'ptsFloat 1.8s ease-out forwards';
}

/* ==========================================
   HUD (HEADS-UP DISPLAY)
   ========================================== */

function updateHUD() {
    document.getElementById('hud-round').innerText = `${state.rodadaAtual} / ${state.maxRodadas}`;
    document.getElementById('hud-score').innerText = state.pontuacao;

    if (state.statusLevel > 100) state.statusLevel = 100;
    if (state.statusLevel < 0) state.statusLevel = 0;

    const barFill = document.getElementById('status-bar-fill');
    const statusText = document.getElementById('hud-status');

    barFill.style.width = state.statusLevel + '%';

    if (state.statusLevel >= 70) {
        barFill.style.background = 'linear-gradient(90deg, #00d4aa, #00ffcc)';
        statusText.innerText = 'Excelente';
        statusText.style.color = 'var(--accent-color)';
    } else if (state.statusLevel >= 40) {
        barFill.style.background = 'linear-gradient(90deg, #d97706, #fbbf24)';
        statusText.innerText = 'Em Risco';
        statusText.style.color = 'var(--warning-color)';
    } else {
        barFill.style.background = 'linear-gradient(90deg, #dc2626, #f87171)';
        statusText.innerText = '⚠ CRÍTICO';
        statusText.style.color = 'var(--danger-color)';
    }
}

/* ==========================================
   PRÓXIMA RODADA
   ========================================== */

function nextRound() {
    // Eventos ocorrem após as rodadas 3, 6, 9 e 12
    if (state.rodadaAtual % 3 === 0 && state.rodadaAtual < state.maxRodadas) {
        triggerEvent();
        return;
    }

    state.rodadaAtual++;

    if (state.rodadaAtual > state.maxRodadas) {
        endGame();
    } else {
        updateHUD();
        loadChallengeCard();
    }
}

/* ==========================================
   SISTEMA DE EVENTOS DE MERCADO
   ========================================== */

function getEventoAleatorio() {
    const disponiveis = cartasEvento.filter(c => !state.eventosUsados.includes(c.id));
    if (disponiveis.length === 0) return null;
    const idx = Math.floor(Math.random() * disponiveis.length);
    const escolhido = disponiveis[idx];
    state.eventosUsados.push(escolhido.id);
    return escolhido;
}

function triggerEvent() {
    const evento = getEventoAleatorio();
    state.eventosSofridos++;

    if (!evento) {
        state.rodadaAtual++;
        loadChallengeCard();
        return;
    }

    let pontosEvento = evento.pontos;
    let shieldMsg = '';

    // Cross-Docking: próximo evento negativo tem impacto -50%
    if (pontosEvento < 0 && state.bonosAtivos.eventoHalfImpact) {
        pontosEvento = Math.ceil(pontosEvento / 2);
        state.bonosAtivos.eventoHalfImpact = false;
        shieldMsg = '⚡ Gênio do Cross-Docking: impacto do evento reduzido em 50%!';
    }

    // S&OP: eventos positivos valem o dobro
    const conquSop = conquistas.find(c => c.id === 'sop' && c.liberada);
    if (conquSop && pontosEvento > 0) {
        pontosEvento *= 2;
        shieldMsg = '🤝 Integrador de Cadeia: pontos do evento DOBRADOS!';
    }

    // ESG: eventos do tipo esg ganham bônus extra
    const conquEsg = conquistas.find(c => c.id === 'esg' && c.liberada);
    if (conquEsg && evento.tipo === 'esg') {
        pontosEvento += 10;
        shieldMsg += ' | 🌱 Gerente Verde: +10 pts bônus ESG!';
    }

    state.pontuacao += pontosEvento;
    if (pontosEvento < 0) {
        state.statusLevel -= 10;
    } else {
        state.statusLevel += 10;
        checkConquistaEvento();
    }

    const isPositivo = pontosEvento > 0;
    const modal = document.getElementById('event-modal');
    const eventModal = modal.querySelector('.event-modal');

    document.getElementById('event-title').innerHTML = `${isPositivo ? '🌟' : '🚨'} ${evento.nome}`;
    document.getElementById('event-desc').innerText = evento.descricao;
    document.getElementById('event-impact').innerText = '📊 ' + evento.impacto;

    const ptStr = pontosEvento > 0 ? '+' + pontosEvento : String(pontosEvento);
    document.getElementById('event-points').innerHTML = `<strong style="color:${isPositivo ? 'var(--accent-color)' : 'var(--danger-color)'}">${isPositivo ? '📈' : '📉'} ${ptStr} pontos de reputação</strong>`;

    const shieldEl = document.getElementById('event-shield-msg');
    shieldEl.style.display = shieldMsg ? 'block' : 'none';
    shieldEl.textContent = shieldMsg;

    // Ajusta estilo do modal pelo tipo do evento
    eventModal.style.borderColor = isPositivo ? 'var(--accent-color)' : 'var(--danger-color)';
    eventModal.style.boxShadow = isPositivo
        ? '0 0 50px rgba(0,255,204,0.25)'
        : '0 0 50px rgba(248,113,113,0.25)';

    updateHUD();
    modal.style.display = 'flex';
}

function closeEventModal() {
    document.getElementById('event-modal').style.display = 'none';
    state.rodadaAtual++;

    if (checkGameOver()) return;
    if (state.rodadaAtual > state.maxRodadas) {
        endGame();
    } else {
        updateHUD();
        loadChallengeCard();
    }
}

/* ==========================================
   SISTEMA DE CONQUISTAS
   ========================================== */

const mapeamentoConquistas = {
    1: 'curva_abc', 2: 'fefo', 3: 'crossdocking', 4: 'hibrido', 5: 'agendamento',
    6: 'rotativo', 7: 'roteirizador', 8: 'reversa', 9: 'uflow', 10: 'otif',
    11: 'sop', 12: 'picking', 13: 'esg', 14: 'vmi', 15: 'seguranca'
};

function checkConquista(desafioId) {
    const idConquista = mapeamentoConquistas[desafioId];
    if (!idConquista) return;
    const conquista = conquistas.find(c => c.id === idConquista);
    if (conquista && !conquista.liberada) {
        conquista.liberada = true;
        aplicarBeneficioConquista(conquista);
        renderizarConquistas();
        showAchievementNotification(conquista);
    }
}

function checkConquistaEvento() {
    // Supervivente: desbloqueado ao sobreviver a evento com status > 50%
    if (state.statusLevel > 50) {
        const escudo = conquistas.find(c => c.id === 'supervivente');
        if (escudo && !escudo.liberada) {
            escudo.liberada = true;
            aplicarBeneficioConquista(escudo);
            renderizarConquistas();
            showAchievementNotification(escudo);
        }
    }
}

function aplicarBeneficioConquista(conquista) {
    switch (conquista.id) {
        case 'agendamento':
            state.statusLevel = Math.min(100, state.statusLevel + 10);
            showToast('📅 Organizador de Pátio: Status +10%!', 'success');
            updateHUD();
            break;
        case 'uflow':
            state.statusLevel = Math.min(100, state.statusLevel + 15);
            showToast('📐 Projetista de Layout: Status +15%!', 'success');
            updateHUD();
            break;
        case 'seguranca':
            state.statusLevel = Math.min(100, state.statusLevel + 20);
            showToast('🛡️ Líder Humanitário: Status +20%!', 'success');
            updateHUD();
            break;
        case 'crossdocking':
            state.bonosAtivos.eventoHalfImpact = true;
            showToast('⚡ Cross-Docking: próximo evento negativo reduzido 50%!', 'success');
            break;
        case 'otif':
            state.bonosAtivos.proximoErroProtegido = true;
            showToast('🎯 Foco no Cliente: próximo erro sem penalidade!', 'success');
            break;
        case 'roteirizador':
            state.timerMax = Math.min(state.timerMax + 10, 99);
            showToast('🗺️ Navegador Eficiente: +10s por rodada!', 'success');
            break;
        case 'supervivente':
            state.bonosAtivos.escudoCrise = true;
            showToast('🔰 Escudo Anti-Crise ATIVADO! Colapso bloqueado uma vez!', 'success');
            break;
    }
}

/* ==========================================
   RENDERIZAÇÃO DAS CONQUISTAS
   ========================================== */

function renderizarConquistas() {
    const container = document.getElementById('achievements-grid');
    if (!container) return;
    container.innerHTML = '';

    conquistas.forEach(c => {
        const el = document.createElement('div');
        el.className = 'achievement-badge ' + (c.liberada ? 'unlocked' : '');
        el.setAttribute('title', c.liberada ? c.nome + ': ' + c.beneficio : 'Bloqueada — acerte o desafio para desbloquear!');
        el.onclick = () => showMedalDetail(c);
        el.innerHTML = `
            <div class="badge-icon">${c.icon}</div>
            <div class="badge-name">${c.nome}</div>
            ${c.liberada ? '<div class="badge-unlocked-dot"></div>' : '<div class="badge-lock">🔒</div>'}
        `;
        container.appendChild(el);
    });
}

/* ==========================================
   MODAL DE DETALHES DA MEDALHA
   ========================================== */

function showMedalDetail(conquista) {
    document.getElementById('medal-detail-icon').textContent = conquista.icon;
    document.getElementById('medal-detail-name').textContent = conquista.nome;
    document.getElementById('medal-detail-desc').textContent = conquista.desc;
    document.getElementById('medal-benefit-text').textContent = conquista.beneficio;

    const statusEl = document.getElementById('medal-detail-status');
    if (conquista.liberada) {
        statusEl.textContent = '✅ DESBLOQUEADA — Bônus Ativo!';
        statusEl.className = 'medal-detail-status unlocked';
    } else {
        statusEl.textContent = '🔒 BLOQUEADA';
        statusEl.className = 'medal-detail-status locked';
    }

    document.getElementById('medal-modal').style.display = 'flex';
}

function closeMedalModal(e) {
    if (e.target.id === 'medal-modal') {
        document.getElementById('medal-modal').style.display = 'none';
    }
}

/* ==========================================
   SISTEMA DE TOASTS E NOTIFICAÇÕES
   ========================================== */

function showAchievementNotification(conquista) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-achievement';
    toast.innerHTML = `
        <div class="toast-icon">${conquista.icon}</div>
        <div class="toast-body">
            <div class="toast-tag">🏅 Medalha Desbloqueada!</div>
            <div class="toast-title">${conquista.nome}</div>
            <div class="toast-sub">${conquista.beneficio}</div>
        </div>
    `;
    document.body.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('toast-show');

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

function showToast(mensagem, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `<div class="toast-body"><div class="toast-title">${mensagem}</div></div>`;
    document.body.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('toast-show');

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}

/* ==========================================
   VERIFICAÇÃO DE FIM DE JOGO
   ========================================== */

function checkGameOver() {
    if (state.statusLevel <= 0) {
        // Escudo Anti-Crise bloqueia o colapso uma vez
        if (state.bonosAtivos.escudoCrise) {
            state.bonosAtivos.escudoCrise = false;
            state.statusLevel = 12;
            showToast('🔰 ESCUDO ANTI-CRISE ATIVADO! Colapso evitado na última hora!', 'success');
            updateHUD();
            return false;
        }
        endGame(true);
        return true;
    }
    return false;
}

/* ==========================================
   TELA DE RESULTADO FINAL
   ========================================== */

function endGame(falhaCritica = false) {
    stopTimer();
    document.getElementById('screen-game').style.display = 'none';
    document.getElementById('screen-result').style.display = 'flex';

    const medalhasGanhas = conquistas.filter(c => c.liberada);
    const taxaAcerto = state.acertos + state.parciais + state.erros > 0
        ? Math.round((state.acertos / (state.acertos + state.parciais + state.erros)) * 100)
        : 0;

    // Preencher estatísticas
    document.getElementById('stat-acertos').textContent = state.acertos;
    document.getElementById('stat-parciais').textContent = state.parciais;
    document.getElementById('stat-erros').textContent = state.erros;
    document.getElementById('stat-combo').textContent = state.maxCombo + 'x';
    document.getElementById('stat-medals').textContent = medalhasGanhas.length + '/16';
    document.getElementById('stat-events').textContent = state.eventosSofridos;
    document.getElementById('stat-taxa').textContent = taxaAcerto + '%';
    document.getElementById('stat-status').textContent = state.statusLevel + '%';
    document.getElementById('final-score').textContent = state.pontuacao + ' pts';

    // Renderizar medalhas conquistadas
    const resultMedals = document.getElementById('result-medals');
    resultMedals.innerHTML = '';
    if (medalhasGanhas.length > 0) {
        resultMedals.innerHTML = `<p class="medals-title">Medalhas Conquistadas (${medalhasGanhas.length})</p>`;
        const grid = document.createElement('div');
        grid.className = 'result-medals-grid';
        medalhasGanhas.forEach(m => {
            const span = document.createElement('span');
            span.className = 'result-medal-badge';
            span.title = m.nome + ': ' + m.beneficio;
            span.textContent = m.icon;
            grid.appendChild(span);
        });
        resultMedals.appendChild(grid);
    }

    // Classificação final
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    const resultClassification = document.getElementById('result-classification');

    if (falhaCritica) {
        resultTitle.innerText = '💀 COLAPSO OPERACIONAL';
        resultTitle.style.color = 'var(--danger-color)';
        resultDesc.innerText = 'O Centro de Distribuição entrou em falência operacional. O conselho de administração rescindiu seu contrato imediatamente. A operação precisará de reestruturação completa.';
        resultClassification.textContent = '📦 Auxiliar Logístico em Formação';
        resultClassification.style.color = 'var(--danger-color)';
    } else if (state.pontuacao >= 140 && state.statusLevel >= 80) {
        resultTitle.innerText = '🏆 DIRETOR GLOBAL DE SUPPLY CHAIN!';
        resultTitle.style.color = 'var(--accent-color)';
        resultDesc.innerText = 'Performance excepcional em todos os indicadores. A diretoria executiva lhe ofereceu o mais alto posto da cadeia logística global. Um domínio técnico e estratégico raramente visto.';
        resultClassification.textContent = '🚀 Mestre da Logística — Nível Executivo';
        resultClassification.style.color = 'var(--accent-color)';
    } else if (state.pontuacao >= 100) {
        resultTitle.innerText = '📊 GESTOR DE EXCELÊNCIA';
        resultTitle.style.color = 'var(--accent-color)';
        resultDesc.innerText = 'Sólido domínio dos conceitos logísticos. A operação foi conduzida com eficiência acima da média de mercado. Você está no caminho certo para o topo.';
        resultClassification.textContent = '📊 Analista Sênior de Logística';
        resultClassification.style.color = 'var(--accent-color)';
    } else if (state.pontuacao >= 60) {
        resultTitle.innerText = '⚙️ GESTÃO ESTÁVEL';
        resultTitle.style.color = 'var(--warning-color)';
        resultDesc.innerText = 'Você manteve a operação funcionando com alguns gargalos identificados. Com mais experiência e aperfeiçoamento técnico, o potencial de liderança é evidente.';
        resultClassification.textContent = '⚙️ Supervisor Operacional';
        resultClassification.style.color = 'var(--warning-color)';
    } else if (state.pontuacao >= 0) {
        resultTitle.innerText = '📦 GESTÃO DEFICITÁRIA';
        resultTitle.style.color = 'var(--warning-color)';
        resultDesc.innerText = 'A operação sobreviveu, mas com resultados abaixo do esperado pelo mercado. É hora de revisar os fundamentos da logística e estratégia de decisões.';
        resultClassification.textContent = '📦 Operador Logístico';
        resultClassification.style.color = 'var(--warning-color)';
    } else {
        resultTitle.innerText = '❌ PREJUÍZO TOTAL';
        resultTitle.style.color = 'var(--danger-color)';
        resultDesc.innerText = 'Os prejuízos acumulados tornaram a operação insustentável. Um treinamento intensivo em logística empresarial será necessário antes de voltar ao posto.';
        resultClassification.textContent = '❌ Auxiliar em Recuperação';
        resultClassification.style.color = 'var(--danger-color)';
    }
}

function restartGame() {
    document.getElementById('screen-result').style.display = 'none';
    document.getElementById('header-difficulty-badge').style.display = 'none';
    document.getElementById('screen-start').style.display = 'flex';
}

/* ==========================================
   INICIALIZAÇÃO
   ========================================== */
renderizarConquistas();
