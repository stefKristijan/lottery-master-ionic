import { GeneratorType, GeneratorSort } from '../generator/generator.page';

export class Generator{
    draws: number;
    maxDraws: number;
    rangeMultiplier: number;
    mcMultiplier: number;
    drawnMultiplier: number;
    lastDrawDivider: number;
    range: number;
    type: GeneratorType;
    sort: GeneratorSort;
}