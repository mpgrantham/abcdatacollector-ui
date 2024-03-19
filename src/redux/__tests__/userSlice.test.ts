import { describe, test, expect, vi } from 'vitest'

import { configureStore } from '@reduxjs/toolkit'

import axios from 'axios'

import reducer, { setStartPage, initialState, getAppMode, updateAppMode, AppMode } from '../userSlice'

describe('userSlice test', () => {
    test('setStartPage', () => {
        const previousState = initialState
        const updatedState = reducer(previousState, setStartPage('LOG'))
        expect(updatedState.startPage).toEqual('LOG')
    })

    test('get app mode', async () => {
        const appMode = {
            id: 0,
            setupComplete: 'Y',
            startPage: 'ENTRY',
            requireLogin: 'N',
            sessionToken: 'TOKEN',
        }

        const mockData = { data: appMode }
        axios.get = vi.fn().mockResolvedValue(mockData)

        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'userSlice/getAppMode/fulfilled':

                  return action.payload;
                default:
                  return state;
              }
            },
        })

        await store.dispatch(getAppMode())
        const state = store.getState()
        expect(state.startPage).toBe('ENTRY')
    })

    test('getAppMode fulfilled', () => {
        const appMode = {
            id: 0,
            setupComplete: 'Y',
            startPage: 'ENTRY',
            requireLogin: 'N',
            sessionToken: 'TOKEN',
        }

        const action = { type: getAppMode.fulfilled.type, payload: appMode };
        const state = reducer(initialState, action)
        expect(state.sessionToken).toEqual('TOKEN')
        expect(state.startPage).toEqual('ENTRY')
    })

    test('getAppMode fulfilled empty', () => {
        const appMode = {
            id: 0,
            setupComplete: 'Y',
            startPage: undefined,
            requireLogin: 'N',
            sessionToken: undefined,
        }

        const action = { type: getAppMode.fulfilled.type, payload: appMode };
        const state = reducer(initialState, action)
        expect(state.sessionToken).toEqual('')
        expect(state.startPage).toEqual('')
    })

    test('PUT app mode', async () => {
        const appMode: AppMode = {
            id: 0,
            setupComplete: 'Y',
            startPage: 'ENTRY',
            requireLogin: 'N',
            sessionToken: 'TOKEN',
            ipAddress: 'IP-ADDRESS',
            hostName: 'HOST',
            port: 'PORT'
        }

        const mockData = { data: appMode }
        axios.put = vi.fn().mockResolvedValue(mockData)

        const store = configureStore({
            reducer: function (state = '', action) {
              switch (action.type) {
                case 'userSlice/updateAppMode/fulfilled':

                  return action.payload;
                default:
                  return state;
              }
            },
        })

        await store.dispatch(updateAppMode(appMode))
        const state = store.getState()
        expect(state.startPage).toBe('ENTRY')
    })

    test('updateAppMode fulfilled empty', () => {
        const appMode = {
            id: 0,
            setupComplete: 'Y',
            startPage: undefined,
            requireLogin: 'N',
            sessionToken: undefined,
        }

        const action = { type: updateAppMode.fulfilled.type, payload: appMode };
        const state = reducer(initialState, action)
        expect(state.sessionToken).toEqual('')
        expect(state.startPage).toEqual('')
    })
})