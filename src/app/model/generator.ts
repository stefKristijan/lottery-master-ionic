import { GeneratorType, GeneratorSort } from '../generator/generator.page';
import { max } from 'rxjs/operators';

export class Generator{
    draws: number;
    maxDraws: number;
    rangeMultiplier: number;
    mcMultiplier: number;
    drawnMultiplier: number;
    lastDrawDivider: number;
    range: number;
    type: string;
    sort: string;

    constructor(maxDraws: number){
        this.draws = 20;
        this.maxDraws = maxDraws;
        this.range = 10;
        this.type = "DRAW";
        this.sort = "SUM";
        this.rangeMultiplier = 1;
        this.mcMultiplier = 1;
        this.drawnMultiplier = 1;
        this.lastDrawDivider = 1;
    }
}