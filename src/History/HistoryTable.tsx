import styles from './History.module.scss';
import {historyType} from './HistoryGrid';
function HistoryTable({transactions}: {transactions: Array<historyType>}) {
   return (
      <table cellSpacing="0" className={styles.history_table}>
         <thead className={styles.history_thead}>
            <tr>
               <th className={styles.history_thead_item}>Date</th>
               <th className={styles.history_thead_item}>Title</th>
               <th className={styles.history_thead_item}>Value</th>
            </tr>
         </thead>
         <tbody className={styles.history_tbody}>
            {transactions.map((item: historyType, index: number) => {
               return (
               <tr key={index} className={styles.history_tbody_list}>
                  <th className={styles.history_tbody_item}><img src={item.image} alt="" />{item.date}</th>
                  <th className={styles.history_tbody_item}>{item.title}</th>
                  <th className={styles.history_tbody_item}>{item.value}</th>
               </tr>
               )
            })}
         </tbody>
      </table>
   )
}
export default HistoryTable;