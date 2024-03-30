import { event } from "jquery";
import { AcGameObject } from "./ACGameObject";
import { Snake } from "./Snake";
import { Wall } from "./wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent, store) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.store = store;
        this.L = 0;
        this.rows = 13;
        this.cols = 14;

        this.inner_walls_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({ id: 0, color: '#4876EC', r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: '#F94848', r: 1, c: this.cols - 2 }, this),
        ];

    }
    create_walls() {
        const g = this.store.state.pk.gamemap;
        // 从二维数组转换为障碍物实例
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c])
                    this.walls.push(new Wall(r, c, this));
            }
        }
    }

    add_listening_events() {
        this.ctx.canvas.focus();
        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            let d = -1;
            if (e.key === "w") d = 0;
            else if (e.key === "d") d = 1;
            else if (e.key === "s") d = 2;
            else if (e.key === "a") d = 3;
            if (d >= 0) {
                this.store.state.pk.socket.send(JSON.stringify({
                    event: "move",
                    direction: d,
                }));
            }
        });
    }

    start() {
        this.create_walls();

        this.add_listening_events();
    }

    resize() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_snake_ready() {
        for (const Snake of this.snakes) {
            if (Snake.status === "die") return false;
            if (Snake.direction === -1) return false;
        }
        return true;
    }
    next_step() {
        for (const Snake of this.snakes) Snake.next_step();
    }



    check_valid(cell) { //检测目标节点是否合法
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c)
                return false;
        }
        for (const Snake of this.snakes) {
            let k = Snake.cells.length;
            if (!Snake.check_tail_increasing()) k--; //当蛇在本局中不增长时，忽略最后蛇尾重叠
            for (let i = 0; i < k; i++) {
                if (Snake.cells[i].r === cell.r && Snake.cells[i].c === cell.c)
                    return false;
            }
        }
        return true;
    }

    update() {
        this.resize();
        if (this.check_snake_ready()) this.next_step();
        this.render();
    }

    render() {
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                // 间隔颜色不同
                this.ctx.fillStyle = (r + c) % 2 === 0 ? color_even : color_odd;
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}