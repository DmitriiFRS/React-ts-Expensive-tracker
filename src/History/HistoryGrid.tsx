import styles from './History.module.scss';
import HistoryTable from './HistoryTable';
export type historyType = {
   image: string,
   date: string,
   title: string,
   value: string,
   isExpense: boolean
}
export type historyProps = {
   history: Array<historyType>,
   setHistory: Function
   categories?: {[key: string]: number}
   setCategoryCount?: Function
   cash?: any
   setCash?: any
}
function HistoryGrid({history, setHistory}: historyProps) {
   return (
      <div className={styles.historyGrid}>
         <HistoryTable transactions={history} />
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