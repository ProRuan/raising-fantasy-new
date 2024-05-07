class EnergyBar extends StateBarObject {
    name = 'energy';
    max = 100;
    ms = 48;
    bg = new AvatarInfo(SOURCE.energyBarBg);
    border = new AvatarInfo(SOURCE.energyBarBorder);


    // jsdoc
    constructor() {
        super();
    }
}