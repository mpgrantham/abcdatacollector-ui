import axios from 'axios'

import { Incident } from '../models/Incident'

import { DEFAULT_SORT_ID, sortIncidents } from '../utils/tableUtils'

const API_URL = '/api/'

export async function getIntensities(): Promise<string[]> {
    let list: string[] = []

    const url =  `${API_URL}incident/intensities`

    await axios.get(url).then(response => {
        list = response.data
    })

    return list
}

export async function getIncidents(sessionToken: string, observedId: number, startDate?: Date): Promise<Incident[]> {
    let list: Incident[] = []

    const headers = {
        headers: {'Authorization': sessionToken}
    }

    let url =  `${API_URL}incident/list/${observedId}`
    if (startDate) {
        url = `${url}?start=${startDate.getTime()}`
    }

    await axios.get(url, headers).then(response => {
        list = response.data
        sortIncidents(list, DEFAULT_SORT_ID, false)
    })

    return list
}

export async function getIncident(sessionToken: string, incidentId: number): Promise<Incident> {
    let incident: Incident = {} as Incident

    const headers = {
        headers: {'Authorization': sessionToken}
    }

    const url =  `${API_URL}incident/${incidentId}`
   
    await axios.get(url, headers).then(response => {
        incident = response.data
    })

    return incident
}

export async function saveIncident(sessionToken: string, incident: Incident): Promise<Incident> {
    let returnValue: Incident = {} as Incident

    const headers = {
        headers: {'Authorization': sessionToken}
    }

    const url =  `${API_URL}incident`
    
    if (incident.id === 0) {
        await axios.post(url, incident, headers).then(response => {
            returnValue = response.data
        })
    } else {
        await axios.put(url, incident, headers).then(response => {
            returnValue = response.data
        })
    }
    

    return returnValue
}

export async function deleteIncident(sessionToken: string, incidentId: number): Promise<string> {
    let status = 'ERROR'

    const headers = {
        headers: {'Authorization': sessionToken}
    }

    const url =  `${API_URL}incident/${incidentId}`
   
    await axios.delete(url, headers).then(response => {
        status = response.data.status
    })

    return status
}
