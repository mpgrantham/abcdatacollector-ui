import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'

import { Abc } from '../../models/Abc'

import EntryAddSection from './EntryAddSection'

interface LocationsProps {
    values: Abc[];
    selected: number;
    onChange: (value: number) => void;
    onAdd: (value: string) => void;
    disabled?: boolean;
}

const Locations = ({ values, selected, onChange, onAdd, disabled }: LocationsProps) => {
    // @ts-expect-error('event nver used')
    const handleLocationChange = (event: React.SyntheticEvent | null, value: number | null) => {
        onChange(value ?? 0)
    }

    return (
        <EntryAddSection label="Location" subLabel="(optional)" onAdd={(v) => onAdd(v)} disabled={disabled}>
            <Select onChange={handleLocationChange} value={selected}>
                <Option value={0} key={"0"}>Not Available</Option>
                {
                    values.map((a: Abc) => {
                        return <Option value={a.id} key={a.id.toString()}>{a.value}</Option>
                    })
                }
            </Select>
        </EntryAddSection>
    )
}

export default Locations
