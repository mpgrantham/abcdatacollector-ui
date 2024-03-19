import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'

import EntrySection from './EntrySection'

interface IntensitiesProps {
    values: string[];
    selected: string;
    onChange: (value: string) => void;
}

const Intensities = ({ values, selected, onChange }: IntensitiesProps) => {
    // @ts-expect-error('event nver used')
    const handleIntensityChange = (event: React.SyntheticEvent | null, value: string | null) => {
        onChange(value ?? '')
    }

    return (
        <EntrySection label="Intensities" subLabel="(optional)">
            <Select onChange={handleIntensityChange} value={selected}>
                <Option value="" key={"NA"}>Not Available</Option>
                {
                    values.map((intensity: string) => {
                        return <Option value={intensity} key={intensity}>{intensity}</Option>
                    })
                }
            </Select>
        </EntrySection>
    )
}

export default Intensities
