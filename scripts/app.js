//DOM
const start_btn = document.querySelector('.start');
const title = document.querySelector('.title');
const game = document.querySelector('.game');
const word = document.querySelector('.word');
const pl = document.querySelector('.placeholder')
const answer = game.querySelector('.answer');
const over = document.querySelector('.over');
const dom_used_letters = document.querySelector('.used-letters').querySelector('ul');


//title button
start_btn.addEventListener('click',()=>{
     title.classList.add('d-none');
     game.parentElement.classList.remove('d-none');

});

const printUnderscores =(password) =>{
    const size = password.length;
    for(let i=0;i<size;i++){
        const html =`<span class="underscore ${password[i]}">_</span>`;
        word.innerHTML+=html;
    }
};
getWord()
.then(data=>{
    printUnderscores(data.toString());
    work(data.toString());
}).catch(err=>console.log(err));
let game_cond ={
    allowed:/[a-z][A-Z]/,
    wrong_answers: 0,
    correct_answers : 0,
    used_letters: new Set(),
};

const work = (password)=>{
    addEventListener('keypress',keyPress = (key) => {
        const letter = key.key.toLowerCase();
        if(password.includes(letter)){
            document.querySelectorAll('.underscore').forEach(underscore=>{
                if(underscore.classList.contains(`${letter}`)){
                    underscore.textContent = letter;
                    underscore.classList.remove(letter);
                    game_cond.correct_answers++;
                    console.log(game_cond.correct_answers,letter);
                    if(game_cond.correct_answers===password.length){
                        // alert("YOU WIN");
                        showResult(true);
                        removeEventListener('keypress',keyPress);
                    }
                }
            })
        }else{
            if(pl.classList.contains('d-none')){
                pl.classList.remove('d-none');
            }
            if(!game_cond.used_letters.has(letter)){
                game_cond.wrong_answers++;
            }
            pl.src = `./img/man/${game_cond.wrong_answers}.png`;
            if(game_cond.wrong_answers===8){
                // alert("GAME OVER");
                showAnswer(password);
                showResult(false);
                removeEventListener('keypress',keyPress);
            }

            // const html = `<li>${letter}</li>`;
            // document.querySelector('.used-letters').innerHTML+=html;
        }
        if(!game_cond.used_letters.has(letter)){
            dom_used_letters.innerHTML +=`<li>${letter}</li>`;
        }
        game_cond.used_letters.add(`${letter}`);
    });
};
const showAnswer = password => {
    answer.textContent = password;
}
const showResult = outcome =>outcome?over.textContent = 'YOU WIN':over.textContent = 'GAME OVER';




//TODO make code cleaner
//TODO add API with words (add definition of a word)
//TODO add posibility of inpuiting spacebar
//TODO display used letters
//TODO replace alert message with div