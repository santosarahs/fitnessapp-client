import Banner from '../components/Banner';


export default function Home() {

    const data = {
        title: "Stella Fitness Center",
        content: "Move it. Track It.",
        destination: "/login",
        buttonLabel: "Track your Fitness Journey Here!"
    }

    return (
        <>
            <Banner data={data}/>
        </>
    )
}