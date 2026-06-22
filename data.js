/* ==========================================
   BASE DE DADOS: CARTAS DESAFIO (15 CARTAS)
   ========================================== */
const cartasDesafio = [
    {
        id: 1,
        categoria: "Inventário",
        ticket: "TICKET #DES-01",
        titulo: "Gestão de Estoque - Classificação ABC",
        contexto: "Seu Centro de Distribuição está sofrendo com custos elevados de armazenamento e, ao mesmo tempo, rupturas frequentes de itens com alta saída. Você precisa implementar uma estratégia imediata de controle de estoque baseado na relevância financeira.",
        opcoes: [
            {
                letra: "A",
                texto: "Classificar o estoque pela Curva ABC, focando o controle rígido e auditorias rotativas de inventário nos itens da Classe A.",
                peso: "correta",
                feedback: "Correto! A Curva ABC permite concentrar os esforços de controle nos itens de maior impacto financeiro (Classe A), otimizando a acuracidade de inventário e reduzindo riscos comerciais."
            },
            {
                letra: "B",
                texto: "Classificar pela Curva ABC, mas focar toda a equipe de controle e inventário nos itens da Classe C por terem maior volume físico.",
                peso: "parcial",
                feedback: "Parcialmente correto. Embora a Classe C possua maior volume de SKUs físicos, eles representam baixo valor agregado. Concentrar todo o esforço de inventário nela deixa expostos os itens Classe A, muito mais caros."
            },
            {
                letra: "C",
                texto: "Realizar auditoria total e contagem diária de 100% das mercadorias do estoque de forma contínua, sem distinção de valor.",
                peso: "incorreta",
                feedback: "Incorreto. Contar todo o armazém diariamente é inviável operacionalmente e extremamente caro, gerando gargalo físico e desperdício de mão de obra."
            },
            {
                letra: "D",
                texto: "Reduzir o estoque de segurança de todos os SKUs a zero para cortar custos de armazenagem imediatamente, comprando apenas sob demanda.",
                peso: "incorreta",
                feedback: "Incorreto. Estoque zero sem alta integração sistêmica e fornecedores em 'Just-in-Time' perfeito gera rupturas de estoque generalizadas e colapso de vendas."
            }
        ]
    },
    {
        id: 2,
        categoria: "Armazenagem",
        ticket: "TICKET #DES-02",
        titulo: "Giro de Produtos Perecíveis - FIFO vs FEFO",
        contexto: "O lote de um insumo crítico de laticínios estocado está com data de expiração muito próxima. O sistema de controle de faturamento atual apenas envia a mercadoria com base no recebimento mais antigo, mas novos lotes que vencerão antes chegaram recentemente.",
        opcoes: [
            {
                letra: "A",
                texto: "Utilizar o método LIFO (último a entrar, primeiro a sair) para escoar o lote recém-chegado com validade de maior prazo.",
                peso: "incorreta",
                feedback: "Incorreto. O LIFO causará o vencimento e descarte total dos lotes mais antigos no galpão, gerando alto custo operacional por obsolescência."
            },
            {
                letra: "B",
                texto: "Substituir a política atual para FEFO (primeiro a expirar, primeiro a sair) a fim de priorizar o despacho pela proximidade de vencimento.",
                peso: "correta",
                feedback: "Correto! O FEFO é a melhor prática absoluta para produtos perecíveis, garantindo que o produto com a validade mais próxima seja expedido primeiro, evitando perdas por vencimento."
            },
            {
                letra: "C",
                texto: "Manter o método FIFO (primeiro a entrar, primeiro a sair), confiando que a ordem de entrada sempre reflete a validade real dos itens.",
                peso: "parcial",
                feedback: "Parcialmente correto. O FIFO reduz o tempo do estoque, mas não garante a validade nos casos em que fornecedores entregam lotes mistos ou com prazos de validade variáveis."
            },
            {
                letra: "D",
                texto: "Despachar as mercadorias por triagem manual aleatória dos operadores no momento do carregamento das empilhadeiras.",
                peso: "incorreta",
                feedback: "Incorreto. A triagem manual aleatória causa desorganização operacional, erros de expedição, descumprimento de prazos e alta obsolescência."
            }
        ]
    },
    {
        id: 3,
        categoria: "Distribuição",
        ticket: "TICKET #DES-03",
        titulo: "Gargalo Operacional na Entrega - Cross-Docking",
        contexto: "Os tempos de ciclo de atendimento do cliente (Lead Time) estão altos. Os produtos importados chegam, são estocados nas prateleiras mais altas e, poucas horas depois, são recolhidos para expedição. Você quer otimizar esse fluxo dinâmico.",
        opcoes: [
            {
                letra: "A",
                texto: "Implementar o Cross-Docking: descarregar os caminhões de entrada e transferir a carga diretamente para os de saída, sem armazenagem.",
                peso: "correta",
                feedback: "Correto! O Cross-Docking elimina as etapas de put-away (armazenagem) e picking, reduzindo o tempo de trânsito no CD, custos operacionais e riscos de danos."
            },
            {
                letra: "B",
                texto: "Manter o fluxo tradicional, mas contratar mais operadores de empilhadeira para agilizar a subida e descida de caixas dos porta-paletes.",
                peso: "parcial",
                feedback: "Parcialmente correto. Acelera as operações, porém gera aumento direto dos custos operacionais com mão de obra, sem resolver a ineficiência estrutural do processo de movimentação."
            },
            {
                letra: "C",
                texto: "Aumentar a área física de armazenagem temporária no solo para evitar o uso de porta-paletes verticais.",
                peso: "incorreta",
                feedback: "Incorreto. Ocupar áreas no solo reduz severamente o espaço disponível para circulação e docagem, agravando o gargalo operacional."
            },
            {
                letra: "D",
                texto: "Cancelar a importação de produtos de alta circulação para diminuir o fluxo de mercadorias no pátio.",
                peso: "incorreta",
                feedback: "Incorreto. Reduzir as vendas de itens de alta circulação é uma decisão anti-comercial grave que compromete a receita do negócio."
            }
        ]
    },
    {
        id: 4,
        categoria: "Transporte",
        ticket: "TICKET #DES-04",
        titulo: "Gestão de Transporte - Frota Própria vs. Terceirizada",
        contexto: "O frete representa 60% do seu custo logístico total. A empresa opera com frota 100% própria, mas os veículos sofrem com quebras constantes, altos custos de manutenção preventiva e ociosidade severa em períodos de baixa demanda.",
        opcoes: [
            {
                letra: "A",
                texto: "Comprar mais caminhões novos para rejuvenescer a frota própria e contratar motoristas fixos em regime integral.",
                peso: "incorreta",
                feedback: "Incorreto. Isso exige alto gasto de capital (CAPEX) e eleva os custos fixos operacionais da frota própria, sem sanar a ociosidade dos períodos sazonais."
            },
            {
                letra: "B",
                texto: "Terceirizar 100% da frota para transportadoras parceiras, fechando sua divisão de transporte interno.",
                peso: "parcial",
                feedback: "Parcialmente correto. Corta custos fixos imediatos de manutenção de ativos, mas coloca a empresa em risco de dependência do mercado e perda de flexibilidade de serviço rápido."
            },
            {
                letra: "C",
                texto: "Adotar um modelo híbrido: manter frota própria para a demanda mínima constante e contratar transportadores spot para picos de venda.",
                peso: "correta",
                feedback: "Correto! O modelo híbrido equilibra os custos fixos mínimos, otimiza o uso dos ativos internos e garante flexibilidade e escalabilidade para cobrir as flutuações sazonais de demanda."
            },
            {
                letra: "D",
                texto: "Suspender as entregas corporativas distantes, focando apenas no atendimento a clientes em um raio de 10 km do Centro de Distribuição.",
                peso: "incorreta",
                feedback: "Incorreto. A redução da área geográfica de atendimento reduz brutalmente a fatia de mercado (Market Share) e a carteira ativa da empresa."
            }
        ]
    },
    {
        id: 5,
        categoria: "Recebimento",
        ticket: "TICKET #DES-05",
        titulo: "Estrangulamento na Doca - Agendamento de Cargas",
        contexto: "Filas quilométricas de carretas estão travando o pátio de manobras do CD. Os fornecedores chegam sem horário definido, gerando horários com picos impraticáveis de recepção e outros momentos com docas completamente vazias.",
        opcoes: [
            {
                letra: "A",
                texto: "Implementar um sistema de agendamento de janelas horárias de recebimento (Slot Booking) integrado com fornecedores.",
                peso: "correta",
                feedback: "Correto! O agendamento nivela o fluxo de entrada de caminhões ao longo do dia útil, permitindo dimensionar corretamente as equipes das docas e eliminar ociosidades e gargalos de pátio."
            },
            {
                letra: "B",
                texto: "Atender os transportadores por ordem de chegada, operando o Centro de Distribuição 24 horas por dia para escoar as filas acumuladas.",
                peso: "parcial",
                feedback: "Parcialmente correto. Embora reduza as filas temporariamente, aumenta brutalmente as horas extras e as despesas com energia, gerando uma operação cara e ineficiente."
            },
            {
                letra: "C",
                texto: "Recusar a entrada de qualquer caminhão cujo fornecedor possua atraso superior a 5 minutos na entrega.",
                peso: "incorreta",
                feedback: "Incorreto. A inflexibilidade severa gera atritos comerciais constantes com fornecedores chave, quebras de suprimento na fábrica e processos legais."
            },
            {
                letra: "D",
                texto: "Ampliar a pavimentação física do pátio de manobras e criar um estacionamento maior para as carretas aguardarem.",
                peso: "incorreta",
                feedback: "Incorreto. Essa medida trata apenas o sintoma físico e exige alto investimento de infraestrutura, sem solucionar a raiz do problema de desorganização do fluxo de carga."
            }
        ]
    },
    {
        id: 6,
        categoria: "Inventário",
        ticket: "TICKET #DES-06",
        titulo: "Acuracidade de Inventário - Erros Sistêmicos",
        contexto: "O inventário de final de ano apontou uma divergência de 12% entre o saldo de estoque físico do galpão e o saldo do sistema ERP/WMS. Isso provoca atrasos de picking devido a produtos fantasmas nas prateleiras ou vendas frustradas.",
        opcoes: [
            {
                letra: "A",
                texto: "Efetuar ajustes sistêmicos manuais para equilibrar o saldo toda vez que um operador de picking não encontrar o produto indicado.",
                peso: "incorreta",
                feedback: "Incorreto. Ajustes sem auditoria ou verificação de causa raiz abrem brechas para perdas físicas ocultas, furtos, extravios e descontrole sistêmico crônico."
            },
            {
                letra: "B",
                texto: "Parar toda a operação do armazém por 3 dias mensais para contagem geral de todos os itens e conferência de saldos.",
                peso: "parcial",
                feedback: "Parcialmente correto. Ajuda na apuração dos dados, mas causa paradas de faturamento e expedição muito caras, inviabilizando o atendimento diário dos clientes do CD."
            },
            {
                letra: "C",
                texto: "Implementar um programa de inventário rotativo diário, auditando lotes específicos e rotacionando os SKUs de forma constante.",
                peso: "correta",
                feedback: "Correto! O inventário rotativo diário permite auditar itens de forma contínua sem paralisar a fábrica ou o CD, identificando desvios rapidamente e garantindo acuracidade acima de 99%."
            },
            {
                letra: "D",
                texto: "Desligar o sistema WMS e passar a gerenciar a localização dos paletes apenas por anotações físicas em pranchetas de papel.",
                peso: "incorreta",
                feedback: "Incorreto. A eliminação da tecnologia em operações modernas é um retrocesso que gera ineficiência extrema, perda de rastreabilidade e erros em massa."
            }
        ]
    },
    {
        id: 7,
        categoria: "Transporte",
        ticket: "TICKET #DES-07",
        titulo: "Otimização de Roteirização de Entregas",
        contexto: "O custo unitário de entrega urbana está muito elevado devido ao alto consumo de combustível e multas por atraso na devolução. Os motoristas planejam suas próprias rotas de entrega de forma empírica ao carregar os caminhões.",
        opcoes: [
            {
                letra: "A",
                texto: "Adotar um software de roteirização automatizado que consolide entregas por geolocalização e respeite as janelas de horário dos clientes.",
                peso: "correta",
                feedback: "Correto! Roteirizadores reduzem a quilometragem percorrida, otimizam a capacidade volumétrica dos caminhões, evitam restrições de tráfego urbano e asseguram entregas no prazo."
            },
            {
                letra: "B",
                texto: "Instruir os motoristas a usarem apenas rodovias expressas secundárias, mesmo que isso aumente o trajeto físico em quilômetros.",
                peso: "incorreta",
                feedback: "Incorreto. Aumentar a quilometragem apenas para rodar em vias rápidas gera consumo extra desnecessário de diesel e pneu, elevando o custo operacional."
            },
            {
                letra: "C",
                texto: "Manter o planejamento manual dos motoristas, mas cobrar metas de tempo mais rígidas e punir os condutores com pior desempenho.",
                peso: "parcial",
                feedback: "Parcialmente correto. Pode pressionar a equipe no curto prazo, mas gera estresse, acidentes de trânsito, demissões e não resolve a falta de inteligência operacional de consolidação de cargas."
            },
            {
                letra: "D",
                texto: "Terceirizar todo o transporte urbano sem estabelecer nenhum SLA (nível de serviço) mínimo exigido.",
                peso: "incorreta",
                feedback: "Incorreto. A terceirização sem acordos de nível de serviço claros e penalidades gerará um colapso imediato da qualidade de atendimento ao cliente final."
            }
        ]
    },
    {
        id: 8,
        categoria: "Logística Reversa",
        ticket: "TICKET #DES-08",
        titulo: "Gargalo de Devoluções no E-commerce",
        contexto: "O crescimento das vendas de e-commerce trouxe consigo um expressivo volume de logística reversa. As devoluções de clientes estão se acumulando em uma área improvisada do CD, gerando perda de espaço, desorganização e obsolescência da mercadoria.",
        opcoes: [
            {
                letra: "A",
                texto: "Destinar uma área dedicada de triagem rápida para classificar os produtos retornados: reembalar para venda, enviar a conserto ou descartar.",
                peso: "correta",
                feedback: "Correto! A criação de um fluxo de triagem ágil na reversa recupera valor financeiro rapidamente ao recolocar itens perfeitos em estoque de vendas e evitar acúmulos no CD."
            },
            {
                letra: "B",
                texto: "Recusar qualquer pedido de devolução dos clientes do e-commerce para poupar os processos internos do CD.",
                peso: "incorreta",
                feedback: "Incorreto. Viola diretamente o Código de Defesa do Consumidor e destrói a reputação comercial da marca no mercado digital."
            },
            {
                letra: "C",
                texto: "Vender todas as devoluções como refugo e sucata, independentemente do estado físico ou funcional do produto.",
                peso: "parcial",
                feedback: "Parcialmente correto. Agiliza a desocupação do galpão, mas acarreta prejuízos expressivos ao liquidar mercadorias em perfeito estado por valores irrisórios."
            },
            {
                letra: "D",
                texto: "Misturar os itens devolvidos diretamente nas prateleiras normais de estoque, deixando para verificar a qualidade no próximo picking.",
                peso: "incorreta",
                feedback: "Incorreto. Isso gera reclamações graves de clientes subsequentes que receberão itens danificados, sujos, incompletos ou usados."
            }
        ]
    },
    {
        id: 9,
        categoria: "Armazenagem",
        ticket: "TICKET #DES-09",
        titulo: "Fluxo Físico do Galpão - Layout de Armazenagem",
        contexto: "Você percebeu cruzamentos constantes de empilhadeiras e congestionamentos nos corredores principais. O layout atual possui docas mistas de recebimento e expedição lado a lado e os operadores percorrem longas distâncias para guardar os itens.",
        opcoes: [
            {
                letra: "A",
                texto: "Redesenhar o layout do CD utilizando um modelo de Fluxo em 'U' (U-flow) ou Linear, segregando recebimento e expedição em polos distintos.",
                peso: "correta",
                feedback: "Correto! Layouts orientados a fluxo (como U-Flow) criam fluxos unidirecionais de materiais, diminuem drasticamente o cruzamento de máquinas, acidentes e gargalos internos."
            },
            {
                letra: "B",
                texto: "Manter o layout, mas proibir o uso de empilhadeiras nos horários em que os operadores de separação estiverem transitando nos corredores.",
                peso: "incorreta",
                feedback: "Incorreto. Essa limitação reduz pela metade a produtividade diária do armazém, gerando gargalo na velocidade de atendimento de pedidos."
            },
            {
                letra: "C",
                texto: "Adicionar mais corredores estreitos, diminuindo a largura de todas as prateleiras de estoque atuais.",
                peso: "parcial",
                feedback: "Parcialmente correto. Pode otimizar a densidade de estocagem por metro quadrado, mas exige compra de empilhadeiras específicas para corredores estreitos (bilaterais) e reduz a velocidade de manobra padrão."
            },
            {
                letra: "D",
                texto: "Estocar todas as cargas no chão do galpão, descartando os porta-paletes para facilitar o acesso de pedestres.",
                peso: "incorreta",
                feedback: "Incorreto. A armazenagem puramente blocada no solo destrói o aproveitamento vertical da estrutura (cubagem) e reduz brutalmente a capacidade total do CD."
            }
        ]
    },
    {
        id: 10,
        categoria: "Distribuição",
        ticket: "TICKET #DES-10",
        titulo: "Melhoria do Indicador OTIF (On-Time In-Full)",
        contexto: "Seu principal KPI de atendimento ao cliente, o OTIF (No Prazo e Completo), caiu para 72%. Os clientes corporativos reclamam de entregas parciais ou fora do prazo, gerando multas financeiras severas e ameaças de rescisão de contratos.",
        opcoes: [
            {
                letra: "A",
                texto: "Pressionar a equipe de expedição para faturar e carregar caminhões mais rápido, dispensando a etapa final de conferência de itens por amostragem.",
                peso: "incorreta",
                feedback: "Incorreto. Ignorar a conferência eleva a quantidade de itens incorretos ou faltantes enviados (In-Full menor), piorando diretamente a insatisfação e o KPI do cliente."
            },
            {
                letra: "B",
                texto: "Mapear a causa raiz dos desvios de OTIF (atrasos de fornecedores, erros de separação, falhas de frota) e agir nas principais perdas.",
                peso: "correta",
                feedback: "Correto! Agir com base em dados de causa raiz permite erradicar os gargalos reais do fluxo, otimizando o nível de serviço ao cliente final de forma sustentada."
            },
            {
                letra: "C",
                texto: "Compensar os atrasos de entrega enviando cupons de desconto generosos para todos os clientes, sem alterar a operação física.",
                peso: "parcial",
                feedback: "Parcialmente correto. Pode acalmar alguns clientes temporariamente, mas não resolve o problema operacional interno crônico e gera erosão progressiva das margens do negócio."
            },
            {
                letra: "D",
                texto: "Alterar a meta do KPI OTIF de 95% para 70% no painel corporativo de BI para simular conformidade nas auditorias.",
                peso: "incorreta",
                feedback: "Incorreto. Maquiar indicadores operacionais esconde problemas reais do CD, perpetua a ineficiência de serviços e destrói a governança corporativa da empresa."
            }
        ]
    },
    {
        id: 11,
        categoria: "Planejamento",
        ticket: "TICKET #DES-11",
        titulo: "Alinhamento S&OP (Sales and Operations Planning)",
        contexto: "Há falta severa de produtos de alto faturamento no estoque nas datas de campanhas de marketing, enquanto itens de baixo giro se acumulam por meses. Há falta de comunicação clara entre a equipe de vendas e o planejamento do CD.",
        opcoes: [
            {
                letra: "A",
                texto: "Implementar um processo mensal de S&OP integrado, alinhando as previsões comerciais de marketing com as capacidades de suprimento do CD.",
                peso: "correta",
                feedback: "Correto! O S&OP sincroniza a cadeia de suprimentos: garante que a logística tenha infraestrutura operacional pronta para suportar as vendas planejadas e previne tanto excessos quanto rupturas."
            },
            {
                letra: "B",
                texto: "Permitir que o setor de compras compre livremente os itens que possuírem descontos de atacado de fornecedores.",
                peso: "incorreta",
                feedback: "Incorreto. Isso causa superestocagem desordenada de itens sem giro comercial e estrangulamento financeiro por capital de giro imobilizado."
            },
            {
                letra: "C",
                texto: "Manter o modelo atual, ajustando a reposição de estoque com base estritamente no histórico de consumo do ano anterior.",
                peso: "parcial",
                feedback: "Parcialmente correto. Utiliza dados passados, contudo é incapaz de prever mudanças nas tendências de vendas, ações comerciais de concorrentes ou lançamentos de produtos."
            },
            {
                letra: "D",
                texto: "Terceirizar a equipe comercial de marketing e vendas para evitar que elaborem campanhas promocionais de alto impacto.",
                peso: "incorreta",
                feedback: "Incorreto. Eliminar as ações comerciais impede o crescimento corporativo, gerando retração de vendas e inviabilidade econômica geral da empresa."
            }
        ]
    },
    {
        id: 12,
        categoria: "Separação",
        ticket: "TICKET #DES-12",
        titulo: "Gargalo Operacional na Separação - Picking",
        contexto: "Os operadores de separação de pedidos passam 70% do tempo de trabalho apenas caminhando pelas prateleiras do Centro de Distribuição em busca de peças pontuais. A produtividade está baixíssima e o tempo de picking de pedidos explodiu.",
        opcoes: [
            {
                letra: "A",
                texto: "Contratar mais auxiliares de separação para cobrir a ineficiência do deslocamento no galpão.",
                peso: "parcial",
                feedback: "Parcialmente correto. Aumenta a capacidade total de separação diária do CD, mas a ineficiência de caminhada do operador persiste, gerando custos de mão de obra desnecessários."
            },
            {
                letra: "B",
                texto: "Adotar estratégias de picking por onda ou zona, minimizando as áreas de atuação por operador e consolidando pedidos sistemicamente.",
                peso: "correta",
                feedback: "Correto! O Picking por Zona ou Onda divide o armazém em áreas dedicadas para cada operador, diminuindo de forma acentuada a quilometragem percorrida e acelerando a triagem de itens."
            },
            {
                letra: "C",
                texto: "Impor que cada separador corra fisicamente pelos corredores sob ameaça de punições de desempenho.",
                peso: "incorreta",
                feedback: "Incorreto. Induzir pressões físicas excessivas compromete a integridade corporal da equipe, eleva acidentes com cargas e gera processos trabalhistas graves."
            },
            {
                letra: "D",
                texto: "Manter o picking por pedido unitário (um por um) e desativar o sistema automático de emissão de romaneio de rotas.",
                peso: "incorreta",
                feedback: "Incorreto. Manter processos ineficientes impede o ganho de escala operacional e perpetua o atraso generalizado de expedição."
            }
        ]
    },
    {
        id: 13,
        categoria: "Sustentabilidade",
        ticket: "TICKET #DES-13",
        titulo: "Logística Verde e Descarbonização",
        contexto: "Grandes clientes de exportação estão exigindo comprovações de sustentabilidade ambiental na cadeia logística (ESG). Eles exigem redução da pegada ecológica das embalagens de transporte de uso único descartadas no destino final.",
        opcoes: [
            {
                letra: "A",
                texto: "Ignorar as exigências, visto que iniciativas ambientais geram apenas aumento de custos fixos sem retorno de negócios viável.",
                peso: "incorreta",
                feedback: "Incorreto. A rejeição de políticas socioambientais causa perda direta de grandes contas corporativas internacionais e depreciação severa da marca no mercado."
            },
            {
                letra: "B",
                texto: "Substituir caixas de papelão e fitilhos plásticos comuns por paletes e caixas plásticas retornáveis rastreadas via sistema de logística reversa.",
                peso: "correta",
                feedback: "Correto! A adoção de embalagens retornáveis no circuito de entrega reduz o descarte de resíduos, melhora as auditorias ecológicas dos clientes e gera economias a longo prazo."
            },
            {
                letra: "C",
                texto: "Manter as embalagens descartáveis tradicionais, porém colando selos verdes impressos nas caixas normais para sugerir sustentabilidade.",
                peso: "incorreta",
                feedback: "Incorreto. Praticar Greenwashing (maquiagem verde) é antiético, gera multas por publicidade enganosa e destrói a confiança dos parceiros comerciais."
            },
            {
                letra: "D",
                texto: "Interromper todas as exportações da empresa, limitando a operação apenas ao mercado interno local para evitar o transporte ecológico.",
                peso: "parcial",
                feedback: "Parcialmente correto. Diminui a pegada de emissões totais de CO2 do transporte internacional de longa distância, mas causa estrangulamento da receita global da empresa."
            }
        ]
    },
    {
        id: 14,
        categoria: "Planejamento",
        ticket: "TICKET #DES-14",
        titulo: "Estoque Gerenciado pelo Fornecedor - VMI",
        contexto: "Os custos com planejamento administrativo de reposição de itens comuns do almoxarifado estão muito elevados. A equipe de compras perde tempo cotando itens secundários de forma intermitente, resultando em rupturas e compras de emergência caras.",
        opcoes: [
            {
                letra: "A",
                texto: "Estabelecer uma parceria de VMI (Vendor Managed Inventory) com fornecedores chave, concedendo acesso sistêmico ao nível de estoque para reposição automática.",
                peso: "correta",
                feedback: "Correto! O VMI automatiza a reposição delegando a responsabilidade de gerir os níveis de estoque mínimos e máximos ao fornecedor, poupando custos operacionais e estoques ociosos."
            },
            {
                letra: "B",
                texto: "Aumentar as ordens de compra de todos os itens do almoxarifado para cobrir a demanda de segurança de 2 anos operacionais da fábrica.",
                peso: "incorreta",
                feedback: "Incorreto. A superestocagem imobiliza capital de giro crítico da empresa e sobrecarrega fisicamente o Centro de Distribuição com itens sem giro."
            },
            {
                letra: "C",
                texto: "Manter a equipe administrativa efetuando cotações diárias, mas reduzindo o número de fornecedores qualificados para apenas 1 parceiro exclusivo.",
                peso: "parcial",
                feedback: "Parcialmente correto. Pode simplificar o processo de compra burocrático de transações, contudo gera dependência extrema de um único fornecedor, elevando riscos operacionais de suprimento."
            },
            {
                letra: "D",
                texto: "Abolir as compras de reposição do almoxarifado, solicitando que a equipe de fábrica compre suas próprias ferramentas nas lojas locais.",
                peso: "incorreta",
                feedback: "Incorreto. Descentralizar as compras impede negociações por ganho de escala, eleva drasticamente os custos operacionais e gera perda de controle financeiro corporativo."
            }
        ]
    },
    {
        id: 15,
        categoria: "Segurança",
        ticket: "TICKET #DES-15",
        titulo: "Ergonomia e Segurança do Trabalho no CD",
        contexto: "O Centro de Distribuição está registrando um aumento nos índices de afastamento médico devido a lesões por esforço repetitivo e acidentes leves de empilhadeiras nos corredores. A gerência anterior focou apenas em métricas brutas de velocidade física.",
        opcoes: [
            {
                letra: "A",
                texto: "Oferecer prêmios extras em dinheiro para operadores que ignorarem os limites de velocidade interna das empilhadeiras para acelerar a carga.",
                peso: "incorreta",
                feedback: "Incorreto. Incentivar infrações de trânsito interno eleva a gravidade dos acidentes, gera riscos de morte, colapso de prateleiras e processos civis de alto custo."
            },
            {
                letra: "B",
                texto: "Substituir operadores afastados por temporários sem treinamento, mantendo a rotina e o fluxo operacional idêntico.",
                peso: "incorreta",
                feedback: "Incorreto. Operadores de maquinários pesados sem formação técnica causam acidentes catastróficos imediatos no galpão de estoque e danificam as estruturas e mercadorias."
            },
            {
                letra: "C",
                texto: "Implementar rotinas de ginástica laboral, treinamentos periódicos de operação segura de empilhadeiras e demarcações claras de vias de pedestres.",
                peso: "correta",
                feedback: "Correto! Investir na ergonomia e na segurança operacional gera maior produtividade sustentável a longo prazo, reduz custos com absenteísmo e passivos trabalhistas."
            },
            {
                letra: "D",
                texto: "Instalar câmeras de monitoramento adicionais para multar os colaboradores e suspender operadores que reduzirem o ritmo de picking.",
                peso: "parcial",
                feedback: "Parcialmente correto. Aumenta a vigilância interna dos corredores, mas focar exclusivamente em repressão deteriora o clima organizacional, sem solucionar problemas ergonômicos reais."
            }
        ]
    }
];

/* ==========================================
   BASE DE DADOS: CARTAS EVENTO (10 CARTAS)
   ========================================== */
const cartasEvento = [
    {
        id: 1,
        tipo: "negativo",
        nome: "Paralisação Nacional dos Caminhoneiros",
        descricao: "Uma greve nacional de motoristas autônomos bloqueou as rodovias interestaduais. Nenhuma matéria-prima chega ao CD e a expedição de mercadorias está travada em todo o país.",
        impacto: "Retenção total de faturamento diário e necessidade de fretes expressos caros pós-greve.",
        pontos: -15
    },
    {
        id: 2,
        tipo: "positivo",
        nome: "Boom de Consumo na Black Friday",
        descricao: "Seu e-commerce registrou um pico de acessos históricos e as vendas superaram a projeção original do ano em 120%. A equipe precisa de agilidade máxima.",
        impacto: "Aumento expressivo nos volumes faturados. Se sua acuracidade de estoque estiver alta, o ganho financeiro é excepcional.",
        pontos: 15
    },
    {
        id: 3,
        tipo: "negativo",
        nome: "Ransomware no Banco de Dados WMS",
        descricao: "Cibercriminosos invadiram o sistema operacional de controle de prateleiras (WMS), bloqueando o rastreio digital de locação física de paletes.",
        impacto: "Operação forçada a funcionar no modo manual, gerando atraso e lentidão generalizados.",
        pontos: -20
    },
    {
        id: 4,
        tipo: "negativo",
        nome: "Alta Explosiva do Preço de Combustíveis",
        descricao: "O reajuste do petróleo bruto internacional elevou em 14% o custo do óleo diesel nas refinarias nacionais de abastecimento de frotas.",
        impacto: "Aumento nos custos operacionais das transportadoras parceiras e pressão imediata por reajuste do valor de frete.",
        pontos: -10
    },
    {
        id: 5,
        tipo: "negativo",
        nome: "Tempestades e Alagamento de Vias Urbanas",
        descricao: "Fortes chuvas de verão alagaram as principais rodovias marginais e vias de acesso metropolitano, impedindo o trânsito seguro de caminhões.",
        impacto: "Atrasos severos na entrega final (Last Mile) aos clientes da capital e sobrecarga de devoluções no CD.",
        pontos: -12
    },
    {
        id: 6,
        tipo: "esg",
        nome: "Incentivo Fiscal de Descarbonização (ESG)",
        descricao: "O governo federal publicou um decreto isentando de tributos empresas que comprovarem a adoção de frotas ecoeficientes ou programas de logística reversa ativa.",
        impacto: "Redução de custos operacionais diretos para centros de distribuição com padrões verdes adequados.",
        pontos: 15
    },
    {
        id: 7,
        tipo: "negativo",
        nome: "Recall Global de Lote Defeituoso",
        descricao: "Um fornecedor crítico notificou uma falha de qualidade de um componente. Você deve bloquear, recolher e isolar com urgência o lote armazenado nas prateleiras.",
        impacto: "Custos inesperados de manuseio interno e ocupação de espaço valioso de estoque segregado de controle.",
        pontos: -15
    },
    {
        id: 8,
        tipo: "positivo",
        nome: "Automação Homologada com Veículos AGVs",
        descricao: "A implementação de empilhadeiras automáticas robóticas (AGVs) no corredor A do armazém foi finalizada com sucesso e homologada pela engenharia.",
        impacto: "Aumento instantâneo de 35% na velocidade de movimentação interna e eliminação de perdas físicas de produtos por quedas.",
        pontos: 20
    },
    {
        id: 9,
        tipo: "negativo",
        nome: "Guerra de Tarifas por Novo Player Regional",
        descricao: "Um mega CD de um grande conglomerado varejista se instalou a 5 km de sua unidade, iniciando a disputa por contratação de operadores e ofertas de frete.",
        impacto: "Aumento do Turn-over (rotatividade) de operadores qualificados de empilhadeira por ofertas concorrentes de maior salário.",
        pontos: -10
    },
    {
        id: 10,
        tipo: "positivo",
        nome: "Conquista das Certificações ISO 9001 / 14001",
        descricao: "Após meses de auditorias rígidas, o Centro de Distribuição obteve a homologação das certificações de controle de qualidade e gestão ambiental.",
        impacto: "Assinatura imediata de grandes contratos de distribuição com clientes de alta reputação mercadológica.",
        pontos: 20
    }
];

/* ==========================================
   CONQUISTAS DO JOGO COM BENEFÍCIOS PASSIVOS
   ========================================== */
const conquistas = [
    {
        id: "curva_abc",
        nome: "Estrategista de Inventário",
        desc: "Conquistada ao dominar a Curva ABC, implementando corretamente o controle focado nos itens de maior valor financeiro (Classe A).",
        beneficio: "Questões da categoria Inventário concedem +3 pts de bônus adicionais quando acertadas.",
        beneficioTipo: "bonus_categoria",
        beneficioCategoria: "Inventário",
        beneficioValor: 3,
        liberada: false,
        icon: "📊"
    },
    {
        id: "fefo",
        nome: "Mestre da Validade",
        desc: "Conquistada ao priorizar corretamente o método FEFO para gestão de produtos perecíveis, evitando perdas por vencimento.",
        beneficio: "Erros em questões de Armazenagem têm penalidade reduzida: você perde apenas 5 pts em vez da penalidade normal.",
        beneficioTipo: "reducao_pena_categoria",
        beneficioCategoria: "Armazenagem",
        beneficioValor: 5,
        liberada: false,
        icon: "🥛"
    },
    {
        id: "crossdocking",
        nome: "Gênio do Cross-Docking",
        desc: "Conquistada ao implementar o Cross-Docking, eliminando a etapa de armazenagem e reduzindo drasticamente o Lead Time de distribuição.",
        beneficio: "Escudo de Mercado: o próximo evento negativo de mercado terá seu impacto reduzido em 50% automaticamente.",
        beneficioTipo: "escudo_evento",
        beneficioValor: 0,
        liberada: false,
        icon: "⚡"
    },
    {
        id: "hibrido",
        nome: "Estrategista de Frota",
        desc: "Conquistada ao adotar o modelo híbrido de transporte, equilibrando frota própria com terceirização nos picos de demanda.",
        beneficio: "Questões da categoria Transporte acertadas concedem +3 pts de bônus adicionais.",
        beneficioTipo: "bonus_categoria",
        beneficioCategoria: "Transporte",
        beneficioValor: 3,
        liberada: false,
        icon: "🚛"
    },
    {
        id: "agendamento",
        nome: "Organizador de Pátio",
        desc: "Conquistada ao implementar o Slot Booking, nivelando o fluxo de entrada de caminhões e eliminando filas quilométricas nas docas.",
        beneficio: "Recuperação Imediata: +10% de Status Operacional ao desbloquear esta medalha.",
        beneficioTipo: "recuperar_status",
        beneficioValor: 10,
        liberada: false,
        icon: "📅"
    },
    {
        id: "rotativo",
        nome: "Auditor Rigoroso",
        desc: "Conquistada ao implementar o inventário rotativo diário, garantindo acuracidade de estoque acima de 99% sem parar a operação.",
        beneficio: "Potenciador de Combo: cada acerto consecutivo em modo Combo ganha +1 pt extra de bônus.",
        beneficioTipo: "bonus_combo",
        beneficioValor: 1,
        liberada: false,
        icon: "🔍"
    },
    {
        id: "roteirizador",
        nome: "Navegador Eficiente",
        desc: "Conquistada ao adotar software de roteirização automática, otimizando rotas por geolocalização e janelas de entrega dos clientes.",
        beneficio: "Decisão Cronometrada: +10 segundos de tempo disponível por rodada, de forma permanente.",
        beneficioTipo: "bonus_tempo",
        beneficioValor: 10,
        liberada: false,
        icon: "🗺️"
    },
    {
        id: "reversa",
        nome: "Pioneiro da Reversa",
        desc: "Conquistada ao criar uma área dedicada de triagem para devoluções do e-commerce, recuperando valor dos produtos retornados.",
        beneficio: "Controle de Impacto: respostas parciais (⚠️) não drenam mais o Status Operacional do CD.",
        beneficioTipo: "parcial_sem_status",
        beneficioValor: 0,
        liberada: false,
        icon: "♻️"
    },
    {
        id: "uflow",
        nome: "Projetista de Layout",
        desc: "Conquistada ao redesenhar o CD com fluxo orientado (U-Flow), eliminando cruzamentos de empilhadeiras e acidentes internos.",
        beneficio: "Recuperação Imediata: +15% de Status Operacional ao desbloquear esta medalha.",
        beneficioTipo: "recuperar_status",
        beneficioValor: 15,
        liberada: false,
        icon: "📐"
    },
    {
        id: "otif",
        nome: "Foco no Cliente",
        desc: "Conquistada ao mapear e agir sobre as causas raiz do OTIF baixo, elevando o nível de serviço ao cliente de forma sustentada.",
        beneficio: "Decisão Protegida: o próximo erro não gera nenhuma penalidade de pontuação (ativação única).",
        beneficioTipo: "escudo_erro",
        beneficioValor: 0,
        liberada: false,
        icon: "🎯"
    },
    {
        id: "sop",
        nome: "Integrador de Cadeia",
        desc: "Conquistada ao implementar o processo S&OP mensal, alinhando comercial, marketing e operações logísticas em um único ciclo.",
        beneficio: "Amplificador Positivo: eventos positivos de mercado concedem o dobro dos pontos de reputação.",
        beneficioTipo: "dobro_evento_positivo",
        beneficioValor: 2,
        liberada: false,
        icon: "🤝"
    },
    {
        id: "picking",
        nome: "Otimizador de Picking",
        desc: "Conquistada ao implementar Picking por Zona ou Onda, reduzindo drasticamente o deslocamento dos operadores de separação.",
        beneficio: "Combo Acelerado: bônus de combo ativam com 2 acertos consecutivos (em vez de 3), com maior recompensa.",
        beneficioTipo: "combo_facil",
        beneficioValor: 0,
        liberada: false,
        icon: "📦"
    },
    {
        id: "esg",
        nome: "Gerente Verde (ESG)",
        desc: "Conquistada ao adotar embalagens retornáveis e rastreáveis, atendendo às exigências de ESG dos clientes de exportação.",
        beneficio: "Bônus Verde: eventos de mercado do tipo ESG concedem +10 pts adicionais de reputação.",
        beneficioTipo: "bonus_esg",
        beneficioValor: 10,
        liberada: false,
        icon: "🌱"
    },
    {
        id: "vmi",
        nome: "Parceria Estratégica",
        desc: "Conquistada ao implementar o VMI com fornecedores chave, automatizando a reposição de estoque sem intervenção manual.",
        beneficio: "Gestão de Custos: erros em questões de Planejamento têm penalidade reduzida para apenas 5 pts.",
        beneficioTipo: "reducao_pena_categoria",
        beneficioCategoria: "Planejamento",
        beneficioValor: 5,
        liberada: false,
        icon: "🔌"
    },
    {
        id: "seguranca",
        nome: "Líder Humanitário",
        desc: "Conquistada ao priorizar ergonomia e segurança do trabalho, reduzindo afastamentos e criando um ambiente operacional seguro.",
        beneficio: "Recuperação Imediata: +20% de Status Operacional ao desbloquear. A maior recuperação do jogo!",
        beneficioTipo: "recuperar_status",
        beneficioValor: 20,
        liberada: false,
        icon: "🛡️"
    },
    {
        id: "supervivente",
        nome: "Escudo Anti-Crise",
        desc: "Conquistada ao sobreviver a um evento negativo de mercado mantendo o Status Operacional acima de 50%. Resiliência exemplar.",
        beneficio: "Escudo Único: impede que o Status Operacional chegue a 0% uma única vez, salvando o CD do colapso total.",
        beneficioTipo: "escudo_colapso",
        beneficioValor: 0,
        liberada: false,
        icon: "🔰"
    }
];
