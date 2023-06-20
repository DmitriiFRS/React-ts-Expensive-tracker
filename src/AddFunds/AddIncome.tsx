import styles from './AddFunds.module.scss';
import addExpense from '../icons/expense.svg';
import addCash from '../icons/addCash.svg';
import addIncome from '../icons/addIncome.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { leadingZeroData } from '../Functions/Functions';
import { historyType } from '../History/HistoryGrid';
type addIncomeType = {
   cash: number,
   setCash:Function,
   history: Array<historyType>,
   setHistory: Function,
   cardBalance: Array<number>,
   setCardBalance: Function
}
function AddIncome({cash, setCash, history, setHistory, cardBalance, setCardBalance}: addIncomeType) {
   const [value, setValue] = useState<string>('');
   const dataRef = useRef<HTMLInputElement>(null!);
   const [isValidate, setValidate] = useState<boolean>(true);
   const [selected, setSelect] = useState<string>('0');
   function addMoney() {
      if (value === '') {
         setValidate(false);
         return
      }
      setHistory([...history, {image: addIncome, date: dataRef.current.value, title: 'Income', value: `$${value}`, isExpense: false, id: Date.now(), category: false}]);
      setCash(cash + Number(value));
      setValue('');
      setCardBalance(
         cardBalance.map((item, index) => {
            if (index === +selected) return item += Number(value);
            return item;
         })
      )
      setValidate(true);
   }
   function onInputValue(e: ChangeEvent<HTMLInputElement>) {
      if (value[0] === '0' && e.target.value === '00') return;
      setValue(e.target.value);
   }
   useEffect(() => {
      if (value !== '') {
         setValidate(true)
      }
   }, [value])
   const date: Date = new Date();
   return(
      <div className={styles.expense}>
         <div className={styles.expense_title_block}>
            <div className={styles.expense_title_img}>
               <img src={addExpense} alt="add"/>
            </div>
            <h2 className={styles.expense_title}>Add money</h2>
         </div>
         <div className={styles.expense_valueDate}>
            <div className={styles.expense_value}>
               <p className={styles.expense_value_title}>Value</p>
               <span className={styles.expense_value_dollar}>$</span>
               <input placeholder='enter value' onInput={onInputValue} value={value} type="number" className={`${styles.expense_value_input} ${!isValidate ? styles.validation : ''}`} />
            </div>
            <div className={styles.expense_date}>
               <p className={styles.expense_date_title}>Date</p>
               <input ref={dataRef} value={`${leadingZeroData(date.getDate())}/${leadingZeroData(date.getMonth()+1)}/${date.getFullYear()}`} type='text' className={styles.expense_date_field} />
            </div>
         </div>
         <div className={styles.expense_category}>
            <p className={styles.expense_category_title}>Your cards</p>
            <select value={selected} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelect(e.target.value)} className={styles.expense_category_dropdown}>
               <option value="2">Visa classic</option>
               <option value="1">Visa gold</option>
               <option value="0">Visa platinum</option>
            </select>
         </div>
         <button onClick={addMoney} className={styles.expense_add}>
            <img src={addCash} alt="add" className={styles.expense_add_img} />
            <p className={styles.expense_add_title}>Add</p>
         </button>
      </div>
   )
}
export default AddIncome;