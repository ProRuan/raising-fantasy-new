class HpBar extends StateBarObject {
    name = 'hp';
    max = 120;
    bg = new AvatarInfo(SOURCE.hpBarBg);
    border = new AvatarInfo(SOURCE.hpBarBorder);


    constructor() {
        super();
        this.fill();
    }
}