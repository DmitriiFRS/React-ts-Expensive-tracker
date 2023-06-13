import styles from './App.module.scss';
import Home from './Home/Home';
import MainFunds from './AddFunds/MainFunds';
import History from './History/History';
import {Routes, Route} from 'react-router-dom';
import Cards from './Cards/Cards';
import AddIncome from './AddFunds/AddIncome';
import AddExpense from './AddFunds/AddExpense';
import SplitExpense from './AddFunds/SplitExpense';
import { useState } from 'react';
import {historyType} from './History/HistoryGrid';
import { useLocalStorage } from './Hooks/useLocalStorage';
type Categories = {
  Funs: number
  Bills: number
  Shopping: number
  Health: number
  Food: number
  Others: number
}
function App() {
  const [history, setHistory] = useLocalStorage<Array<historyType>>([], 'history')
  const [categories] = useState<Categories>(() => {
    const storedCategories = localStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : {
    Socialize: 0, Bills: 0, Shopping: 0, Health: 0, Food: 0, Others: 0
  }
 })
 const [cash, setCash] = useLocalStorage<number>(0, 'cash');
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='' element={<Home cash={cash} categories={categories} history={history}/>} />
        <Route path='Manage' element={<MainFunds />}>
          <Route path='income' element={<AddIncome cash={cash} setCash={setCash}/>}/>
          <Route path='expense' element={<AddExpense 
            history={history} 
            setHistory={setHistory}
            categories={categories}
            cash={cash}
            setCash={setCash}/>}
            />
          <Route path='split' element={<SplitExpense/>}/>
        </Route>
        <Route path='History' element={<History history={history} setHistory={setHistory}/>} />
        <Route path='Cards' element={<Cards />} />
      </Routes>
    </div>
  );
}

export default App;
