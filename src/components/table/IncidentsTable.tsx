import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/joy/Link'

import Table from '@mui/joy/Table'
import Typography from '@mui/joy/Typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown }  from '@fortawesome/free-solid-svg-icons'

import { Incident, formatDateTime, formatDuration, formatAbcs } from '../../models/Incident'

import ExpandableRow from '../../pages/log/ExpandableRow'

interface Header {
    label: string;
    id: string;
    allowSort: boolean;
    class: string;
}

interface IncidentsTableProps {
    incidents: Incident[];
    orderBy: string;
    ascending: boolean;
    onSort: (sortId: string) => void;
}

const fullHeaders: Header[] = [
    {
        label: 'Date/Time',
        id: 'incidentDate',
        allowSort: true,
        class: "width-100"
    },
    {
        label: 'Location',
        id: 'location',
        allowSort: true,
        class: "width-100"
    },
    {
        label: 'Intensity',
        id: 'intensity',
        allowSort: true,
        class: "width-75"
    },
    {
        label: 'Duration',
        id: 'duration',
        allowSort: true,
        class: "width-75"
    },
    {
        label: 'Antecedent',
        id: 'antecedent',
        allowSort: false,
        class: "width-100"
    },
    {
        label: 'Behavior',
        id: 'behavior',
        allowSort: false,
        class: "width-100"
    },
    {
        label: 'Consequence',
        id: 'consequence',
        allowSort: false,
        class: "width-100"
    },
    {
        label: 'Description',
        id: 'description',
        allowSort: false,
        class: "width-100"
    }
]

const mobileHeaders: Header[] = [
    {
        label: 'Date/Time',
        id: 'incidentDate',
        allowSort: true,
        class: "width-100"
    },
    {
        label: 'Location',
        id: 'location',
        allowSort: true,
        class: "width-100"
    }
]

const IncidentsTable = ({ incidents, orderBy, ascending, onSort }: IncidentsTableProps) => {
    const displayHeaders = (headers: Header[]) => {
        return (
            headers.map(hdr => {
                if (hdr.allowSort) {
                    const active = hdr.id === orderBy
                    return (
                        <th className={hdr.class} key={hdr.id}>
                            <Link
                                underline="none"
                                color="neutral"
                                textColor={active ? 'primary.plainColor' : undefined}
                                component="button"
                                onClick={() => onSort(hdr.id)}
                                fontWeight="lg"
                                endDecorator={active ? <FontAwesomeIcon icon={faArrowDown} /> : null}
                                sx={{
                                    '& svg': {
                                        transition: '0.2s',
                                        transform:
                                        active && ascending ? 'rotate(180deg)' : 'rotate(0deg)',
                                    },
                                    '&:hover': { '& svg': { opacity: 1 } },
                                }}
                            >
                                {hdr.label}
                            </Link>
                        </th>
                    )
                }
    
                return <th className={hdr.class} key={hdr.id}><Typography color="neutral">{hdr.label}</Typography></th>
            })
        )
    }
       
    return (
        <>
        <div className="full-section">
            <Table
                aria-label="recent incidents table"
                stickyHeader
                hoverRow
            >
                <thead>
                        <tr>
                            {displayHeaders(fullHeaders)}
                        </tr>
                </thead>
                <tbody>
                    {
                        incidents.map((i:Incident) => {
                            return (
                                <tr key={i.id.toString()}>
                                    <td>
                                        <Link component={RouterLink} to={`/entry/${i.id}`}>
                                            {formatDateTime(i.incidentDate)}
                                        </Link>
                                    </td>
                                    <td>{i.location?.value}</td>
                                    <td>{i.intensity}</td>
                                    <td>{formatDuration(i.duration)}</td>
                                    <td>{formatAbcs(i.antecedents)}</td>
                                    <td>{formatAbcs(i.behaviors)}</td>
                                    <td>{formatAbcs(i.consequences)}</td>
                                    <td>{i.description}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
        <div className="partial-section">
            <Table
                aria-label="recent incidents table"
                stickyHeader
                hoverRow
            >
                <thead>
                    <tr>
                        <th style={{ width: 40 }} aria-label="empty" />
                        {displayHeaders(mobileHeaders)}
                    </tr>
                </thead>
                <tbody>
                    {
                        incidents.map((i:Incident) => {
                            return (
                                <ExpandableRow incident={i} />
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default IncidentsTable
