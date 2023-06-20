import { ReactNode } from 'react';
import styles from './Modal.module.scss';
type modalProps = {
   isModalActive: boolean,
   setModalActive: Function,
   children: ReactNode
}
function ManageModal({isModalActive, setModalActive, children}: modalProps) {
   return (
      <div onClick={() => setModalActive(false)} className={`${styles.modal} ${isModalActive ? styles.active : ''}`}>
         <div onClick={(e) => e.stopPropagation()} className={`${styles.modal_body} ${isModalActive ? styles.active : ''}`}>
            {children}
         </div>
      </div>
   )
}
export default ManageModal