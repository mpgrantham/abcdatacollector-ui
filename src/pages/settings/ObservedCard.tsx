import { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'

import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Table from '@mui/joy/Table'
import Typography from '@mui/joy/Typography'

import { useAppDispatch, useAppSelector } from '../../redux/store'
import { saveObserved, deleteObserved } from '../../redux/observedSlice'
import { setSnackbar } from '../../redux/appSlice'
import { getDefaultObserved } from '../../services/observedService';

import { Observed } from '../../models/Observed'
import CommonButton from '../../components/button/CommonButton'
import DatasheetButton from '../../components/button/DatasheetButton'

import Datasheet from '../../components/datasheet/Datasheet'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import ObservedEdit from './ObservedEdit'

import { exportObservedData, download } from '../../utils/export'
import { getIncidents } from '../../services/IncidentService'

import { cloneObserved } from '../../utils/settingsUtils'

const ObservedCard = () => {
    const dispatch = useAppDispatch();
    const { observedList } = useAppSelector((state) => state.observedSlice)
    const { sessionToken } = useAppSelector((state) => state.userSlice)

    const [defaultObserved, setDefaultObserved] = useState<Observed>({} as Observed)
    const [displayEdit, setDisplayEdit] = useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    const [currentObserved, setCurrentObserved] = useState<Observed>({} as Observed)
        
    useEffect(() => {
        getDefaultObserved().then(result => {
            setDefaultObserved(result)
        })
    }, [])
    
    const showAddObserved = () => {
        const o: Observed = cloneObserved(defaultObserved)
        setCurrentObserved(o)
        setDisplayEdit(true)
    }

    const showEditObserved = (index: number) => {
        const o = { ...observedList[index] }
        setCurrentObserved(o)
        setDisplayEdit(true)
    }    
  
    const showDeleteObserved = (index: number) => {
        const o = { ...observedList[index] }
        setCurrentObserved(o)
        setDisplayDeleteModal(true)
    }

    const handleExport = (observedId: number) => {
        const observed = observedList.find(o => o.id === observedId)
        if (observed) {
            const o = { ...observed }
            getIncidents(sessionToken, o.id).then(result => {
                o.incidents = result
                exportObservedData(o)
            })
        }
    }

    const handleSave = () => {
        dispatch(saveObserved({observed: currentObserved, sessionToken: sessionToken ?? 'SESSIONTOKEN'}))
            .unwrap().then(() => {
                dispatch(setSnackbar({ severity: 'success', message: 'Observed saved' }));
                setDisplayEdit(false)
            })
    }

    const handleDelete = () => {
        setDisplayDeleteModal(false)

        dispatch(deleteObserved({observedId: currentObserved.id, sessionToken: sessionToken ?? 'SESSIONTOKEN'}))
            .unwrap().then(() => {
                dispatch(setSnackbar({ severity: 'success', message: 'Observed deleted' }));
            })
    }

    const createDataSheet = async (index: number) => {
        const o = { ...observedList[index] }
        const blob = await pdf(<Datasheet observed={o} />).toBlob()
        download(blob, `Datasheet_${o.observedName}.pdf`)
    }
       
    return (
        <Card>
            <Typography level="title-lg">
                Observed
             </Typography>

            <CardContent>
                <div className="flex-column align-start">
                    <Button color="primary" variant="solid" onClick={showAddObserved} disabled={displayEdit}>
                        Add
                    </Button>
                    <Table
                        aria-label="observed table"
                        stickyHeader
                    >
                        <thead>
                            <tr>
                                <th>Observed Name</th>
                                <th style={{width: '70%'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                observedList.map((o:Observed, index) => {
                                    return (
                                        <tr key={o.id.toString()}>
                                            <td>{o.observedName}</td>
                                            <td>
                                                <div className="flex-row gap-10">
                                                    <CommonButton 
                                                        onClick={() => showEditObserved(index)} 
                                                        tooltip="Edit Observed"
                                                        disabled={displayEdit}
                                                        icon="edit"
                                                    /> 

                                                    <CommonButton 
                                                        onClick={() => handleExport(o.id)} 
                                                        tooltip="Backup Observed Data"
                                                        disabled={displayEdit}
                                                        icon="download"
                                                    /> 

                                                    <DatasheetButton onClick={() => createDataSheet(index)} />
                                                        
                                                    {observedList.length > 1 && 
                                                        <CommonButton 
                                                            onClick={() => showDeleteObserved(index)} 
                                                            tooltip="Remove Observed"
                                                            disabled={displayEdit}
                                                            icon="remove"
                                                        /> 
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                {displayEdit && 
                    <ObservedEdit
                        observed={currentObserved}
                        onChange={(o) => setCurrentObserved(o)}
                        onCancel={() => setDisplayEdit(false)}
                        onSave={handleSave}
                    />
                    
                }
            </CardContent>

            {displayDeleteModal &&
                <ConfirmDeleteModal 
                    openFl={displayDeleteModal} 
                    observed={currentObserved}
                    onClose={() => setDisplayDeleteModal(false)} 
                    onDelete={handleDelete} 
                    onExport={handleExport}
                />
            }
        </Card>
    )
}

export default ObservedCard
