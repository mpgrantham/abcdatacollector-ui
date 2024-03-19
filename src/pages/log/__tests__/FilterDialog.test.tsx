import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, fireEvent, render, screen } from '@testing-library/react'

import FilterDialog from '../FilterDialog'
import { Filters } from '../../../utils/tableUtils'
import { Abc } from '../../../models/Abc'


afterEach(() => {
    cleanup()
})

describe('FilterDialog test', () => {

    it('should not render', () => {
        const filters: Filters = {}
        const locations: Abc[] = []

        const onReset = vi.fn()
        const onClose = vi.fn()
        const onFilter = vi.fn()
     
        render(<FilterDialog openFl={false} filters={filters} locations={locations} onReset={onReset} onClose={onClose} onFilter={onFilter} />)
     
        // const items = screen.getAllByRole('listitem')
        expect(screen.queryByText('Incident Filters')).toBeNull()

    })

    it('should render', () => {
        const filters: Filters = {}
        const locations: Abc[] = []

        const onReset = vi.fn()
        const onClose = vi.fn()
        const onFilter = vi.fn()
     
        render(<FilterDialog openFl={true} filters={filters} locations={locations} onReset={onReset} onClose={onClose} onFilter={onFilter} />)

        // screen.debug()

        expect(screen.queryByText('Incident Filters')).toBeDefined()
    })

    it('should call reset', () => {
        const filters: Filters = {}
        const locations: Abc[] = [{ id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'}]

        const onReset = vi.fn()
        const onClose = vi.fn()
        const onFilter = vi.fn()
     
        render(<FilterDialog openFl={true} filters={filters} locations={locations} onReset={onReset} onClose={onClose} onFilter={onFilter} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[3])
        expect(onClose).toBeCalled()

        fireEvent.click(buttons[4])
        expect(onReset).toBeCalled()

        fireEvent.click(buttons[5])
        expect(onFilter).toBeCalled()
    })

})