import Checkbox from '@mui/joy/Checkbox'

import { Abc } from '../../models/Abc'

import EntryAddSection from './EntryAddSection'

interface AbcSectionProps {
    name: string;
    label: string;
    values: Abc[];
    selected: number[];
    onChange: (name: string, values: number[]) => void;
    onAdd: (value: string) => void;
    disabled?: boolean;
}

const AbcSection = ({ name, label, values, selected, onChange, onAdd, disabled}: AbcSectionProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);

        const updatedSelected = selected.includes(value)
            ? selected.filter((c: number) => c !== value)
            : [...selected, value];

        onChange(name, updatedSelected);
    }
  
    return (
        <EntryAddSection label={label} subLabel="(choose at least one)" onAdd={(v) => onAdd(v)} disabled={disabled}>
            <div className="abc-div">
                {
                    values.map((a: Abc) => (
                        <span className="section-span" key={a.id.toString()}>
                            <Checkbox 
                                key={`abc-${a.id}`} 
                                label={a.value} 
                                value={a.id} 
                                checked={selected.includes(a.id)}
                                onChange={e => handleChange(e)}
                            />
                        </span>
                    ))
                }
            </div>
        </EntryAddSection>
    )
}

export default AbcSection
