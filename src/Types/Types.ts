import { historyType } from "../History/HistoryGrid"

export type CashType = {
   cash: number,
   setCash:Function
 }
 export type addIncomeType = {
    cash: number,
    setCash:Function,
    history: Array<historyType>,
    setHistory: Function,
 }