import { useEffect, useState, useRef } from 'react'

import PageBreadcrumbs from '../../components/breadcrumbs/PageBreadcrumbs'

import { Incident } from '../../models/Incident'

import { getIncidents } from '../../services/IncidentService'

import { useAppSelector, useAppDispatch } from '../../redux/store'
import { setBreadcrumb } from '../../redux/appSlice'

import AddButton from '../../components/button/AddButton'
import CommonButton from '../../components/button/CommonButton'
import ObservedSelect from '../../components/select/ObservedSelect'
import IncidentsTable from '../../components/table/IncidentsTable'

import { exportIncidents } from '../../utils/export'
import { DEFAULT_SORT_ID, sortIncidents, filterIncidents, INITIAL_FILTER, Filters } from '../../utils/tableUtils'
import FilterDialog from './FilterDialog'

const IncidentLog = () => {
    const dispatch = useAppDispatch()
        
    const { sessionToken } = useAppSelector((state) => state.userSlice)
    const { observedId, observed }= useAppSelector((state) => state.observedSlice)

    const [incidents, setIncidents] = useState<Incident[]>([])
    const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([])
    const [orderBy, setOrderBy] = useState(DEFAULT_SORT_ID)
    const [ascending, setAscending] = useState(false)
    const [displayFilter, setDisplayFilter] = useState(false)
    const [filters, setFilters] = useState(INITIAL_FILTER)

    const handleSort = (sortId: string) => {
        let isAsc = true
        if (sortId === orderBy) {
            isAsc = !ascending
        } 

        setOrderBy(sortId)
        setAscending(isAsc)

        sortIncidents(incidents, sortId, isAsc)
    }

    useEffect(() => {
        dispatch(setBreadcrumb('Incident Log'))
    }, [dispatch])

    const handleResize = () => {
        if ( tableRef?.current ) {
            const extraHeight = 240

            tableRef.current.style.height = (window.innerHeight - extraHeight) + 'px'
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRef = useRef<any>(null)

    useEffect(() => {
        getIncidents(sessionToken, observedId).then((result: Incident[]) => {
            setIncidents(result)
            setFilteredIncidents(result)
        })

        handleResize()

        window.addEventListener("resize", handleResize)

        return function cleanup() {
            window.removeEventListener("resize", handleResize)
        }
    }, [sessionToken, observedId])

    const toggleFilter = () => {
        setDisplayFilter(!displayFilter)
    }

    const resetIncidents = () => {
        setFilteredIncidents(incidents)
        setFilters(INITIAL_FILTER)
        setDisplayFilter(false)
    }

    const handleFilterIncidents = (incomingFilters: Filters) => {
        const results = filterIncidents(incidents, incomingFilters);
        setFilters(incomingFilters);
        setFilteredIncidents(results);
        setDisplayFilter(false);
        // showSnackbar(dispatch, `Showing ${results.length} of ${incidents.length} incidents`, 'info');
    };

    const exportLog = () => {
        exportIncidents(incidents, `AllIncidents-${observed.observedName}.csv`)
    }

    return (
        <div className="flex-column">
            <PageBreadcrumbs />

            <div className="flex-row-between padding-h-75">
                <ObservedSelect />
                <div><AddButton /></div>
            </div>
            
            <div className="flex-column padding-h-75 margin-t-100 margin-b-100">
                <div className="flex-row-between margin-b-50">
                    <CommonButton 
                        label="Filter"
                        onClick={toggleFilter} 
                        tooltip="Filter Incidents"
                        icon="filter"
                    /> 

                    <CommonButton 
                        label="Export"
                        onClick={exportLog} 
                        tooltip="Export Incidents"
                        icon="download"
                    /> 
                </div>
                <div style={{height: '500px', overflow: 'auto' }} ref={tableRef}>
                    <IncidentsTable 
                        incidents={filteredIncidents} 
                        orderBy={orderBy}
                        ascending={ascending}
                        onSort={handleSort}
                    />
                </div>
            </div>    

            {
                displayFilter && 
                <FilterDialog 
                    openFl={displayFilter}
                    filters={filters}
                    locations={observed.locations ?? []}
                    onReset={resetIncidents}
                    onFilter={handleFilterIncidents}
                    onClose={() => setDisplayFilter(false)}
                />
            }   
        </div>
    )
}

export default IncidentLog
