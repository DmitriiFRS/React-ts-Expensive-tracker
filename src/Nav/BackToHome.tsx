import { useNavigate } from "react-router-dom";
import home from '../icons/home.svg';
import styles from './Nav.module.scss';
export default function BackToHome() {
   const navigate = useNavigate();
   function backToHome() {
      navigate('/', {replace: true})
   }
   return (
      <button onClick={backToHome} className={styles.home}>
            <img src={home} alt="home" />
      </button>
   )
}