const NATIVE_WIDTH = 960;
const NATIVE_HEIGHT = 540;
const UNIT = NATIVE_WIDTH / 15;
const LEVEL_SIZE = 8;


// image paths of start world
let imgMainBg = './img/start_screen/background.png';
let imgQuestRoll = './img/start_screen/quest_roll.png';
let imgCoinButton = './img/start_screen/coin_button.png';
let imgCupButton = './img/start_screen/cup_button.png';
let imgLeaderboard = './img/start_screen/leaderboard.png';
let imgXButton = './img/start_screen/x_button.png';
let imgSettingsButton = './img/start_screen/settings_button.png';
let imgArrowLeft = './img/start_screen/arrow_left.png';
let imgArrowRight = './img/start_screen/arrow_right.png';


// audio paths of start world
let audioNewWorld = './audio/epic_fantasy/a_whole_new_world_luvus.wav';
let audioNewGame = './audio/start_screen/new_game.wav';


// audio paths of level world
let audioAmbience = './audio/ambience/nature_forest_daytime.wav';
let audioBossBattle = './audio/epic_fantasy/boss_battle_lufus.wav';


// image paths of background
let imgBackground = './img/background/background5.png';
let imgCloud = './img/background/background6.png';


// image paths of grass objects
let imgGrassL = './img/tiles/grass1.png';
let imgGrassC = './img/tiles/grass2.png';
let imgGrassR = './img/tiles/grass3.png';
let imgFlyGrassL = './img/tiles/flying_grass1.png';
let imgFlyGrassC = './img/tiles/flying_grass2.png';
let imgFlyGrassR = './img/tiles/flying_grass3.png';


// image paths of simple objects
let imgTree = './img/objects/tree.png';
let imgLadderB = './img/objects/ladder1.png';
let imgLadderC = './img/objects/ladder2.png';
let imgLadderT = './img/objects/ladder3.png';


// image paths of animated objects
let imgBird = './img/objects_animated/bird.png';
let imgBomb = './img/objects_animated/bomb.png';
let imgCoin = './img/objects_animated/coin.png';
let imgCrystal = './img/objects_animated/crystal.png';
let imgHeart = './img/objects_animated/heart.png';
let imgHitPoint = './img/objects_animated/hit_point.png';
let imgStar = './img/objects_animated/star.png';
let imgWeb = './img/objects_animated/web.png';


// flip book of animated objects
const FLIP_BOOK_ANIMATED_OBJECTS = [
    './img/objects_animated/bird/bird8.png',
    './img/objects_animated/bomb/bomb11.png',
    './img/objects_animated/coin/coin10.png',
    './img/objects_animated/crystal/crystal10.png',
    './img/objects_animated/heart/heart10.png',
    './img/objects_animated/hit_point/hit_point10.png',
    './img/objects_animated/star/star10.png',
    './img/objects_animated/web/web5.png'
];


// audio paths of animated objects
let audioCoin = './audio/collect/coin.wav';
let audioCrystal = './audio/collect/crystal.wav';
let audioHeart = './audio/collect/heart.wav';
let audioHitPoint = './audio/collect/hit_point.wav';
let audioStar = './audio/collect/star.wav';
let audioWeb = './audio/collect/web_throw.wav';


// image path of leaf
let imgLeaf = './img/leaves/leaf1.png';


// audio path of leaf
let audioLeaf = './audio/collect/leaf.wav';


// image paths of enemies
let imgDino = './img/enemies/dino/dino.png';
let imgEnt = './img/enemies/ent/ent.png';
let imgSpider = './img/enemies/spider/spider.png';


// flip book of dino
const FLIP_BOOK_DINO = [
    './img/enemies/dino/attack/attack5.png',
    './img/enemies/dino/death/death6.png',
    './img/enemies/dino/hurt/hurt4.png',
    './img/enemies/dino/idle/idle5.png',
    './img/enemies/dino/walk/walk4.png'
];


// flip book of ent
const FLIP_BOOK_ENT = [
    './img/enemies/ent/attack/attack5.png',
    './img/enemies/ent/death/death7.png',
    './img/enemies/ent/hurt/hurt3.png',
    './img/enemies/ent/idle/idle4.png',
    './img/enemies/ent/walk/walk6.png'
];


// flip book of spider
const FLIP_BOOK_SPIDER = [
    './img/enemies/spider/attack/attack3.png',
    './img/enemies/spider/death/death4.png',
    './img/enemies/spider/hurt/hurt3.png',
    './img/enemies/spider/idle/idle4.png',
    './img/enemies/spider/walk/walk6.png'
];


// audio paths of enemies
let audioDinoGrowl = './audio/attacks_and_creatures/dino_growl.wav';
let audioEntGrowl = './audio/attacks_and_creatures/ent_growl.wav';
let audioSpiderGrowl = './audio/attacks_and_creatures/spider_growl.wav';
let audioWeaponImpact = './audio/attacks_and_creatures/weapon_impact.wav';
let audioArmorHit = './audio/attacks_and_creatures/cloth_armor_hit.wav';


// image path of shaman
let imgShaman = './img/bosses/shaman/shaman.png';


// flip book of shaman
const FLIP_BOOK_SHAMAN = [
    './img/bosses/shaman/anger/anger5.png',
    './img/bosses/shaman/cast_blade/cast_blade4.png',
    './img/bosses/shaman/cast_fire/cast_fire5.png',
    './img/bosses/shaman/cast_lightning/cast_lightning5.png',
    './img/bosses/shaman/death/death6.png',
    './img/bosses/shaman/hurt/hurt2.png',
    './img/bosses/shaman/idle/idle4.png'
];


// audio path of shaman
let audioShamanGrowl = './audio/attacks_and_creatures/shaman_growl.wav';


// image path of knight
let imgKnight = './img/characters/knight/knight.png';


// flip book of knight
const FLIP_BOOK_KNIGHT = [
    './img/characters/knight/attack/attack4.png',
    './img/characters/knight/climb/climb4.png',
    './img/characters/knight/death/death10.png',
    './img/characters/knight/hurt/hurt4.png',
    './img/characters/knight/idle/idle12.png',
    './img/characters/knight/jump/jump7.png',
    './img/characters/knight/run/run8.png',
    './img/characters/knight/run_attack/run_attack8.png',
    './img/characters/knight/walk/walk6.png',
    './img/characters/knight/walk_attack/walk_attack6.png'
];


// audio paths of knight
let audioGoAway = './audio/attacks_and_creatures/go_away.wav';
let audioStaveStep = './audio/footsteps/dirt.wav';
let audioGrassStep = './audio/footsteps/grass.wav';
let audioSwordDraw = './audio/attacks_and_creatures/blade_draw.wav';
let audioSkillUpgrade = './audio/attacks_and_creatures/skill_upgrade.wav';
let audioBombThrow = './audio/elemental_magic/bomb_throw.wav';
let audioBombBurst = './audio/elemental_magic/bomb_burst.wav';


// image paths of magic objects
let imgBlade = './img/bosses/magic/blade.png';
let imgFire = './img/bosses/magic/fire.png';
let imgLightning = './img/bosses/magic/lightning.png';


// flip book of magic objects
const FLIP_BOOK_MAGIC = [
    './img/bosses/magic/blade/blade7.png',
    './img/bosses/magic/fire/fire10.png',
    './img/bosses/magic/lightning/lightning9.png'
];


// audio paths of magic objects
let audioBladeCast = './audio/elemental_magic/magic_blade_cast.wav';
let audioBladeHit = './audio/elemental_magic/magic_blade_hit.wav';
let audioFireCast = './audio/elemental_magic/magic_fire_cast.wav';
let audioFireHit = './audio/elemental_magic/magic_fire_hit.wav';
let audioLightningCast = './audio/elemental_magic/magic_lightning_cast.wav';
let audioLightningHit = './audio/elemental_magic/magic_lightning_hit.wav';


// image paths of avatar
let imgAvatarImage = './img/inner_interface/avatar_image.png';
let imgAvatarFrame = './img/inner_interface/avatar_frame.png';


// image paths of hp bar
let imgHpBarBg = './img/inner_interface/hp_bar_bg.png';
let imgHpPoint = './img/inner_interface/hp_point.png';
let imgHpBarBorder = './img/inner_interface/hp_bar_border.png';


// image paths of energy bar
let imgEnergyBarBg = './img/inner_interface/energy_bar_bg.png';
let imgEnergyPoint = './img/inner_interface/energy_point.png';
let imgEnergyBarBorder = './img/inner_interface/energy_bar_border.png';


// image paths of stamina bar
let imgStaminaBarBg = './img/inner_interface/stamina_bar_bg.png';
let imgStaminaPoint = './img/inner_interface/stamina_point.png';
let imgStaminaBarBorder = './img/inner_interface/stamina_bar_border.png';


// image paths of item
let imgItemBg = './img/inner_interface/item_bg.png';
let imgItemBomb = './img/inner_interface/item_bomb.png';
let imgItemBorder = './img/inner_interface/item_border.png';