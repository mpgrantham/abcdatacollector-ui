import React from 'react'

import Typography from '@mui/joy/Typography'

interface EntrySectionProps {
    label: string;
    subLabel?: string;
    children: React.ReactNode;
}

const EntrySection = ({ label, subLabel, children }: EntrySectionProps) => {
    return (
        <div className="flex-column gap-5 width-full">
            <div className="flex-row gap-5">
                <Typography level="title-md">{label}</Typography>
                {subLabel && <Typography level="body-sm">{subLabel}</Typography>}
            </div>
                        
            {children}
        </div>
    )
}

export default EntrySection
