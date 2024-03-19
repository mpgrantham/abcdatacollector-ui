import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'

import Locations from '../Locations'

const onAdd = vi.fn()
const onChange = vi.fn()

afterEach(() => {
    cleanup()
})

const values = [{id: 1, typeCode: 'L', value: 'Home', activeFl: 'Y'}, {id: 2, typeCode: 'L', value: 'School', activeFl: 'Y'}]

describe("Locations test", () => {
    
    it("should show intensities not available", () => {
        render(<Locations values={values} selected={0} onChange={onChange} onAdd={onAdd} />)

        const button = screen.getByRole('combobox')
        expect(button.innerHTML).toBe('Not Available')
    })

    it("should show intensities not available", () => {
        render(<Locations values={values} selected={2} onChange={onChange} onAdd={onAdd} />)

        const button = screen.getByRole('combobox')
        expect(button.innerHTML).toBe('School')
    })

    it("should select and open", () => {
        render(<Locations values={values} selected={0} onChange={onChange} onAdd={onAdd} />)

        const button = screen.getByRole('combobox')
        fireEvent.click(button)

        const options = screen.getAllByRole('option')
        expect(options.length).toBe(3)
        expect(options[1].innerHTML).toBe('Home')
    })

    it("should select and open and choose and fire onChange", () => {
        render(<Locations values={values} selected={0} onChange={onChange} onAdd={onAdd} />)

        const button = screen.getByRole('combobox')
        fireEvent.click(button)

        const options = screen.getAllByRole('option')

        fireEvent.click(options[1])

        expect(onChange).toBeCalled()
    })

    it("should click expand button and open and click and fire onAdd", () => {
        render(<Locations values={values} selected={0} onChange={onChange} onAdd={onAdd} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'TEST' },
        })

        const buttons = screen.getAllByRole('button')
       
        // firer Add button
        fireEvent.click(buttons[1])

        expect(onAdd).toBeCalled()
    })
})