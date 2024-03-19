import { Abc } from '../models/Abc'
import { Incident, formatDuration } from '../models/Incident';

export interface Entry {
    id: number;
    incidentDate?: Date;
    locationId?: number;
    intensity?: string;
    duration?: string;
    description?: string;
    antecedents: number[];
    behaviors: number[];
    consequences: number[];
}

export const INITIAL_ENTRY: Entry = {
    id: 0,
    incidentDate: new Date(),
    antecedents: [],
    behaviors: [],
    consequences: [],
    locationId: 0,
    intensity: '',
    duration: '',
    description: ''
}

export const parseDateTimeString = (dateValue: string, timeValue: string): Date | undefined => {
    const monthDayYear = dateValue.split('-');
    if (monthDayYear.length != 3 || monthDayYear[0].length < 4) {
        return
    }

    const timeParts = parseTimeString(timeValue)
    if (!timeParts) {
        return
    }

    return new Date(parseInt(monthDayYear[0]), parseInt(monthDayYear[1]) - 1, parseInt(monthDayYear[2]), 
                timeParts.hours, timeParts.minutes, 0, 0) 
}

export const parseDateString = (value: string): Date | undefined => {
    const monthDayYear = value.split('-');
    if (monthDayYear.length != 3 || monthDayYear[0].length < 4) {
        return;
    }

    return new Date(parseInt(monthDayYear[0]), parseInt(monthDayYear[1]) - 1, parseInt(monthDayYear[2])) 
}

export const parseTimeString = (value: string): { hours: number, minutes: number } | undefined => {
    const parts = value.split(':')
    if (parts.length !== 2) {
        return
    }
    
    const hours = parseInt(parts[0])
    const minutes = parseInt(parts[1])

    if ( hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return
    }
   
    return { hours: hours, minutes: minutes }
}

// Strip out MM/DD/YYYY portion of Date
export const formatDate = (value: Date | undefined): string => {
    if (!value) {
        return ''
    }

    const day = value.getDate()
    const month = value.getMonth() + 1
    const yearStr = value.getFullYear().toString()

    const dayStr = day < 10 ? '0' + day : day.toString()
    const monthStr = month < 10 ? '0' + month : month.toString()

    return `${yearStr}-${monthStr}-${dayStr}`
}

export const formatTime = (value: Date | undefined): string => {
    if (!value) {
        return ''
    }

    const hour = value.getHours()
    const minute = value.getMinutes()
       
    const hourStr = hour < 10 ? '0' + hour : hour.toString()
    const minuteStr = minute < 10 ? '0' + minute : minute.toString()

    return `${hourStr}:${minuteStr}`
}

export const convertDurationToSeconds = (value: string | undefined) => {
    if (!value) {
        return 0
    }

    const parts = value.split(':');
    return (parseInt(parts[0]) * 60) + parseInt(parts[1])
}

export const getAbcs = (ids: number[], values: Abc[] | undefined) => {
    if (!values) {
        return [] as Abc[]
    }

    const abcs: Abc[] = ids.map(id => {
        return values.find(v => v.id === id) ?? { id: 0, typeCode: '', value: '', activeFl: ''}
    })

    return abcs
}

export const getLocation = (id: number | undefined, values: Abc[] | undefined): Abc => {
    if (!values || !id) {
        return { id: 0, typeCode: '', value: '', activeFl: ''} as Abc
    }

    return values.find(v => v.id === id) ?? { id: 0, typeCode: '', value: '', activeFl: ''}
}

export const getAbcIds = (values: Abc[] | undefined): number[] => {
    if (!values) {
        return [] as number[]
    }

    const ids = values.map((abc) => abc.id)

    return ids
}

export const mapEntry = (incident:Incident):Entry => {
    const entry: Entry = {
        id: incident.id,
        incidentDate: new Date(incident.incidentDate),
        locationId: incident.location ? incident.location.id : 0,
        intensity: incident.intensity,
        duration: formatDuration(incident.duration),
        description: incident.description,
        antecedents: getAbcIds(incident.antecedents),
        behaviors: getAbcIds(incident.behaviors),
        consequences: getAbcIds(incident.consequences)
    }
   
    return entry
}
