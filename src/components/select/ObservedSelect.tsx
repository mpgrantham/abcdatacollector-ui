import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'

import { useAppSelector, useAppDispatch  } from '../../redux/store'
import { setObservedById } from '../../redux/observedSlice'


interface ObservedSelectProps {
    disabled?: boolean
}

const ObservedSelect = ( {disabled = false }: ObservedSelectProps) => {
    const dispatch = useAppDispatch();
    const { observedId, observedList } = useAppSelector((state) => state.observedSlice)

    // @ts-expect-error('event is not needed')
    const handleObservedChange = (event: React.SyntheticEvent | null, value: number | null) => {
        dispatch(setObservedById(value ?? 0))
    }

    return (
        <div>
            <Select onChange={handleObservedChange} value={observedId} disabled={disabled}>
                {
                    observedList.map(o => {
                        return <Option value={o.id} key={o.id.toString()}>{o.observedName}</Option>
                    })
                }
            </Select>
        </div>
    )
}

export default ObservedSelect
