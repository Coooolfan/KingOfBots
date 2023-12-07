import { AcGameObject } from "./ACGameObject";
import { Wall } from "./wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
        this.rows = 13;
        this.cols = 13;

        this.inner_walls_count = 20;
        this.walls = [];
    }
    create_walls() {
        // 初始化表示墙的二维数组,给四周加上墙
        const g = [];
        for (let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
                if (r === 0 || c === 0 || r === this.rows - 1 || c === this.cols - 1) {
                    g[r][c] = true;
                }
            }
        }
        // console.log(g);

        // 生成地图，随机生成墙
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (; ;) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r]) continue;
                // 确保蛇的出生点没有墙
                if ((r === this.rows - 2 && c === 1) || (c === this.cols - 2 && r === 1)) continue;
                g[r][c] = true;
                g[c][r] = true;
                break;
            }
        }
        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.is_connected(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;

        // 生成墙对象
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(c, r, this));
                }
            }
        }
        return true;
    }
    is_connected(g, sx, sy, tx, ty) {
        if (sx === tx && sy === ty) return true;
        g[sx][sy] = true;
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.is_connected(g, x, y, tx, ty))
                return true;
        }
        return false;
    }
    start() {
        for (let i = 0; i < 10000; i++)
            if (this.create_walls())
                break;


        // this.create_walls();
    }
    resize() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }
    update() {
        this.resize();
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