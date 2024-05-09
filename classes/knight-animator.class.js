class KnightAnimator {
    condition = [];
    flipBook = [];


    constructor(knight) {
        this.knight = knight;
        this.setConditionWalk();
        this.giveResponse();
        this.playAnimationSuper();
    }


    setConditionWalk() {
        this.walk = this.knight.isWalking('arrowLeft') || this.knight.isWalking('arrowRight');
        this.addCondition(this.walk);
        this.addFlipBook(this.knight.flipBook.walk);


        this.attack = this.knight.isWalking('keyA');
        this.addCondition(this.attack);
        this.addFlipBook(this.knight.flipBook.attack);
    }


    addCondition(condition) {
        this.condition.push(condition);
    }


    addFlipBook(flipBook) {
        this.flipBook.push(flipBook);
    }


    giveResponse() {
        if (this.walk) {
            console.log('knight is walking', this.knight.playAnimation, this.flipBook[0]);
        } else {
            console.log('knight is lazy');
        }
    }


    playAnimationSuper() {
        for (let i = 0; i < this.condition.length; i++) {
            if (this.condition[i]) {
                // this.knight.playAnimation(this.flipBook[i]);
                console.log(i);
                break;
            }
        }
    }
}