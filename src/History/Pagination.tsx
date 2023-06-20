import styles from './History.module.scss';
import { historyType } from './HistoryGrid';
type paginationType = {
   history: Array<historyType>,
   itemsPerPage: number,
   setPage: Function,
   currentPage: number
}
function Pagination({history, itemsPerPage, setPage, currentPage}: paginationType) {
   const buttons = [];
   for (let i = 1; i <= Math.ceil(history.length / itemsPerPage); i++) {
      buttons.push(i)
   }
   function prev() {
      if (currentPage === 1) return;
      setPage(currentPage - 1);
   }
   function next() {
      if (currentPage === buttons.length) return;
      setPage(currentPage + 1);
   }
   let displayButtons: Array<number> = []
   if (buttons.length > 3) {
      if (currentPage === 1) {
         displayButtons = buttons.slice(0, 3)
      }
      else if (currentPage === buttons.length) {
         displayButtons = buttons.slice(currentPage - 3, currentPage)
      }
      else 
      displayButtons = buttons.slice(currentPage - 2, currentPage + 1)
   }
   else if (buttons.length <= 3) {
      displayButtons = buttons.slice(0, buttons.length)
   }
   return (
      history.length < itemsPerPage + 1 ? null : 
      <div className={styles.pagination}>
         <div className={styles.pagination_btnsBlock}>
            <button onClick={prev} className={`${styles.pagination_btns} ${currentPage === 1 ? styles.pagination_unactive : ''}`}>{'<'}</button>
            {displayButtons.map((item, index) => {
               return <button onClick={() => {setPage(item)}}
               key={index} className={`${styles.pagination_btns} ${currentPage === item ? styles.pagination_active : ''}`}>{item}
               </button>
            })}
            <button onClick={next}
            className={`${styles.pagination_btns} ${currentPage === buttons.length ? styles.pagination_unactive : ''}`}>{'>'}
            </button>
         </div>
      </div>
   )
}
export default Pagination