const animals = [
      "قط","كلب","أسد","نمر","فيل","زرافة","حصان","ثعلب","ذئب","غزال",
      "سمكة","نسر","بقرة","جمل","ماعز","دب","بطريق","بطة","تمساح","قرد"
    ];

    // اختيارات DOM
    const heading = document.querySelector('#heading');
    const wordDiv = document.querySelector('#word');
    const keyboardDiv = document.querySelector('#keyboard');
    const mistakesSpan = document.querySelector('#mistakes');
    const maxMistakesSpan = document.querySelector('#maxMistakes');
    const addWordBtn = document.querySelector('#addWord');
    const resetBtn = document.querySelector('#reset');

    let chosenWord = "";
    let revealed = [];
    let mistakes = 0;
    const MAX_MISTAKES = 6;
    maxMistakesSpan.innerText = MAX_MISTAKES;

    function pickWord(){
      chosenWord = animals[Math.floor(Math.random() * animals.length)];
      console.log("الحيوان المختار:", chosenWord); // console.log
      mistakes = 0;
      mistakesSpan.innerText = mistakes;
      buildDisplay();
      buildKeyboard();
      heading.innerText = "😍 خمن اسم الحيوان  ";
    }
    function buildDisplay(){
      revealed = Array.from(chosenWord).map(ch => (ch === ' ' ? ' ' : '_'));
      wordDiv.innerText = revealed.join(' ');
    }

    function buildKeyboard(){
      keyboardDiv.innerHTML = '';
      const letters = [...new Set(chosenWord.replace(/\s+/g, '').split(''))];
      letters.forEach(letter => { // forEach
        const btn = document.createElement('button');
        btn.classList.add('letter-button'); // classList.add
        btn.innerText = letter; // innerText
        btn.addEventListener('click', () => onLetterClick(letter, btn)); // addEventListener
        keyboardDiv.appendChild(btn);
      });
    }
    function onLetterClick(letter, btn){
      console.log('اخترت:', letter); // console.log
      btn.classList.add('used');
      btn.disabled = true;
      if (chosenWord.indexOf(letter) !== -1){
        Array.from(chosenWord).forEach((ch, i) => { // forEach
          if (ch === letter) revealed[i] = ch;
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
        heading.innerText = 'مبروك!🎉';
        document.querySelectorAll('.letter-button').forEach(b => {
          b.disabled = true;
          b.classList.add('used');
        });
      }
    }
    function checkLose(){
      if (mistakes >= MAX_MISTAKES){
        heading.innerText = 'خسرت! الحيوان كان: ' + chosenWord;
        document.querySelectorAll('.letter-button').forEach(b => {
          b.disabled = true;
          b.classList.add('used');
        });
      }
    }
    addWordBtn.addEventListener('click', function(){
      const txt = customInput.value.trim();
      if (txt.length === 0){
        alert('من فضلك اكتب اسم حيوان صحيح');
        return;
      }
      animals.push(txt);
      console.log('أضيف حيوان جديد:', txt);
      pickWord();
    });
    resetBtn.addEventListener('click', function(){
      pickWord();
    });
    pickWord();