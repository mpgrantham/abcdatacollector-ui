import { describe, test, expect } from 'vitest'

import { Incident } from '../../models/Incident'
import { Observed } from '../../models/Observed'

export const incidentOne: Incident = {
    id: 1,
    incidentDate: new Date(2024, 2, 9, 13, 32, 0, 0).getTime(),
    observedId: 1,
    userId: 0,
    duration: 80,
    intensity: 'Mild',
    description: 'Test Description',
    location: { id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'},
    antecedents: [{ id: 2, typeCode: 'A', value: 'A One', activeFl: 'Y'}],
    behaviors: [{ id: 3, typeCode: 'B', value: 'B One', activeFl: 'Y'}],
    consequences: [{ id: 4, typeCode: 'C', value: 'C One', activeFl: 'Y'}]
}

export const incidentTwo: Incident = {
    id: 2,
    incidentDate: new Date(2024, 2, 15, 10, 5, 0, 0).getTime(),
    observedId: 1,
    userId: 0,
    duration: 50,
    intensity: 'Moderate',
    description: 'Test Description',
    location: { id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'},
    antecedents: [{ id: 2, typeCode: 'A', value: 'A One', activeFl: 'Y'}],
    behaviors: [{ id: 3, typeCode: 'B', value: 'B One', activeFl: 'Y'}],
    consequences: [{ id: 4, typeCode: 'C', value: 'C One', activeFl: 'Y'}]
}

export const observedOne: Observed = {
    id: 1,
    observedName: '',
    userId: 0,
    locations: [{ id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'}],
    antecedents: [{ id: 2, typeCode: 'A', value: 'A One', activeFl: 'Y'}],
    behaviors: [{ id: 3, typeCode: 'B', value: 'B One', activeFl: 'Y'}],
    consequences: [{ id: 4, typeCode: 'C', value: 'C One', activeFl: 'Y'}]
}

export const observedTwo: Observed = {
    id: 2,
    observedName: 'Observed Two',
    userId: 0,
    locations: [{ id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'}],
    antecedents: [{ id: 2, typeCode: 'A', value: 'A One', activeFl: 'Y'}],
    behaviors: [{ id: 3, typeCode: 'B', value: 'B One', activeFl: 'Y'}],
    consequences: [{ id: 4, typeCode: 'C', value: 'C One', activeFl: 'Y'}]
}

describe('dummy test', () => {
    test('dummy', () => {
        expect(true).toBe(true)
    })
})