import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Textarea from '@mui/joy/Textarea'
import Tooltip from '@mui/joy/Tooltip'

import { useAppSelector, useAppDispatch  } from '../../redux/store'
import { setBreadcrumb, setSnackbar } from '../../redux/appSlice'
import { addObservedAbc } from '../../redux/observedSlice';

import { getIntensities, getIncident, saveIncident, deleteIncident } from '../../services/IncidentService'

import { Abc } from '../../models/Abc'
import { Incident } from '../../models/Incident'

import PageBreadcrumbs from '../../components/breadcrumbs/PageBreadcrumbs'
import ObservedSelect from '../../components/select/ObservedSelect'
import CommonButton from '../../components/button/CommonButton'
import DateTime from '../../components/input/DateTime'

import { INITIAL_ENTRY, convertDurationToSeconds, getAbcs, getLocation, mapEntry } from '../../utils/entryUtils'

import AbcSection from './AbcSection'
import Locations from './Locations'
import Intensities from './Intensities'
import Duration from './Duration'
import EntrySection from './EntrySection'
import ConfirmDeleteModal from './ConfirmDeleteModal'

const IncidentEntry = () => {
    const dispatch = useAppDispatch()
    const { sessionToken, userId } = useAppSelector((state) => state.userSlice)
    const { observedId, observed }= useAppSelector((state) => state.observedSlice)

    const navigate = useNavigate();
    const { id } = useParams()

    const [intensities, setIntensities] = useState<string[]>([])

    const [entry, setEntry] = useState(INITIAL_ENTRY);
    const [readOnly, setReadOnly] = useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)

    useEffect(() => {
        dispatch(setBreadcrumb('Incident Entry'))

        getIntensities().then(result => {
            setIntensities(result);
        })

        if (id) {
            setReadOnly(true)
           
            getIncident(sessionToken, parseInt(id)).then((result: Incident) => {
                setEntry(mapEntry(result))
            })
        }

    }, [dispatch, sessionToken, id])

    const handleDateTimeChange = (value: Date | undefined) => {
        setEntry({ ...entry, incidentDate: value })
    }

    const handleAbcChange = (name:string, values: number[]) => {
        if (name === 'antecedents') {
            setEntry({ ...entry, antecedents: values })
        } else if (name === 'behaviors') {
            setEntry({ ...entry, behaviors: values })
        } else if (name === 'consequences') {
            setEntry({ ...entry, consequences: values })
        }
    }

    const handleAddAbc = (value: string, typeCode: string) => {
        const abc: Abc = {
            id: 0,
            typeCode: typeCode,
            value: value,
            activeFl: 'Y'
        }

        dispatch(addObservedAbc({ observedId: observed.id, abc: abc, sessionToken: sessionToken }))
    }

    const handleLocationChange = (value: number) => {
        setEntry({ ...entry, locationId: value })
    }

    const handleIntensityChange = (value: string) => {
        setEntry({ ...entry, intensity: value })
    }

    const handleDurationChange = (value: string) => {
        setEntry({ ...entry, duration: value })
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntry({ ...entry, description: event.target.value })
    }

    const saveDisabled = () => {
        if (readOnly || !entry.incidentDate || entry.antecedents.length === 0 || entry.behaviors.length === 0 || entry.consequences.length === 0) {
            return true;
        }

        return false;
    }

    const handleSave = () => {
        if (!entry.incidentDate) {
            return
        }

        const incident: Incident = {
            id: entry.id,
            userId: userId,
            observedId: observedId,
            incidentDate: entry.incidentDate.getTime(),
            duration: convertDurationToSeconds(entry.duration),
            intensity: entry.intensity,
            description: entry.description,
            location: getLocation(entry.locationId, observed.locations),
            antecedents: getAbcs(entry.antecedents, observed.antecedents),
            behaviors: getAbcs(entry.behaviors, observed.behaviors),
            consequences: getAbcs(entry.consequences, observed.consequences),
        }

        saveIncident(sessionToken, incident).then(() => {
            dispatch(setSnackbar({ severity: 'success', message: 'Incident Saved' }));
        })
    }
   
    const handleDelete = () => {
        setDisplayDeleteModal(false)

        deleteIncident(sessionToken, entry.id).then(() => {
            dispatch(setSnackbar({ severity: 'success', message: 'Incident Deleted' }));
            navigate(-1)
        })
    }

    const getEditViewButton = () => {
        if (readOnly) {
            return (
                <CommonButton 
                    label="Edit"
                    onClick={() => setReadOnly(false)} 
                    tooltip="Edit Incident"
                    icon="edit"
                /> 
            )
        }

        return (
            <Tooltip title="Return to View mode" variant="plain">
                <Button type="button" onClick={() => setReadOnly(true)} color="neutral">
                    Cancel
                </Button>
            </Tooltip>
        )
    }

    return (
        <div className="flex-column">
            <PageBreadcrumbs />

            <div className="flex-row-between padding-h-75">
                <ObservedSelect disabled={id !== undefined} />
                
                {id !== undefined &&
                    <div className="flex-row gap-10">
                        {getEditViewButton()}

                        <CommonButton 
                            label="Delete"
                            onClick={() => setDisplayDeleteModal(true)}
                            tooltip="Delete Incident"
                            icon="delete"
                            color="neutral"
                        /> 
                    </div>
                }
                
            </div>

            <div className="flex-column padding-h-75 margin-t-100 margin-b-100 gap-10">
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <EntrySection label="Incident Date and Time">
                        <DateTime value={entry.incidentDate} onChange={handleDateTimeChange} readOnly={readOnly} />
                    </EntrySection>

                    <AbcSection 
                        name="antecedents"
                        label="Antecedents" 
                        values={observed.antecedents ?? []} 
                        selected={entry.antecedents}
                        onChange={handleAbcChange}
                        onAdd={(value) => handleAddAbc(value, 'A')}
                        disabled={readOnly}
                    />

                    <AbcSection 
                        name="behaviors"
                        label="Behaviors" 
                        values={observed.behaviors ?? []} 
                        selected={entry.behaviors}
                        onChange={handleAbcChange}
                        onAdd={(value) => handleAddAbc(value, 'B')}
                        disabled={readOnly}
                    />

                    <AbcSection 
                        name="consequences"
                        label="Consequences" 
                        values={observed.consequences ?? []} 
                        selected={entry.consequences}
                        onChange={handleAbcChange}
                        onAdd={(value) => handleAddAbc(value, 'C')}
                        disabled={readOnly}
                    />

                    <Locations
                        values={observed.locations || []}
                        selected={entry.locationId ?? 0}
                        onChange={handleLocationChange}
                        onAdd={(value) => handleAddAbc(value, 'L')}
                        disabled={readOnly}
                    />

                    <Intensities
                        values={intensities}
                        selected={entry.intensity ?? ''}
                        onChange={handleIntensityChange}
                    />

                    <Duration value={entry.duration ?? ''} onChange={handleDurationChange} readOnly={readOnly} />

                    <EntrySection label="Description" subLabel="(optional)">
                        <Textarea placeholder="Description" minRows="2" onChange={handleDescriptionChange} value={entry.description} readOnly={readOnly} />
                    </EntrySection>

                    <Button variant="solid" color="success" onClick={handleSave} size="lg" disabled={saveDisabled()}>Save</Button>
                </Stack>
            </div>

            {displayDeleteModal &&
                <ConfirmDeleteModal 
                    openFl={displayDeleteModal} 
                    incident={entry}
                    onClose={() => setDisplayDeleteModal(false)} 
                    onConfirm={handleDelete} 
                />
            }
        </div>
    )
}

export default IncidentEntry
