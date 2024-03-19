import { describe, test, expect, vi } from 'vitest'

import axios from 'axios'

import { getIntensities, getIncidents, getIncident, saveIncident, deleteIncident } from '../IncidentService'

import { incidentOne, incidentTwo } from '../../utils/__tests__/mock-data.test'

vi.mock('axios')

describe('incidentService test', () => {

    test('GET intensities', async () => {
        const mockData = { data: ['Mild', 'Moderate'] }

        axios.get = vi.fn().mockResolvedValue(mockData);
        
        const result = await getIntensities()
        
        expect(axios.get).toBeCalledWith('/api/incident/intensities');
        expect(result).toEqual(mockData.data);
    })

    test('GET all incidents', async () => {
        const mockData = { data: [incidentOne, incidentTwo] }

        axios.get = vi.fn().mockResolvedValue(mockData);
        
        const result = await getIncidents('TOKEN', 1)

        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.get).toBeCalledWith('/api/incident/list/1', headers);
        expect(result).toEqual(mockData.data);
    })

    test('GET all incidents with date', async () => {
        const mockData = { data: [incidentOne] }

        axios.get = vi.fn().mockResolvedValue(mockData);

        const start = new Date(2024, 1, 10, 13, 32, 0, 0)
        
        const result = await getIncidents('TOKEN', 1, start)

        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.get).toBeCalledWith(`/api/incident/list/1?start=${start.getTime()}`, headers);
        expect(result).toEqual(mockData.data);
    })

    test('GET one incident', async () => {
        const mockData = { data: incidentOne }

        axios.get = vi.fn().mockResolvedValue(mockData);
        
        const result = await getIncident('TOKEN', 1)
        
        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.get).toBeCalledWith('/api/incident/1', headers);
        expect(result).toEqual(mockData.data);
    })

    test('POST incident', async () => {
        const incident = { ...incidentOne, id: 0 }

        const mockData = { data: incidentOne }

        axios.post = vi.fn().mockResolvedValue(mockData);
        
        const result = await saveIncident('TOKEN', incident)
        
        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.post).toBeCalledWith('/api/incident', incident, headers);
        expect(result).toEqual(mockData.data);
    })

    test('PUT incident', async () => {
        const incident = { ...incidentOne, id: 2 }

        const mockData = { data: incidentOne }

        axios.put = vi.fn().mockResolvedValue(mockData);
        
        const result = await saveIncident('TOKEN', incident)
        
        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.put).toBeCalledWith('/api/incident', incident, headers);
        expect(result).toEqual(mockData.data);
    })

    test('DELETE incident', async () => {
        const mockData = { data: { status: 'SUCCESS', message: 'Incident Deleted'} }

        axios.delete = vi.fn().mockResolvedValue(mockData);
        
        const result = await deleteIncident('TOKEN', 1)
        
        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.delete).toBeCalledWith('/api/incident/1', headers);
        expect(result).toEqual(mockData.data.status);
    })
    
})