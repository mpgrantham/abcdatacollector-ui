import { useState, useEffect } from 'react';
import { Link as RouterLink  } from 'react-router-dom'

import Button from '@mui/joy/Button'
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

import { useAppSelector } from '../../redux/store'

import CommonButton from '../../components/button/CommonButton'
import IncidentsTable from '../../components/table/IncidentsTable'

import { Incident } from '../../models/Incident'

import { getIncidents } from '../../services/IncidentService'

import { LOG } from '../../utils/routes'

import { exportIncidents } from '../../utils/export'
import { DEFAULT_SORT_ID, sortIncidents } from '../../utils/tableUtils'

import AbcFrequency from './AbcFrequency'
import AbcPieChart from './AbcPieChart'

const toggleItems = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
    { value: '360', label: 'Last 360 Days' },
]



const DashboardContent = () => {
    const { sessionToken } = useAppSelector((state) => state.userSlice)
    const { observedId, observed }= useAppSelector((state) => state.observedSlice)

    const [period, setPeriod] = useState('30')
    const [incidents, setIncidents] = useState<Incident[]>([])
    const [orderBy, setOrderBy] = useState(DEFAULT_SORT_ID)
    const [ascending, setAscending] = useState(false)
   
    useEffect(() => {
        const start: Date = new Date()
        start.setDate(start.getDate() - parseInt(period))

        getIncidents(sessionToken, observedId, start).then((result: Incident[]) => {
            setOrderBy(DEFAULT_SORT_ID)
            setAscending(false)
            setIncidents(result)
        })

    }, [sessionToken, observedId, period])

    const handleSort = (sortId: string) => {
        let isAsc = true
        if (sortId === orderBy) {
            isAsc = !ascending
        } 

        setOrderBy(sortId)
        setAscending(isAsc)

        sortIncidents(incidents, sortId, isAsc)
    }
   
    const exportLog = () => {
        exportIncidents(incidents, `DashboardIncidents-${observed.observedName}.csv`)
    }

    return (
        <div className="flex-column padding-h-75 padding-b-100 margin-t-100">
            <div>
                <ToggleButtonGroup 
                    aria-label="button-group" 
                    color="primary"
                    value={period}
                    onChange={
                        // @ts-expect-error('event nver used')
                        (event, newValue) => {
                        setPeriod(newValue ?? '30');
                    }}
                >
                    {
                        toggleItems.map(item => {
                            return <Button key={item.label} value={item.value}>{item.label}</Button>
                        })
                    }
                </ToggleButtonGroup>
            </div>

            <div className="margin-t-100">
                <Card>
                    <div className="flex-row-between">
                        <Typography level="title-lg">
                            Recent Incidents
                        </Typography>
                            
                        <div> 
                            <CommonButton 
                                label="Export"
                                onClick={exportLog} 
                                tooltip="Export Recent Incidents"
                                icon="download"
                            /> 
                        </div>
                    </div>
                    <CardContent>
                        <div style={{height: '200px', overflow: 'auto'}}>
                            <IncidentsTable 
                                incidents={incidents} 
                                orderBy={orderBy}
                                ascending={ascending}
                                onSort={handleSort}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Link color="primary" component={RouterLink} to={LOG}>See All Incidents</Link>
                    </CardActions>
                </Card>
            </div>

            <div className="margin-t-100">
                <Card>
                    <Typography level="title-lg">
                        Top ABC Combinations
                    </Typography>
                    <CardContent>
                        <div className="pie-chart-section">
                            <AbcPieChart
                                title="Antecedent - Behavior"
                                incidents={incidents}
                            />
                            <AbcPieChart
                                title="Behavior - Consequence"
                                incidents={incidents}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="margin-t-100">
                <AbcFrequency incidents={incidents} />
            </div>
        </div>       
    )
}

export default DashboardContent
