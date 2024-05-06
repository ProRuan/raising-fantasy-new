class HpBar extends StateBarObject {
    name = 'hp';
    max = 120;
    bg = new HpBarBg();
    border = new HpBarBorder();


    constructor() {
        super();
        this.fill();
    }
}