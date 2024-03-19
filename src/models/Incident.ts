import { Abc } from './Abc'

const prependZero = (value: number) => {
    return ('0' + value).slice(-2)
}

export const formatDateTime = (value: number | undefined): string => {
    if (!value) {
        return ''
    }
    
    const dt = new Date(value)
    let hour = dt.getHours()
    const amPm = hour < 12 ? 'AM' : 'PM'
    if (hour > 12) {
        hour = hour - 12
    } else if (hour === 0) {
        hour = 12
    }
    return `${prependZero(dt.getMonth() + 1)}/${prependZero(dt.getDate())}/${dt.getFullYear()} ${prependZero(hour)}:${prependZero(dt.getMinutes())} ${amPm}`
}

export const formatDuration = (value: number | undefined) => {
    if (!value) {
        return ''
    }

    if ( value < 60 ) {
        return `00:${prependZero(value)}`
    }
    
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${prependZero(minutes)}:${prependZero(seconds)}`
}

export const formatAbcs = (values: Abc[] | undefined) => {
    if (!values) {
        return ''
    }

    return values.map(v => v.value).join(', ')
}

export interface Incident {
    id: number;
    incidentDate: number;
    observedId: number;
    userId: number;
    duration?: number;
    intensity?: string;
    description?: string;

    location?: Abc;
    antecedents?: Abc[];
    behaviors?: Abc[];
    consequences?: Abc[];
}
