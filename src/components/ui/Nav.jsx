import React from "react";
import styled from "styled-components";
import CodeRoom from "../../img/CodeRoom.png";
import BackGroundColorChanger from "./BackGroundColorChanger";

// 네비게이션 컴포넌트 정의
const Nav = (props) => {
  return (
    // 네비게이션 바를 감싸는 컨테이너 박스
    <NaviBox>
      {/* 네비게이션 바 스타일 */}
      <NavStyle className="Logo">
        {/* 왼쪽 로고 및 링크 */}
        <Left>
          <a href="/">
            <img src={CodeRoom} alt="로고" />
          </a>
        </Left>
        {/* 글쓰기 링크 */}
        <Right1>
          <a href="/boards">
            <span> 글쓰기</span>
          </a>
        </Right1>
        {/* 로그인 링크 */}
        <Right2>
          <a href="/users/login">
            <span> 로그인</span>
          </a>
        </Right2>
        {/* 네비게이션 바와 컬러 변경 버튼 */}
        <Separator />
        <BackGroundColorChanger />
      </NavStyle>
    </NaviBox>
  );
};

// 네비게이션 바를 감싸는 컨테이너 스타일 정의
const NaviBox = styled.div`
  width: 100%; /* 가로 폭 100% */
  height: 65px; /* 높이 65px */
  position: relative; /* 상대 위치 지정 */
  background-color: white; /* 배경색 흰색 */
`;

// 네비게이션 바 스타일 정의
const NavStyle = styled.div`
  width: 100%; /* 가로 폭 100% */
  height: 65px; /* 높이 65px */
  margin: 0 auto; /* 왼쪽, 오른쪽 여백 자동으로 설정 */
  display: flex; /* 플렉스 컨테이너로 설정 */
  flex-direction: row; /* 가로 방향으로 요소 배치 */
  position: fixed; /* 고정 위치 설정 */
  justify-content: space-between; /* 좌우 여백을 동일하게 설정 */
  align-items: center; /* 수직 정렬 설정 */
  background-color: white; /* 배경색 흰색 */
  z-index: 10000; /* z-index 설정 */
  opacity: 95%; /* 투명도 95%로 설정 */
`;

// 로고를 왼쪽에 정렬하기 위한 스타일
const Left = styled.div`
  margin-left: 20px; /* 왼쪽 여백 20px */
  margin-top: 3px; /* 위쪽 여백 3px */
  a {
    width: 110px; /* 링크 너비 110px */
    height: 50px; /* 링크 높이 50px */
  }
`;

// 오른쪽에 위치한 링크 스타일
const Right1 = styled.div`
  a {
    color: black; /* 글자색 검정색 */
    text-decoration: none; /* 밑줄 없애기 */
    display: block; /* 블록 레벨 요소로 설정 */
    position: absolute; /* 절대 위치 설정 */
    right: 175px; /* 오른쪽 여백 175px */
    bottom: 20px; /* 아래쪽 여백 20px */
    font-size: 18px; /* 폰트 크기 18px */
    font-weight: 800; /* 폰트 두껍게 설정 */
  }
`;

// 오른쪽에 위치한 링크 스타일
const Right2 = styled.div`
  a {
    color: black; /* 글자색 검정색 */
    text-decoration: none; /* 밑줄 없애기 */
    display: block; /* 블록 레벨 요소로 설정 */
    position: absolute; /* 절대 위치 설정 */
    right: 100px; /* 오른쪽 여백 100px */
    bottom: 20px; /* 아래쪽 여백 20px */
    font-size: 18px; /* 폰트 크기 18px */
    font-weight: 800; /* 폰트 두껍게 설정 */
  }
`;

// 네비게이션 바와 컬러 변경 버튼 사이의 분리선 스타일
const Separator = styled.div`
  width: 100%; /* 가로 폭 100% */
  height: 1px; /* 높이 1px */
  background-color: rgb(221, 221, 221); /* 배경색 회색 */
  position: absolute; /* 절대 위치 설정 */
  top: 64px; /* 상단 여백 64px */
`;

export default Nav; // 네비게이션 컴포넌트 내보내기
