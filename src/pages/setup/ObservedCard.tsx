import { useState } from 'react'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

interface ObservedCardProps {
    observedNames: string[];
    onNext: (observedNames: string[]) => void;
    onBack: (observedNames: string[]) => void;
}

const ObservedCard = ({observedNames, onNext, onBack}: ObservedCardProps ) => {
    const [values, setValues] = useState(observedNames);
    const [value, setValue] = useState('')
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const addObserved = () => {
        const copy = [...values]
        copy.push(value)
        setValues(copy)
        setValue("")
    }

    const removeObserved = (index:number) => {
        const copy = [...values]
        copy.splice(index, 1)
        setValues(copy)
    }

    const nextDisabled = () => {
        return values.find(v => v.trim().length > 0) === undefined
    }
       
    return (
        <Card>
            <Typography level="title-lg">
                Observed
             </Typography>

            <CardContent>
                <div className="flex-column align-start gap-25">
                    <Typography>
                        Provide the name of at least one Observed. 
                        <br/>You can add, change, or remove Observed later in 'Settings'.
                    </Typography>

                    <div className="flex-column gap-10">
                        <div className="flex-row gap-10">
                            <Input value={value} onChange={handleInputChange} />
                                    
                            <Tooltip title={`Add ${value}`} variant="plain">
                                <IconButton variant="outlined" color="neutral" onClick={addObserved} disabled={value.trim().length === 0}>
                                    <FontAwesomeIcon icon={faPlus} size="lg"/>
                                </IconButton>
                            </Tooltip>
                        </div>

                        <Typography level="body-md">Observed</Typography>
                        {
                            values.map((v:string, index) => {
                                return (
                                    <div className="flex-row gap-10" key={v}>
                                        <Typography level="title-md" fontWeight="lg" style={{marginLeft: "25px"}} key={v}>{v}</Typography>
                                        <Tooltip title={`Remove ${v}`} variant="plain">
                                            <IconButton variant="outlined" color="neutral" onClick={() => removeObserved(index)}>
                                                <FontAwesomeIcon icon={faMinus} size="sm" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )
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
                        onClick={() => onBack(values)} 
                    >
                        Back
                    </Button>

                    <Button 
                        color="primary" 
                        variant="solid" 
                        onClick={() => onNext(values)} 
                        disabled={nextDisabled()}
                    >
                        Next
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default ObservedCard
