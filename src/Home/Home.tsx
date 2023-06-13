import Header from '../Header/Header';
import styles from './Home.module.scss';
import cards from '../icons/cards.svg';
import add from '../icons/add.svg';
import historyIcon from '../icons/history.svg';
import Nav from '../Nav/Nav';
import BalanceCategories from './Balance/Balance';
import AppStyles from '../App.module.scss';
import { historyType } from '../History/HistoryGrid';
 function Home ({cash, categories, history}: {cash: number, categories: object, history: Array<historyType>}) {
   const navBtns = [
      {
         border: '7px solid #06D6A0',
         icon: add,
         title: 'Add funds',
         link: 'Manage/income'
      },
      {
         border: '7px solid #FDE74C',
         icon: historyIcon,
         title: 'History',
         link: 'History'
      },
      {
         border: '7px solid #256EFF',
         icon: cards,
         title: 'Cards',
         link: 'Cards'
      }
   ]
   return (
      <div className={styles.home}>
         <Header title='Home'/>
         <div className={AppStyles.container}>
            <Nav navBtns={navBtns}/>
            <BalanceCategories cash={cash} categories={categories} history={history}/>
         </div>
      </div>
   )
}
export default Home;