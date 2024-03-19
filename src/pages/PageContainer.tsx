import { useEffect, useCallback } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Dashboard from './dashboard/Dashboard'
import IncidentEntry from './entry/IncidentEntry'
import IncidentLog from './log/IncidentLog'
import Settings from './settings/Settings'
import SettingsButton from '../components/button/SettingsButton'
import Setup from './setup/Setup'
import PageSnackbar from '../components/snackbar/PageSnackbar'

import { useAppDispatch, useAppSelector } from '../redux/store'
import { getAppMode, INITIAL } from '../redux/userSlice'
import { getObservedList } from '../redux/observedSlice'

import * as paths from '../utils/routes'

import logo from '../assets/ABC_64px.png'

const PageContainer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { userId, setupComplete, startPage } = useAppSelector((state) => state.userSlice)
    const { snackbarFl, snackbarMessage, snackbarSeverity } = useAppSelector((state) => state.appSlice)

    const navigateToStart = useCallback(() => {
        if (startPage === 'ENTRY') {
            navigate(paths.ENTRY)
        } else if (startPage === 'DASHBOARD') {
            navigate(paths.DASHBOARD)
        } else if (startPage === 'LOG') {
            navigate(paths.LOG)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startPage]);
    
    useEffect(() => {
        dispatch(getAppMode())
    }, [dispatch])

    useEffect(() => {
        if (setupComplete === "Y") {
            dispatch(getObservedList(userId))
            // navigateToStart()
        }
    }, [userId, setupComplete, dispatch, navigateToStart])

    const handleTitleClick = () => {
        navigate(paths.DASHBOARD)
    }
    
    if (setupComplete === INITIAL) {
        return <div className="content-padding">Initial Loading...</div>
    }

    if (setupComplete === "N") {
        return <Setup />
    }

    return (
        <div className="page-container">
            <div className="header">
                <button type="button" onClick={handleTitleClick}>
                    <div className="title-section">
                        <img src={logo} alt="ABC Data Collector"/>
                        <div className="title"><span>Data</span> <span>Collector</span></div>
                    </div>
                </button>
                
                <SettingsButton />
            </div>
            <main>
                <Routes>
                    <Route path={paths.DASHBOARD} element={<Dashboard />}/>
                    <Route path={paths.ENTRY} element={<IncidentEntry />}/>
                    <Route path={'/entry/:id'} element={<IncidentEntry />}/>
                    <Route path={paths.LOG} element={<IncidentLog />}/>
                    <Route path={paths.SETTINGS} element={<Settings />}/>
                </Routes>
            </main>

            {snackbarFl &&
                <PageSnackbar
                    openFlag={snackbarFl}
                    severity={snackbarSeverity}
                    message={snackbarMessage}
                />
            }
        </div>
    )
}

export default PageContainer
