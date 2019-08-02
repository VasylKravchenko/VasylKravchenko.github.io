let play = confirm('Do you want to play a game?');
let multiplier = 2;
let rangeStep = 4;
let divider = 2;

if (play) {
    while (play) {
        let startRange = 8;
        let startPrize = 100;
        let totalPrize = 0;
        let playCircle = true;
        let currentPrizePossible = startPrize;
        let currentRange = startRange;

        while (playCircle) {
            let random = Math.floor(Math.random() * (startRange + 1));
            let stepUp = true;

            for (let atempts = 3; atempts > 0; atempts--) {
                let msg = +prompt(`Choose a roulette pocket number from 0 to ${currentRange}
                Attempts left: ${atempts}
                Total prize: ${totalPrize}$
                Possible prize on current attempt: ${currentPrizePossible}$`);

                if (!msg) {
                    stepUp = false;
                    alert(`Thank you for your participation. Your prize is: ${totalPrize}$.`);
                    break;
                } else if (msg !== random || msg < 0 || isNaN(msg) || msg > currentRange) {
                    currentPrizePossible /= divider;
                    if (atempts === 1) {
                        currentPrizePossible = startPrize;
                        currentRange = startRange;
                        stepUp = alert(`Thank you for your participation. Your prize is: ${totalPrize}$.`);
                        break;
                    }
                } else if (msg === random) {
                    totalPrize += currentPrizePossible;
                    currentPrizePossible *= multiplier;
                    currentRange += rangeStep;
                    stepUp = confirm(`Congratulation, you won! Your prize is: ${totalPrize}$.
                    Do you want to continue?`);
                    break;
                } 
            }
            if (!stepUp){
                break;
            }
        }
        playCircle = confirm(`Do you want to play again?`);
        if (!playCircle) {
            alert('You did not become a billionaire, but can.');
            break;
        }            
    }
} else {
    alert('You did not become a billionaire, but can.');
}