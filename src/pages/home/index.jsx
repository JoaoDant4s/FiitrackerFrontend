import HeaderNav from "@/components/header"

export const Home = () => {
    return (
        <>
            <HeaderNav isAdmin={false}/>
            <div className="container_page_with_header">
                <h1>Home page</h1>
            </div>
        </>
    )
}

export default Home