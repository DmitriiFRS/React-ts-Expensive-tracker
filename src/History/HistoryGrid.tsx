import styles from './History.module.scss';
import HistoryTable from './HistoryTable';
export type historyType = {
   image: string,
   date: string,
   title: string,
   value: string,
   isExpense: boolean,
   id: number,
   category: false | string
}
export type historyProps = {
   history: Array<historyType>,
   setHistory: Function
   categories?: {[key: string]: number}
   setCategoryCount?: Function
   cash: number
   setCash: Function
}
export type historyGridProps = {
   currentItems: Array<historyType>
   isModalActive?: boolean
   setModalActive?: Function
   historyTarget?: Object
   setHistoryTarget?: Function
   history?: Array<historyType>
   setHistory?: Function
}
function HistoryGrid({currentItems, isModalActive, setModalActive, historyTarget, setHistoryTarget, history, setHistory}: historyGridProps) {
   return (
      <div className={styles.historyGrid}>
         <HistoryTable currentItems={currentItems} isModalActive={isModalActive} setModalActive={setModalActive} historyTarget={historyTarget} setHistoryTarget={setHistoryTarget} history={history} setHistory={setHistory} />
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
         <div className={styles.historyGrid_item}></div>
      </div>
   )
}
export default HistoryGrid;