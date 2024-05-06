class StaminaBar extends StateBarObject {
    name = 'stamina';
    max = 100;
    ms = 16;
    bg = new StaminaBarBg();
    border = new StaminaBarBorder();


    constructor() {
        super();
        this.fill();
        this.setStoppableInterval(() => this.regenerate(), this.ms);
    }
}