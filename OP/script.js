/* ============================================================
   APEX EDUCACIONAL — script.js
   ------------------------------------------------------------
   IMPORTANTE — EDITE ANTES DE PUBLICAR:
   1) CONFIG.WHATSAPP_NUMBER  -> coloque o número real (com DDI+DDD)
   2) CONFIG.ADDRESS / CNPJ   -> já vêm também no index.html/footer,
      procure por "Rua Example" e pelo CNPJ de exemplo e substitua.
   ============================================================ */

(function () {
  "use strict";

  /* ================= CONFIGURAÇÃO ================= */
  const CONFIG = {
    // Formato internacional, só números: 55 + DDD + número
    WHATSAPP_NUMBER: "5599999999999"
  };

  /* ================= ÍCONES POR ÁREA ================= */
  const AREA_ICON = {
    "Negócios": "ic-briefcase",
    "Tecnologia": "ic-code",
    "Direito": "ic-scale",
    "Educação": "ic-cap",
    "Saúde": "ic-heart",
    "Engenharia": "ic-gear",
    "Humanas": "ic-users",
    "Exatas": "ic-atom"
  };

  /* ================= FAIXAS DE GANHO (referência de mercado) =================
     Valores mensais estimados (R$), por área e nível. São faixas ilustrativas
     para orientar o interesse do aluno — não são garantia de renda.       */
  const SALARY = {
    "Negócios":    { mestrado: [6000, 14000],  doutorado: [10000, 22000] },
    "Tecnologia":  { mestrado: [9000, 20000],  doutorado: [12000, 28000] },
    "Direito":     { mestrado: [7000, 16000],  doutorado: [12000, 25000] },
    "Educação":    { mestrado: [5000, 11000],  doutorado: [8000, 16000] },
    "Saúde":       { mestrado: [6000, 13000],  doutorado: [15000, 35000] },
    "Engenharia":  { mestrado: [8000, 17000],  doutorado: [12000, 24000] },
    "Humanas":     { mestrado: [5000, 10000],  doutorado: [8000, 16000] },
    "Exatas":      { mestrado: [7000, 15000],  doutorado: [10000, 22000] }
  };

  const DURATION = {
    mestrado: "18 a 24 meses",
    doutorado: "36 a 48 meses"
  };

  /* ================= BASE DE CURSOS ================= */
  const COURSES = [
    // ---------- MESTRADOS ----------
    { nome:"Administração de Empresas", nivel:"mestrado", area:"Negócios",
      desc:"Forma profissionais prontos para posições de liderança, com visão estratégica de negócios, pessoas e resultados.",
      skills:["Planejamento estratégico e gestão de negócios","Liderança de equipes e tomada de decisão","Finanças corporativas aplicadas"] },
    { nome:"Ciência da Computação", nivel:"mestrado", area:"Tecnologia",
      desc:"Aprofunda fundamentos de algoritmos, engenharia de software e sistemas para atuação técnica e acadêmica de alto nível.",
      skills:["Arquitetura de sistemas e algoritmos avançados","Engenharia de software e boas práticas","Pesquisa aplicada em tecnologia"] },
    { nome:"Direito (Constitucional, Processual ou Negocial)", nivel:"mestrado", area:"Direito",
      desc:"Aprofundamento jurídico com ênfase em Direito Constitucional, Processual ou Negocial, para carreira jurídica e docência.",
      skills:["Análise jurisprudencial e doutrinária avançada","Elaboração de pareceres e teses jurídicas","Docência e pesquisa em Direito"] },
    { nome:"Educação e Ensino", nivel:"mestrado", area:"Educação",
      desc:"Prepara educadores e gestores para pesquisa, inovação pedagógica e liderança em instituições de ensino.",
      skills:["Metodologias ativas e inovação pedagógica","Gestão e coordenação escolar","Pesquisa em processos de aprendizagem"] },
    { nome:"Economia e Finanças", nivel:"mestrado", area:"Negócios",
      desc:"Desenvolve análise econômica aplicada e gestão financeira para atuação em empresas, consultorias e instituições financeiras.",
      skills:["Análise econômica e modelagem financeira","Gestão de risco e investimentos","Elaboração de estudos e pareceres econômicos"] },
    { nome:"Engenharia de Produção", nivel:"mestrado", area:"Engenharia",
      desc:"Foca em otimização de processos, qualidade e gestão de operações industriais e de serviços.",
      skills:["Otimização de processos produtivos","Gestão da qualidade e logística","Pesquisa operacional aplicada"] },
    { nome:"Saúde Coletiva e Saúde Pública", nivel:"mestrado", area:"Saúde",
      desc:"Forma especialistas em políticas e gestão de saúde para atuação em serviços públicos e privados.",
      skills:["Planejamento e gestão em saúde pública","Epidemiologia e análise de dados de saúde","Elaboração de políticas e programas de saúde"] },
    { nome:"Administração Pública", nivel:"mestrado", area:"Negócios",
      desc:"Prepara gestores para atuação estratégica no setor público, com foco em eficiência e políticas públicas.",
      skills:["Gestão de políticas públicas","Orçamento e finanças públicas","Governança e controle no setor público"] },
    { nome:"Ciências Contábeis e Atuariais", nivel:"mestrado", area:"Negócios",
      desc:"Aprofunda controladoria, auditoria e cálculo atuarial para posições de alta responsabilidade técnica.",
      skills:["Controladoria e auditoria avançada","Cálculo atuarial e gestão de riscos","Perícia e consultoria contábil"] },
    { nome:"Biotecnologia", nivel:"mestrado", area:"Exatas",
      desc:"Explora aplicações biotecnológicas em saúde, agricultura e indústria, com base científica sólida.",
      skills:["Técnicas laboratoriais e biologia molecular","Desenvolvimento de bioprodutos","Pesquisa científica aplicada"] },
    { nome:"Engenharia Civil", nivel:"mestrado", area:"Engenharia",
      desc:"Aprofunda projeto, estruturas e gestão de obras para atuação técnica avançada e docência.",
      skills:["Projeto e análise estrutural avançada","Gestão de obras e sustentabilidade","Pesquisa em materiais e construção"] },
    { nome:"Engenharia Elétrica", nivel:"mestrado", area:"Engenharia",
      desc:"Foca em sistemas de energia, automação e eletrônica para inovação industrial e tecnológica.",
      skills:["Sistemas de energia e automação","Eletrônica de potência aplicada","Pesquisa e desenvolvimento tecnológico"] },
    { nome:"Enfermagem", nivel:"mestrado", area:"Saúde",
      desc:"Especializa profissionais para gestão de equipes, pesquisa clínica e docência em enfermagem.",
      skills:["Gestão de equipes e processos assistenciais","Pesquisa clínica e baseada em evidências","Docência em enfermagem"] },
    { nome:"Letras e Linguística", nivel:"mestrado", area:"Humanas",
      desc:"Aprofunda estudos da linguagem, literatura e ensino de línguas para pesquisa e docência.",
      skills:["Análise linguística e literária avançada","Metodologias de ensino de línguas","Produção de pesquisa acadêmica"] },

    // ---------- DOUTORADOS ----------
    { nome:"Física", nivel:"doutorado", area:"Exatas",
      desc:"Formação de pesquisadores de ponta em física teórica e experimental, para academia e inovação tecnológica.",
      skills:["Pesquisa teórica e experimental avançada","Modelagem e simulação computacional","Publicação científica internacional"] },
    { nome:"Matemática e Estatística", nivel:"doutorado", area:"Exatas",
      desc:"Desenvolve pesquisa avançada em matemática pura, aplicada e estatística, para academia e mercado de dados.",
      skills:["Modelagem matemática e estatística avançada","Análise de dados complexos","Pesquisa e docência em nível superior"] },
    { nome:"Medicina e Ciências da Saúde (Clínica Cirúrgica, Cardiologia, Oncologia)", nivel:"doutorado", area:"Saúde",
      desc:"Aprofundamento científico em áreas clínicas como Cirurgia, Cardiologia e Oncologia, para pesquisa e prática de excelência.",
      skills:["Pesquisa clínica avançada e baseada em evidências","Atualização técnica em subespecialidades","Docência e liderança em equipes médicas"] },
    { nome:"Genética e Biologia Molecular", nivel:"doutorado", area:"Exatas",
      desc:"Forma pesquisadores para atuação de ponta em genética, biotecnologia e ciências da vida.",
      skills:["Técnicas avançadas de biologia molecular","Análise genômica e bioinformática","Pesquisa científica de alto impacto"] },
    { nome:"Economia", nivel:"doutorado", area:"Negócios",
      desc:"Aprofunda teoria e pesquisa econômica para atuação acadêmica, em institutos de pesquisa e órgãos governamentais.",
      skills:["Teoria econômica avançada e econometria","Pesquisa e política econômica","Docência em nível superior"] },
    { nome:"Administração de Empresas", nivel:"doutorado", area:"Negócios",
      desc:"Forma pesquisadores e consultores de alto nível em estratégia, gestão e inovação organizacional.",
      skills:["Pesquisa avançada em estratégia e gestão","Consultoria empresarial de alto nível","Docência em programas de pós-graduação"] },
    { nome:"Direito (Doutorado em Direito)", nivel:"doutorado", area:"Direito",
      desc:"Aprofundamento científico do Direito, preparando para carreira acadêmica, consultoria estratégica e magistratura.",
      skills:["Produção científica jurídica avançada","Consultoria jurídica estratégica","Docência em programas de pós-graduação"] },
    { nome:"Ciência da Computação", nivel:"doutorado", area:"Tecnologia",
      desc:"Forma pesquisadores de ponta em inteligência artificial, sistemas e inovação tecnológica.",
      skills:["Pesquisa avançada em IA e sistemas","Publicação científica internacional","Liderança técnica em projetos de inovação"] },
    { nome:"Química (Orgânica, Inorgânica, Analítica)", nivel:"doutorado", area:"Exatas",
      desc:"Aprofunda pesquisa em química orgânica, inorgânica e analítica, para academia e indústria de alta tecnologia.",
      skills:["Pesquisa laboratorial avançada","Desenvolvimento de novos materiais e processos","Publicação e docência científica"] },
    { nome:"Ciência e Engenharia de Materiais", nivel:"doutorado", area:"Exatas",
      desc:"Forma especialistas em desenvolvimento de novos materiais para indústria, energia e tecnologia.",
      skills:["Caracterização avançada de materiais","Desenvolvimento de novos materiais","Pesquisa aplicada à indústria"] },
    { nome:"Ciência Política e Relações Internacionais", nivel:"doutorado", area:"Humanas",
      desc:"Aprofunda análise política e geopolítica para atuação acadêmica, diplomática e em organismos internacionais.",
      skills:["Análise política e geopolítica avançada","Pesquisa em relações internacionais","Docência e consultoria estratégica"] },
    { nome:"Sociologia e Antropologia", nivel:"doutorado", area:"Humanas",
      desc:"Forma pesquisadores para análise crítica de fenômenos sociais e culturais em profundidade.",
      skills:["Pesquisa social e etnográfica avançada","Análise crítica de fenômenos culturais","Docência e produção acadêmica"] },
    { nome:"Agronomia e Ciência do Solo", nivel:"doutorado", area:"Exatas",
      desc:"Aprofunda pesquisa em manejo de solo e produção agrícola sustentável, para inovação no agronegócio.",
      skills:["Pesquisa em manejo de solo e culturas","Sustentabilidade e produtividade agrícola","Inovação aplicada ao agronegócio"] },
    { nome:"Engenharia Mecânica", nivel:"doutorado", area:"Engenharia",
      desc:"Forma pesquisadores de ponta em sistemas mecânicos, energia e manufatura avançada.",
      skills:["Pesquisa avançada em sistemas mecânicos","Modelagem e simulação de engenharia","Inovação em manufatura e energia"] },
    { nome:"Engenharia Química", nivel:"doutorado", area:"Engenharia",
      desc:"Aprofunda processos químicos e industriais para pesquisa de ponta e inovação em larga escala.",
      skills:["Pesquisa avançada em processos industriais","Desenvolvimento de novos processos químicos","Inovação e sustentabilidade industrial"] }
  ];

  // gera um id único (slug) para cada curso
  COURSES.forEach((c, i) => {
    c.id = c.nome.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + i;
  });

  /* ================= HELPERS ================= */
  function waLink(message) {
    return "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function money(v) {
    return "R$ " + v.toLocaleString("pt-BR");
  }

  function levelLabel(n) {
    return n === "mestrado" ? "Mestrado" : "Doutorado";
  }

  /* ================= RENDER: GRADE DE CURSOS ================= */
  const grid = document.getElementById("cursosGrid");
  const countEl = document.getElementById("cursosCount");
  const emptyEl = document.getElementById("cursosEmpty");

  function courseCardHTML(c) {
    const range = SALARY[c.area][c.nivel];
    return `
      <button type="button" class="course-card" data-id="${c.id}">
        <div class="course-card__top">
          <span class="course-card__icon"><svg class="icon" aria-hidden="true"><use href="#${AREA_ICON[c.area]}"/></svg></span>
          <span class="badge badge--${c.nivel}">${levelLabel(c.nivel).toUpperCase()}</span>
        </div>
        <div>
          <h3>${c.nome}</h3>
          <span class="course-card__area">${c.area} · ${DURATION[c.nivel]}</span>
        </div>
        <div class="course-card__foot">
          <span>Ver detalhes</span>
          <span>${money(range[0])} – ${money(range[1])}*</span>
        </div>
      </button>
    `;
  }

  function renderCourses(list) {
    grid.innerHTML = list.map(courseCardHTML).join("");
    countEl.textContent = list.length + (list.length === 1 ? " curso encontrado" : " cursos encontrados");
    emptyEl.hidden = list.length !== 0;
    grid.hidden = list.length === 0;
  }

  /* ================= FILTROS ================= */
  const tabs = document.querySelectorAll(".tab");
  const searchInput = document.getElementById("cursoSearch");
  let currentFilter = "todos";

  function applyFilters() {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = COURSES.filter(c => {
      const matchLevel = currentFilter === "todos" || c.nivel === currentFilter;
      const matchTerm = !term || c.nome.toLowerCase().includes(term) || c.area.toLowerCase().includes(term);
      return matchLevel && matchTerm;
    });
    renderCourses(filtered);
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      currentFilter = tab.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);

  // renderiza a grade assim que os cursos e os filtros estão prontos
  renderCourses(COURSES);

  /* ================= MODAL DE CURSO ================= */
  const modal = document.getElementById("courseModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalIcon = document.getElementById("modalIcon");
  const modalBadges = document.getElementById("modalBadges");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalStats = document.getElementById("modalStats");
  const modalSkills = document.getElementById("modalSkills");
  const modalMatricular = document.getElementById("modalMatricular");

  let lastFocused = null;

  function openModal(course) {
    const range = SALARY[course.area][course.nivel];

    modalIcon.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${AREA_ICON[course.area]}"/></svg>`;
    modalBadges.innerHTML = `
      <span class="badge badge--${course.nivel}">${levelLabel(course.nivel).toUpperCase()}</span>
      <span class="badge" style="background:#eef2f7;color:#5b7086">${course.area.toUpperCase()}</span>
    `;
    modalTitle.textContent = course.nome;
    modalDesc.textContent = course.desc;

    modalStats.innerHTML = `
      <div class="modal__stat">
        <svg class="icon" aria-hidden="true"><use href="#ic-clock"/></svg>
        <strong>${DURATION[course.nivel]}</strong>
        <span>Duração estimada</span>
      </div>
      <div class="modal__stat">
        <svg class="icon" aria-hidden="true"><use href="#ic-laptop"/></svg>
        <strong>100% Online</strong>
        <span>Modalidade</span>
      </div>
      <div class="modal__stat modal__stat--wide">
        <svg class="icon" aria-hidden="true"><use href="#ic-trend"/></svg>
        <strong>${money(range[0])} a ${money(range[1])} / mês*</strong>
        <span>Potencial de ganho na área</span>
      </div>
    `;

    modalSkills.innerHTML = course.skills.map(s => `
      <li><svg class="icon" aria-hidden="true"><use href="#ic-check"/></svg> ${s}</li>
    `).join("");

    const msg = `Olá! Tenho interesse em me matricular no ${levelLabel(course.nivel)} em ${course.nome}. Podem me passar mais informações?`;
    modalMatricular.setAttribute("href", waLink(msg));

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => {
      modalBackdrop.classList.add("is-open");
      modal.classList.add("is-open");
    });
    modalClose.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove("is-open");
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modal.hidden = true; }, 320);
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".course-card");
    if (!card) return;
    const course = COURSES.find(c => c.id === card.dataset.id);
    if (course) openModal(course);
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ================= MENU MOBILE ================= */
  const menuBtn = document.getElementById("menuBtn");
  const menuCloseBtn = document.getElementById("menuCloseBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");

  function openMobileNav() {
    mobileNav.classList.add("is-open");
    mobileNavBackdrop.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("modal-open");
  }
  function closeMobileNav() {
    mobileNav.classList.remove("is-open");
    mobileNavBackdrop.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("modal-open");
  }
  menuBtn.addEventListener("click", openMobileNav);
  menuCloseBtn.addEventListener("click", closeMobileNav);
  mobileNavBackdrop.addEventListener("click", closeMobileNav);
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobileNav));

  /* ================= LINKS "js-whatsapp" (dinâmicos) ================= */
  function wireWhatsappLinks() {
    document.querySelectorAll(".js-whatsapp").forEach(link => {
      const msg = link.dataset.msg || "Olá! Vim pelo site da Apex Educacional.";
      link.setAttribute("href", waLink(msg));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  /* ================= FORMULÁRIO DE INTERESSE ================= */
  const leadForm = document.getElementById("leadForm");
  const leadCurso = document.getElementById("leadCurso");

  // popula o select de cursos a partir da base de dados
  COURSES
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
    .forEach(c => {
      const opt = document.createElement("option");
      opt.value = `${levelLabel(c.nivel)} em ${c.nome}`;
      opt.textContent = `${levelLabel(c.nivel)} — ${c.nome}`;
      leadCurso.appendChild(opt);
    });

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("leadNome").value.trim();
    const fone = document.getElementById("leadFone").value.trim();
    const nivel = document.getElementById("leadNivel").value;
    const curso = leadCurso.value;

    const msg = `Olá! Me chamo ${nome} (contato: ${fone}) e tenho interesse em ${curso}. ` +
      (nivel !== "Ainda não sei" ? `Nível de interesse: ${nivel}. ` : "") +
      `Podem me passar mais informações?`;

    window.open(waLink(msg), "_blank", "noopener");
  });

  /* ================= HEADER: sombra ao rolar ================= */
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 8 ? "var(--shadow-sm)" : "none";
  }, { passive: true });

  /* ================= REVEAL AO SCROLL ================= */
  const revealTargets = document.querySelectorAll(".course-card, .dif-card, .step, .sobre__card, .faq__item");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "none";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    function observeReveal() {
      document.querySelectorAll(".course-card, .dif-card, .step, .sobre__card, .faq__item").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(14px)";
        el.style.transition = "opacity .5s ease, transform .5s ease";
        io.observe(el);
      });
    }
    // observa os elementos estáticos já presentes
    observeReveal();
  }

  /* ================= CONTADOR ANIMADO (NÚMEROS DA APEX) ================= */
  function animateCount(el) {
    const target = parseFloat(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("pt-BR") + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString("pt-BR") + suffix;
    }
    requestAnimationFrame(tick);
  }

  const statNums = document.querySelectorAll(".stat-box__num");
  if ("IntersectionObserver" in window && statNums.length) {
    const statsIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statNums.forEach(el => statsIO.observe(el));
  } else {
    // sem suporte a IntersectionObserver: mostra o valor final direto
    statNums.forEach(el => {
      el.textContent = el.dataset.target + (el.dataset.suffix || "");
    });
  }

  /* ================= ROLETA DE DESCONTO =================
     Anuncia honestamente "até 45%" (nunca 100%) — o prêmio máximo
     realmente existe e pode ser sorteado. Os PESOS abaixo controlam a
     chance de cada fatia (roleta "viciada" a favor de descontos menores),
     mas o valor mostrado no site é sempre o que pode, de fato, ser ganho.
     Para ajustar as chances, mude apenas os valores de "weight" (a soma
     das 8 fatias deve dar 100). */
  const WHEEL_SEGMENTS = [
    { value: 10, weight: 18 }, // fatia 0 —   0° a  45°
    { value: 5,  weight: 22 }, // fatia 1 —  45° a  90°
    { value: 15, weight: 14 }, // fatia 2 —  90° a 135°
    { value: 10, weight: 18 }, // fatia 3 — 135° a 180°
    { value: 20, weight: 8  }, // fatia 4 — 180° a 225°
    { value: 5,  weight: 14 }, // fatia 5 — 225° a 270°
    { value: 15, weight: 5  }, // fatia 6 — 270° a 315°
    { value: 45, weight: 1  }  // fatia 7 — 315° a 360° (prêmio máximo, bem raro)
  ];
  const WHEEL_SLICE_ANGLE = 360 / WHEEL_SEGMENTS.length;

  function pickWeightedIndex() {
    const total = WHEEL_SEGMENTS.reduce((sum, s) => sum + s.weight, 0);
    let r = Math.random() * total;
    for (let i = 0; i < WHEEL_SEGMENTS.length; i++) {
      r -= WHEEL_SEGMENTS[i].weight;
      if (r <= 0) return i;
    }
    return WHEEL_SEGMENTS.length - 1;
  }

  const roletaForm = document.getElementById("roletaForm");
  const roletaWheel = document.getElementById("roletaWheel");
  const roletaSpinBtn = document.getElementById("roletaSpinBtn");
  const roletaResult = document.getElementById("roletaResult");
  const roletaResultTitle = document.getElementById("roletaResultTitle");
  const roletaWhatsappBtn = document.getElementById("roletaWhatsappBtn");

  let roletaJaGirou = false;

  if (roletaForm) {
    roletaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (roletaJaGirou) return;
      roletaJaGirou = true;

      const nome = document.getElementById("roletaNome").value.trim();
      const fone = document.getElementById("roletaFone").value.trim();

      roletaSpinBtn.disabled = true;
      roletaSpinBtn.textContent = "Girando...";

      const index = pickWeightedIndex();
      const premio = WHEEL_SEGMENTS[index].value;
      const center = index * WHEEL_SLICE_ANGLE + WHEEL_SLICE_ANGLE / 2;
      const fullSpins = 6;
      const finalRotation = fullSpins * 360 + (360 - center);

      roletaWheel.style.transform = `rotate(${finalRotation}deg)`;

      const onSpinEnd = () => {
        roletaWheel.removeEventListener("transitionend", onSpinEnd);

        roletaResultTitle.textContent =
          `🎉 Parabéns, ${nome || "futuro aluno"}! Você ganhou ${premio}% de desconto na sua matrícula.`;

        const msg = `Olá! Me chamo ${nome} (contato: ${fone}) e acabei de girar a roleta de descontos da Apex Educacional. ` +
          `Ganhei ${premio}% de desconto na matrícula! Quero garantir minha vaga com esse desconto.`;
        roletaWhatsappBtn.setAttribute("href", waLink(msg));
        roletaWhatsappBtn.setAttribute("target", "_blank");
        roletaWhatsappBtn.setAttribute("rel", "noopener");

        roletaForm.hidden = true;
        roletaResult.hidden = false;
      };
      roletaWheel.addEventListener("transitionend", onSpinEnd);
    });
  }

  /* ================= CARROSSEL DE DESTAQUES (PROMOÇÕES) ================= */
  const promoCarousel = document.getElementById("promoCarousel");
  const promoTrack = document.getElementById("promoTrack");
  const promoPrev = document.getElementById("promoPrev");
  const promoNext = document.getElementById("promoNext");
  const promoDots = document.getElementById("promoDots");

  if (promoCarousel && promoTrack) {
    const slides = Array.from(promoTrack.children);
    let promoIndex = 0;
    let promoTimer = null;
    const AUTOPLAY_MS = 5000;

    // cria os pontinhos (dots) dinamicamente, um por slide
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Ir para o slide ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i, true));
      promoDots.appendChild(dot);
    });
    const dots = Array.from(promoDots.children);

    function updateUI() {
      promoTrack.style.transform = `translateX(-${promoIndex * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === promoIndex));
    }

    function goToSlide(i, userAction) {
      promoIndex = (i + slides.length) % slides.length;
      updateUI();
      if (userAction) restartAutoplay();
    }

    function nextSlide(userAction) { goToSlide(promoIndex + 1, userAction); }
    function prevSlide(userAction) { goToSlide(promoIndex - 1, userAction); }

    function startAutoplay() {
      stopAutoplay();
      promoTimer = setInterval(() => nextSlide(false), AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (promoTimer) clearInterval(promoTimer);
    }
    function restartAutoplay() { startAutoplay(); }

    promoNext.addEventListener("click", () => nextSlide(true));
    promoPrev.addEventListener("click", () => prevSlide(true));

    // pausa o autoplay ao passar o mouse ou focar no carrossel
    promoCarousel.addEventListener("mouseenter", stopAutoplay);
    promoCarousel.addEventListener("mouseleave", startAutoplay);
    promoCarousel.addEventListener("focusin", stopAutoplay);
    promoCarousel.addEventListener("focusout", startAutoplay);

    // navegação por teclado quando o carrossel está focado
    promoCarousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide(true);
      if (e.key === "ArrowLeft") prevSlide(true);
    });

    // suporte a arrastar/deslizar no touch (celular)
    let touchStartX = 0;
    let touchDeltaX = 0;
    promoTrack.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
      stopAutoplay();
    }, { passive: true });
    promoTrack.addEventListener("touchmove", (e) => {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });
    promoTrack.addEventListener("touchend", () => {
      if (touchDeltaX > 40) prevSlide(false);
      else if (touchDeltaX < -40) nextSlide(false);
      startAutoplay();
    });

    updateUI();
    startAutoplay();
  }

  /* ================= ANO NO RODAPÉ ================= */
  document.getElementById("ano").textContent = new Date().getFullYear();

  /* ================= INIT ================= */
  wireWhatsappLinks();

})();