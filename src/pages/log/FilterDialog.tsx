import { useState } from 'react'

import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup'
import Typography from '@mui/joy/Typography'

import { Abc } from '../../models/Abc'
import { Filters } from '../../utils/tableUtils'

import DurationMaskAdapter from '../entry/DurationMask'

import FilterFieldSection from './FilterFieldSection'

interface FilterDialogProps {
    openFl: boolean;
    filters: Filters;
    locations: Abc[];
    onReset: () => void;
    onFilter: (incomingFilters: Filters) => void;
    onClose: () => void;
}

const toggleItems = [
    { value: 'Mild', label: 'Mild' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Severe', label: 'Severe' },
]

const FilterDialog = ({ openFl, filters, locations, onReset, onFilter, onClose }: FilterDialogProps) => {
    const [filterFields, setFilterFields] = useState(filters)
   
    const clearFilters = () => {
        onReset()
    }

    const applyFilter = () => {
        onFilter(filterFields)
    }

    // @ts-expect-error('event nver used')
    const handleIntensityChange = (event: React.MouseEvent<HTMLElement>, newIntensities: string[]) => {
        setFilterFields({ ...filterFields, intensities: newIntensities });
    }

    // @ts-expect-error('event nver used')
    const handleLocationChange = (event: React.SyntheticEvent | null, newLocations: string[] | null) => {
        setFilterFields({ ...filterFields, locations: newLocations ?? [] });
    }

    return (
        <Modal open={openFl} onClose={onClose}>
            <ModalDialog>
                <DialogTitle>Incident Filters</DialogTitle>

                <DialogContent>
                    <div className="flex-column gap-10">
                        <FilterFieldSection label="Date Range">
                            <div className="flex-row gap-10">
                                <Input
                                    type="date"
                                    value={filterFields.fromDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterFields({...filterFields, fromDate: e.target.value})}
                                    placeholder="MM/DD/YYYY"
                                />

                                <Typography>to</Typography>

                                <Input
                                    type="date"
                                    value={filterFields.toDate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterFields({...filterFields, toDate: e.target.value})}
                                    placeholder="MM/DD/YYYY"
                                />
                            </div>
                        </FilterFieldSection>

                        <FilterFieldSection label="Duration Range">
                            <div className="flex-row gap-10">
                                <Input
                                    value={filterFields.fromDuration}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterFields({...filterFields, fromDuration: e.target.value})}
                                    placeholder="MM:SS"
                                    slotProps={{ input: { component: DurationMaskAdapter } }}
                                    style={{width: '80px'}}
                                />

                                <Typography>to</Typography>

                                <Input
                                    value={filterFields.toDuration}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterFields({...filterFields, toDuration: e.target.value})}
                                    placeholder="MM:SS"
                                    slotProps={{ input: { component: DurationMaskAdapter } }}
                                    style={{width: '80px'}}
                                />
                            </div>
                        </FilterFieldSection>

                        <FilterFieldSection label="Intensity">
                            <ToggleButtonGroup 
                                aria-label="button-group" 
                                color="primary"
                                value={filterFields.intensities}
                                onChange={handleIntensityChange}
                            >
                                {
                                    toggleItems.map(item => {
                                        return <Button key={item.label} value={item.value}>{item.label}</Button>
                                    })
                                }
                            </ToggleButtonGroup>
                        </FilterFieldSection>

                        <FilterFieldSection label="Location">
                            <Select
                                placeholder="Select a location"
                                multiple
                                defaultValue={filterFields.locations}
                                sx={{ minWidth: 200 }}
                                onChange={handleLocationChange}
                            >
                                {
                                    locations.map(l => {
                                        return <Option value={l.value} key={l.id.toString()}>{l.value}</Option>
                                    })
                                }
                            </Select>
                        </FilterFieldSection>
                    </div>
                </DialogContent>
            
                <div className="flex-row-between width-full margin-t-50">
                    <Button type="button" onClick={onClose} color="neutral">Cancel</Button>
                    <div className="flex-row gap-10">
                        <Button type="button" onClick={clearFilters}>Clear</Button>
                        <Button type="button" onClick={applyFilter}>Apply</Button>
                    </div>
                </div>
            </ModalDialog>
        </Modal>
    )
}

export default FilterDialog
