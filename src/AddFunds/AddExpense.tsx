import styles from './AddFunds.module.scss';
import addIncome from '../icons/expense.svg';
import addCash from '../icons/addCash.svg';
import calendar from '../icons/calendar.svg';
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { historyProps } from '../History/HistoryGrid';
import spend from '../icons/spend.svg';
import { leadingZeroData } from '../Functions/Functions';
function AddExpense({history, setHistory, categories, cash, setCash}: historyProps) {
   const calendarRef = useRef<HTMLDivElement>(null!);
   const btnRef = useRef<HTMLButtonElement>(null!);
   const dateRef = useRef<HTMLInputElement>(null!);
   const [title, setTitle] = useState<string>('')
   const [value, setValue] = useState<string>('');
   const [isCalendarOpen, setCalendarStatus] = useState<boolean>(false);
   const [date, setDate] = useState<Date>(new Date());
   const [selected, setSelect] = useState<string>('Socialize');
   useEffect(() => {
      setCalendarStatus(false)
   },[date])
   function openCalendar() {
      setCalendarStatus(!isCalendarOpen);
   }
   function onChange(date: any) {
      setDate(date)
   }
   useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
         if (!btnRef.current.contains(event.target as HTMLElement) && !calendarRef.current.contains(event.target as HTMLElement)) {
            setCalendarStatus(false);
         }
       }
       document.body.addEventListener('click', handleClickOutside);
       return () => {
         document.body.removeEventListener('click', handleClickOutside);
       };
   }, [isCalendarOpen])
   function throwExpense() {
      setHistory([...history, {image: spend, date: dateRef.current.value, title: title, value: `$${value}`, isExpense: true}]);
      setTitle('');
      setValue('');
      setCash(cash - +value);
      if (!categories) return
      categories[selected] += 1
      localStorage.setItem('categories', JSON.stringify(categories));
   }
   function onInputValue(e: ChangeEvent<HTMLInputElement>) {
      if (value[0] === '0' && e.target.value === '00') return;
      setValue(e.target.value);
   }
   return(
      <div className={styles.expense}>
         <div className={styles.expense_title_block}>
            <div className={styles.expense_title_img}>
               <img src={addIncome} alt="add" />
            </div>
            <h2 className={styles.expense_title}>Expense</h2>
         </div>
         <div className={styles.expense_input}>
            <p className={styles.expense_input_title}>Title</p>
            <input placeholder='Write your expense title' onInput={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}} value={title} type="text" className={styles.expense_input_field} />
         </div>
         <div className={styles.expense_valueDate}>
            <div className={styles.expense_value}>
               <p className={styles.expense_value_title}>Value</p>
               <span className={styles.expense_value_dollar}>$</span>
               <input onInput={onInputValue} value={value} type="number" className={styles.expense_value_input} />
            </div>
            <div className={styles.expense_date}>
               <p className={styles.expense_date_title}>Date</p>
               <input ref={dateRef} value={`${leadingZeroData(date.getDate())}/${leadingZeroData(date.getMonth()+1)}/${date.getFullYear()}`} type='text' className={styles.expense_date_field} />
               <button ref={btnRef} onClick={openCalendar} className={styles.expense_date_calendar}>
                  <img className='calendarImg' src={calendar} alt="calendar" />
               </button>
               <div ref={calendarRef} style={{transform: isCalendarOpen ? 'translateY(200px) scale(1)' : 'translateY(0px) scale(0)'}} className={styles.calendar_container}>
                  <Calendar onChange={onChange} value={date} maxDate={new Date()} showNavigation={false}/>
               </div>
            </div>
         </div>
         <div className={styles.expense_category}>
            <p className={styles.expense_category_title}>Category</p>
            <select value={selected} onChange={(e: any) => setSelect(e.target.value)} className={styles.expense_category_dropdown}>
               <option value="Socialize">Socialize</option>
               <option value="Bills">Bills</option>
               <option value="Shopping">Shopping</option>
               <option value="Health">Health</option>
               <option value="Food">Food</option>
               <option value="Others">Others</option>
            </select>
         </div>
         <button onClick={throwExpense} className={styles.expense_add}>
            <img src={addCash} alt="add" className={styles.expense_add_img} />
            <p className={styles.expense_add_title}>Add</p>
         </button>
      </div>
   )
}
export default AddExpense;