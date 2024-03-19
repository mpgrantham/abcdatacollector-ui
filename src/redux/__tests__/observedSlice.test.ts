import { describe, test, expect, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'

import axios from 'axios'

import { Observed } from '../../models/Observed'

import { observedOne, observedTwo } from '../../utils/__tests__/mock-data.test'

import reducer, { initialState, setObserved, setObservedById, getObservedList, saveObserved, deleteObserved, addObservedAbc } from '../observedSlice'

vi.mock('axios')

describe('observedSlice test', () => {

    test('setObserved', () => {
        const previousState = initialState
        const observed = { ...observedOne, id: 3, observedName: 'Test Name'}
        const updatedState = reducer(previousState, setObserved(observed))
        expect(updatedState.observedId).toEqual(3)
        expect(updatedState.observed.id).toEqual(3)
        expect(updatedState.observed.observedName).toEqual('Test Name')
    })

    test('setObservedById', () => {
        const previousState = {observedId: 1,  observed: observedOne, observedList: [observedOne, observedTwo] }
        const updatedState = reducer(previousState, setObservedById(2))
        expect(updatedState.observedId).toEqual(2)
        expect(updatedState.observed.id).toEqual(2)
        expect(updatedState.observed.observedName).toEqual('Observed Two')
    })

    test('setObservedById not found', () => {
        const previousState = {observedId: 1,  observed: observedOne, observedList: [observedOne, observedTwo] }
        const updatedState = reducer(previousState, setObservedById(3))
        expect(updatedState.observedId).toEqual(3)
        expect(updatedState.observed).toEqual({} as Observed)
    })

    test('get observed list', async () => {
        const mockData = { data: [observedOne, observedTwo] }
        axios.get = vi.fn().mockResolvedValue(mockData)

        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'observedSlice/getObservedList/fulfilled':

                  return action.payload;
                default:
                  return state;
              }
            },
        })

        await store.dispatch(getObservedList(0))
        const state = store.getState()
        expect(state.length).toBe(2)
    })

    test('getObservedList fulfilled', () => {
        const action = { type: getObservedList.fulfilled.type, payload: [observedTwo, observedOne] };
        const state = reducer(initialState, action)
        expect(state.observedId).toEqual(2)
        expect(state.observedList.length).toEqual(2)
    })

    test('save observed post', async () => {
        const mockData = { data: { ...observedOne, observedName: 'Test Name'} }
        axios.post = vi.fn().mockResolvedValue(mockData)
        
        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'observedSlice/saveObserved/fulfilled':
                  return action.payload;
                default:
                  return state;
              }
            },
        })

        const observed = { ...observedOne, id: 0 }

        await store.dispatch(saveObserved({observed: observed, sessionToken: 'TOKEN'}))
        const state = store.getState()

        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.post).toBeCalledWith('/api/observed', observed, headers)
        expect(state.action).toBe('ADD')
        expect(state.observed.observedName).toBe('Test Name')
    })

    test('save observed put', async () => {
        const mockData = { data: { ...observedOne, observedName: 'Test Name'} }
        axios.put = vi.fn().mockResolvedValue(mockData)
        
        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'observedSlice/saveObserved/fulfilled':
                  return action.payload;
                default:
                  return state;
              }
            },
        })

        const observed = { ...observedOne, id: 1 }

        await store.dispatch(saveObserved({observed: observed, sessionToken: 'TOKEN'}))
        const state = store.getState()
        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.put).toBeCalledWith('/api/observed', observed, headers)
        expect(state.action).toBe('UPDATE')
        expect(state.observed.observedName).toBe('Test Name')
    })

    test('saveObserved add fulfilled', () => {
        const action = { type: saveObserved.fulfilled.type, payload: { action: 'ADD', observed: observedTwo } };
        const state = reducer(initialState, action)
        expect(state.observedId).toEqual(2)
        expect(state.observed.id).toEqual(2)
        expect(state.observedList.length).toEqual(1)
    })

    test('saveObserved update fulfilled', () => {
        const currentState = { observedId: 1, observed: observedOne, observedList: [observedOne, observedTwo] }
        const action = { type: saveObserved.fulfilled.type, payload: { action: 'UPDATE', observed: { ...observedTwo, observedName: 'Test Name' } } };
        const state = reducer(currentState, action)
        expect(state.observedList[1].observedName).toEqual('Test Name')
    })

    test('delete observed', async () => {
        const mockData = { data: { } }
        axios.delete = vi.fn().mockResolvedValue(mockData)
        
        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'observedSlice/deleteObserved/fulfilled':
                  return action.payload;
                default:
                  return state;
              }
            },
        })

        await store.dispatch(deleteObserved({observedId: 1, sessionToken: 'TOKEN'}))
        const state = store.getState()

        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.delete).toBeCalledWith('/api/observed/1', headers);
        expect(state).toBe(1)
    })

    test('deleteObserved update fulfilled', () => {
        const currentState = { observedId: 1, observed: observedOne, observedList: [observedOne, observedTwo] }
        const action = { type: deleteObserved.fulfilled.type, payload: 1 };
        const state = reducer(currentState, action)
        expect(state.observedList.length).toEqual(1)
        expect(state.observedId).toEqual(2)
    })

    test('addObservedAbc', async () => {
        const mockData = { data: { id: 4, typeCode: 'A', value: 'Antecedent', activeFl:' Y'} }
        axios.post = vi.fn().mockResolvedValue(mockData)
        
        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'observedSlice/addObservedAbc/fulfilled':
                  return action.payload;
                default:
                  return state;
              }
            },
        })

        const abc = { id: 0, typeCode: 'A', value: 'Antecedent', activeFl:' Y'}

        await store.dispatch(addObservedAbc({observedId: 1, abc: abc, sessionToken: 'TOKEN'}))
        const state = store.getState()

        const headers = {
            headers: {'Authorization': 'TOKEN'}
        }
        
        expect(axios.post).toBeCalledWith('/api/observed/1/abc', abc, headers)
        expect(state.id).toBe(4)
    })

    test('addObservedAbc add antecedent fulfilled', () => {
        const currentState = { observedId: 2, observed: observedTwo, observedList: [observedOne, observedTwo] }

        const abc = { id: 20, typeCode: 'A', value: 'Test', activeFl:' Y'}

        const action = { type: addObservedAbc.fulfilled.type, payload: abc };
        const state = reducer(currentState, action)
        expect(state.observed.antecedents?.length).toEqual(2)
    })

    test('addObservedAbc add behavior fulfilled', () => {
        const currentState = { observedId: 2, observed: observedTwo, observedList: [observedOne, observedTwo] }

        const abc = { id: 20, typeCode: 'B', value: 'Test', activeFl:' Y'}

        const action = { type: addObservedAbc.fulfilled.type, payload: abc };
        const state = reducer(currentState, action)
        expect(state.observed.behaviors?.length).toEqual(2)
    })

    test('addObservedAbc add consequence fulfilled', () => {
        const currentState = { observedId: 2, observed: observedTwo, observedList: [observedOne, observedTwo] }

        const abc = { id: 20, typeCode: 'C', value: 'Test', activeFl:' Y'}

        const action = { type: addObservedAbc.fulfilled.type, payload: abc };
        const state = reducer(currentState, action)
        expect(state.observed.consequences?.length).toEqual(2)
    })

    test('addObservedAbc add location fulfilled', () => {
        const currentState = { observedId: 2, observed: observedTwo, observedList: [observedOne, observedTwo] }

        const abc = { id: 20, typeCode: 'L', value: 'Bus', activeFl:' Y'}
        const action = { type: addObservedAbc.fulfilled.type, payload: abc };
        const state = reducer(currentState, action)
        expect(state.observed.locations?.length).toEqual(2)
    })

    test('addObservedAbc not found fulfilled', () => {
        const currentState = { observedId: 3, observed: observedTwo, observedList: [observedOne, observedTwo] }

        const abc = { id: 20, typeCode: 'L', value: 'Bus', activeFl:' Y'}
        const action = { type: addObservedAbc.fulfilled.type, payload: abc };
        const state = reducer(currentState, action)
        expect(state.observed.locations?.length).toEqual(1)
    })
 
})