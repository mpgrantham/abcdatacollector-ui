import { useEffect } from 'react'
import AddButton from '../../components/button/AddButton'
import PageBreadcrumbs from '../../components/breadcrumbs/PageBreadcrumbs'

import DashboardContent from './DashboardContent'
import ObservedSelect from '../../components/select/ObservedSelect'

import { useAppDispatch  } from '../../redux/store'
import { setBreadcrumb } from '../../redux/appSlice'

const Dashboard = () => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(setBreadcrumb('Dashboard'))
    }, [dispatch])

    return (
        <div className="flex-column">
            <PageBreadcrumbs />

            <div className="flex-row-between padding-h-75">
                <ObservedSelect />
                <div><AddButton /></div>
            </div>
            
            <DashboardContent />
        </div>
    )
}

export default Dashboard
