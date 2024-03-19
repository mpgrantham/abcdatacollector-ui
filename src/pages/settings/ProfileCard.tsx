import { useState } from 'react'

import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Typography from '@mui/joy/Typography'

import { useAppDispatch, useAppSelector } from '../../redux/store'
import { AppMode, updateAppMode } from '../../redux/userSlice'
import { setSnackbar } from '../../redux/appSlice'

import { StartPage, START_PAGE_MAPPINGS } from '../../utils/routes'

const ProfileCard = () => {
    const dispatch = useAppDispatch()

    const { appModeId, startPage, sessionToken, ipAddress, hostName, port } = useAppSelector(state => state.userSlice)

    const [currentStartPage, setCurrentStartPage] = useState(startPage);

    const handleSave = () => {
        const appMode: AppMode = {
            id: appModeId,
            setupComplete: 'Y',
            requireLogin: 'N',
            startPage: currentStartPage,
            sessionToken: sessionToken,
            ipAddress: ipAddress,
            hostName: hostName,
            port: port
        }

        dispatch(updateAppMode(appMode)).unwrap().then(() => {
            dispatch(setSnackbar({ severity: 'success', message: 'Start Page Updated' }));
        })
    }

    return (
        <Card>
            <Typography level="title-lg">
                Start Page
             </Typography>

            <CardContent>
                <div className="flex-column align-start gap-25">
                    <RadioGroup name="radio-buttons-group" value={currentStartPage} onChange={(e) => setCurrentStartPage(e.target.value)}>
                        {
                            START_PAGE_MAPPINGS.map((mapping: StartPage) => {
                                return <Radio value={mapping.value} label={mapping.label} key={mapping.value} />
                            })
                        }
                    </RadioGroup>
                </div>
            </CardContent>
            <CardActions>
                <div className="flex-row" style={{width: "100%"}}>
                    <Button 
                        color="success" 
                        variant="solid" 
                        onClick={handleSave} 
                    >
                        Save
                    </Button>
                </div>
            </CardActions>
        </Card>

    )

}

export default ProfileCard
