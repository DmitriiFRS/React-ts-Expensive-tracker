import Header from '../Header/Header';
import styles from './History.module.scss';
import backArrow from '../icons/Back.svg';
import AppStyles from '../App.module.scss';
import loop from '../icons/loop.svg';
import transaction from '../icons/transaction.svg';
import HistoryTable from './HistoryTable';
import BackToHome from '../Nav/BackToHome';
import HistoryGrid from './HistoryGrid';
import {historyProps} from './HistoryGrid'

function History({history, setHistory}: historyProps) {
   return (
      <div className={styles.history}>
         <Header title='History' img={backArrow}/>
         <div className={`${AppStyles.container} ${styles.history_container}`}>
            <div className={styles.history_search}>
               <img className={styles.history_search_icon} src={loop} alt="" />
               <input type="text" className={styles.history_search_input} />
            </div>
            <div className={styles.history_transactions}>
               <div className={styles.history_transactions_header}>
                  <img className={styles.history_transactions_img} src={transaction} alt="" />
                  <h2 className={styles.history_transactions_title}>Transaction History</h2>
               </div>
               <HistoryGrid history={history} setHistory={setHistory}/>
            </div>
            <BackToHome />
         </div>
      </div>
   )
}
export default History;