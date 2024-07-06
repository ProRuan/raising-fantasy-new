/**
 * Represents a character.
 * @extends CharacterSetter
 */
class Character extends CharacterSetter {
    chapter = 'cover';
    idleDelay = 3000;
    lastIdle = this.idleDelay + getTime();
    coins = 0;
    leaves = 0;


    /**
     * Creates a character.
     * @param {object} source - The source object.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(source, x, y) {
        super(source, x, y);
        this.setAnimation(source);
    }


    /**
     * Provides the hp points.
     */
    get hpPoints() {
        return this.world.hpBar.points;
    }


    /**
     * Provides the energy points.
     */
    get energyPoints() {
        return this.world.energyBar.points;
    }


    /**
     * Provides the stamina points.
     */
    get staminaPoints() {
        return this.world.staminaBar.points;
    }


    /**
     * Reduces the hp points of the character.
     * @param {number} damage - The value of the damage.
     */
    damage(damage) {
        if (isGreater(this.hpPoints.length, damage)) {
            this.hpPoints.splice(0, this.hpPoints.length);
        } else {
            let currentHp = this.hpPoints.length - damage;
            this.hpPoints.splice(currentHp, damage);
        }
    }


    /**
     * Plays the sound.
     * @param {string} nameA - The name of the trigger image a.
     * @param {object} sound - The sound object.
     * @param {string} nameB - The name of the trigger image b.
     */
    playSound(nameA, sound, nameB) {
        if (this.isImage(nameA)) {
            this.playDeathSound(nameA, sound);
        } else if (!isUndefined(nameB) && this.isImage(nameB)) {
            this.playEpilogSound(sound, nameB);
        }
    }


    /**
     * Plays the death sound.
     * @param {string} nameA - The name of the trigger image a.
     * @param {object} sound - The sound object.
     */
    playDeathSound(nameA, sound) {
        if (isMatch(nameA, 'death6') && isMatch(this.hpPoints.length, 0)) {
            super.playSound(sound.path, sound.startTime);
        } else if (!isMatch(nameA, 'death6')) {
            super.playSound(sound.path, sound.startTime);
        }
    }


    /**
     * Plays the epilog sound.
     * @param {object} sound - The sound object.
     * @param {string} nameB - The name of the trigger image b.
     */
    playEpilogSound(sound, nameB) {
        if (isMatch(nameB, 'death10') && isGreater(canvas.height, this.y) && !this.gameOver) {
            this.gameOver = true;
            super.playSound(sound.path, sound.startTime);
        } else if (!isMatch(nameB, 'death10')) {
            super.playSound(sound.path, sound.startTime);
        }
    }


    /**
     * Plays the upgrade sound.
     */
    soundUpgrade() {
        let path = this.skillUpgrade.path;
        let startTime = this.skillUpgrade.startTime;
        super.playSound(path, startTime);
    }


    /**
     * Starts the boss battle.
     */
    startBossBattle() {
        this.setBossBattle();
        this.setFinalCameraPosition();
    }


    /**
     * Sets the boss battle.
     */
    setBossBattle() {
        if (isGreater(source.bossBattleTriggerX, this.x) && isUndefined(this.bossBattleStarted)) {
            this.bossBattleStarted = true;
            this.xStopLeft = source.bossBattleX;
            world.endboss.nextCast = getSum(world.time, world.endboss.angerDelay);
        }
    }


    /**
     * Sets the final position of the camera.
     */
    setFinalCameraPosition() {
        if (this.bossBattleStarted && isGreater(this.world.finalCameraX, this.world.cameraX)) {
            let cameraDiffX = getSum(this.world.cameraX, -this.world.finalCameraSpeed);
            if (isGreater(cameraDiffX, this.world.finalCameraX)) {
                this.world.cameraX = this.world.finalCameraX;
            } else {
                this.world.cameraX -= this.world.finalCameraSpeed;
            }
        }
    }


    /**
     * Updates the x value of the camera.
     */
    updateCameraX() {
        if (isUndefined(this.bossBattleStarted)) {
            let cameraX = this.getCameraX();
            if (isGreater(cameraX, this.x)) {
                this.setCameraX(2);
            } else if (isGreater(this.world.heroX, this.x)) {
                this.setCameraX(1);
            } else {
                this.setCameraX(0);
            }
        }
    }


    /**
     * Provides the x value of the camera.
     * @returns {number} - The x value of the camera.
     */
    getCameraX() {
        return canvas.width * (this.world.size - 1) + this.world.heroX;
    }


    /**
     * Sets the x value of the camera.
     * @param {number} id - The id of the camera position.
     */
    setCameraX(id) {
        if (isMatch(id, 2)) {
            this.world.cameraX = -canvas.width * (this.world.size - 1);
        } else if (isMatch(id, 1)) {
            this.world.cameraX = -this.x + this.world.heroX;
        } else if (isMatch(id, 0)) {
            this.world.cameraX = 0;
        }
    }


    /**
     * Starts the ambient sound.
     */
    startAmbientSound() {
        this.startMusic(true, 0);
    }


    /**
     * Sets the start time of the knight.
     */
    setStartTime() {
        if (!this.startTime) {
            this.startTime = getTime();
        }
    }
}