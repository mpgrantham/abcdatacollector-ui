import { useState } from 'react'
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Switch from '@mui/joy/Switch'

import Typography from '@mui/joy/Typography'

interface RequireLoginCardProps {
    requireLogin: string;
    onNext: (requireLoginValue: string) => void;
}

const RequireLoginCard = ({requireLogin, onNext}: RequireLoginCardProps ) => {
    const [checked, setChecked] = useState(requireLogin === 'Y');

    const handleNextClick = () => {
        onNext(checked ? 'Y' : 'N');
    }

    return (
        <Card>
            <Typography level="title-lg">
                Require Login
             </Typography>

            <CardContent>
                <div className="flex-column align-start gap-25">
                    <Typography>
                        To provide access to only certain users, choose 'Login Required'.<br/>Otherwise, 'No Login Required' is recommended.
                    </Typography>

                    <Switch
                        checked={checked}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setChecked(event.target.checked)
                        }
                        color={checked ? 'success' : 'primary'}
                        variant="solid"
                        endDecorator={checked ? 'Login Required' : 'No Login Required'}
                    />

                    {checked && <Typography maxWidth={400} level="body-sm">
                        Users must create login credentials to access application.
                    </Typography>}

                    {!checked && <Typography maxWidth={400} level="body-sm">
                        Application requires no login credentails.
                    </Typography>}
                </div>

            </CardContent>
            <CardActions>
                <div className="flex-row-end">
                    <Button 
                        color="primary" 
                        variant="solid" 
                        onClick={handleNextClick} 
                    >
                        Next
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default RequireLoginCard
