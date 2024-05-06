class StaminaBar extends StateBarObject {
    name = 'stamina';
    max = 100;
    ms = 16;
    bg = new AvatarInfo(SOURCE.staminaBarBg);
    border = new AvatarInfo(SOURCE.staminaBarBorder);


    constructor() {
        super();
        this.fill();
        this.setStoppableInterval(() => this.regenerate(), this.ms);
    }
}