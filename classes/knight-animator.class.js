class KnightAnimator {
    condition = [];
    flipBook = [];


    constructor(knight) {
        this.knight = knight;
        this.setConditions();
        // this.giveResponse();    // to delete
        this.playAnimationSuper();
    }


    setConditions() {
        this.addCondition(this.knight.isWalking());
        this.addFlipBook(this.knight.flipBook.walk);

        this.addCondition(this.knight.isAttacking());
        this.addFlipBook(this.knight.flipBook.attack);
    }


    addCondition(condition) {
        this.condition.push(condition);
    }


    addFlipBook(flipBook) {
        this.flipBook.push(flipBook);
    }


    // to delete
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
                this.knight.playAnimation(this.flipBook[i]);
                // console.log(i);
                break;
            }
        }
    }
}