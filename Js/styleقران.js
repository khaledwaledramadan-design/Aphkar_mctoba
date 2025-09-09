const surahs = [
      "الفاتحة","البقرة","آل عمران","النساء","المائدة",
      "الأنعام","الأعراف","الأنفال","التوبة","يونس",
      "هود","يوسف","الرعد","إبراهيم","الحجر",
      "النحل","الإسراء","الكهف","مريم","طه",
      "الأنبياء","الحج","المؤمنون","النور","الفرقان",
      "الشعراء","النبإ","الضحى","الشرح","التكوير",
      "الاخلاص","الفلق","الناس"
    ];

    const heading = document.querySelector('#heading'); // [USE: querySelector]
    const wordDiv = document.querySelector('#word'); // [USE: querySelector]
    const keyboardDiv = document.querySelector('#keyboard'); // [USE: querySelector]
    const mistakesSpan = document.querySelector('#mistakes'); // [USE: querySelector]
    const maxMistakesSpan = document.querySelector('#maxMistakes'); // [USE: querySelector]
    const addWordBtn = document.querySelector('#addWord'); // [USE: querySelector]
    const customInput = document.querySelector('#customWord'); // [USE: querySelector]
    const resetBtn = document.querySelector('#reset'); // [USE: querySelector]

    let chosenWord = "";
    let revealed = [];
    let mistakes = 0;
    const MAX_MISTAKES = 6;
    maxMistakesSpan.innerText = MAX_MISTAKES; 
    function pickWord(){
      chosenWord = surahs[Math.floor(Math.random() * surahs.length)];
      console.log("الكلمة المختارة:", chosenWord);
      mistakes = 0;
      mistakesSpan.innerText = mistakes; 
      buildDisplay();
      buildKeyboard();
      heading.innerText = "خمن اسم السورة";
    }
    function normalize(s){
      return s.replace(/[\u064B-\u0652]/g, '').trim();
    }
    function buildDisplay(){
      revealed = Array.from(chosenWord).map(ch => (ch === ' ' ? ' ' : '_'));
      wordDiv.innerText = revealed.join(' '); 
    }
    function buildKeyboard(){
      keyboardDiv.innerHTML = '';
      const letters = [...new Set(normalize(chosenWord).replace(/\s+/g, '').split(''))];
      letters.forEach(letter => { 
        const btn = document.createElement('button');
        btn.classList.add('letter-button'); 
        btn.innerText = letter; 
        btn.addEventListener('click', () => onLetterClick(letter, btn)); 
        keyboardDiv.appendChild(btn);
      });
    }

    function onLetterClick(letter, btn){
      console.log('تم اختيار الحرف:', letter); 
      btn.classList.add('used'); 
      btn.disabled = true;

      const normWord = normalize(chosenWord);
      if (normWord.indexOf(letter) !== -1){
        Array.from(chosenWord).forEach((ch, i) => { 
          if (normalize(ch) === letter) revealed[i] = ch;
        });
        wordDiv.innerText = revealed.join(' ');
        checkWin();
      } else {
        mistakes++;
        mistakesSpan.innerText = mistakes; 
        checkLose();
      }
    }

    function checkWin(){
      if (!revealed.includes('_')){
        heading.innerText = '🤍😍ما شاء الله';
        document.querySelectorAll('.letter-button').forEach(b => {          b.disabled = true;
          b.classList.add('used');
        });
      }
    }

    function checkLose(){
      if (mistakes >= MAX_MISTAKES){
        heading.innerText = 'خسرت! الكلمة كانت: ' + chosenWord;
        document.querySelectorAll('.letter-button').forEach(b => { 
          b.disabled = true;
          b.classList.add('used');
        });
      }
    }
    addWordBtn.addEventListener('click', function(){ 
      const txt = customInput.value.trim(); 
      if (txt.length === 0){ 
        alert('من فضلك اكتب اسم سورة صحيح قبل الإضافة');
        return;
      }
      surahs.push(txt);
      console.log('أضيفت سورة جديدة:', txt); 
      pickWord();
    });
    resetBtn.addEventListener('click', function(){
      pickWord();
    });
    pickWord();