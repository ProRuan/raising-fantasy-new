class EnergyBar extends StateBarObject {
    name = 'energy';
    max = 100;
    ms = 48;
    bg = new EnergyBarBg();
    border = new EnergyBarBorder();


    constructor() {
        super();
        this.fill();
        this.setStoppableInterval(() => this.regenerate(), this.ms);
    }
}