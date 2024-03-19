import axios from 'axios'

import { Observed } from '../models/Observed'

const API_URL = '/api/'

export async function getDefaultObserved(): Promise<Observed> {
    let observed: Observed = {} as Observed

    const url =  `${API_URL}observed/default`
   
    await axios.get(url).then(response => {
        observed = response.data
    })

    return observed
}