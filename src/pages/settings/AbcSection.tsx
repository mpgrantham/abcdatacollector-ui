import { useState, useEffect } from 'react'

import Button from '@mui/joy/Button'
import Checkbox from '@mui/joy/Checkbox'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'

import { Abc } from '../../models/Abc'

interface AbcSectionProps {
    values: Abc[];
    typeCode: string;
    onChange: (values: Abc[]) => void;
}

const AbcSection = ({ values, typeCode, onChange }: AbcSectionProps) => {
    const [currentValues, setCurrentValues] = useState<Abc[]>([...values])
    const [selectedId, setSelectedId] = useState(0)
    const [value, setValue] = useState('')
    const [nextId, setNextId] = useState(0)
   
    useEffect(() => {
        let maxId = 0
        values.filter (v => {
            if (v.id > maxId) {
                maxId = v.id
            }
        })
        setNextId(maxId + 1)
    }, [values])
            
    const handleAbcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        let id = 0
        let abcValue = ''
        if (target.checked) {
            id = parseInt(event.target.value)
            const selectedAbc = currentValues.find(v => v.id === id)
            if (selectedAbc) {
                abcValue = selectedAbc.value
            }
        } 

        setSelectedId(id)
        setValue(abcValue)
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
  
    const addDisabled = () => {
        if (value.trim().length === 0 || selectedId !== 0) {
            return true
        }
        
        return currentValues.findIndex(v => v.action !== 'D' && v.value.trim().toLowerCase() === value.trim().toLowerCase()) !== -1
    }

    const addValue = () => {
        const abcs = [...currentValues]
        const idx = abcs.findIndex(v => v.value.trim().toLowerCase() === value.trim().toLowerCase())
        if (idx !== -1 && abcs[idx].action === 'D') {
            abcs[idx].action = 'A'
        } else {
            const abc: Abc = {
                id: nextId,
                typeCode: typeCode,
                value: value,
                activeFl: 'Y',
                action: 'A'
            }
            abcs.push(abc)

            setNextId(nextId + 1)
        }
        
        setCurrentValues(abcs)
        setValue('')
        setSelectedId(0)
        onChange(abcs)
    }

    const deleteValue = () => {
        const idx = currentValues.findIndex(v => v.id === selectedId)
        if (idx === -1) {
           return 
        }

        const abcs = [...currentValues]
        
        if (abcs[idx].action === 'A') {
            abcs.splice(idx,1)
        } else {
            abcs[idx] = { ...abcs[idx], action: 'D' }
            // abcs[idx] = { id: abcs[idx].id, typeCode: abcs[idx].typeCode, value: abcs[idx].value, activeFl: 'Y', action: 'D'}
        }

        setCurrentValues(abcs)
        setValue('')
        setSelectedId(0)
        onChange(abcs)
    }

    const editValue = () => {
        const idx = currentValues.findIndex(v => v.id === selectedId)
        if (idx === -1) {
           return 
        }

        const abcs = [...currentValues]

        abcs[idx].value = value
        
        if (abcs[idx].action !== 'A') {
            abcs[idx].action = 'U'
        } 

        setCurrentValues(abcs)
        setValue('')
        setSelectedId(0)
        onChange(abcs)
    }

    return (
        <div className="flex-column gap-10">
            <div className="flex-column gap-5 margin-b-50">
                <Typography level="title-sm">Value</Typography>
                <div className="flex-row gap-5">
                    <Input value={value} onChange={handleValueChange} />
                    <Button disabled={addDisabled()} onClick={addValue}>
                        Add
                    </Button>
                    <Button disabled={selectedId === 0} onClick={editValue}>
                        Update
                    </Button>
                    <Button disabled={selectedId === 0} onClick={deleteValue}>
                        Delete
                    </Button>
                </div>
            </div>

            <div className="abc-div">
                {
                    currentValues.filter(a => a.action !== 'D').map((a: Abc) => {
                        const label = a.action ? <span className="italic">{a.value}</span> : <span>{a.value}</span>
                        return (
                            <span className="section-span" key={a.id.toString()}>
                                <Checkbox 
                                    key={`abc-${a.id}`} 
                                    label={label} 
                                    value={a.id} 
                                    checked={a.id === selectedId}
                                    onChange={handleAbcChange}
                                />
                            </span>
                        )
                        })
                }
            </div>
        </div>
    )
}

export default AbcSection
