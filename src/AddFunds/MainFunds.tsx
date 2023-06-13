import styles from './AddFunds.module.scss';
import Header from '../Header/Header';
import backArrow from '../icons/Back.svg';
import Nav from '../Nav/Nav';
import addIncome from '../icons/addIncome.svg';
import addExpense from '../icons/addExpense.svg';
import splitExpense from '../icons/splitExpense.svg';
import AppStyles from '../App.module.scss';
import { Outlet } from 'react-router-dom';
import BackToHome from '../Nav/BackToHome';
function MainFunds() {
   const navBtns = [
      {
         border: '7px solid #06D6A0',
         icon: addIncome,
         title: 'Add income',
         link: 'income'
      },
      {
         border: '7px solid #FDE74C',
         icon: addExpense,
         title: 'Add expense',
         link: 'expense'
      },
      {
         border: '7px solid #FF495C',
         icon: splitExpense,
         title: 'Split expense',
         link: 'split'
      }
   ]
   return (
      <div className={styles.addFunds}>
         <Header title='Add Funds' img={backArrow}/>
         <div className={`${AppStyles.container} ${styles.container}`}>
            <Nav navBtns={navBtns}/>
            <Outlet />
            <BackToHome />
         </div>
      </div>
   )
}
export default MainFunds;