import { Incident } from '../models/Incident'

import { convertDurationToSeconds, parseDateString } from './entryUtils'

export interface Filters {
    fromDate?: string;
    toDate?: string;
    fromDuration?: string;
    toDuration?: string;
    locations?: string[];
    intensities?: string[];
}

export const INITIAL_FILTER: Filters = {
    fromDate: '',
    toDate: '',
    fromDuration: '',
    toDuration: '',
    intensities: [],
    locations: [],
}

export const DEFAULT_SORT_ID = 'incidentDate'

export const sortIncidents = (incidents: Incident[], orderBy: string, ascending: boolean) => {
    incidents.sort(function(a:Incident, b:Incident) {
        let first = a
        let second = b
        if (!ascending) {
            first = b
            second = a
        }

        if (orderBy === 'incidentDate') {
            if (first.incidentDate > second.incidentDate) return 1
            if (first.incidentDate < second.incidentDate) return -1
        } else if (orderBy === 'intensity') {
            const firstValue = first.intensity ?? ''
            const secondValue = second.intensity ?? ''
            if (firstValue > secondValue) return 1
            if (firstValue < secondValue) return -1
        } else if (orderBy === 'duration') {
            const firstValue = first.duration ?? 0
            const secondValue = second.duration ?? 0
            if (firstValue > secondValue) return 1
            if (firstValue < secondValue) return -1
        } else if (orderBy === 'location') {
            const firstValue = first.location?.value ?? ''
            const secondValue = second.location?.value ?? ''
            if (firstValue > secondValue) return 1
            if (firstValue < secondValue) return -1
        }
       
        return a.id - b.id
    })
}

const invalidDate = (fromDate: Date | undefined, toDate: Date | undefined, incidentDate: number) => {
    if ( fromDate && incidentDate < fromDate.getTime() ) {
        return true;
    }

    if ( toDate && incidentDate > toDate.getTime() ) {
        return true;
    }
}

const invalidDuration = (fromDuration: number, toDuration: number, incidentDuration: number | undefined) => {
    return ! incidentDuration || ( fromDuration > 0 && incidentDuration < fromDuration ) ||
        ( toDuration > 0 && incidentDuration > toDuration );
}

export const filterIncidents = (incidents: Incident[], incomingFilters: Filters): Incident[] => {
    const results: Incident[] = []

    const fromDate = parseDateString(incomingFilters.fromDate ?? '')
    if (fromDate) {
        fromDate.setHours(0)
        fromDate.setMinutes(0)
        fromDate.setSeconds(0)
    }
    
    const toDate = parseDateString(incomingFilters.toDate ?? '')
    if (toDate) {
        toDate.setHours(23)
        toDate.setMinutes(59)
        toDate.setSeconds(59)
    }

    const fromDuration = convertDurationToSeconds(incomingFilters.fromDuration)
    const toDuration = convertDurationToSeconds(incomingFilters.toDuration);

    incidents.forEach(incident => {
        const intensity = incident.intensity ? incident.intensity : '';
        const location = incident.location ? incident.location.value : '';

        if ( incomingFilters.intensities && incomingFilters.intensities.length > 0 && ! incomingFilters.intensities.includes(intensity) ) {
            return
        }

        if ( incomingFilters.locations && incomingFilters.locations.length > 0 && ! incomingFilters.locations.includes(location) ) {
            return
        }

        if ( invalidDate(fromDate, toDate, incident.incidentDate) ) {
            return;
        }

        if ( invalidDuration(fromDuration, toDuration, incident.duration) ) {
            return;
        }

        results.push(incident);
    });

    return results;
};