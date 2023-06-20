import Header from '../Header/Header';
import styles from './Cards.module.scss';
import backArrow from '../icons/Back.svg';
import Card from './Card';
import AppStyles from '../App.module.scss';
import { useState } from 'react';
import BackToHome from '../Nav/BackToHome';
export type cardBalance = {
   [key: string]: number
}
type CardsType = {
   setSearchValue: Function
   cardBalance: Array<number>
}
function Cards({setSearchValue, cardBalance}: CardsType) {
   const [zIndex1, setIndex1] = useState<number>(0)
   const [zIndex2, setIndex2] = useState<number>(0)
   const [zIndex3, setIndex3] = useState<number>(0)
   const cards = [
      { color: '#393939', textColor: '#FFFFFF', cardType: 'Platinum', zIndex: zIndex1, setIndex: setIndex1, translate: 135 },
      { color: '#996F26', textColor: '#000', cardType: 'Gold', zIndex: zIndex2, setIndex: setIndex2, translate: 0 },
      { color: '#CCCCCC', textColor: '#000', cardType: 'Classic', zIndex: zIndex3, setIndex: setIndex3, translate: -135 }
   ]
   const [isSelected, setSelect] = useState<boolean>(false);
   function cardSelected() {
      if (isSelected) {
         setIndex1(0);
         setIndex2(0);
         setIndex3(0);
      } 
   }
   const homeActive = true;
   return (
      <div className={styles.cards}>
         <Header title='Cards' img={backArrow} setSearchValue={setSearchValue}/>
         <div className={`${AppStyles.container} ${styles.cards_container}`}>
            {cards.map((item, index) => (
               <Card key={index}
                  color={item.color}
                  textColor={item.textColor}
                  cardType={item.cardType}
                  cardSelected={cardSelected}
                  zIndex={item.zIndex}
                  setIndex={item.setIndex}
                  translate={item.translate}
                  isSelected={isSelected}
                  setSelect={setSelect}
                  cardBalance={cardBalance[index]} />
            ))}
            {isSelected && (
               <div className={styles.cards_balance}>
                  <h2 className={styles.cards_balance_title}>
                     Balance: {zIndex1 ? cardBalance[0] : zIndex2? cardBalance[1] : cardBalance[2]} USD
                  </h2>
               </div>
            )}
            <BackToHome setSearchValue={setSearchValue} homeActive={homeActive}/>
         </div>
      </div>
   )
}
export default Cards; 