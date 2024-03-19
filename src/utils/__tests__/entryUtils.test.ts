import { describe, it, expect } from 'vitest'

import { Entry, mapEntry, parseDateTimeString, parseDateString, parseTimeString, formatDate, formatTime, convertDurationToSeconds, getAbcs, getLocation, getAbcIds } from '../entryUtils'
import { Incident } from '../../models/Incident'

describe('entryUtils', () => {

    it('parseDateTimeString invalid date', () => {
        const value = parseDateTimeString('03/10', '45:32')
        expect(value).toBe(undefined)
    })

    it('parseDateTimeString invalid time', () => {
        const value = parseDateTimeString('2024-03-10', '45:32')
        expect(value).toBe(undefined)

    })

    it('parseDateTimeString valid', () => {
        const dt = new Date(2024, 2, 10, 13, 32, 0, 0)
        const value = parseDateTimeString('2024-03-10', '13:32')
       
        expect(dt.toISOString()).toBe(value?.toISOString())
    })

    it('parseDateString invalid', () => {
        const value = parseDateString('03/10')
        expect(value).toBe(undefined)
    })

    it('parseDateString valid', () => {
        const dt = new Date(2024, 2, 10, 0, 0, 0, 0)
        const value = parseDateString('2024-03-10')
       
        expect(dt.toISOString()).toBe(value?.toISOString())
    })

    it('parseTimeString invalid format', () => {
        const value = parseTimeString('1532')
        expect(value).toBe(undefined)
    })

    it('parseTimeString valid', () => {
        const value = parseTimeString('13:32')
       
        expect(value?.hours).toBe(13)
        expect(value?.minutes).toBe(32)
    })

    it('parseTimeString valid value', () => {
        const value = parseTimeString('23:32')
        expect(value?.hours).toBe(23)
        expect(value?.minutes).toBe(32)
    })

    it('parseTimeString valid', () => {
        const value = parseTimeString('00:32')
       
        expect(value?.hours).toBe(0)
        expect(value?.minutes).toBe(32)
    })

    it('formatDate undefined', () => {
        const value = formatDate(undefined)
       
        expect(value).toBe('')
    })
    
    it('formatDate valid', () => {
        const dt = new Date(2024, 2, 10, 0, 0, 0, 0)
        const value = formatDate(dt)
       
        expect(value).toBe('2024-03-10')
    })

    it('formatDate valid', () => {
        const dt = new Date(2024, 9, 1, 0, 0, 0, 0)
        const value = formatDate(dt)
       
        expect(value).toBe('2024-10-01')
    })

    it('formatTime undefined', () => {
        const value = formatTime(undefined)
       
        expect(value).toBe('')
    })

    it('formatTime valid', () => {
        const dt = new Date(2024, 2, 10, 13, 32, 0, 0)
        const value = formatTime(dt)
       
        expect(value).toBe('13:32')
    })

    it('formatTime valid', () => {
        const dt = new Date(2024, 2, 10, 10, 8, 0, 0)
        const value = formatTime(dt)
       
        expect(value).toBe('10:08')
    })

    it('formatTime valid 12 AM', () => {
        const dt = new Date(2024, 2, 10, 0, 32, 0, 0)
        const value = formatTime(dt)
       
        expect(value).toBe('00:32')
    })

    it('convertDurationToSeconds undefined', () => {
        const value = convertDurationToSeconds(undefined)
       
        expect(value).toBe(0)
    })

    it('convertDurationToSeconds valid', () => {
        const value = convertDurationToSeconds('01:20')
       
        expect(value).toBe(80)
    })

    it('getAbcs empty values', () => {
        const values = getAbcs([1], undefined)
       
        expect(values.length).toBe(0)
    })

    it('getAbcs valid', () => {
        const abcs = [{id: 1, typeCode: 'A', value: 'Antecedent One', activeFl: 'Y'}]
        const values = getAbcs([1], abcs)
       
        expect(values.length).toBe(1)
        expect(values[0].value).toBe('Antecedent One')
    })

    it('getAbcs not found', () => {
        const abcs = [{id: 1, typeCode: 'A', value: 'Antecedent One', activeFl: 'Y'}]
        const values = getAbcs([2], abcs)
       
        expect(values.length).toBe(1)
        expect(values[0].value).toBe('')
    })

    it('getLocation empty', () => {
        const value = getLocation(1, undefined)
       
        expect(value.value).toBe('')
    })

    it('getLocation valid', () => {
        const abcs = [{id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'}, {id: 2, typeCode: 'L', value: 'School', activeFl: 'Y'}]
        const value = getLocation(1, abcs)
       
        expect(value.value).toBe('Home')
    })

    it('getLocation not found', () => {
        const abcs = [{id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'}, {id: 2, typeCode: 'L', value: 'School', activeFl: 'Y'}]
        const value = getLocation(3, abcs)
       
        expect(value.value).toBe('')
    })

    it('getAbcIds empty', () => {
        const values = getAbcIds(undefined)
       
        expect(values.length).toBe(0)
    })
    
    it('mapEntry', () => {
        const now = new Date()

        const incident: Incident = {
            id: 0,
            userId: 0,
            observedId: 1,
            incidentDate: now.getTime(),
            intensity: 'Mild',
            duration: 80,
            antecedents: [{id: 1, typeCode: 'A', value: 'Antecedent One', activeFl: 'Y'}],
            behaviors: [{id: 2, typeCode: 'B', value: 'Behavior One', activeFl: 'Y'}],
            consequences: [{id: 3, typeCode: 'C', value: 'Consequence One', activeFl: 'Y'}],
            location: {id: 4, typeCode: 'L', value: 'Home', activeFl: 'Y'},
            description: 'Description Test'
        }

        const entry: Entry = mapEntry(incident)

        expect(entry.id).toBe(0)
        expect(entry.incidentDate?.toISOString()).toBe(now.toISOString())
        expect(entry.intensity).toBe('Mild')
        expect(entry.duration).toBe('01:20')
        expect(entry.antecedents[0]).toBe(1)
        expect(entry.behaviors[0]).toBe(2)
        expect(entry.consequences[0]).toBe(3)
        expect(entry.locationId).toBe(4)
        expect(entry.description).toBe('Description Test')
    })

    it('mapEntry no location', () => {
        const incident: Incident = {
            id: 0,
            userId: 0,
            observedId: 1,
            incidentDate: new Date().getTime(),
            intensity: 'Mild',
            duration: 80,
            antecedents: undefined,
            behaviors: undefined,
            consequences: undefined,
            location: undefined,
            description: 'Description Test'
        }

        const entry: Entry = mapEntry(incident)

        expect(entry.locationId).toBe(0)
    })
  
})