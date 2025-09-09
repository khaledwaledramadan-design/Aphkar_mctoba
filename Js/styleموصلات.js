const transports = [
      "سيارة","حافلة","قطار","مترو","ترام","طائرة","هليكوبتر",
      "سفينة","زورق","عبارة","شاحنة","دراجة","دراجة نارية",
      "تاكسي","عربة","جرار","قارب","باخرة"
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
    maxMistakesSpan.innerText = MAX_MISTAKES; // [USE: innerText]

    function pickWord(){
      chosenWord = transports[Math.floor(Math.random() * transports.length)];
      console.log("كلمة مختارة:", chosenWord); // [USE: console.log]
      mistakes = 0;
      mistakesSpan.innerText = mistakes; // [USE: innerText]
      buildDisplay();
      buildKeyboard();
      heading.innerText = "خمن وسيلة النقل "; // [USE: heading.innerText]
    }
    function buildDisplay(){
      revealed = Array.from(chosenWord).map(ch => (ch === ' ' ? ' ' : '_'));
      wordDiv.innerText = revealed.join(' '); // [USE: innerText]
    }
    function buildKeyboard(){
      keyboardDiv.innerHTML = '';
      const letters = [...new Set(chosenWord.replace(/\s+/g, '').split(''))];
      letters.forEach(letter => {
        const btn = document.createElement('button');
        btn.classList.add('letter-button'); // [USE: classList.add]
        btn.innerText = letter; // [USE: innerText]
        btn.addEventListener('click', () => onLetterClick(letter, btn)); // [USE: addEventListener]
        keyboardDiv.appendChild(btn);
      });
    }
    function onLetterClick(letter, btn){
      console.log('تم اختيار الحرف:', letter); // [USE: console.log]
      btn.classList.add('used'); // [USE: classList.add]
      btn.disabled = true;

      if (chosenWord.indexOf(letter) !== -1){
        Array.from(chosenWord).forEach((ch, i) => { // [USE: forEach]
          if (ch === letter) revealed[i] = ch;
        });
        wordDiv.innerText = revealed.join(' ');
        checkWin();
      } else {
        mistakes++;
        mistakesSpan.innerText = mistakes; // [USE: innerText]
        checkLose();
      }
    }

    function checkWin(){
      if (!revealed.includes('_')){
        heading.innerText = '! فزت 🎉'; // [USE: heading.innerText]
        document.querySelectorAll('.letter-button').forEach(b => { // [USE: querySelectorAll]
          b.disabled = true;
          b.classList.add('used'); // [USE: classList.add]
        });
      }
    }

    function checkLose(){
      if (mistakes >= MAX_MISTAKES){
        heading.innerText = 'خسرت! الكلمة كانت: ' + chosenWord; // [USE: heading.innerText]
        document.querySelectorAll('.letter-button').forEach(b => {
          b.disabled = true;
          b.classList.add('used');
        });
      }
    }
    addWordBtn.addEventListener('click', function(){ // [USE: addEventListener]
      const txt = customInput.value.trim(); // [USE: trim()]
      if (txt.length === 0){ // [USE: trim().length عن طريق txt.length بعد trim()]
        alert('من فضلك اكتب اسم وسيلة نقل صحيح قبل الإضافة');
        return;
      }
      transports.push(txt);
      console.log('أضيفت وسيلة نقل جديدة:', txt); // [USE: console.log]
      pickWord();
    });
    resetBtn.addEventListener('click', function(){ // [USE: addEventListener]
      pickWord();
    });
    pickWord();