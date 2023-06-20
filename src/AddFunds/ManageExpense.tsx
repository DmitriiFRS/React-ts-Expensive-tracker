import { useState } from 'react';
import HistoryGrid, { historyType } from '../History/HistoryGrid';
import Pagination from '../History/Pagination';
import styles from './AddFunds.module.scss';
import ManageModal from './ManageModal';
import stylesM from './Modal.module.scss';
type managePropsType = {
   currentItems: Array<historyType>,
   filteredHistory: Array<historyType>,
   itemsPerPage: number,
   setPage: Function,
   currentPage: number,
   history: Array<historyType>,
   setHistory: Function,
   cash: number,
   setCash: Function,
   categories: {[key: string]: number},
   resetCategories: Function
}
export type historyTargetType = {
   image?: string,
   date?: string,
   title?: string,
   value?: string,
   isExpense?: boolean,
   id?: number | undefined,
   category?: false | string
}
function ManageExpense({currentItems, filteredHistory, setPage, itemsPerPage, currentPage, history, setHistory, cash, setCash, categories, resetCategories}: managePropsType) {
   const [isModalActive, setModalActive] = useState<boolean>(false);
   const [isResetModalActive, setResetModalActive] = useState<boolean>(false);
   const [historyTarget, setHistoryTarget] = useState<historyTargetType>({});
   function remove() {
      setHistory(
         history.filter(item => {
            return item.id !== historyTarget.id
         })
      )
      if (historyTarget.isExpense) {
         setCash(cash + Number(historyTarget.value!.replace('$', '')))
      }
      else setCash(cash - Number(historyTarget.value!.replace('$', '')));

      if (historyTarget.category) {
         categories[historyTarget.category] -= 1
         localStorage.setItem('categories', JSON.stringify(categories));
      }
      setModalActive(false)
   }
   function resetTransactions() {
      setHistory([]);
      resetCategories({Socialize: 0, Bills: 0, Shopping: 0, Health: 0, Food: 0, Others: 0});
      localStorage.setItem('categories', JSON.stringify(categories));
      setResetModalActive(false);
   }
   return(
      <div className={styles.manage}>
         <div className={styles.manage_menu}>
            <button onClick={() => setResetModalActive(true)} className={styles.manage_reset}>Clear all history</button>
         </div>
         <HistoryGrid isModalActive={isModalActive}
            currentItems={currentItems}
            setModalActive={setModalActive}
            historyTarget={historyTarget}
            setHistoryTarget={setHistoryTarget}
            history={history}
            setHistory={setHistory}/>
         <Pagination currentPage={currentPage} setPage={setPage} history={filteredHistory} itemsPerPage={itemsPerPage}/>
         <ManageModal isModalActive={isModalActive}
            setModalActive={setModalActive}>
               <h2 className={stylesM.modal_title}>{`delete ${historyTarget.title}, Value: ${historyTarget.value} from ${historyTarget.date}?`}</h2>
               <h3 className={stylesM.modal_subtitle}>Your balance will be recalculated</h3>
               <div className={stylesM.modal_btns}>
                  <button onClick={() => setModalActive(false)} className={stylesM.modal_btn}>Cancel</button>
                  <button onClick={remove} className={stylesM.modal_btn}>Accept</button>
               </div>
         </ManageModal>
         <ManageModal isModalActive={isResetModalActive}
            setModalActive={setResetModalActive}>
               <h2 className={stylesM.modal_title}>Clear all history?</h2>
               <div className={stylesM.modal_btns}>
                  <button onClick={() => setResetModalActive(false)} className={stylesM.modal_btn}>Cancel</button>
                  <button onClick={resetTransactions} className={stylesM.modal_btn}>Accept</button>
               </div>
         </ManageModal>
      </div>
   )
}
export default ManageExpense; 