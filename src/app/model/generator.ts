import { GeneratorType, GeneratorSort } from '../generator/generator.page';

export class Generator{
    draws: 10;
    maxDraws: 100;
    rangeMultiplier: 1;
    mcMultiplier: 1;
    drawnMultiplier: 1;
    lastDrawDivider: 1;
    range: 5;
    type: GeneratorType.DRAW;
    sort: GeneratorSort.SUM;
}