import { useEffect } from 'react'

import { useAppDispatch } from '../../redux/store'
import { setBreadcrumbs } from '../../redux/appSlice'

import PageBreadcrumbs from '../../components/breadcrumbs/PageBreadcrumbs'

import HostCard from './HostCard'
import ProfileCard from './ProfileCard'
import ObservedCard from './ObservedCard'

const Settings = () => {
    const dispatch = useAppDispatch()
      
    useEffect(() => {
        dispatch(setBreadcrumbs(['Dashboard', 'Settings']))
    }, [dispatch])

    return (
        <div className="flex-column">
            <PageBreadcrumbs />
            
            <div className="flex-column gap-25 padding-h-75 padding-b-100">
                <HostCard />
                
                <ProfileCard />

                <ObservedCard />
            </div>     
        </div>
    )
}

export default Settings
