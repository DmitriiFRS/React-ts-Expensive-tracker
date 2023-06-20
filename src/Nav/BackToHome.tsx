import { useNavigate } from "react-router-dom";
import home from '../icons/home.svg';
import styles from './Nav.module.scss';
export default function BackToHome({setSearchValue, homeActive}: {setSearchValue: Function, homeActive?: boolean}) {
   const navigate = useNavigate();
   function backToHome() {
      navigate('/', {replace: true});
      setSearchValue('');
   }
   return (
      <button onClick={backToHome} className={`${styles.home} ${homeActive ? styles.home_active : ''}`}>
            <img src={home} alt="home" />
      </button>
   )
}