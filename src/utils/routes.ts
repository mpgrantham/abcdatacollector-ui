export const DASHBOARD = '/'
export const ENTRY = '/entry'
export const LOG = '/log'
export const RESOURCES = '/resources'
export const SETTINGS = '/settings'
export const SETUP = '/setup'
export const HELP = '/help'

export interface StartPage {
    value: string;
    label: string;
    route: string;
}

export const START_PAGE_MAPPINGS = [
    {
        value: "ENTRY",
        label: "Incident Entry",
        route: ENTRY
    },
    {
        value: "DASHBOARD",
        label: "Dashboard",
        route: DASHBOARD
    },
    {
        value: "LOG",
        label: "Incident Log",
        route: LOG
    }
]