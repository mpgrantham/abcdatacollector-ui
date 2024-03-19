import { describe, it, expect } from 'vitest'

import { formatDateTime, formatDuration, formatAbcs } from '../Incident'

describe('Incident', () => {

    it('should formatDateTime', () => {
        const dt = new Date(2024, 2, 10, 13, 32, 0, 0)

        const value = formatDateTime(dt.getTime())
       
        expect(value).toBe('03/10/2024 01:32 PM')
    })

    it('should formatDateTime', () => {
        const dt = new Date(2024, 9, 9, 10, 8, 0, 0)

        const value = formatDateTime(dt.getTime())
       
        expect(value).toBe('10/09/2024 10:08 AM')
    })

    it('should formatDateTime', () => {
        const dt = new Date(2024, 9, 9, 0, 8, 0, 0)

        const value = formatDateTime(dt.getTime())
       
        expect(value).toBe('10/09/2024 12:08 AM')
    })
    
    it('formatDuration undefined', () => {
        const value = formatDuration(undefined)
       
        expect(value).toBe('')
    })

    it('formatDuration', () => {
        const value = formatDuration(80)
       
        expect(value).toBe('01:20')
    })

    it('formatDuration less than one minute', () => {
        const value = formatDuration(59)
       
        expect(value).toBe('00:59')
    })


    it('formatAbcs one', () => {
        const abcs = [{id: 1, typeCode: 'A', value: 'Antecedent One', activeFl: 'Y'}]
        const value = formatAbcs(abcs)
       
        expect(value).toBe('Antecedent One')
    })

    it('formatAbcs many', () => {
        const abcs = [{id: 1, typeCode: 'A', value: 'Antecedent One', activeFl: 'Y'}, {id: 2, typeCode: 'A', value: 'Antecedent Two', activeFl: 'Y'}]
        const value = formatAbcs(abcs)
       
        expect(value).toBe('Antecedent One, Antecedent Two')
    })

    it('formatAbcs empty', () => {
        const value = formatAbcs(undefined)
       
        expect(value).toBe('')
    })
})