import {describe, expect, test} from 'vitest'
import {render, screen} from '@testing-library/react'

import EntrySection from '../EntrySection'

describe("EntrySection test", () => {
    test("should show section label", () => {
        render(<EntrySection label="Test Section"><div>CONTENT</div></EntrySection>)

        expect(screen.getByText(/Test Section/i)).toBeDefined()
    })

    test("should show section sub label", () => {
        render(<EntrySection label="Test Section" subLabel="Sub Label"><div>CONTENT</div></EntrySection>)

        expect(screen.getByText(/Sub Label/i)).toBeDefined()
    })
})