// Número que recebe os leads do formulário (só dígitos, com DDI). Troque pelo WhatsApp comercial.
const WHATSAPP = '5537988347387';
const WA_MSG = 'Olá! Vim pelo site da Reactiv e quero falar com um especialista.';
const WA_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MSG)}`;

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const VERIFIED = '<svg viewBox="0 0 40 40" aria-label="Verificado"><path fill="#0095F6" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Z"/><path fill="#fff" d="m17.2 27.5-6.5-6.4 2.4-2.4 4.1 4.1 9.6-9.6 2.4 2.4z"/></svg>';

const CLIENTS = [
  { user: 'rafaolorenzatto', img: 'rafa', name: 'Rafael Lorenzatto', cat: 'Empresário', posts: '2.107', followers: '1,5 mi', following: '1.448', ok: true },
  { user: 'v4company', img: 'v4', name: 'V4 Company', cat: 'Marketing & Vendas', posts: '1.646', followers: '861 mil', following: '178', ok: true },
  { user: 'dallastorebrasil', img: 'dalla', name: 'DallaStore', cat: 'Moda feminina', posts: '11.442', followers: '744 mil', following: '3.181', ok: true },
  { user: 'lojarenatogarciayt', img: 'renato', name: 'Loja Renato Garcia', cat: 'E-commerce', posts: '372', followers: '740 mil', following: '146' },
  { user: 'amazetravel', img: 'amaze', name: 'Amaze', cat: 'Viagem de formatura', posts: '4.117', followers: '340 mil', following: '200' },
  { user: 'paraguaicapitalbr', img: 'paraguaicapitalbr', name: 'Paraguai Capital', cat: 'Imigração', posts: '310', followers: '193 mil', following: '252' },
  { user: 'saviorabrasil', img: 'saviora', name: 'Saviora Brasil', cat: 'Saúde e beleza', posts: '149', followers: '164 mil', following: '922', ok: true },
  { user: 'va.vi.ve', img: 'va.vi.ve', name: 'Vavivê Franquias', cat: 'Franquias', posts: '1.350', followers: '102 mil', following: '330' },
  { user: 'bubbleboxlav', img: 'bubbleboxlav', name: 'Bubble Box', cat: 'Lavanderia', posts: '529', followers: '24 mil', following: '345' },
];

const INTEGRATIONS = ['Shopify', 'Nuvemshop', 'Yampi', 'Cartpanda', 'Hotmart', 'Kiwify', 'Stripe', 'Mercado Pago', 'YouShop', 'Appmax', 'Guru', 'Bling', 'Tiny ERP', 'Omie', 'Correios', 'Melhor Envio', 'Frenet', 'Jadlog', 'WooCommerce', 'Eduzz', 'Monetizze', 'Asaas', 'PagBank', 'RD Station'];
const CHANNELS = ['WhatsApp API', 'WhatsApp Trad.', 'Instagram DM', 'E-mail', 'SMS', 'Torpedo de Voz'];
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = s => s.replace(/&/g, '&amp;');

// objetivos da seção de canais: texto + conversa simulada no celular
const GOALS = [
  { tag: 'Vendas', title: 'Recupere cada venda que escapou.', text: 'Carrinho abandonado, Pix não pago, boleto vencido, cartão recusado. Cada situação tem uma automação que age no momento certo.',
    chat: [['out', 'Oi, Paula! Vi que você deixou o Kit Skincare no carrinho 🛒'], ['out', 'Separei um cupom de 5% pra você finalizar hoje: <a>VOLTA5</a>'], ['in', 'Ahh obrigada! Vou finalizar agora'], ['out', 'Pix gerado ✓ Assim que cair, te aviso por aqui.']] },
  { tag: 'Pós-venda', title: 'Pós-compra que gera confiança.', text: 'Confirmação, rastreio e entrega no canal que o cliente mais abre. Menos chamado no suporte e mais avaliação positiva.',
    chat: [['out', 'Pedido #4821 confirmado, Paula! 🎉'], ['out', 'Seu código de rastreio: <a>BR83920431</a>'], ['in', 'Chega até sexta?'], ['out', 'Chega sim! Previsão: quinta-feira.']] },
  { tag: 'Suporte', title: 'Atendimento 24h com I.A humanizada.', text: 'I.A treinada com a voz da sua marca responde dúvidas, qualifica e resolve sozinha. Passa pro time só quando precisa.',
    chat: [['in', 'Vocês atendem em Curitiba?'], ['out', 'Atendemos sim! Quer que eu agende uma visita técnica?'], ['in', 'Quero, pode ser terça de manhã?'], ['out', 'Agendado: terça, 9h ✓ Te mando um lembrete na véspera.']] },
  { tag: 'Serviços', title: 'Agenda cheia, sem falta.', text: 'Agendamento pelo WhatsApp, confirmação automática e lembrete na véspera. Menos cadeira vazia e menos ligação perdida.',
    chat: [['out', 'Oi, Paula! Lembrete do seu horário amanhã às 14h ✂️'], ['out', 'Responda 1 pra confirmar ou 2 pra remarcar.'], ['in', '1'], ['out', 'Confirmado! Até amanhã 😊']] },
  { tag: 'Retenção', title: 'O cliente volta antes de ir pro concorrente.', text: 'A régua sabe quando o produto está acabando ou o serviço precisa ser refeito, e manda a oferta na hora certa.',
    chat: [['out', 'Paula, seu sérum deve estar acabando 💧'], ['out', 'Quer repor com frete grátis? <a>reactiv.link/r/92a</a>'], ['in', 'Quero! Manda 2'], ['out', 'Feito ✓ Pedido de 2 unidades criado.']] },
  { tag: 'Lançamentos', title: 'Estrutura que aguenta o pico.', text: 'Lançamento, live e data comemorativa trazem o pico de pedidos de uma vez. Disparo em massa pela API oficial, sem bloqueio.',
    chat: [['out', '🔴 Estamos AO VIVO agora com 40% off!'], ['out', 'Entra aqui: <a>reactiv.link/live</a>'], ['in', 'Tô entrando!!'], ['out', 'Só até meia-noite ⏰']] },
  { tag: 'Call center', call: true, title: 'Call center com I.A que liga e atende.', text: 'Uma voz natural treinada com o seu script liga pra leads, confirma agendamentos, faz cobrança e atende o telefone 24h. Tudo transcrito e registrado no CRM.',
    chat: [['out', 'Oi, Paula! Aqui é a Ana, da Clínica Movimento. Tudo bem?'], ['in', 'Tudo, pode falar.'], ['out', 'Tô ligando pra confirmar sua sessão amanhã às 9h. Posso confirmar?'], ['in', 'Pode sim, obrigada!'], ['out', 'Confirmado ✓ Te mando o endereço no WhatsApp.']] },
];

/* ---------- conteúdo dinâmico ---------- */
const chips = CLIENTS.map(c => `<span><img src="img/ig/${c.img}.jpg" alt="" width="34" height="34" loading="lazy">${esc(c.name)}</span>`).join('');
$('#logos').innerHTML = chips + chips;

// órbita: canais no anel interno, plataformas nos externos
[[CHANNELS, '#ring1'], [INTEGRATIONS.slice(0, 10), '#ring2'], [INTEGRATIONS.slice(10), '#ring3']].forEach(([list, sel]) => {
  $(sel).innerHTML = list.map((n, i) => `<span class="orb" style="--a:${i * 360 / list.length}deg" title="${n}"><i><img src="img/int/${slug(n)}.png" alt="${n}" loading="lazy"></i></span>`).join('');
});
const sizeOrbit = () => $$('.orbit__ring').forEach(r => r.style.setProperty('--r', r.offsetWidth / 2 + 'px'));
addEventListener('resize', sizeOrbit); sizeOrbit();

$('#igRail').innerHTML = CLIENTS.map(c => `
  <a class="igc" href="https://www.instagram.com/${c.user}/" target="_blank" rel="noopener">
    <div class="igc__top"><img class="igc__av" src="img/ig/${c.img}.jpg" alt="${esc(c.name)}" width="64" height="64" loading="lazy">
      <div><p class="igc__user">${c.user}${c.ok ? VERIFIED : ''}</p><p class="igc__name">${esc(c.name)}</p></div></div>
    <div class="igc__stats"><div><b>${c.posts}</b><span>posts</span></div><div><b>${c.followers}</b><span>seguidores</span></div><div><b>${c.following}</b><span>seguindo</span></div></div>
    <p class="igc__cat">${esc(c.cat)}<em>Ver perfil ↗</em></p>
  </a>`).join('');

/* ---------- hero: prompt digitando + conversa com o time ---------- */
const typed = document.getElementById('typed');
if (typed) {
  const ideas = ['Recuperar vendas perdidas', 'Criar uma régua de recompra', 'Reativar clientes parados', 'Ligar para leads com I.A', 'Abrir um canal novo de vendas'];
  let k = 0;
  const typeIdea = () => {
    const txt = ideas[k++ % ideas.length]; let n = 0;
    const step = () => { typed.textContent = txt.slice(0, ++n); if (n < txt.length) setTimeout(step, 45); else setTimeout(erase, 2200); };
    const erase = () => { typed.textContent = typed.textContent.slice(0, -1); if (typed.textContent) setTimeout(erase, 22); else setTimeout(typeIdea, 250); };
    step();
  };
  if (!reduce) setTimeout(typeIdea, 2200);
  const chat = document.getElementById('hxChat');
  const script = [
    ['', 'Bom dia! Rodamos a campanha de reativação ontem 🚀'],
    ['', '<b>142 clientes</b> voltaram a comprar. Isso deu <b>R$ 38.400</b> em receita nova.'],
    ['me', 'Que demais! Qual o próximo passo?'],
    ['', 'Já montamos a régua de recompra. Ela sobe amanhã, e eu te mostro o resultado na reunião de sexta.'],
  ];
  const play = () => {
    chat.innerHTML = '';
    script.forEach(([who, html], n) => setTimeout(() => {
      chat.querySelector('.hx__typing')?.remove();
      chat.insertAdjacentHTML('beforeend', `<p class="hx__msg ${who}">${html}<small>09:${12 + n}</small></p>`);
      if (n < script.length - 1 && script[n + 1][0] === '') chat.insertAdjacentHTML('beforeend', '<div class="hx__typing"><i></i><i></i><i></i></div>');
    }, reduce ? 0 : 600 + n * 1600));
    if (!reduce) setTimeout(play, 600 + script.length * 1600 + 5000);
  };
  play();
}

/* ---------- nav ---------- */
const nav = $('#nav'), hero = $('.hero'), dock = $('.dock');
function navTheme() { nav.classList.toggle('is-light', scrollY > dock.offsetTop + dock.offsetHeight - 80); }
addEventListener('scroll', navTheme, { passive: true }); navTheme();
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
$$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

/* ---------- dock: troca de etapa pelo scroll ---------- */
const texts = $$('.dock__text'), scrs = $$('.scr'), stages = $$('.stage'), dots = $$('.dock__dots i');
let stageIdx = 0;
function setStage(i) {
  if (i === stageIdx) return; stageIdx = i;
  [texts, scrs, stages, dots].forEach(list => list.forEach((el, n) => el.classList.toggle('is-on', n === i)));
}
function dockScroll() {
  const r = dock.getBoundingClientRect(), total = dock.offsetHeight - innerHeight;
  const p = Math.min(Math.max(-r.top / total, 0), .999);
  setStage(Math.floor(p * texts.length));
}
addEventListener('scroll', dockScroll, { passive: true });
stages.forEach((b, i) => b.addEventListener('click', () => {
  const total = dock.offsetHeight - innerHeight;
  scrollTo({ top: dock.offsetTop + total * (i + .5) / texts.length, behavior: 'smooth' });
}));

/* ---------- canais: objetivos + conversa ---------- */
const goalBtns = $$('#goals button'), phBody = $('#phBody');
let goalIdx = 0, goalTimer, chatTimers = [];
function playChat(lines) {
  chatTimers.forEach(clearTimeout); chatTimers = [];
  phBody.innerHTML = '';
  lines.forEach(([dir, html], n) => chatTimers.push(setTimeout(() => {
    const p = document.createElement('p'); p.className = `m ${dir}`; p.innerHTML = html; phBody.appendChild(p);
  }, reduce ? 0 : 350 + n * 700)));
}
const phone = $('.phone'), chTabs = $$('#chTabs button'), CALL = GOALS.findIndex(g => g.call);
let callTimer;
function setChannel(name) {
  chTabs.forEach(x => x.classList.toggle('is-on', x.textContent === name));
  const call = name === 'Ligação';
  phone.classList.toggle('is-call', call);
  $('.phone__input').textContent = call ? 'Transcrição ao vivo · salva no CRM' : 'Digite uma mensagem…';
  clearInterval(callTimer);
  if (call) {
    let sec = 0; const sub = $('#phSub');
    const tick = () => { sub.textContent = `em ligação · 00:${String(sec++).padStart(2, '0')}`; };
    tick(); callTimer = setInterval(tick, 1000);
  } else $('#phSub').textContent = name === 'WhatsApp' ? 'online' : `via ${name}`;
}
function setGoal(i) {
  goalIdx = i; const g = GOALS[i];
  goalBtns.forEach((b, n) => b.classList.toggle('is-on', n === i));
  $('#goalTag').textContent = g.tag; $('#goalTitle').textContent = g.title; $('#goalText').textContent = g.text;
  if (g.call) setChannel('Ligação');
  else if (phone.classList.contains('is-call')) setChannel('WhatsApp');
  playChat(g.chat);
}
function autoGoal() { clearInterval(goalTimer); goalTimer = setInterval(() => setGoal((goalIdx + 1) % GOALS.length), 7000); }
goalBtns.forEach((b, i) => b.addEventListener('click', () => { setGoal(i); autoGoal(); }));
chTabs.forEach(b => b.addEventListener('click', () => {
  if (b.textContent === 'Ligação') { setGoal(CALL); autoGoal(); return; }
  if (GOALS[goalIdx].call) { setGoal(0); autoGoal(); }
  setChannel(b.textContent);
  playChat(GOALS[goalIdx].chat);
}));
const canais = $('.canais');
new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGoal(goalIdx); autoGoal(); } else clearInterval(goalTimer); }, { threshold: .35 }).observe(canais);

/* ---------- serviços: card central em destaque ---------- */
const rail = $('#svcRail'), scards = $$('.scard', rail), svcDots = $('#svcDots');
svcDots.innerHTML = scards.map((_, i) => `<button aria-label="Serviço ${i + 1}"></button>`).join('');
const sdots = $$('button', svcDots);
function railFocus() {
  const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2;
  let best = 0, dist = Infinity;
  scards.forEach((c, i) => { const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < dist) { dist = d; best = i; } });
  scards.forEach((c, i) => c.classList.toggle('is-on', i === best));
  sdots.forEach((d, i) => d.classList.toggle('is-on', i === best));
}
const centerCard = (i, behavior = 'smooth') => { const c = scards[i]; rail.scrollTo({ left: c.offsetLeft - (rail.clientWidth - c.offsetWidth) / 2, behavior }); };
rail.addEventListener('scroll', () => requestAnimationFrame(railFocus), { passive: true });
sdots.forEach((d, i) => d.addEventListener('click', () => centerCard(i)));
scards.forEach((c, i) => c.addEventListener('click', e => { if (!c.classList.contains('is-on') && !e.target.closest('a')) centerCard(i); }));
addEventListener('load', () => { centerCard(2, 'instant'); railFocus(); });

/* ---------- resultados: setas ---------- */
const igRail = $('#igRail');
$('#igNext').addEventListener('click', () => igRail.scrollBy({ left: 296, behavior: 'smooth' }));
$('#igPrev').addEventListener('click', () => igRail.scrollBy({ left: -296, behavior: 'smooth' }));

/* ---------- calculadora ---------- */
const range = $('#calcRange');
const brl = v => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
const kfmt = k => k >= 1000 ? `R$ ${(k / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi` : `R$ ${k} mil`;
function calc() {
  const k = +range.value, rev = k * 1000, lost = rev * .2, rec = lost / 2;
  range.style.setProperty('--p', ((k - range.min) / (range.max - range.min) * 100) + '%');
  $('#calcVal').textContent = kfmt(k);
  $('#calcLost').textContent = brl(lost); $('#calcRec').textContent = brl(rec);
  $('#calcMain').textContent = brl(rec); $('#calcYear').textContent = brl(rec * 12);
  $('#barLost').style.width = '100%'; $('#barRec').style.width = '50%';
}
range.addEventListener('input', calc); calc();

/* ---------- jornada ---------- */
const STEPS = [
  ['Você chega até nós', 'Pelo site, WhatsApp ou indicação. Um especialista responde em minutos.'],
  ['Call de diagnóstico', 'Uma call pra entender o negócio, a base, os canais e onde a venda está escapando.'],
  ['Implantação', 'Acessos, integrações, funil e templates. A gente conecta tudo e aprova os modelos na Meta.'],
  ['Entrega', 'Em até 7 dias os fluxos estão no ar, o time treinado e o painel mostrando os números.'],
  ['Acompanhamento', 'Time dedicado no WhatsApp todos os dias, acompanhando métricas e ajustando campanhas.'],
];
const jrSteps = $$('.jr__step'), jrText = $('#jrText');
let jrIdx = 0, jrTimer;
function setJr(i) {
  jrIdx = i;
  jrSteps.forEach((s, n) => { s.classList.toggle('is-on', n === i); s.classList.toggle('done', n < i); });
  document.getElementById('jrFill').style.width = (i / 4 * 100) + '%';
  jrText.innerHTML = `<p class="eyebrow eyebrow--light">Etapa ${i + 1} de 5</p><h3>${STEPS[i][0]}</h3><p>${STEPS[i][1]}</p>`;
  jrText.classList.remove('swap'); void jrText.offsetWidth; jrText.classList.add('swap');
}
function autoJr() { clearInterval(jrTimer); jrTimer = setInterval(() => setJr((jrIdx + 1) % 5), 3500); }
jrSteps.forEach((s, i) => s.addEventListener('click', () => { setJr(i); autoJr(); }));
new IntersectionObserver(([e]) => e.isIntersecting ? autoJr() : clearInterval(jrTimer), { threshold: .4 }).observe($('.jr__panel'));

/* ---------- reveal ---------- */
const nfIO = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('in'); nfIO.disconnect(); } }, { threshold: .35 });
if (document.querySelector('.nf')) nfIO.observe(document.querySelector('.nf'));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.h2, .lead, .integ__map, .eco__grid, .browser, .calc__box, .res__rail, .ld__in > *').forEach(el => { el.classList.add('rv'); io.observe(el); });

/* ---------- modal → WhatsApp ---------- */
const modal = $('#modal');
const openModal = e => { e.preventDefault(); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => $('input', modal).focus(), 250); };
const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
// todos os CTAs abrem o WhatsApp direto
$$('[data-open-form]').forEach(b => {
  if (b.tagName === 'A') { b.href = WA_URL; b.target = '_blank'; b.rel = 'noopener'; }
  else b.addEventListener('click', () => open(WA_URL, '_blank'));
});
$$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
addEventListener('keydown', e => e.key === 'Escape' && closeModal());
$('#leadForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const text = `Olá! Vim pelo site da Reactiv.\n\n*Nome:* ${d.nome}\n*WhatsApp:* ${d.whats}\n*E-mail:* ${d.email}\n*Site/Instagram:* ${d.site || '-'}\n*Interesse:* ${d.interesse}`;
  open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  closeModal(); e.target.reset();
});

$('#year').textContent = new Date().getFullYear();
