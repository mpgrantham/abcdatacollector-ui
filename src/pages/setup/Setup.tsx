import { useEffect, useState } from 'react'
import logo from '../../assets/ABC_64px.png'

import StartPageCard from './StartPageCard'
import ObservedCard from './ObservedCard'
import ConfirmationCard from './ConfirmationCard'

import { AppMode, UserState, updateAppMode } from '../../redux/userSlice'
import { saveObserved } from '../../redux/observedSlice'
import { getDefaultObserved } from '../../services/observedService'
import { Observed } from '../../models/Observed'

import { useAppDispatch, useAppSelector } from '../../redux/store'

import { cloneObserved } from '../../utils/settingsUtils'

const START_PAGE = 'startpage'
const OBSERVED = 'observed'
const CONFIRMATION = 'confirmation'

const Setup = () => {
    const userState: UserState = useAppSelector((state) => state.userSlice)
    const dispatch = useAppDispatch()

    const [step, setStep] = useState(START_PAGE)
    const [startPage, setStartPage] = useState('ENTRY')
    const [observedNames, setObservedNames] = useState<string[]>([])
    const [defaultObserved, setDefaultObserved] = useState<Observed>({} as Observed)

    useEffect(() => {
        getDefaultObserved().then(result => {
            setDefaultObserved(result)
        })
    }, [])
    
    const handleStartPageNext = (value: string) => {
        setStartPage(value);
        setStep(OBSERVED);
    }

    const handleObservedNext = (values: string[]) => {
        setObservedNames(values);
        setStep(CONFIRMATION);
    }
       
    const handleObservedBack = (values: string[]) => {
        setObservedNames(values);
        setStep(START_PAGE);
    }

    const handleConfirmationBack = () => {
        setStep(OBSERVED);
    }

    const handleSubmit = () => {
        const appMode: AppMode = {
            id: userState.appModeId,
            setupComplete: 'Y',
            requireLogin: 'N',
            startPage: startPage,
            sessionToken: userState.sessionToken,
            ipAddress: userState.ipAddress,
            hostName: userState.hostName,
            port: userState.port
        }

        dispatch(updateAppMode(appMode))
        observedNames.forEach(name => {
            if (name.trim().length > 0) {
                const observed: Observed = cloneObserved(defaultObserved)
                observed.id = 0
                observed.observedName = name.trim()
                observed.userId = userState.userId ?? 0
             
                dispatch(saveObserved({observed: observed, sessionToken: userState.sessionToken ?? 'SESSIONTOKEN'}))
            }
        })
    }
    
    return (
        <div className="page-container">
            <div className="header">
                <div className="title-section">
                        <img src={logo} alt="ABC Data Collector"/>
                        <div className="title"><span>Data</span> <span>Collector</span></div>
                </div>
            </div>
            <main>
                <div className="setup-card-section">
                    <div style={{maxWidth: '600px'}}>
                        {step === START_PAGE && <StartPageCard startPage={startPage} onNext={handleStartPageNext} />}
                        {step === OBSERVED && <ObservedCard observedNames={observedNames} onNext={handleObservedNext} onBack={handleObservedBack} />}
                        {step === CONFIRMATION && <ConfirmationCard 
                            startPage={startPage} 
                            observedNames={observedNames} 
                            onNext={handleSubmit} 
                            onBack={handleConfirmationBack} 
                        />}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Setup
