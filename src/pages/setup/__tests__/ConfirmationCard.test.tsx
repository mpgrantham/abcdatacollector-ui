import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import ConfirmationCard from '../ConfirmationCard'

const onBack = vi.fn()
const onNext = vi.fn()

afterEach(() => {
    cleanup()
})

describe("ObservedCard test", () => {
    
    it("should show default", () => {
        render(<ConfirmationCard observedNames={['Test One', 'Test Two']} startPage="ENTRY" onNext={onNext} onBack={onBack} />)
        
        expect(screen.getByText('Incident Entry')).toBeDefined()
        expect(screen.getByText('Test One')).toBeDefined()
        expect(screen.getByText('Test Two')).toBeDefined()
    })

    it("should show select next", () => {
        render(<ConfirmationCard observedNames={['Test One', 'Test Two']} startPage="ENTRY" onNext={onNext} onBack={onBack} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[1])

        expect(onNext).toBeCalled()
    })

    it("should show select back", () => {
        render(<ConfirmationCard observedNames={['Test One', 'Test Two']} startPage="ENTRY" onNext={onNext} onBack={onBack} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[0])

        expect(onBack).toBeCalled()
    })

})