import Typography from '@mui/joy/Typography'

interface FilterFieldSectionProps {
    label: string;
    children: React.ReactNode;
}

const FilterFieldSection = ({ label, children }: FilterFieldSectionProps) => {
    return (
        <div className="flex-column gap-5 width-full">
            <Typography level="title-md">{label}</Typography>
                                    
            {children}
        </div>
    )
}

export default FilterFieldSection

