const WORDS = [
    { word: 'Ёжик', correct: true },
    { word: 'Ель', correct: true },
    { word: 'Юла', correct: true },
    { word: 'Яблоко', correct: true },
    { word: 'Лес', correct: false },
    { word: 'Дом', correct: false },
    { word: 'Кот', correct: false },
    { word: 'Мышь', correct: false }
];

const LEVELS = [
    { name: 'Простой', count: 4, need: 2 },
    { name: 'Средний', count: 6, need: 3 },
    { name: 'Сложный', count: 8, need: 4 }
];

class Game {
    constructor() {
        this.level = 0;
        this.score = 0;

        this.grid = document.getElementById('pancakes');
        this.scoreEl = document.getElementById('score');
        this.levelName = document.getElementById('level-name');

        document.getElementById('start-btn').onclick = () => this.start();
        document.getElementById('next-level').onclick = () => this.nextLevel();
    }

    start() {
        document.getElementById('start-screen').classList.add('hidden');
        this.loadLevel();
    }

    loadLevel() {
        this.grid.innerHTML = '';
        this.score = 0;
        this.scoreEl.textContent = '0';

        const level = LEVELS[this.level];
        this.levelName.textContent = level.name;

        const words = [...WORDS].sort(() => Math.random() - 0.5).slice(0, level.count);

        words.forEach(data => {
            const card = document.createElement('div');
            card.className = 'pancake text-2xl font-bold';
            card.textContent = data.word;

            card.onclick = () => this.click(card, data.correct);

            this.grid.appendChild(card);
        });
    }

    click(card, correct) {
        if (correct) {
            card.classList.add('correct');
            this.score++;
            this.scoreEl.textContent = this.score;

            if (this.score >= LEVELS[this.level].need) {
                setTimeout(() => {
                    document.getElementById('win-screen').classList.remove('hidden');
                }, 500);
            }
        } else {
            card.classList.add('wrong');
        }
    }

    nextLevel() {
        document.getElementById('win-screen').classList.add('hidden');
        this.level++;

        if (this.level >= LEVELS.length) {
            alert('Игра пройдена! 🎉');
            location.reload();
        } else {
            this.loadLevel();
        }
    }
}

window.game = new Game();
