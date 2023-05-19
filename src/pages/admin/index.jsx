import HeaderNav from "@/components/header"
import styles from '../../styles/HomeAdmin.module.css'
import router from "next/router";
import Head from "next/head";

export const HomeAdmin = () => {
    return(
        <>  
            <Head>
                <title>Admin</title>
            </Head>
            <HeaderNav isAdmin={true}/>
            <div className="container_page_with_header">
                <div className={styles.row}>
                    <div className={styles.card} onClick={() => router.push(`/admin/novo-aluno`)}>
                        <h1>NOVO ALUNO</h1>
                    </div>
                    <div className={styles.card}>
                        <h1>PAGAMENTO</h1>
                    </div>
                </div>
                <div className={styles.row2}>
                    <div className={styles.card} onClick={() => router.push(`/admin/cadastrar-checkin`)}>
                        <h1>CHECKIN</h1>
                    </div>
                    <div className={styles.card} onClick={() => router.push(`/admin/cadastrar-produtos`)}>
                        <h1>PRODUTOS</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin;