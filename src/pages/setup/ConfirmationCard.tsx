import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Typography from '@mui/joy/Typography'

import { START_PAGE_MAPPINGS } from '../../utils/routes'

interface ConfirmationCardProps {
    startPage: string;
    observedNames: string[];
    onNext: () => void;
    onBack: () => void;
}

const ConfirmationCard = ({ startPage, observedNames, onNext, onBack }: ConfirmationCardProps ) => {

    const page = START_PAGE_MAPPINGS.find(m => m.value === startPage)
       
    return (
        <Card>
            <Typography level="title-lg">
                Confirmation
             </Typography>

            <CardContent>
                <div className="flex-column align-start gap-25">
                    <Typography>
                        Please confirm your selections then click 'Submit'.
                        <br/>After submission you'll be directed to ABC Data Collector.
                    </Typography>

                    <div className="flex-column gap-10">
                        <div className="flex-row gap-10">
                            <Typography level="body-md">Start Page  </Typography>
                            <Typography level="title-md" fontWeight="lg">{page?.label}</Typography>
                        </div>
                      
                        <Typography level="body-md">Observed</Typography>
                        {
                            observedNames.map((v:string) => {
                                return <Typography level="title-md" fontWeight="lg" style={{marginLeft: "25px"}} key={v}>{v}</Typography>
                            })
                        }
                    </div>
                </div>
            </CardContent>
            <CardActions>
                <div className="flex-row-between" style={{width: "100%"}}>
                    <Button 
                        color="neutral" 
                        variant="outlined" 
                        onClick={() => onBack()} 
                    >
                        Back
                    </Button>

                    <Button 
                        color="primary" 
                        variant="solid" 
                        onClick={() => onNext()} 
                    >
                        Submit
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default ConfirmationCard
