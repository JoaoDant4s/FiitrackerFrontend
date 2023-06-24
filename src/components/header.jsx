
import { router } from 'next/router';
import styles from '../styles/Header.module.css'
import { RiCopperCoinLine } from 'react-icons/ri'
import { signOut } from 'next-auth/react';
import { createInitials } from '@/helpers/createInitials';

export const HeaderNav = ({user}) => {
    const handleNavigate = () => {
        if(user.role === "admin"){
            router.push(`/admin`)
        } else {
            router.push(`/home`)
        }
    }
    return(
        <div className={styles.header}>
            <h1 onClick={() => handleNavigate()} className={styles.logo}>FitTracker</h1>
            {user?.role === "user" && 
            <div className={styles.container_avatar}>
                <RiCopperCoinLine className={styles.coin}/>
                <h2>{user.pontos}</h2>
                <div className={styles.dropdown}>
                    {user?.image ?
                    <img src={user?.image} alt="Imagem do usuário" className={styles.avatar}/> :
                    <div className={styles.avatar}> 
                        <h2>{createInitials(user?.aluno?.nomeCompleto)}</h2>
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