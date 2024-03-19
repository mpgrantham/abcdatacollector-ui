import {afterEach, describe, expect, it, vi} from 'vitest'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'

import EntryAddSection from '../EntryAddSection'

const onAdd = vi.fn()

afterEach(() => {
    cleanup()
})

describe("EntryAddSection test", () => {
    
    it("should show section label", () => {
        
        render(<EntryAddSection label="Test Section" onAdd={onAdd}><div>CONTENT</div></EntryAddSection>)

        expect(screen.getByText('Test Section')).toBeDefined()
    })

    it("should show section sub label", () => {
        render(<EntryAddSection label="Test Section" subLabel="Sub Label" onAdd={onAdd}><div>CONTENT</div></EntryAddSection>)

        expect(screen.getByText('Sub Label')).toBeDefined()
    })

    it("should show render input", () => {
        render(<EntryAddSection label="Test Section" subLabel="Sub Label" onAdd={onAdd}><div>CONTENT</div></EntryAddSection>)

        let input = screen.queryByRole("input")
        expect(input).toBeNull()

        let buttons = screen.getAllByRole('button')

        // open input section
        fireEvent.click(buttons[0])
        expect(buttons.length).toBe(1)

        input = screen.queryByRole("input")
        expect(input).toBeDefined()

        buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(3)

        // close input section
        fireEvent.click(buttons[2])

        input = screen.queryByRole("input")
        expect(input).toBeNull()
    })

    it("should fire onAdd", () => {
        render(<EntryAddSection label="Test Section" subLabel="Sub Label" onAdd={onAdd}><div>CONTENT</div></EntryAddSection>)

        let buttons = screen.getAllByRole('button')

        // open input section
        fireEvent.click(buttons[0])

        buttons = screen.getAllByRole('button')
       
        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'TEST' },
        })
       
        // firer Add button
        fireEvent.click(buttons[1])

        expect(onAdd).toBeCalled()
    })
})