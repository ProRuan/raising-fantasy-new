class HpBar extends StateBarObject {
    name = 'hp';
    max = 120;
    ms = 1 / 60;
    bg = new AvatarInfo(SOURCE.hpBarBg);
    border = new AvatarInfo(SOURCE.hpBarBorder);


    // jsdoc
    constructor() {
        super();
    }
}