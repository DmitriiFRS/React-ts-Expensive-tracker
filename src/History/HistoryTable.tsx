import styles from './History.module.scss';
import {historyType} from './HistoryGrid';
import { historyGridProps } from './HistoryGrid';
function HistoryTable({currentItems, isModalActive, setModalActive, historyTarget, setHistoryTarget, history, setHistory}: historyGridProps) {
   function remove(target: object) {
      if (setModalActive === undefined) return
      setModalActive(true);
      if (setHistoryTarget === undefined) return
      setHistoryTarget(target);
   }
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
            {currentItems.map((item: historyType, index: number) => {
               return (
               <tr onClick={setModalActive ? () => remove(item) : undefined} key={index} className={`${styles.history_tbody_list} ${setModalActive ? styles.pointer : ''}`}>
                  <td className={styles.history_tbody_item}><img src={item.image} alt="" />{item.date}</td>
                  <td className={styles.history_tbody_item}>{item.title}</td>
                  <td className={styles.history_tbody_item}>{item.value}</td>
               </tr>
               )
            })}
         </tbody>
      </table>
   )
}
export default HistoryTable;