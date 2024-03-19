import React from 'react'
import Input from '@mui/joy/Input'
import EntrySection from './EntrySection'

import DurationMaskAdapter from './DurationMask'

interface DurationProps {
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
}

const Duration = ({ value, onChange, readOnly = false, ...rest }: DurationProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <EntrySection label="Duration - Minutes:Seconds" subLabel="(optional)">
            <Input
                value={value}
                onChange={handleChange}
                placeholder="MM:SS"
                slotProps={{ input: { component: DurationMaskAdapter } }}
                readOnly={readOnly}
                {...rest}
            />
        </EntrySection>
    )
}

export default Duration
