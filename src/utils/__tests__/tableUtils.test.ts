import { describe, it, expect } from 'vitest'

import { incidentOne, incidentTwo } from './mock-data.test'

import { filterIncidents, Filters, sortIncidents } from '../tableUtils'

describe('tableUtils', () => {

    it('sort incidentDate ascending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'incidentDate', true)
        expect(incidents[0].id).toBe(1)
    })

    it('sort incidentDate descending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'incidentDate', false)
        expect(incidents[0].id).toBe(2)
    })

    it('sort intensity ascending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'intensity', true)
        expect(incidents[0].id).toBe(1)
    })

    it('sort intensity descending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'intensity', false)
        expect(incidents[0].id).toBe(2)
    })
    
    it('sort duration descending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'duration', false)
        expect(incidents[0].id).toBe(1)
    })

    it('sort duration ascending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'duration', true)
        expect(incidents[0].id).toBe(2)
    })

    it('sort location ascending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'location', true)
        expect(incidents[0].id).toBe(1)
    })

    it('sort location descending', () => {
        const incidents = [incidentOne, incidentTwo]
       
        sortIncidents(incidents, 'location', false)
        expect(incidents[0].id).toBe(1)
    })
    

    it('filterDate incidentDate both', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDate: '2024-03-01',
            toDate: '2024-03-31'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(2)
    })

    it('filterDate incidentDate first', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDate: '2024-03-09',
            toDate: '2024-03-10'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(1)
    })

    it('filterDate incidentDate second', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDate: '2024-03-10',
            toDate: '2024-03-31'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(1)
    })

    it('filterDate incidentDate none', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDate: '2024-03-20',
            toDate: '2024-03-31'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(0)
    })

    it('filterDate duration both', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDuration: '00:30',
            toDuration: '01:30'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(2)
    })

    it('filterDate duration both', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDuration: '00:59',
            toDuration: '01:30'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(1)
    })

    it('filterDate duration none', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            fromDuration: '00:00',
            toDuration: '00:20'
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(0)
    })

    it('filterDate intensity both', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            intensities: ['Mild', 'Moderate']
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(2)
    })

    it('filterDate intensity one', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            intensities: ['Mild']
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(1)
    })

    it('filterDate intensity none', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            intensities: ['Severe']
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(0)
    })

    it('filterDate locations both', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            locations: ['Home']
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(2)
    })

    it('filterDate locations none', () => {
        const incidents = [incidentOne, incidentTwo]
        
        const filters: Filters = {
            locations: ['School']
        }

        const results = filterIncidents(incidents, filters)
        expect(results.length).toBe(0)
    })
  
})