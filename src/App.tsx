import styles from './App.module.scss';
import Home from './Home/Home';
import MainFunds from './AddFunds/MainFunds';
import History from './History/History';
import {Routes, Route} from 'react-router-dom';
import Cards from './Cards/Cards';
import AddIncome from './AddFunds/AddIncome';
import AddExpense from './AddFunds/AddExpense';
import { useEffect, useState } from 'react';
import {historyType} from './History/HistoryGrid';
import { useLocalStorage } from './Hooks/useLocalStorage';
import ManageExpense from './AddFunds/ManageExpense';
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
  const [categories, resetCategories] = useState<Categories>(() => {
    const storedCategories = localStorage.getItem('categories');
    return storedCategories ? JSON.parse(storedCategories) : {
    Socialize: 0, Bills: 0, Shopping: 0, Health: 0, Food: 0, Others: 0
  }
 })
  const [cash, setCash] = useLocalStorage<number>(0, 'cash');
  const [cardBalance, setCardBalance] = useLocalStorage<Array<number>>([0, 0, 0], 'cards');

  // HISTORY PAGINATION
  const [itemsPerPage] = useState(12);
  const [currentPage, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredHistory, setFilterHistory] = useState<Array<historyType>>([]);
  const lastHistoryIndex = itemsPerPage * currentPage;
  const firstHistoryIndex = lastHistoryIndex - itemsPerPage;
   useEffect(() => {
       setFilterHistory(
         history.filter((item: historyType) => {
            let title = item.title.toLowerCase();
            if (title.includes(searchValue) || item.date.includes(searchValue) || item.value.includes(searchValue)) {
               return true;
            }
            else return false
         })
       )
   }, [searchValue, history])
  const currentItems = filteredHistory.slice(firstHistoryIndex, lastHistoryIndex);
  useEffect(() => {
    if (currentItems.length === 0 && currentPage > 1) {
      setPage(currentPage - 1)
    }
  }, [currentItems, currentPage])
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='React-ts-Expensive-tracker/' element={<Home cash={cash} categories={categories} history={history} setSearchValue={setSearchValue}/>} />
        <Route path='React-ts-Expensive-tracker/Manage' element={<MainFunds setSearchValue={setSearchValue}/>}>
          <Route path='income' element={<AddIncome cash={cash} setCash={setCash} history={history} setHistory={setHistory} cardBalance={cardBalance} setCardBalance={setCardBalance}/>}/>
          <Route path='expense' element={<AddExpense 
            history={history} 
            setHistory={setHistory}
            categories={categories}
            cash={cash}
            setCash={setCash}/>}
            />
          <Route path='split' element={<ManageExpense currentItems={currentItems}
            setPage={setPage}
            filteredHistory={filteredHistory}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            history={history}
            setHistory={setHistory}
            cash={cash}
            setCash={setCash}
            categories={categories}
            resetCategories={resetCategories}/>}/>
        </Route>
        <Route path='React-ts-Expensive-tracker/History' element={<History
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setPage={setPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          filteredHistory={filteredHistory}
          currentItems={currentItems}/>} />
        <Route path='React-ts-Expensive-tracker/Cards' element={<Cards
          setSearchValue={setSearchValue}
          cardBalance={cardBalance} />} />
      </Routes>
    </div>
  );
}

export default App;
