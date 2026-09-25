// ---------- الرسالة ----------
const LETTER = `زينب، شلون أگدر أوصف لج شكد وجودچ بحياتي صار شيء ما أگدر أستغني عنه؟
أنتِ مو بس شخص أحبه، أنتِ الشي الحلو اللي كل ما أتذكره أبتسم من دون ما أحس. ❤️

أحب تفاصيلچ كلها، ضحكتچ، سوالفچ، وحتى أبسط الأشياء اللي تسوينها تبقى بقلبي أكثر مما تتصورين.
وأحب شعوري وياچ، لأن وياچ أحس الدنيا تصير أهدأ وأجمل.

زينب، لو أگدر أجمع كل الكلام الحلو بالعالم وأهديه إلچ، هم ما راح يكفي حتى أوصف مكانچ بقلبي.
أنتِ بالنسبة إلي مو مجرد حبيبة، أنتِ شخص أتمنى يبقى وياي بكل أيامي الجاية. 🌸

وأريدچ تعرفين شيء واحد:
مهما حاولت أوصف حبي إلچ بالكلام، راح يبقى اللي بقلبي أكبر من كل الكلام.
أحبچ يا زينب، وبكل مرة أشوف اسمچ أحس قلبي يبتسم من جديد. ❤️✨`;

// ---------- عناصر تطفو في الخلفية ----------
const floatersEl = document.getElementById('floaters');
const symbols = ['❤️','💗','✨','⭐','🩷'];

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
setInterval(spawnFloater, 900);
for(let i=0;i<5;i++) setTimeout(spawnFloater, i*300);

// ---------- الانتقال بين الصفحتين ----------
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const openBtn = document.getElementById('openBtn');

openBtn.addEventListener('click', (e)=>{
  burstHearts(openBtn);
  screen1.classList.add('leaving');
  setTimeout(()=>{
    screen1.classList.add('hidden');
    screen1.classList.remove('leaving');
    screen2.classList.remove('hidden');
    screen2.classList.add('entering');
    renderLetter();
  }, 480);
});

// قلوب صغيرة تظهر حول الزر عند الضغط
function burstHearts(target){
  const rect = target.getBoundingClientRect();
  for(let i=0;i<6;i++){
    const h = document.createElement('span');
    h.className = 'mini-heart';
    h.textContent = ['❤️','💗','✨'][i % 3];
    h.style.left = (rect.left + rect.width/2 + (Math.random()*60-30)) + 'px';
    h.style.top = (rect.top + rect.height/2) + 'px';
    document.body.appendChild(h);
    setTimeout(()=> h.remove(), 1000);
  }
}

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
