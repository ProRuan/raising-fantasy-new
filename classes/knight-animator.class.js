class KnightAnimator {
    condition = [];
    flipBook = [];


    constructor(knight) {
        this.knight = knight;
        this.setSource(SOURCE.knightAnimation);
        this.setConditions(this.source);    // rename!!!
        // this.giveResponse();    // to delete
        this.playAnimationSuper();
    }


    setSource(source) {
        this.source = source;
    }


    setConditions() {
        for (let i = 0; i < this.source.length; i++) {
            this.setAnimation(this.source[i]);
        }
    }


    setAnimation(key) {
        this.addCondition(this.knight[key.condition]());
        this.addFlipBook(this.knight.flipBook[key.chapter]);
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

                // if (i) {
                //     console.log(this.knight.img.src);
                // }

                // if (this.flipBook[i] == this.knight.flipBook.attack) {
                //     console.log(this.knight.img.src.includes('attack2'), this.knight.flipBook.attack[1]);
                //     if (this.knight.img.src.includes('attack2')) {
                //         this.knight.playSound(this.knight.swordDraw);
                //     }
                //     // this.knight.playSound(this.knight.swordDraw);
                // }


                return true;
            }
        }
        this.knight.img.src = this.knight.cover;
        // return false;
    }
}