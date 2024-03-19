import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = '/api/'

import { Observed } from '../models/Observed'
import { Abc } from '../models/Abc';

interface SaveResult {
    action: 'ADD' | 'UPDATE';
    observed: Observed;
}

export interface ObservedState {
    observedId: number;
    observed: Observed;
    observedList: Observed[];
}

export const initialState: ObservedState = {
    observedId: 0,
    observed: {} as Observed,
    observedList: []
}

export const getObservedList = createAsyncThunk(
    'observedSlice/getObservedList',
    async(userId: number): Promise<Observed[]> => {
        let list: Observed[] = [];
        
        const url =  `${API_URL}observed/list/${userId}`

        await axios.get(url).then(response => {
            list = response.data
        })

        return list;
})

export const saveObserved = createAsyncThunk(
    'observedSlice/saveObserved',
    async(payload: {observed: Observed, sessionToken: string}): Promise<SaveResult> => {
    
        const returnValue: SaveResult = {
            action: 'ADD',
            observed: {} as Observed
        }

        const url =  `${API_URL}observed`

        const headers = {
            headers: {'Authorization': payload.sessionToken}
        }

        const observed = payload.observed
        // remove deleted ABcs
        observed.antecedents = observed.antecedents?.filter(a => a.action !== 'D')
        observed.behaviors = observed.behaviors?.filter(a => a.action !== 'D')
        observed.consequences = observed.consequences?.filter(a => a.action !== 'D')
        observed.locations = observed.locations?.filter(a => a.action !== 'D')

        if (observed.id === 0) {
            await axios.post(url, payload.observed, headers).then(response => {
                returnValue.observed = response.data
            })
        } else {
            returnValue.action = 'UPDATE'
            await axios.put(url, payload.observed, headers).then(response => {
                returnValue.observed = response.data
            })
        }
        
        return returnValue;
})

export const deleteObserved = createAsyncThunk(
    'observedSlice/deleteObserved',
    async(payload: {observedId: number, sessionToken: string}): Promise<number> => {
    
        let observedId = 0

        const url =  `${API_URL}observed/${payload.observedId}`

        const headers = {
            headers: {'Authorization': payload.sessionToken}
        }
        
        await axios.delete(url, headers).then(() => {
            observedId = payload.observedId
        })
       
        
        return observedId;
})

// export const getObserved = createAsyncThunk(
//     'observedSlice/getObserved',
//     async(payload: { observedId: number, sessionToken: string }): Promise<Observed> => {
//         let observed = {} as Observed;
        
//         const url =  `${API_URL}observed/${payload.observedId}`

//         await axios.get(url).then(response => {
//             observed = response.data
//         })

//         return observed;
// })

export const addObservedAbc = createAsyncThunk(
    'observedSlice/addObservedAbc',
    async(payload: { observedId: number, abc: Abc, sessionToken: string }): Promise<Abc> => {

        let abc = {} as Abc
       
        const headers = {
            headers: {'Authorization': payload.sessionToken}
        }
        
        const url =  `${API_URL}observed/${payload.observedId}/abc`

        await axios.post(url, payload.abc, headers).then(response => {
            abc = response.data
        })

        return abc;
})

const observedSlice = createSlice({
    name: 'observed',
    initialState,
    reducers: {
        setObserved(state, action: PayloadAction<Observed>) {
            state.observedId = action.payload.id
            state.observed = action.payload
        },
        setObservedById(state, action: PayloadAction<number>) {
            state.observedId = action.payload
            state.observed = state.observedList.find(o => o.id === action.payload) ?? {} as Observed
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getObservedList.rejected, (state) => {
        //     state.observedList = []
        // }),
        builder.addCase(getObservedList.fulfilled, (state, action: PayloadAction<Observed[]>) => {
            state.observedList = action.payload
            if (action.payload.length > 0) {
                state.observedId = action.payload[0].id
                state.observed = action.payload[0]
            }
        }),
        // builder.addCase(getObserved.rejected, (state) => {
        //     state.observedId = 0
        //     state.observed = {} as Observed
        // }),
        // builder.addCase(getObserved.fulfilled, (state, action: PayloadAction<Observed>) => {
        //     state.observedId = action.payload.id
        //     state.observed = action.payload
        // }),
        builder.addCase(saveObserved.fulfilled, (state, action: PayloadAction<SaveResult>) => {
            const observed = action.payload.observed
            
            if (action.payload.action === 'ADD') {
                state.observedList.push(observed)
            } else {
                const idx = state.observedList.findIndex(o => o.id === observed.id)

                if (idx > -1) {
                    state.observedList[idx] = observed
                }
            }
            
            if (state.observedId === 0 || observed.id === state.observedId) {
                state.observedId = observed.id
                state.observed = observed
            }
        }),
        builder.addCase(deleteObserved.fulfilled, (state, action: PayloadAction<number>) => {
            const observedId = action.payload

            const index = state.observedList.findIndex(o => o.id === observedId)

            if ( index > -1) {
                state.observedList.splice(index, 1)
            }
            
            if (state.observedId === observedId) {
                state.observedId = state.observedList[0].id
                state.observed = state.observedList[0]
            }
        }),
        builder.addCase(addObservedAbc.fulfilled, (state, action: PayloadAction<Abc>) => {
            const abc = action.payload

            const index = state.observedList.findIndex(o => o.id === state.observedId)
            if (index === -1) {
                return
            }

            if (abc.typeCode === 'A') {
                state.observedList[index].antecedents?.push(abc)
                state.observed.antecedents?.push(abc)
            } else if (abc.typeCode === 'B') {
                state.observedList[index].behaviors?.push(abc)
                state.observed.behaviors?.push(abc)
            } else if (abc.typeCode === 'C') {
                state.observedList[index].consequences?.push(abc)
                state.observed.consequences?.push(abc)
            } else {
                state.observedList[index].locations?.push(abc)
                state.observed.locations?.push(abc)
            }
        })
    }
})

export const { setObserved, setObservedById } = observedSlice.actions;

export default observedSlice.reducer;
