
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'

import Typography from '@mui/joy/Typography'

import { useAppSelector } from '../../redux/store'

const HostCard = () => {
    const { ipAddress, hostName, port } = useAppSelector(state => state.userSlice)

  
    return (
        <Card>
            <Typography level="title-lg">
                Network Host
             </Typography>

            <CardContent>
                <div className="flex-column gap-10 width-full">
                    <div className="flex-column gap-5 width-full">
                        <Typography level="title-md">IP Address</Typography>
                        <Typography level="body-md">{ipAddress}</Typography>
                    </div>
                    
                    <div className="flex-column gap-5 width-full">
                        <Typography level="title-md">Host Name</Typography>
                        <Typography level="body-md">{hostName}</Typography>
                    </div>

                    <div className="flex-column gap-5 width-full">
                        <Typography level="title-md">Port</Typography>
                        <Typography level="body-md">{port}</Typography>
                    </div>

                    <div className="flex-column gap-5 width-full">
                        <Typography level="title-md">URL</Typography>
                        <Typography level="body-md">http://{hostName}:{port}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default HostCard
