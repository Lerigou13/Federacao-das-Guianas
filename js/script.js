document.addEventListener("DOMContentLoaded", function() {

    const navMenu = document.getElementById('main-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    window.toggleMenu = function(event) {
        if (event) event.stopPropagation();
        
        const isOpen = navMenu.classList.contains('active');

        if (!isOpen) {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava o scroll
        } else {
            fecharTudo();
        }
    };

    // 2. LÓGICA DOS DROPDOWNS (Clique em Identidade, Território, etc.)
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(drop => {
        drop.addEventListener('click', function(e) {
            // Só executa o clique se a tela for menor que 1024px (Tablet/Mobile)
            if (window.innerWidth <= 1024) {
                e.stopPropagation(); // Impede fechar o menu ao clicar no item
                
                const content = this.querySelector('.dropdown-content');
                const isOpened = content.classList.contains('show');

                // Fecha outros submenus abertos para não virar bagunça
                document.querySelectorAll('.dropdown-content').forEach(c => {
                    c.classList.remove('show');
                });

                // Se não estava aberto, abre agora
                if (!isOpened) {
                    content.classList.add('show');
                }
            }
        });
    });

    // 3. FECHAR AO CLICAR FORA
    document.addEventListener('click', function(event) {
        // Se clicar fora do menu e o menu estiver aberto, fecha tudo
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                fecharTudo();
            }
        }
    });

    // 4. FUNÇÃO AUXILIAR PARA LIMPAR TUDO
    function fecharTudo() {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Libera o scroll
        // Fecha todos os submenus abertos
        document.querySelectorAll('.dropdown-content').forEach(c => {
            c.classList.remove('show');
        });
    }

    // 5. SE REDIMENSIONAR A TELA (Evita bugs)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            fecharTudo();
        }
    });
});

const dadosCambio = {
    hoje: {
        path: "polygon(0% 100%, 0% 75%, 15% 60%, 25% 50%, 40% 85%, 55% 55%, 65% 35%, 75% 0%, 85% 15%, 92% 20%, 100% 25%, 100% 100%)",
        variacao: "▲ 1.48%",
        legendas: ["08:00", "11:00", "14:00", "17:00", "20:00"],
        preços: ["A$ 1.35", "A$ 1.36", "A$ 1.34", "A$ 1.38", "A$ 1.37"]
    },
    semana: {
        path: "polygon(0% 100%, 0% 100%, 10% 85%, 25% 66%, 40% 80%, 55% 50%, 65% 70%, 75% 33%, 85% 45%, 92% 15%, 100% 0%, 100% 100%)",
        variacao: "▲ 4.58%",
        legendas: ["Domingo", "Terça", "Quarta", "Quinta", "Sábado"],
        preços: ["A$ 1.31", "A$ 1.33", "A$ 1.32", "A$ 1.35", "A$ 1.37"]
    },
    mes: {
        path: "polygon(0% 100%, 0% 36%, 10% 55%, 25% 80%, 35% 50%, 50% 20%, 65% 35%, 75% 28%, 85% 40%, 92% 15%, 100% 0%, 100% 100%)",
        variacao: "▲ 7.03%",
        legendas: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
        preços: ["A$ 1.28", "A$ 1.17", "A$ 1.32", "A$ 1.30", "A$ 1.37"]
    },
    ano: {
        path: "polygon(0% 100%, 0% 100%, 12% 85%, 25% 92%, 35% 76%, 45% 82%, 55% 48%, 68% 55%, 80% 24%, 88% 35%, 100% 0%, 100% 100%)",
        variacao: "▲ 22.3%",
        legendas: ["Jan-Mar", "Abr-Maio", "Jun-Jul", "Ago-Set", "Out-Dez"],
        preços: ["A$ 1.12", "A$ 1.18", "A$ 1.25", "A$ 1.31", "A$ 1.37"]
    }
};

function atualizarGrafico(periodo, btn) {
    const info = dadosCambio[periodo];
    const grafico = document.getElementById('path-grafico');
    const overlay = document.getElementById('overlay-mouse');
    const legendasDiv = document.getElementById('legendas');
    const varTxt = document.getElementById('txt-variacao');
    if (!grafico || !overlay || !legendasDiv || !varTxt) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const btnInicial = document.querySelector(`.tab-btn[onclick*="${periodo}"]`) || document.querySelector('.tab-btn');
        if (btnInicial) btnInicial.classList.add('active');
    }
    grafico.style.clipPath = info.path;
    varTxt.innerText = info.variacao;
    overlay.innerHTML = '';
    info.preços.forEach(p => {
        const div = document.createElement('div');
        div.className = 'segmento-hover';
        div.setAttribute('data-preço', p);
        overlay.appendChild(div);
    });
    legendasDiv.innerHTML = '';
    info.legendas.forEach(l => {
        const span = document.createElement('span');
        span.innerText = l;
        legendasDiv.appendChild(span);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarGrafico('hoje', null);
});


document.addEventListener("DOMContentLoaded", function() {
    const breadcrumbElement = document.getElementById('breadcrumb-lista');
    if (!breadcrumbElement) return;
    const categorias = {
        'identidade': [
            'historia.html', 
            'simbolos.html', 
            'cultura.html', 
            'partidos.html', 
            'governantes.html'
        ],
        'territorio': [
            'organizacao.html', 
            'mundo.html'
        ],
        'governo': [
            'ministerios.html', 
            'executivo.html',
            'legislativo.html',
            'judiciario.html'
        ],
        'legislacao': [
            'constituicao.html'
        ],
        'outros': [
            'ineg.html',
            'banco-central.html',
            'forcas_armadas.html',
            'educacao.html'
        ]
    };

    const urlAtual = window.location.pathname.split("/").pop();
    
    let tituloLimpo = document.title.split(' — ')[0].split(' | ')[0];
    let html = `<a href="index.html">Início</a>`;
    let categoriaPai = "";
    let nomePai = "";

    for (let chave in categorias) {
        if (categorias[chave].includes(urlAtual)) {
            categoriaPai = chave + ".html";
            const nomesExibicao = {
                'identidade': 'Identidade',
                'territorio': 'Território',
                'governo': 'Governo',
                'legislacao': 'Legislação',
                'outros': 'Outros'
            }
            nomePai = nomesExibicao[chave] || chave.charAt(0).toUpperCase() + chave.slice(1);
            break;
        }
    }

    if (urlAtual === "index.html" || urlAtual === "") {
        html = `<span class="current-page">Início</span>`;
    } else if (categoriaPai) {
        html += ` <span class="separator">/</span> <a href="${categoriaPai}">${nomePai}</a>`;
        html += ` <span class="separator">/</span> <span class="current-page">${tituloLimpo}</span>`;
    } else {
        html += ` <span class="separator">/</span> <span class="current-page">${tituloLimpo}</span>`;
    }

    breadcrumbElement.innerHTML = html;
});

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. CARREGAR CABEÇALHO ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('cabecalho.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // IMPORTANTE: Reativar as funções de clique após o HTML ser injetado
                ativarLogicaMenu(); 
            });
    }

    // --- 2. CARREGAR RODAPÉ E ANO ---
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('rodape.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                const anoSpan = document.getElementById('ano-atual');
                if (anoSpan) {
                    anoSpan.textContent = new Date().getFullYear();
                }
            });
    }

    // --- 3. FUNÇÃO QUE FAZ O MENU FUNCIONAR ---
    function ativarLogicaMenu() {
        const navMenu = document.getElementById('main-nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');

        // Torna a função global para o onclick="toggleMenu(event)" do HTML funcionar
        window.toggleMenu = function(event) {
            if (event) event.stopPropagation();
            const isOpen = navMenu.classList.contains('active');
            if (!isOpen) {
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                fecharTudo();
            }
        };

        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(drop => {
            const linkPrincipal = drop.querySelector('.nav-link');

            drop.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    const content = this.querySelector('.dropdown-content');
                    const isOpened = content.classList.contains('show');
                    if (!isOpened) {
                        e.preventDefault();
                        e.stopPropagation();
                        document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
                        content.classList.add('show');
                    } 
                }
            });
        });

        function fecharTudo() {
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
        }

        // Fechar ao clicar fora
        document.addEventListener('click', function(event) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                    fecharTudo();
                }
            }
        });
    }

    const breadContainer = document.querySelector('.breadcrumb-container');
    const url = window.location.pathname.split("/").pop();
    
    if (url === "index.html" || url === "") {
        const breadContainer = document.querySelector('.breadcrumb-container');
        
        setTimeout(() => {
            if (breadContainer) {
                // Pegamos a altura atual para a transição funcionar
                const alturaAtual = breadContainer.offsetHeight;
                breadContainer.style.height = alturaAtual + 'px';
                
                // Forçamos o navegador a processar a altura antes de zerar
                setTimeout(() => {
                    breadContainer.style.opacity = "0";
                    breadContainer.style.height = "0";
                    breadContainer.style.paddingTop = "0";
                    breadContainer.style.paddingBottom = "0";
                    breadContainer.style.borderBottomWidth = "0";
                }, 50);

                // Só depois de terminar a animação (1s) é que tiramos do mapa
                setTimeout(() => {
                    breadContainer.style.display = "none";
                }, 1050);
            }
        }, 2000); // Espera 2 segundos antes de começar a sumir
    }

});

function toggleTabela() {
    const rows = document.querySelectorAll('.row-hidden');
    const texto = document.getElementById('btnTexto');
    const seta = document.getElementById('btnSeta');
    
    // Verifica se a primeira linha está escondida
    const estaEscondido = (rows[0].style.display === 'none' || rows[0].style.display === '');

    rows.forEach(r => {
        r.style.display = estaEscondido ? 'table-row' : 'none';
    });

    // Troca o texto e a direção da seta
    if (estaEscondido) {
        texto.innerText = 'Ver Principais';
        seta.classList.remove('seta-baixo');
        seta.classList.add('seta-cima');
    } else {
        texto.innerText = 'Ver Cronologia Completa';
        seta.classList.remove('seta-cima');
        seta.classList.add('seta-baixo');
    }
}

function abrirConst(evt, idAlvo) {
    // Esconde todos os conteúdos
    const conteudos = document.querySelectorAll('.const-content');
    conteudos.forEach(c => c.classList.remove('active'));

    // Remove classe ativa de todos os botões
    const botoes = document.querySelectorAll('.btn-lei');
    botoes.forEach(b => b.classList.remove('active'));

    // Mostra o selecionado e ativa o botão
    document.getElementById(idAlvo).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function abrirMapa(caminhoImg, titulo) {
    var modal = document.getElementById("modalMapa");
    var img = document.getElementById("imgNoModal");
    var caption = document.getElementById("caption-modal");
    
    modal.style.display = "flex"; 
    img.src = caminhoImg; 
    caption.innerHTML = titulo; 
}

function fecharMapa() {
    var modal = document.getElementById("modalMapa");
    modal.style.display = "none"; 
}

window.onclick = function(event) {
    var modal = document.getElementById("modalMapa");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function abrirMapa(url, titulo) {
    document.getElementById('imgDinamica').src = url;
    document.getElementById('tituloMapa').innerText = titulo;
    document.getElementById('janelaMapa').style.display = 'flex';
}

function fecharMapa() {
    document.getElementById('janelaMapa').style.display = 'none';
}