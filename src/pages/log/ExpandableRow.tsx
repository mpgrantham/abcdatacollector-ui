import { useEffect, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp }  from '@fortawesome/free-solid-svg-icons'

import { Incident, formatDateTime, formatDuration, formatAbcs } from '../../models/Incident'

interface ExpandableRowProps {
    incident: Incident;
}

interface LabelValueProps {
    label: string;
    value: string | undefined;
}

const LabelValue = ({label, value}: LabelValueProps) => {
    return (
        <div className="flex-column gap-5 width-full">
            <Typography level="title-md">{label}</Typography>
            <Typography level="body-md">{value}</Typography>
        </div>
    )
}

const LabelValueColumn = ({label, value}: LabelValueProps) => {
    return (
        <div className="flex-column gap-5 width-full">
            <div className="flex-column gap-5 width-full">
                <Typography level="title-md">{label}</Typography>
                <Typography level="body-md">{value}</Typography>
            </div>
        </div>
    )
}

const ExpandableRow = ({ incident }: ExpandableRowProps) => {
    const [openFl, setOpenFl] = useState(false)
    const [currentId, setCurrentId] = useState(incident.id)

    useEffect(() => {
        if (currentId !== incident.id) {
            setCurrentId(incident.id)
            setOpenFl(false)
        }
    }, [incident, currentId])

    const key = incident.id.toString();
    
    return (
        <>
            <tr key={key}>
                <td key={`${key}_icon`}>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpenFl(!openFl)}
                    >
                        {openFl ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                    </IconButton>
                </td>
                <td key={`${key}_date`}>
                    <Link component={RouterLink} to={`/entry/${incident.id}`}>
                        {formatDateTime(incident.incidentDate)}
                    </Link>
                </td>
                <td key={`${key}_location`}>
                    {incident.location?.value}
                </td>
            </tr>
            {openFl &&
            <tr key={`${incident.id.toString()}_details`}>
                <td aria-label="empty" />
                <td>
                    <div className="flex-column gap-10">
                        <div className="flex-row gap-50 width-full">
                            <div className="flex-column gap-5 width-full">
                                <LabelValue label="Intensity" value={incident.intensity} />
                            </div>
                            <div className="flex-column gap-5 width-full">
                                <LabelValue label="Duration" value={formatDuration(incident.duration)} />
                            </div>
                        </div>
                        <LabelValueColumn label="Antecedent" value={formatAbcs(incident.antecedents)} />
                        <LabelValueColumn label="Behavior" value={formatAbcs(incident.behaviors)} />
                        <LabelValueColumn label="Consequence" value={formatAbcs(incident.consequences)} />
                        <LabelValueColumn label="Description" value={incident.description} />
                    </div>
                </td>
            </tr>
            }
        </>
    )
}

export default ExpandableRow
