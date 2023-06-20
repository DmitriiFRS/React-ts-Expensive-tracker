import Header from '../Header/Header';
import styles from './History.module.scss';
import backArrow from '../icons/Back.svg';
import AppStyles from '../App.module.scss';
import loop from '../icons/loop.svg';
import transaction from '../icons/transaction.svg';
import BackToHome from '../Nav/BackToHome';
import HistoryGrid, { historyType } from './HistoryGrid';
import Pagination from './Pagination';
import { ChangeEvent } from 'react';
type mainHistoryProps = {
   itemsPerPage: number,
   currentPage: number,
   setPage: Function,
   searchValue: string,
   setSearchValue: Function,
   filteredHistory: Array<historyType>,
   currentItems: Array<historyType>
}
function History({itemsPerPage, currentPage, setPage, searchValue, setSearchValue, filteredHistory, currentItems}: mainHistoryProps) {
   return (
      <div className={styles.history}>
         <Header title='History' img={backArrow} setSearchValue={setSearchValue}/>
         <div className={`${AppStyles.container} ${styles.history_container}`}>
            <div className={styles.history_search}>
               <img className={styles.history_search_icon} src={loop} alt="" />
               <input onInput={
               (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
               value={searchValue} placeholder='Search' type="text" className={styles.history_search_input} />
            </div>
            <div className={styles.history_transactions}>
               <div className={styles.history_transactions_header}>
                  <img className={styles.history_transactions_img} src={transaction} alt="" />
                  <h2 className={styles.history_transactions_title}>Transaction History</h2>
               </div>
               <HistoryGrid currentItems={currentItems}/>
               <Pagination currentPage={currentPage} setPage={setPage} history={filteredHistory} itemsPerPage={itemsPerPage}/>
            </div>
            <BackToHome setSearchValue={setSearchValue}/>
         </div>
      </div>
   )
}
export default History;