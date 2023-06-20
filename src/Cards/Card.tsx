import styles from './Cards.module.scss';
import visa from '../icons/visa.png';
import chip from '../icons/chip-card.png';
import { cardBalance } from './Cards';

type CardProps = {
   color: string
   textColor: string
   cardType: string
   cardSelected: Function
   zIndex: number
   setIndex: Function
   translate: number
   setSelect: Function
   isSelected: boolean
   cardBalance: number
}
function Card({color, textColor, cardType, cardSelected, zIndex, setIndex, translate, setSelect, isSelected, cardBalance}: CardProps) {
   function selectCard() {
      cardSelected();
      if (!isSelected) setIndex(2);
      setSelect(!isSelected);
   }
   return (
      <div onClick={selectCard} className={styles.card} style={{background: color, color: textColor, zIndex: zIndex, transform: isSelected ? `translateY(${translate}px)` : ''}}>
         <div className={styles.card_header}>
            <h2 className={styles.card_title}>Your Bank</h2>
            <div className={styles.card_name}>
               <div className={styles.card_name_icon}>
                  <img className={styles.card_icon} src={visa} alt="VISA" />
               </div>
               <span className={styles.card_name_title}>{cardType}</span>
            </div>
         </div>
         <div className={styles.card_middle}>
            <div className={styles.card_chip}>
               <img src={chip} alt="chip" />
            </div>
            <div className={styles.card_number} style={{color: color}}>
               <span className={styles.card_num}>1234</span>
               <span className={styles.card_num}>5678</span>
               <span className={styles.card_num}>9012</span>
               <span className={styles.card_num}>3456</span>
            </div>
         </div>
         <div className={styles.card_footer} style={{color: textColor}}>
            <p className={styles.card_customer}>Customer Customer</p>
            <p className={styles.card_till}>11/25</p>
         </div>
      </div>
   )
}
export default Card;