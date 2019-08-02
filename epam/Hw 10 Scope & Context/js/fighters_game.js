class Fighter {
    constructor(person) {
        let name = person.name;
        let dmg = person.damage;
        let hp = person.hp;
        let agility = person.agility;
        let fullHp = person.hp;
        let wins = 0;
        let losses = 0;
        this.getName = function () {
            return name;
        };
        this.getDamage = function () {
            return dmg;
        };
        this.getHealth = function () {
            return hp;
        };
        this.getAgility = function () {
            return agility;
        };
        this.heal = function (addHp) {
            if (fullHp > hp + addHp) {
                hp += addHp;
            } else {
                hp = fullHp;
            }
        };
        this.dealDamage = function (dmg) {
            if (hp > 0 && dmg < hp) {
                hp -= dmg;
            } else {
                hp = 0;
            }
        };
        this.attack = function (defender) {
            let successRange = 100;
            let successPoint = Math.floor(Math.random() * successRange + 1);
            let attackProbability = successRange - defender.getAgility();
            if (attackProbability <= successPoint) {
                defender.dealDamage(dmg);
                console.log(`${name} makes ${dmg} damage ${defender.getName()}`);
            } else {
                console.log(`${name} attack missed`);
            }
        };
        this.addWin = function () {
            wins++;
        };
        this.addLoss = function () {
            losses++;
        };
        this.logCombatHistory = function () {
            console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
        };
    }
}

function battle(unit1, unit2) {
    let hp1 = unit1.getHealth();
    let hp2 = unit2.getHealth();

    if (hp1 > 0 && hp2 > 0) {
        while (hp1 > 0 && hp2 > 0) {
            unit1.attack(unit2);
            hp2 = unit2.getHealth();
            if (hp2 > 0) {
                unit2.attack(unit1);
                hp1 = unit1.getHealth();
            }
        }
        if (hp1 > 0) {
            unit1.addWin();
            unit2.addLoss();
        } else {
            unit2.addWin();
            unit1.addLoss();
        }
    } else if (hp1 === 0) {
        return console.log(`${unit1.getName()} is dead`);
    } else {
        return console.log(`${unit2.getName()} is dead`);
    }
}
