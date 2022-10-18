import React from "react";
import { UserStatus } from "./components/authentication";
import { Header } from "./components/header";
import Footer from "./components/footer/Footer";
import Routes from "./Routes";

function App() {
    return (
    <>
        {/* <UserStatus /> */}
        <Header />
        <Routes />
        {/* <Footer /> */}
    </>
    )
}

export default App;
