export type TNote = {
    id: string
    title: string
    important: boolean
    done: boolean
    date?: number
    showButton?: boolean
}
export type TNoteWithoutId = Omit<TNote, 'id'>
export type TNotes = Array<TNote>
//
// export type TAlertType = 'success' | 'danger' | 'warning'
// export type TAlertState = {
//     show: (text:string, type?:TAlertType) => void
//     hide: () => void
//     alert: {
//         type?: string
//         text?: string
//         visible?: boolean
//     }
// }
