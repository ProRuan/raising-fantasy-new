class KnightAnimator {
    condition = [];
    flipBook = [];


    constructor(knight) {
        this.setSource(SOURCE.knightAnimation);
        this.setConditions(knight, this.source);    // rename!!!
        // this.giveResponse();    // to delete
        this.playAnimationSuper(knight);
    }


    setSource(source) {
        this.source = source;
    }


    setConditions(knight) {
        for (let i = 0; i < this.source.length; i++) {
            this.setAnimation(knight, this.source[i]);
        }
    }


    setAnimation(knight, key) {
        this.addCondition(knight[key.condition]());
        this.addFlipBook(knight.flipBook[key.chapter]);
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
            console.log('knight is walking', knight.playAnimation, this.flipBook[0]);
        } else {
            console.log('knight is lazy');
        }
    }


    playAnimationSuper(knight) {
        for (let i = 0; i < this.condition.length; i++) {
            if (this.condition[i]) {
                knight.playAnimation(this.flipBook[i]);
                console.log(knight.img.src);

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
        knight.img.src = knight.cover;
        // return false;
    }
}