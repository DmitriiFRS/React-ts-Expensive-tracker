import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
type HeaderProps = {
   title: string
   img?: string
}
function Header(props: HeaderProps) {
   const navigate = useNavigate();
   return (
      <div className={styles.header}>
         {props.img &&
            <button onClick={() => {navigate(-1)}} className={styles.header_back}>
               <img src={props.img} alt="back" className={styles.header_img} />
            </button>}
         <h2 className={styles.header_title}>{props.title}</h2>
      </div>
   )
}
export default Header;