
import { router } from 'next/router';
import styles from '../styles/Header.module.css'
import { RiCopperCoinLine } from 'react-icons/ri'
import { signOut } from 'next-auth/react';

export const HeaderNav = ({isAdmin, session}) => {
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
                <div className={styles.dropdown}>
                    {session?.user?.image ?
                    <img src={session.user.image} alt="Imagem do usuário" className={styles.avatar}/> :
                    <div className={styles.avatar}>
                        <h2>JB</h2>
                    </div>}
                    <div className={styles.dropdown_content}>
                        <p onClick={() => signOut()}>Sair</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default HeaderNav;