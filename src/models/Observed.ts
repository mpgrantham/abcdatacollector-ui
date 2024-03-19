import { Abc } from "./Abc"
import { Incident } from "./Incident"

export interface Observed {
    id: number;
    observedName: string;
    userId: number;
    antecedents?: Abc[];
    behaviors?: Abc[];
    consequences?: Abc[];
    locations?: Abc[];
    incidents?: Incident[];
}
