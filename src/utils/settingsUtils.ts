import { Abc } from '../models/Abc'
import { Observed } from '../models/Observed'

const getIntitalAbcs = (values: Abc[] | undefined, id: number): Abc[] => {
    if (!values) {
        return [] as Abc[]
    }
   
    const abcs = values.map(a => {
        id++
        return { id: id, typeCode: a.typeCode, value: a.value, activeFl: 'Y' }
    })

    return abcs
}

export const cloneObserved = (defaultObserved: Observed): Observed => {
    let abcId = 1000

    const observed: Observed = {} as Observed
    observed.id = 0
    observed.observedName = ''
    observed.antecedents = getIntitalAbcs(defaultObserved.antecedents, abcId)
    abcId += observed.antecedents.length
    observed.behaviors = getIntitalAbcs(defaultObserved.behaviors, abcId)
    abcId += observed.behaviors.length
    observed.consequences = getIntitalAbcs(defaultObserved.consequences, abcId)
    abcId += observed.consequences.length
    observed.locations = getIntitalAbcs(defaultObserved.locations, abcId)

    return observed
}