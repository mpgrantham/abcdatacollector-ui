import { Incident, formatDateTime, formatDuration, formatAbcs } from '../models/Incident'
import { Observed } from '../models/Observed'

export const exportIncidents = (incidents: Incident[], filename?: string) => {
    const csvRows: string[] = []; 

    const headers = ['Date/Time', 'Intensity', 'Duration', 'Location', 'Antecedent', 'Behavior', 'Consequence', 'Description']
    csvRows.push(headers.join(','))

    incidents.forEach((i:Incident) => {
        const a = formatAbcs(i.antecedents)
        const b = formatAbcs(i.behaviors)
        const c = formatAbcs(i.consequences)
        const d = i.description ?? ''

        const row = [
            formatDateTime(i.incidentDate),
            i.intensity ?? '',
            formatDuration(i.duration),
            i.location ? i.location.value : '',
            i.antecedents && i.antecedents.length > 1 ? `"${a}"` : a,
            i.behaviors && i.behaviors.length > 1 ? `"${b}"` : b,
            i.consequences && i.consequences.length > 1 ? `"${c}"` : c,
            d.indexOf(',') > -1 ? `"${d}"` : d
        ]
        csvRows.push(row.join(','))
    })

    const csvData = csvRows.join('\n')
    const blob = new Blob([csvData], { type: 'text/csv' })

    let name = filename ? filename : 'Incidents.csv'
    if (!name.endsWith('.csv')) {
        name = `${name}.csv`
    }

    download(blob, name)
}

export const exportObservedData = (output: Observed) => {
    const blob = new Blob([JSON.stringify(output, null, 4)], { type: 'text/json' })
    download(blob, `${output.observedName}-backup.json`)
}

export const download = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
}
