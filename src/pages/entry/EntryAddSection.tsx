import { useState } from 'react'
import { type ReactNode } from 'react'

import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus }  from '@fortawesome/free-solid-svg-icons'

interface EntrySectionProps {
    label: string;
    subLabel?: string;
    disabled?: boolean;
    onAdd: (value: string) => void;
    children: ReactNode;
}

const EntryAddSection = ({ label, subLabel, onAdd, disabled = false, children }: EntrySectionProps) => {
    const [displayAddSection, setDisplayAddSection] = useState(false)
    const [value, setValue] = useState('')

    const toggleDisplayAdd = () => {
        setValue('')
        setDisplayAddSection(!displayAddSection)
    }

    const handleAdd = () => {
        onAdd(value)
        setDisplayAddSection(false)
    }

    return (
        <div className="flex-column gap-5 width-full">
            <div className="flex-row gap-5">
                <Typography level="title-md">{label}</Typography>
                {subLabel && <Typography level="body-sm">{subLabel}</Typography>}
                <Tooltip title="Add Value" variant="plain" size="sm">
                    <IconButton 
                        variant="plain" 
                        color="neutral"
                        onClick={toggleDisplayAdd}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </Tooltip>
            </div>

            {displayAddSection &&
                <div className="flex-row gap-5">
                    <Input value={value} onChange={(e) => setValue(e.target.value)} autoFocus/>
                    <Button onClick={handleAdd} disabled={value.trim() === ''}>Add</Button>
                    <Button variant="plain" color="neutral" onClick={() => setDisplayAddSection(false)}>Cancel</Button>
                </div>
            }
                        
            {children}
        </div>
    )
}

export default EntryAddSection
