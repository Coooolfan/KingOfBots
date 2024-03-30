import { AcGameObject } from "./ACGameObject";
export class Wall extends AcGameObject {
    constructor(r, c, GameMap) {
        super();
        this.c = c;
        this.r = r;
        this.GameMap = GameMap;
        this.color = "#B37226"
    }
    update() {
        this.render();
    }
    render() {
        const L = this.GameMap.L;
        const ctx=this.GameMap.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L, this.r * L, L, L);
    }

}