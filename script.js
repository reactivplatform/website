// Número que recebe os leads do formulário (só dígitos, com DDI). Troque pelo WhatsApp comercial.
const WHATSAPP = '5500000000000';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => s.replace(/&/g, '&amp;');
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const VERIFIED = '<svg viewBox="0 0 40 40" aria-label="Verificado"><path fill="#0095F6" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Z"/><path fill="#fff" d="m17.2 27.5-6.5-6.4 2.4-2.4 4.1 4.1 9.6-9.6 2.4 2.4z"/></svg>';

const CLIENTS = [
  { user: 'rafaolorenzatto', img: 'rafa', name: 'Rafael Lorenzatto', cat: 'Empresário', followers: '1,5 mi', ok: true },
  { user: 'v4company', img: 'v4', name: 'V4 Company', cat: 'Marketing & Vendas', followers: '861 mil', ok: true },
  { user: 'dallastorebrasil', img: 'dalla', name: 'DallaStore', cat: 'Moda feminina', followers: '744 mil', ok: true },
  { user: 'lojarenatogarciayt', img: 'renato', name: 'Loja Renato Garcia', cat: 'E-commerce', followers: '740 mil' },
  { user: 'amazetravel', img: 'amaze', name: 'Amaze', cat: 'Viagem de formatura', followers: '340 mil' },
  { user: 'paraguaicapitalbr', img: 'paraguaicapitalbr', name: 'Paraguai Capital', cat: 'Imigração', followers: '193 mil' },
  { user: 'saviorabrasil', img: 'saviora', name: 'Saviora Brasil', cat: 'Saúde e beleza', followers: '164 mil', ok: true },
  { user: 'va.vi.ve', img: 'va.vi.ve', name: 'Vavivê Franquias', cat: 'Franquias', followers: '102 mil' },
  { user: 'bubbleboxlav', img: 'bubbleboxlav', name: 'Bubble Box', cat: 'Lavanderia', followers: '24 mil' },
];

const INTEGRATIONS = ['Shopify', 'Nuvemshop', 'Yampi', 'Cartpanda', 'Hotmart', 'Kiwify', 'Stripe', 'Mercado Pago', 'YouShop', 'Appmax', 'Guru', 'Bling', 'Tiny ERP', 'Omie', 'Correios', 'Melhor Envio', 'Frenet', 'Jadlog', 'WooCommerce', 'Eduzz', 'Monetizze', 'Asaas', 'PagBank', 'RD Station'];
const CHANNELS = ['WhatsApp API', 'Instagram DM', 'E-mail', 'SMS'];

/* ---------- nav ---------- */
const nav = $('#nav');
addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 8), { passive: true });
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
$$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

/* ---------- hero: cronômetro de reação ---------- */
const ticks = $('#ticks');
ticks.innerHTML = Array.from({ length: 60 }, (_, i) => {
  const a = i * 6 * Math.PI / 180, major = i % 5 === 0, r1 = major ? 78 : 82, r2 = 86;
  return `<line class="${major ? 'major' : ''}" x1="${100 + r1 * Math.cos(a)}" y1="${100 + r1 * Math.sin(a)}" x2="${100 + r2 * Math.cos(a)}" y2="${100 + r2 * Math.sin(a)}"/>`;
}).join('');

const SCENES = [
  { who: 'Mariana', ch: 'WhatsApp', ask: 'Tem no tamanho M?', end: 3.8, ok: 'respondido pela I.A' },
  { who: '@lojadacris', ch: 'Instagram', ask: 'Respondeu ao story', end: 2.6, ok: 'link de compra enviado' },
  { who: 'Pedro', ch: 'Site', ask: 'Orçamento para 40 un.', end: 5.2, ok: 'enviado ao vendedor' },
  { who: 'Juliana', ch: 'WhatsApp', ask: 'Pix pendente há 15 min', end: 1.9, ok: 'lembrete disparado' },
];
const feed = $('#feed'), wTime = $('#watchTime'), wState = $('#watchState'), wProg = $('#watchProg');
const CIRC = 578;
let scene = 0;
function addFeed(icon, text, t) {
  const li = document.createElement('li');
  li.innerHTML = `<svg class="ic"><use href="#i-${icon}"/></svg><span>${text}</span><time>${t}</time>`;
  feed.prepend(li);
  while (feed.children.length > 3) feed.lastChild.remove();
}
function runScene() {
  const s = SCENES[scene++ % SCENES.length];
  const icon = s.ch === 'Instagram' ? 'insta' : s.ch === 'Site' ? 'mail' : 'chat';
  addFeed(icon, `<b>${s.who}</b> · ${s.ask}`, 'agora');
  wState.textContent = `lead via ${s.ch}…`;
  if (reduce) { wTime.textContent = `00:0${Math.round(s.end)}`; return setTimeout(runScene, 4000); }
  const t0 = performance.now();
  (function frame(now) {
    const t = Math.min((now - t0) / 1000, s.end);
    wTime.textContent = `00:${t.toFixed(1).padStart(4, '0')}`;
    wProg.style.strokeDashoffset = CIRC - CIRC * (t / 10);
    if (t < s.end) return requestAnimationFrame(frame);
    wState.textContent = `✓ ${s.ok}`;
    addFeed('check', `${s.ok[0].toUpperCase() + s.ok.slice(1)}`, `${s.end.toFixed(1)}s`);
    setTimeout(() => { wProg.style.transition = 'none'; wProg.style.strokeDashoffset = CIRC; wProg.getBoundingClientRect(); wProg.style.transition = ''; runScene(); }, 2200);
  })(t0);
}
setTimeout(runScene, 600);

const TICKS = ['<b>+R$ 389,90</b> Pix recuperado · Moda', '<b>4s</b> resposta da I.A · Cosméticos', '<b>+R$ 1.240</b> carrinho recuperado · Suplementos', '<b>32</b> leads qualificados hoje · Franquia', '<b>98%</b> de leitura no rastreio · E-commerce', '<b>+R$ 4.900</b> proposta fechada · Serviços', '<b>12</b> agendamentos pela I.A · Clínica', '<b>31,8%</b> de recompra · Skincare'];
$('#ticker').innerHTML = [...TICKS, ...TICKS].map(t => `<span>${t}</span>`).join('');

/* ---------- contadores ---------- */
const countIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; countIO.unobserve(e.target);
  const el = e.target, end = +el.dataset.count, t0 = performance.now();
  (function f(now) { const p = Math.min((now - t0) / 1200, 1); el.textContent = Math.round(end * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(f); })(t0);
}), { threshold: .5 });
$$('[data-count]').forEach(el => countIO.observe(el));

/* ---------- manifesto: palavras acendem com o scroll ---------- */
const man = $('#manifesto');
(function splitWords(node) {
  [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(w => { if (!w.trim()) return frag.append(w); const s = document.createElement('span'); s.className = 'w'; s.textContent = w; frag.append(s); });
      n.replaceWith(frag);
    } else splitWords(n);
  });
})(man);
const words = $$('.w', man);
function manScroll() {
  const r = man.getBoundingClientRect(), p = (innerHeight * .85 - r.top) / (r.height + innerHeight * .35);
  const n = Math.round(Math.min(Math.max(p, 0), 1) * words.length);
  words.forEach((w, i) => w.classList.toggle('on', i < n));
}

/* ---------- método: linha do tempo ---------- */
const tl = $('#timeline'), tlItems = $$('.tl__item'), mClock = $('#mClock');
function tlScroll() {
  const r = tl.getBoundingClientRect(), mid = innerHeight * .55;
  const fill = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
  tl.style.setProperty('--fill', fill * 100 + '%');
  let last = -1;
  tlItems.forEach((li, i) => { const on = li.getBoundingClientRect().top < mid; li.classList.toggle('on', on); if (on) last = i; });
  mClock.textContent = last < 0 ? '00:00' : tlItems[last].dataset.t;
}

addEventListener('scroll', () => { manScroll(); tlScroll(); }, { passive: true });
manScroll(); tlScroll();

/* ---------- clientes: índice com prévia da foto ---------- */
const idx = $('#idx'), peek = $('#peek');
idx.insertAdjacentHTML('beforeend', CLIENTS.map((c, i) => `
  <a class="row" href="https://www.instagram.com/${c.user}/" target="_blank" rel="noopener" data-img="img/ig/${c.img}.jpg">
    <span class="row__n">${String(i + 1).padStart(2, '0')}</span>
    <img class="row__av" src="img/ig/${c.img}.jpg" alt="" width="44" height="44" loading="lazy">
    <span class="row__brand"><b>${esc(c.name)}</b><small>@${c.user}${c.ok ? VERIFIED : ''}</small></span>
    <span class="row__seg">${esc(c.cat)}</span>
    <span class="row__f">${c.followers}</span>
    <span class="row__go"><svg class="ic"><use href="#i-arrow"/></svg></span>
  </a>`).join(''));
if (matchMedia('(hover: hover)').matches) {
  $$('.row', idx).forEach(r => {
    r.addEventListener('mouseenter', () => { peek.src = r.dataset.img; peek.classList.add('on'); });
    r.addEventListener('mouseleave', () => peek.classList.remove('on'));
    r.addEventListener('mousemove', e => { peek.style.left = e.clientX + 120 + 'px'; peek.style.top = e.clientY + 'px'; });
  });
}

/* ---------- plataforma ---------- */
const tBtns = $$('#tourList button'), views = $$('.view'), paths = ['/inbox', '/funil', '/receita', '/automacoes'];
let tIdx = 0, tTimer;
function setTour(i) {
  tIdx = i;
  tBtns.forEach((b, n) => { b.classList.remove('is-on'); if (n === i) { void b.offsetWidth; b.classList.add('is-on'); } });
  views.forEach((v, n) => v.classList.toggle('is-on', n === i));
  $('#tourPath').textContent = paths[i];
}
function autoTour() { clearInterval(tTimer); tTimer = setInterval(() => setTour((tIdx + 1) % tBtns.length), 6000); }
tBtns.forEach((b, i) => b.addEventListener('click', () => { setTour(i); autoTour(); }));
new IntersectionObserver(([e]) => e.isIntersecting ? (setTour(tIdx), autoTour()) : clearInterval(tTimer), { threshold: .3 }).observe($('.tour'));

/* ---------- órbita de integrações ---------- */
$('#intTags').innerHTML = INTEGRATIONS.map(n => `<li>${n}</li>`).join('') + '<li>API + Webhooks</li>';
const rings = [[CHANNELS, '.orbit__ring--1'], [INTEGRATIONS.slice(0, 8), '.orbit__ring--2'], [INTEGRATIONS.slice(8, 20), '.orbit__ring--3']];
rings.forEach(([list, sel]) => {
  const ring = $(sel);
  ring.innerHTML = list.map((n, i) => `<span class="orb" style="--a:${i * 360 / list.length}deg;--r:calc(var(--rr) * 1px)" title="${n}"><img src="img/int/${slug(n)}.png" alt="${n}" loading="lazy"></span>`).join('');
});
function sizeOrbit() { $$('.orbit__ring').forEach(r => r.style.setProperty('--rr', r.offsetWidth / 2)); }
addEventListener('resize', sizeOrbit); sizeOrbit();

/* ---------- calculadora ---------- */
const range = $('#calcRange');
const brl = v => 'R$ ' + Math.round(v).toLocaleString('pt-BR');
function calc() {
  const k = +range.value, lost = k * 1000 * .2, rec = lost / 2;
  range.style.setProperty('--p', (k - range.min) / (range.max - range.min) * 100 + '%');
  $('#calcVal').textContent = k >= 1000 ? `R$ ${(k / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} mi` : `R$ ${k} mil`;
  $('#cLost').textContent = brl(lost); $('#cRec').textContent = brl(rec); $('#cYear').textContent = brl(rec * 12);
}
range.addEventListener('input', calc); calc();

/* ---------- reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
$$('.title, .head-row .body, .bx, .receipt__paper, .stamp, .calc__box, .steps__row li, .orbit, .screen, .cta__title').forEach(el => { el.classList.add('rv'); io.observe(el); });

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
