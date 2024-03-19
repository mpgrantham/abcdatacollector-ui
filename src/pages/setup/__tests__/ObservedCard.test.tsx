import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import ObservedCard from '../ObservedCard'

const onBack = vi.fn()
const onNext = vi.fn()

afterEach(() => {
    cleanup()
})

describe("ObservedCard test", () => {
    
    it("should show default", () => {
        render(<ObservedCard observedNames={['Test One', 'Test Two']} onNext={onNext} onBack={onBack} />)
    })

    it("should add", () => {
        render(<ObservedCard observedNames={['Test One', 'Test Two']} onNext={onNext} onBack={onBack} />)
        
        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'Test Three' },
        })

        let buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(5)

        // Add button
        fireEvent.click(buttons[0])

        buttons = screen.getAllByRole('button')

        expect(buttons.length).toBe(6)

        screen.getByRole("button", {name: /Remove Test Three/i});
    })

    it("should remove", () => {
        render(<ObservedCard observedNames={['Test One', 'Test Two']} onNext={onNext} onBack={onBack} />)

        let buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(5)
                
        const remove = screen.getByRole("button", {name: /Remove Test Two/i})
        fireEvent.click(remove)

        buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(4)
    })

    it("should show select next", () => {
        render(<ObservedCard observedNames={['Test One', 'Test Two']} onNext={onNext} onBack={onBack} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[4])

        expect(onNext).toBeCalled()
    })

    it("should show select back", () => {
        render(<ObservedCard observedNames={['Test One', 'Test Two']} onNext={onNext} onBack={onBack} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[3])

        expect(onBack).toBeCalled()

        const input = screen.getByRole("textbox")
        fireEvent.change(input, {
            target: { value: 'TEST' },
        })
    })

})