import styles from './Balance.module.scss';
import dollar from '../../icons/dollar.svg';
import expense from '../../icons/balanceExpense.svg';
import income from '../../icons/balanceIncome.svg';
import AreaChart from './AreaChart';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { historyType } from '../../History/HistoryGrid';
ChartJS.register(ArcElement, Tooltip, Title, Legend, ChartDataLabels );
function BalanceCategories({cash, categories, history}: {cash: number, categories: object, history: Array<historyType>}) {

   function percentage() {
      const categoriesData = Object.values(categories);
      const totalValue = categoriesData.reduce((acc: number, item: number) => {
         return acc + item
      }, 0)
      const percentageValue: Array<number> = [];
      categoriesData.forEach(item => {
         percentageValue.push(+(item / totalValue * 100).toFixed(0))
      })
      return percentageValue;
   }
   const data: any = {
      labels: Object.keys(categories),
      datasets: [
        {
          data: percentage(),
          backgroundColor: [
            '#FDE74C',
            '#256EFF',
            '#FF495C',
            '#644FDB',
            '#06D6A0',
            '#91CE04',
          ],
          cutout: '60%',
          datalabels: {
            labels: {
               index: {
                  formatter: (val: number, ctx: any) => {
                     return val < 5 ? '' : ctx.chart.data.labels[ctx.dataIndex]
                  },
                  align: 'end',
                  anchor: 'end',
                  font: {
                     size: 9 
                  }
               },
               name: {
                  formatter: (val: number) => {
                     return val < 5 ? '' : val + '%'
                  }
               }
            }
          }
        }],
    };

    const options: any = {
      layout: {
         padding: 42
      },
      plugins: {
         legend: {
            display: false,
         },
         tooltip: {
            enabled: false,
         },
      }
    }
    console.log(history)
   function getLastTransactions() {
      const getLastValue = history.slice(-3).reverse();
      return getLastValue.map((item: any, index) => {
         return <div key={index} className={styles.transaction_item}>
            <img src={item.isExpense ? expense : income} alt="spend" />
            <p>{item.value} {item.isExpense ? 'expence' : 'income'} {`"${item.title}"`}</p>
         </div>
      })
   }
   return (
      <div className={styles.balanceCategories}>
         <div className={`${styles.balance} ${styles.bc}`}>
            <div className={styles.balance_title_block}>
               <img className={styles.balance_img} src={dollar} alt="" />
               <h2 className={styles.balance_title}>Balance</h2>
            </div>
            <p className={styles.balance_count}>{`$  ${cash.toLocaleString('ru')}`}</p>
            <div className={styles.transaction}>
               <h3 className={styles.transaction_latest}>Latest transactions:</h3>
               {history.length === 0 ? (<h2>No transactions yet</h2>) : 
               <div>
               {getLastTransactions()}
               </div>}
            </div>
         </div>
         <div className={`${styles.categories} ${styles.bc}`}>
            {Object.values(categories).reduce((acc: number, value) => acc + value) === 0 ? (<h2>No transactions yet</h2>) : (
               <Doughnut options={options} data={data}/>
            )}
         </div>
         <AreaChart history={history}/>
      </div>
   )
}
export default BalanceCategories;