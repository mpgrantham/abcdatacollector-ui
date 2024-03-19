import { useState } from 'react'
import Input from '@mui/joy/Input'

import { formatDate, formatTime, parseDateTimeString } from '../../utils/entryUtils'

interface DateTimeProps {
    value: Date | undefined;
    onChange: (value: Date | undefined) => void;
    readOnly?: boolean
    includeTime?: boolean
}

const DateTime = ({ value, onChange, readOnly = false, includeTime = true }: DateTimeProps) => {
    const [dateValue, setDateValue] = useState(formatDate(value))
    const [timeValue, setTimeValue] = useState(formatTime(value))

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setDateValue(value)
        onChange(parseDateTimeString(value, timeValue))
    }

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toUpperCase()
        setTimeValue(value)
        onChange(parseDateTimeString(dateValue, value))
    }
    
    return (
        <div className="flex-row gap-10">
            <Input
                type="date"
                value={dateValue}
                onChange={handleDateChange}
                placeholder="MM/DD/YYYY"
                readOnly={readOnly}
                slotProps={{
                    input: {
                        max: formatDate(new Date()),
                    },
                }}
            />

            {includeTime && 
                <Input
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    placeholder="hh:mm AM"
                    readOnly={readOnly}
                  
                />
            }
        </div>
    )
}

export default DateTime
                