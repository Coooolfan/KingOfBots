const AC_GAME_OBJECT = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECT.push(this);
        this.timedelta = 0;
        this.has_called_start = false;

    }

    start() {

    }
    update() {

    }
    on_destroy() {

    }
    destroy() {

        for (let i in AC_GAME_OBJECT) {
            const obj = AC_GAME_OBJECT[i];
            if (obj === this) {
                obj.on_destroy();
                AC_GAME_OBJECT.splice(i);
                break;
            }
        }
    }
}

let last_timestamp;

const step = (timedelta) => {
    for (let obj of AC_GAME_OBJECT) { 
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timedelta - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timedelta;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);