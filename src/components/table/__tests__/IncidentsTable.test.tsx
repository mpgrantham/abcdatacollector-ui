import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen} from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import IncidentsTable from '../IncidentsTable'
import { Incident } from '../../../models/Incident'

afterEach(() => {
    cleanup()
})

const onSort = vi.fn()

describe("IncidentsTable test", () => {
    
    it("should show empty table", () => {
        render(<IncidentsTable incidents={[]} orderBy="incidentDate" ascending={true} onSort={onSort} />)

        const th = screen.getAllByRole('columnheader')

        expect(th.length).toEqual(11)

        // const names = ['Date/Time', 'Intensity', 'Duration','Location', 'Antecedent', 'Behavior', 'Consequence','Description']
        // names.forEach((n, index) => {
        //     expect(th[index].innerHTML).toBe(n)
        // })
    })

    it("should show populated table", () => {
        const i: Incident = {
            id: 1,
            incidentDate: new Date(2024, 2, 10, 13, 32, 0, 0).getTime(),
            observedId: 1,
            userId: 0,
            duration: 80,
            intensity: 'Mild',
            description: 'Test Description',
            location: { id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'},
            antecedents: [{ id: 2, typeCode: 'A', value: 'A One', activeFl: 'Y'}],
            behaviors: [{ id: 3, typeCode: 'B', value: 'B One', activeFl: 'Y'}],
            consequences: [{ id: 4, typeCode: 'C', value: 'C One', activeFl: 'Y'}]
        }

        render(<BrowserRouter><IncidentsTable incidents={[i]} orderBy="incidentDate" ascending={true} onSort={onSort} /></BrowserRouter>)

        const td = screen.getAllByRole('cell')

        // const link = screen.getByRole('link')
        // expect(link.innerHTML).toBe('03/10/2024 01:32 PM')

        expect(td[1].innerHTML).toBe(i.location?.value)
        expect(td[2].innerHTML).toBe('Mild')
        expect(td[3].innerHTML).toBe('01:20')
        expect(td[4].innerHTML).toBe('A One')
        expect(td[5].innerHTML).toBe('B One')
        expect(td[6].innerHTML).toBe('C One')
        expect(td[7].innerHTML).toBe(i.description)
    })
})