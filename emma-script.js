// ---------- الرسالة ----------
const LETTER = `Emma, not everyone earns a real place in our life, but you're the kind of person who truly does. ✨

From the moment we became friends, I've felt completely at ease with you. I can laugh freely, talk about anything, and just be myself without thinking twice.

Thank you for every time you showed up for me, every laugh we shared, and every little moment that stayed just between us. 🌟

Our friendship is one of the things I'm genuinely grateful for, and I hope it stays this warm and easy forever.

I just want you to know: having you in my life is something I truly appreciate. 💛`;

// ---------- عناصر تطفو في الخلفية ----------
const floatersEl = document.getElementById('floaters');
const symbols = ['✨','🌟','💫','🎈','⭐'];

function spawnFloater(){
  const el = document.createElement('span');
  el.className = 'floater';
  el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
  const left = Math.random()*90 + 2;
  const duration = 9 + Math.random()*8;
  const drift = (Math.random()*80 - 40) + 'px';
  el.style.left = left + 'vw';
  el.style.setProperty('--drift', drift);
  el.style.animationDuration = duration + 's';
  el.style.fontSize = (0.8 + Math.random()*0.9) + 'rem';
  floatersEl.appendChild(el);
  setTimeout(()=> el.remove(), duration*1000 + 500);
}
setInterval(spawnFloater, 850);
for(let i=0;i<5;i++) setTimeout(spawnFloater, i*300);

// ---------- الانتقال بين الصفحتين ----------
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const openBtn = document.getElementById('openBtn');

openBtn.addEventListener('click', ()=>{
  burstStars(openBtn);
  screen1.classList.add('leaving');
  setTimeout(()=>{
    screen1.classList.add('hidden');
    screen1.classList.remove('leaving');
    screen2.classList.remove('hidden');
    screen2.classList.add('entering');
    renderLetter();
  }, 480);
});

// نجوم صغيرة تظهر حول الزر عند الضغط
function burstStars(target){
  const rect = target.getBoundingClientRect();
  for(let i=0;i<6;i++){
    const s = document.createElement('span');
    s.className = 'mini-pop';
    s.textContent = ['✨','🌟','💫'][i % 3];
    s.style.left = (rect.left + rect.width/2 + (Math.random()*60-30)) + 'px';
    s.style.top = (rect.top + rect.height/2) + 'px';
    document.body.appendChild(s);
    setTimeout(()=> s.remove(), 1000);
  }
}

// ---------- الموسيقى (اختياري) ----------
// إذا حطيتي ملف صوت اسمه song.mp3 بنفس مجلد الموقع، الزر يظهر تلقائياً ويشتغل.
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let musicPlaying = false;

bgMusic.addEventListener('canplaythrough', ()=>{
  musicBtn.classList.remove('hidden-music');
}, { once:true });
bgMusic.addEventListener('error', ()=>{
  musicBtn.classList.add('hidden-music'); // ما فيه ملف أغنية، الزر يختفي
});
bgMusic.load();

musicBtn.addEventListener('click', ()=>{
  if(musicPlaying){
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  } else {
    bgMusic.play().catch(()=>{});
    musicBtn.classList.add('playing');
  }
  musicPlaying = !musicPlaying;
});

// ---------- ظهور النص تدريجيًا سطر بسطر ----------
function renderLetter(){
  const container = document.getElementById('letterText');
  if(container.dataset.rendered) return;
  container.dataset.rendered = 'true';
  const paragraphs = LETTER.split('\n');
  paragraphs.forEach((line, i)=>{
    const p = document.createElement('div');
    p.className = 'reveal-line';
    p.textContent = line.length ? line : '\u00A0';
    p.style.animationDelay = (0.15 * i) + 's';
    container.appendChild(p);
  });
}
