import { describe, test, expect } from 'vitest'

import { cloneObserved} from '../../../utils/settingsUtils'
import { Observed } from '../../../models/Observed'

describe('settingsUtils', () => {
    test('cloneObserved full', () => {
       const defaultObserved: Observed = {
            id: 0,
            userId: 0,
            observedName: '',
            antecedents: [{id: 1, typeCode: 'A', value: 'Antecedent One', activeFl: 'Y'}, {id: 2, typeCode: 'A', value: 'Antecedent Two', activeFl: 'Y'}],
            behaviors: [{id: 3, typeCode: 'B', value: 'Behavior One', activeFl: 'Y'}],
            consequences: [{id: 4, typeCode: 'C', value: 'Consequence One', activeFl: 'Y'}, {id: 5, typeCode: 'C', value: 'Consequence Two', activeFl: 'Y'}],
            locations: [{id: 6, typeCode: 'L', value: 'Home', activeFl: 'Y'}, {id: 7, typeCode: 'L', value: 'School', activeFl: 'Y'}]
        }

        const clone = cloneObserved(defaultObserved)

        const aId = clone.antecedents ? clone.antecedents[0].id : 0
        const bId = clone.behaviors ? clone.behaviors[0].id : 0
        const cId = clone.consequences ? clone.consequences[0].id : 0
        const lId = clone.locations ? clone.locations[0].id : 0

        expect(clone.id).toBe(0)
        expect(clone.observedName).toBe('')
        expect(aId).toBe(1001)
        expect(bId).toBe(1003)
        expect(cId).toBe(1004)
        expect(lId).toBe(1006)
       
    })

    test('cloneObserved empty', () => {
        const defaultObserved: Observed = {
             id: 0,
             userId: 0,
             observedName: '',
         }
 
         const clone = cloneObserved(defaultObserved)

         expect(clone.id).toBe(0)
         expect(clone.observedName).toBe('')
         expect(clone.antecedents?.length).toBe(0)
         expect(clone.behaviors?.length).toBe(0)
         expect(clone.consequences?.length).toBe(0)
         expect(clone.locations?.length ).toBe(0)
     })
})