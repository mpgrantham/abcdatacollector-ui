import {afterEach, describe, expect, it} from 'vitest'
import {cleanup, fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import ExpandableRow from '../ExpandableRow'

import { incidentOne } from '../../../utils/__tests__/mock-data.test'


afterEach(() => {
    cleanup()
})

describe('ExpandableRow test', () => {

    it('should render closed', () => {
        render(<BrowserRouter><ExpandableRow incident={incidentOne} /></BrowserRouter>)

        const rows = screen.queryAllByRole('row')

        // const button = screen.getByRole('button')
        expect(rows.length).toEqual(1)
    })

    it('should render open', () => {
        render(<BrowserRouter><ExpandableRow incident={incidentOne} /></BrowserRouter>)

        const button = screen.getByRole('button')
        fireEvent.click(button)
       
        const rows = screen.queryAllByRole('row')
        expect(rows.length).toEqual(2)
    })

})