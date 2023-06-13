
import styles from './Balance.module.scss';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
import { historyType } from '../../History/HistoryGrid';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend );

function AreaChart({history}: {history: Array<historyType>}) {
   function calcLastSevenDays() {
      const today = new Date();
      const historyDates = history.map((item: historyType) => {
         return item.date;
      })
      const lastsevenDaysArr = [];
      for (let i = 0; i <= 6; i++){
         const dates = new Date(
         today.getFullYear(),
         today.getMonth(),
         today.getDate() - i
         )
         const day = dates.getDate().toString().padStart(2, "0");
         const month = (dates.getMonth() + 1).toString().padStart(2, "0");
         const year = dates.getFullYear().toString();
         const formattedDates = `${day}/${month}/${year}`;
         lastsevenDaysArr.push(formattedDates);
      }
      let data = [0,0,0,0,0,0,0]
      lastsevenDaysArr.forEach((item, index) => {
         historyDates.filter((datesItem: string) => {
            if (datesItem === item) data[index] += 1;
            return null
         }) 
      })
      let data2 = data.splice(0, today.getDay());
      data = data.reverse();
      data2 = data2.reverse();
      data.forEach(item => {
         data2.push(item);
      })
      return data2;
   }
   const data: any = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
         fill: true,
         data: calcLastSevenDays(),
         borderColor: '#FF495C',
         backgroundColor: 'rgba(255, 73, 92, 0.2)',
      }]
   }
   const options: any = {
      plugins: {
         legend: {
            display: false
         },
      },
      scales: {
         x: {
            border:{dash: [4, 1]},
            ticks: {
               maxRotation: 0,
               minRotation: 0,
               font: {
                  size: 10
               },
            },
            grid: {
               color: '#06D6A0',
               lineWidth: 2,
            }
         },
         y: {
            border:{dash: [4, 1]},
            grid: {
               color: '#256EFF',
               lineWidth: 2,
            },
            min: 0,
            max: 6
         }
      }
   }
   return (
      <div className={styles.area_chart}>
         <Line height={240} options={options} data={data}/>
      </div>
   )
}
export default AreaChart