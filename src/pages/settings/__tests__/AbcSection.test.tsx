import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import AbcSection from '../AbcSection'

const onChange = vi.fn()

afterEach(() => {
    cleanup()
})

const values = [{id: 1, typeCode: 'A', value: 'Test One', activeFl: 'Y'}, {id: 2, typeCode: 'A', value: 'Test Two', activeFl: 'Y'}]

describe("AbcSection test", () => {
    
    it("should show ABCs", () => {
        render(<AbcSection typeCode="A" values={values} onChange={onChange} />)

        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(3)

        // fireEvent.click(buttons[0])
        // expect(onChange).toBeCalled()

        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes.length).toBe(2)

        userEvent.click(checkboxes[1]);
    })
    
})