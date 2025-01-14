import React from "react";
import MainStyle from "../../constants/MainStyle.jsx";
import Nav from "../../components/ui/Nav.jsx";
import Banner from "./Banner.jsx";
import HotBoards from "./HotBoards.jsx";
import NewBoards from "./NewBoards.jsx";
import Footer from "./Footer";
import UpScroll from "../../components/ui/UpScroll.jsx";

const MainPage = () => {
  return (
    <MainStyle className="MainPage">
      <Nav />
      <Banner />
      <HotBoards />
      <NewBoards />
      <Footer />
      <UpScroll />
    </MainStyle>
  );
};

export default MainPage;
