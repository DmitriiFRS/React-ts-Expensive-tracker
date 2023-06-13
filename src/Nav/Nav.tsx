import styles from './Nav.module.scss';
import {NavLink} from 'react-router-dom';
type navItem = {
   border: string,
   icon: string,
   title: string,
   link: string
}
type navProps = {
   navBtns: Array<navItem>
}
function Nav({navBtns}: navProps) {
   return (
      <nav className={styles.nav}>
      {navBtns.map((item: navItem, index: number) => {
            return (

               <div key={index} className={styles.nav_container}>
                  <NavLink to={item.link}>
                     <button style={{border: item.border}} className={styles.nav_btn}>
                           <img className={styles.nav_img} src={item.icon} alt={item.title} />
                     </button>
                  </NavLink>
                  <h2 className={styles.nav_title}>{item.title}</h2>
               </div>
               )
            }
         )
      }
      </nav>

   )
}
export default Nav;