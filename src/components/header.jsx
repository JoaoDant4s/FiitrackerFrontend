
import { router } from 'next/router';
import styles from '../styles/Header.module.css'
import { RiCopperCoinLine } from 'react-icons/ri'

export const HeaderNav = ({isAdmin}) => {

    const handleNavigate = () => {
        if(isAdmin){
            router.push(`/admin`)
        } else {
            router.push(`/home`)
        }
    }
    return(
        <div className={styles.header}>
            <h1 onClick={() => handleNavigate()} className={styles.logo}>FitTracker</h1>
            {!isAdmin && 
            <div className={styles.container_avatar}>
                <RiCopperCoinLine className={styles.coin}/>
                <h2>200</h2>
                <div className={styles.avatar}>
                    <h2>JB</h2>
                </div>
            </div>}
        </div>
    )
}

export default HeaderNav;