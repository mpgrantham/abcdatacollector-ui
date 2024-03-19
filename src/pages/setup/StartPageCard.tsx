import { useState } from 'react'
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Typography from '@mui/joy/Typography'

import { StartPage, START_PAGE_MAPPINGS } from '../../utils/routes'

interface StartPageCardProps {
    startPage: string;
    onNext: (startPage: string) => void;
}

const StartPageCard = ({startPage, onNext }: StartPageCardProps ) => {
    const [value, setValue] = useState(startPage);

    return (
        <Card>
            <Typography level="title-lg">
                Start Page
             </Typography>

            <CardContent>
                <div className="flex-column align-start gap-25">
                    <Typography>
                        Choose what page opens when you access ABC Data Collector.<br/>Choosing 'Incident Entry' is recommended if your primary activity is logging an incident.
                        <br/>You can change this later in 'Settings'.
                    </Typography>

                    <RadioGroup name="radio-buttons-group" value={value} onChange={(e) => setValue(e.target.value)}>
                        {
                            START_PAGE_MAPPINGS.map((mapping: StartPage) => {
                                return <Radio value={mapping.value} label={mapping.label} key={mapping.value} />
                            })
                        }
                    </RadioGroup>
                </div>
            </CardContent>
            <CardActions>
                <div className="flex-row-end" style={{width: "100%"}}>
                    <Button 
                        color="primary" 
                        variant="solid" 
                        onClick={() => onNext(value)} 
                    >
                        Next
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default StartPageCard
