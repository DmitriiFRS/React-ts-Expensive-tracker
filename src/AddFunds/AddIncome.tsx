import styles from './AddFunds.module.scss';
import addExpense from '../icons/expense.svg';
import addCash from '../icons/addCash.svg';
import { ChangeEvent, useState } from 'react';
import { CashType } from '../Types/Types';
import { leadingZeroData } from '../Functions/Functions';
function AddIncome({cash, setCash}: CashType) {
   const [value, setValue] = useState<string>('');
   function addMoney() {
      setCash(cash + Number(value))
      setValue('')
   }
   function onInputValue(e: ChangeEvent<HTMLInputElement>) {
      if (value[0] === '0' && e.target.value === '00') return;
      setValue(e.target.value);
   }
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
               <input placeholder='enter value' onInput={onInputValue} value={value} type="number" className={styles.expense_value_input} />
            </div>
            <div className={styles.expense_date}>
               <p className={styles.expense_date_title}>Date</p>
               <input value={`${leadingZeroData(date.getDate())}/${leadingZeroData(date.getMonth()+1)}/${date.getFullYear()}`} type='text' className={styles.expense_date_field} />
            </div>
         </div>
         <div className={styles.expense_category}>
            <p className={styles.expense_category_title}>Your cards</p>
            <select className={styles.expense_category_dropdown}>
               <option value="Visa classic">Visa classic</option>
               <option value="Visa gold">Visa gold</option>
               <option value="Visa platinum">Visa platinum</option>
               <option value="Visa super mega ultra gold">Visa super mega ultra gold</option>
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