import React from 'react';
import CompanyMission from '../CompanyMission/CompanyMission';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import OffersProvide from '../OffersProvide/OffersProvide';
import Review from '../Review/Review';
import Services from '../Services/Services';
const Home = () => {
    return (
        <div>
            <Header></Header>
            <Services></Services>
            <OffersProvide></OffersProvide>
            <Review></Review>
            <CompanyMission></CompanyMission>
            <Footer></Footer>
        </div>
    );
};

export default Home;