import { describe, test, expect, vi } from 'vitest'

import axios from 'axios'

import { getDefaultObserved } from '../observedService'
import { observedOne } from '../../utils/__tests__/mock-data.test'

vi.mock('axios')

describe('observedService test', () => {

    test('GET default observed', async () => {
        const mockData = { data: observedOne }

        axios.get = vi.fn().mockResolvedValue(mockData);
        
        const result = await getDefaultObserved()
        
        expect(axios.get).toBeCalledWith('/api/observed/default');
        expect(result).toEqual(mockData.data);
    })
    
})