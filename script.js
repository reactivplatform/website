// Número que recebe os leads do formulário (só dígitos, com DDI). Troque pelo WhatsApp comercial.
const WHATSAPP = '5500000000000';

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
];

/* ---------- conteúdo dinâmico ---------- */
const chips = CLIENTS.map(c => `<span><img src="img/ig/${c.img}.jpg" alt="" width="34" height="34" loading="lazy">${esc(c.name)}</span>`).join('');
$('#logos').innerHTML = chips + chips;

$('#intGrid').innerHTML = INTEGRATIONS.map(n => `<div class="icard"><img src="img/int/${slug(n)}.png" alt="" loading="lazy">${n}</div>`).join('');
$('#chGrid').innerHTML = CHANNELS.map(n => `<div class="icard"><img src="img/int/${slug(n)}.png" alt="" loading="lazy">${n}</div>`).join('');

$('#igRail').innerHTML = CLIENTS.map(c => `
  <a class="igc" href="https://www.instagram.com/${c.user}/" target="_blank" rel="noopener">
    <div class="igc__top"><img class="igc__av" src="img/ig/${c.img}.jpg" alt="${esc(c.name)}" width="64" height="64" loading="lazy">
      <div><p class="igc__user">${c.user}${c.ok ? VERIFIED : ''}</p><p class="igc__name">${esc(c.name)}</p></div></div>
    <div class="igc__stats"><div><b>${c.posts}</b><span>posts</span></div><div><b>${c.followers}</b><span>seguidores</span></div><div><b>${c.following}</b><span>seguindo</span></div></div>
    <p class="igc__cat">${esc(c.cat)}<em>Ver perfil ↗</em></p>
  </a>`).join('');

/* ---------- nav ---------- */
const nav = $('#nav'), hero = $('.hero'), dock = $('.dock');
function navTheme() { nav.classList.toggle('is-light', scrollY > hero.offsetHeight + dock.offsetHeight - 80); }
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
function setGoal(i) {
  goalIdx = i; const g = GOALS[i];
  goalBtns.forEach((b, n) => b.classList.toggle('is-on', n === i));
  $('#goalTag').textContent = g.tag; $('#goalTitle').textContent = g.title; $('#goalText').textContent = g.text;
  playChat(g.chat);
}
function autoGoal() { clearInterval(goalTimer); goalTimer = setInterval(() => setGoal((goalIdx + 1) % GOALS.length), 7000); }
goalBtns.forEach((b, i) => b.addEventListener('click', () => { setGoal(i); autoGoal(); }));
$$('#chTabs button').forEach(b => b.addEventListener('click', () => {
  $$('#chTabs button').forEach(x => x.classList.toggle('is-on', x === b));
  $('#phSub').textContent = b.textContent === 'WhatsApp' ? 'online' : `via ${b.textContent}`;
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

/* ---------- tour do painel ---------- */
const tabs = $$('#tourTabs button'), views = $$('.tv'), prog = $('#tourProg');
let tourIdx = 0, tourTimer;
function setTour(i) {
  tourIdx = i;
  tabs.forEach((b, n) => b.classList.toggle('is-on', n === i));
  views.forEach((v, n) => v.classList.toggle('is-on', n === i));
  const b = tabs[i]; prog.style.left = b.offsetLeft + 'px'; prog.style.width = b.offsetWidth + 'px';
  prog.classList.remove('run'); void prog.offsetWidth; prog.classList.add('run');
}
function autoTour() { clearInterval(tourTimer); tourTimer = setInterval(() => setTour((tourIdx + 1) % tabs.length), 6000); }
tabs.forEach((b, i) => b.addEventListener('click', () => { setTour(i); autoTour(); }));
addEventListener('load', () => setTour(0)); addEventListener('resize', () => setTour(tourIdx));
new IntersectionObserver(([e]) => e.isIntersecting ? autoTour() : clearInterval(tourTimer), { threshold: .3 }).observe($('.browser'));

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
  jrText.innerHTML = `<p class="eyebrow eyebrow--light">Etapa ${i + 1} de 5</p><h3>${STEPS[i][0]}</h3><p>${STEPS[i][1]}</p>`;
  jrText.classList.remove('swap'); void jrText.offsetWidth; jrText.classList.add('swap');
}
function autoJr() { clearInterval(jrTimer); jrTimer = setInterval(() => setJr((jrIdx + 1) % 5), 3500); }
jrSteps.forEach((s, i) => s.addEventListener('click', () => { setJr(i); autoJr(); }));
new IntersectionObserver(([e]) => e.isIntersecting ? autoJr() : clearInterval(jrTimer), { threshold: .4 }).observe($('.jr__panel'));

/* ---------- reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.h2, .lead, .integ__map, .eco__grid, .browser, .calc__box, .res__rail, .ld__in > *').forEach(el => { el.classList.add('rv'); io.observe(el); });

/* ---------- modal → WhatsApp ---------- */
const modal = $('#modal');
const openModal = e => { e.preventDefault(); modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); setTimeout(() => $('input', modal).focus(), 250); };
const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
$$('[data-open-form]').forEach(b => b.addEventListener('click', openModal));
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
