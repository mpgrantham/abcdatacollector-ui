import { useState } from 'react'

import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import Typography from '@mui/joy/Typography'

import AbcSection from './AbcSection'

import { Abc } from '../../models/Abc'
import { Observed } from '../../models/Observed'

interface ObservedEditProps {
    observed: Observed;
    onChange: (tobserved: Observed) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ObservedEdit = ({ observed, onChange, onCancel, onSave }: ObservedEditProps) => {
    const [observedName, setObservedName] = useState(observed.observedName)
    const [currentTab, setCurrentTab] = useState<number | string>(0)

    const handleObservedNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setObservedName(event.target.value)
        const o = { ...observed }
        o.observedName = event.target.value
        onChange(o)
    }

    const handleAbcValuesChange = (typeCode: string, values: Abc[]) => {
        const o = { ...observed }
        if (typeCode === 'A' ) {
            o.antecedents = values
        } else if (typeCode === 'B' ) {
            o.behaviors = values
        } else if (typeCode === 'C' ) {
            o.consequences = values
        } else if (typeCode === 'L' ) {
            o.locations = values
        } 

        onChange(o)
    }

    // @ts-expect-error('event never used')
    const handleTabChange = (event: React.SyntheticEvent<Element, Event> | null, value: number | string | null) => {
        if (value !== null) {
            setCurrentTab(value)
        }
    }

    const disableSave = () => {
        return observedName.trim().length === 0
    }

    return (
        <div className="flex-column gap-25 align-start padding-t-75 margin-t-50 border-top">
            <div className="flex-column gap-5">
                <Typography level="title-sm">Observed Name</Typography>
                <Input value={observedName} onChange={handleObservedNameChange} />
            </div>

            <Tabs aria-label="ABC tabs" value={currentTab} onChange={handleTabChange}>
                <TabList>
                    <Tab>Antecedents</Tab>
                    <Tab>Behaviors</Tab>
                    <Tab>Consequences</Tab>
                    <Tab>Locations</Tab>
                </TabList>
                <TabPanel value={0} className='abc-tab-panel'>
                    <AbcSection 
                        values={observed.antecedents ?? []} 
                        typeCode="A"
                        onChange={(values) => handleAbcValuesChange('A', values)} 
                    />
                </TabPanel>
                <TabPanel value={1} className='abc-tab-panel'>
                    <AbcSection 
                        values={observed.behaviors ?? []} 
                        typeCode="B"
                        onChange={(values) => handleAbcValuesChange('B', values)} 
                    />
                </TabPanel>
                <TabPanel value={2} className='abc-tab-panel'>
                    <AbcSection 
                        values={observed.consequences ?? []} 
                        typeCode="C"
                        onChange={(values) => handleAbcValuesChange('C', values)} 
                    />
                </TabPanel>
                <TabPanel value={3} className='abc-tab-panel'>
                    <AbcSection 
                        values={observed.locations ?? []} 
                        typeCode="L"
                        onChange={(values) => handleAbcValuesChange('L', values)} 
                    />
                </TabPanel>
            </Tabs>

            <div className="flex-row gap-50">
                <Button variant="plain" color="neutral" onClick={onCancel}>Cancel</Button>
                <Button variant="solid" color="success" onClick={onSave} disabled={disableSave()}>Save</Button>
            </div>

        </div>
    )
}

export default ObservedEdit
