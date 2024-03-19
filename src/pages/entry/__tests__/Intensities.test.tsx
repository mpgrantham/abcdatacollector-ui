import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'

import Intensities from '../Intensities'

const onChange = vi.fn()

afterEach(() => {
    cleanup()
})

const values = ['Mild', 'Moderate', 'Severe']

describe("Intensities test", () => {
    
    it("should show intensities not available", () => {
        render(<Intensities values={values} selected="" onChange={onChange} />)

        const button = screen.getByRole('combobox')
        expect(button.innerHTML).toBe('Not Available')
    })

    it("should show intensities Mild", () => {
        render(<Intensities values={values} selected="Mild" onChange={onChange} />)

        const button = screen.getByRole('combobox')
        expect(button.innerHTML).toBe('Mild')
    })

    it("should select and open", () => {
        render(<Intensities values={values} selected="" onChange={onChange} />)

        const button = screen.getByRole('combobox')
        fireEvent.click(button)

        const options = screen.getAllByRole('option')
        expect(options.length).toBe(4)
        expect(options[1].innerHTML).toBe('Mild')
    })

    it("should select and open and choose and fire onChange", () => {
        render(<Intensities values={values} selected="" onChange={onChange} />)

        const button = screen.getByRole('combobox')
        fireEvent.click(button)

        const options = screen.getAllByRole('option')

        fireEvent.click(options[1])

        expect(onChange).toBeCalled()
    })
})