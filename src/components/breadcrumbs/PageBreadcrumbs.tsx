import { Link as RouterLink  } from 'react-router-dom'
import Breadcrumbs from '@mui/joy/Breadcrumbs'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

import { useAppSelector } from '../../redux/store'

interface Trail {
    label: string;
    route: string;
}

import * as paths from '../../utils/routes'

const pageRoutes: Trail[] = [
    { label: 'Dashboard', route: paths.DASHBOARD },
    { label: 'Incident Log', route: paths.LOG },
    { label: 'Incident Entry', route: paths.ENTRY }
]

const PageBreadcrumbs = () => {
    const { breadcrumbs } = useAppSelector(state => state.appSlice)
   
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    breadcrumbs.map((breadcrumb: string, index: number) => {
                        const pageRoute = pageRoutes.find(p => p.label === breadcrumb)
                        if (pageRoute && index + 1 < breadcrumbs.length) {
                            return <Link key={pageRoute.label} color="neutral" component={RouterLink} to={pageRoute.route}>{pageRoute.label}</Link>
                        } else {
                            return <Typography key={breadcrumb}>{breadcrumb}</Typography>
                        }
                    })
                }
            </Breadcrumbs>
        </div>
    )
}

export default PageBreadcrumbs
