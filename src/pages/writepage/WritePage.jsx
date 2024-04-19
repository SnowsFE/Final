import styled from "styled-components";
import React, { useState } from "react";

import {
  WriteBasicInfo1,
  WriteBasicInfo2,
  WriteBasicInfo3,
  WriteBasicInfo4,
} from "../../components/ui/WriteBasicInfo";
import LoginNav from "../../components/ui/LoginNav.jsx";
import { useNavigate } from "react-router-dom";
import UpScroll from "../../components/ui/UpScroll.jsx";
import axios from "axios";

const WritePage = () => {
  const navigate = useNavigate();

  const [recruitType, setRecruitType] = useState(""); // 모집 구분
  const [recruitMember, setRecruitMember] = useState(""); // 모집 인원
  const [progress, setProgress] = useState(""); // 진행 방식
  const [duration, setDuration] = useState(""); // 진행 기간
  const [categories, setCategories] = useState([]); // 기술 스택
  const [endDate, setEndDate] = useState(""); // 모집 마감일
  const [languages, setLanguages] = useState([]); // 모집 포지션
  const [contact, setContact] = useState(""); // 연락 방법
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용

  const handleWriteComplete = async () => {
    // 모든 항목이 작성되었는지 확인
    if (
      recruitType === "" ||
      recruitMember === "" ||
      progress === "" ||
      duration === "" ||
      categories.length === 0 ||
      endDate === "" ||
      languages.length === 0 ||
      contact === "" ||
      title === "" ||
      content === ""
    ) {
      alert("모든 항목을 작성해주세요!");
      return; // 함수 종료
    }
    const postData = {
      recruittype: recruitType,
      recruitmember: recruitMember,
      progress,
      duration,
      categories,
      enddate: endDate,
      languages,
      contact,
      title,
      content,
    };

    console.log("전송될 데이터:", postData); // 데이터를 콘솔에 출력

    try {
      const response = await axios.post("/boards/postWrite", postData);
      console.log("서버 응답 데이터:", response.data); // 서버 응답 데이터를 콘솔에 출력
      alert("글이 성공적으로 등록되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("글 등록 중 오류 발생:", error);
      alert("글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 취소 버튼 클릭 시 확인 메시지 띄우고 취소 여부에 따라 동작하는 함수
  const handleCancel = () => {
    const isConfirmed = window.confirm("작성을 취소하시겠습니까?");
    if (isConfirmed) {
      navigate("/");
    }
  };
  // -------------------------------------------- axios 통신

  // 제목과 내용을 업데이트하는 함수
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log("제목:", e.target.value); // 입력된 제목을 콘솔에 출력
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log("본문 내용:", e.target.value); // 입력된 본문 내용을 콘솔에 출력
  };

  return (
    <>
      <LoginNav />
      <UpScroll />
      <BasicInfoContainer>
        <h2>모집 정보</h2>
        <hr />
        <WriteBasicInfo1
          onRecruitTypeChange={setRecruitType}
          onRecruitMemberChange={setRecruitMember}
        />
        <WriteBasicInfo2
          onProgressChange={setProgress}
          onDurationChange={setDuration}
        />
        <WriteBasicInfo3
          onCategoryChange={setCategories}
          onEndDateChange={setEndDate}
        />
        <WriteBasicInfo4
          onLanguagesChange={setLanguages}
          onContactChange={setContact}
        />
        <h2>글작성</h2>
        <hr />
        <BodyInfoContainer>
          <h6>제목</h6>
          <input
            type="text"
            placeholder="제목을 입력해주세요!"
            id="title-input"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="20"
            placeholder="프로젝트를 소개해주세요"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div className="button-area">
            <CancelButton
              id="cancel-btn"
              className="body-btn"
              onClick={handleCancel}
            >
              취소
            </CancelButton>
            <WriteButton
              id="write-btn"
              className="body-btn"
              onClick={handleWriteComplete}
            >
              글등록
            </WriteButton>
          </div>
        </BodyInfoContainer>
      </BasicInfoContainer>
    </>
  );
};

const BasicInfoContainer = styled.section`
  position: relative;
  height: 640px;
  width: 53%;
  min-width: 1280px;
  min-width: 1000px;
  margin: 0 auto;

  h2 {
    text-align: left;
    font-size: 24px;
  }

  hr {
    height: 2px;
    background-color: rgb(113, 113, 113);
    border: none;
    margin-bottom: 30px;
  }
`;

// 본문 내용 관련 css-
const BodyInfoContainer = styled.section`
  h6 {
    text-align: left;
    font-size: 20px;
  }
  #title-input {
    width: 100%;
    height: 52px;
    margin-bottom: 30px;
    border-radius: 15px;
    outline: none;
    border: 2px solid grey;
    font-style: italic;
    font-size: 15px;
    opacity: 0.5;
  }

  textarea {
    width: 100%;
    height: 430px;
    border-radius: 15px;
    outline: none;
    border: 2px solid grey;
    font-size: 20px;
    opacity: 0.5;

    &::placeholder {
      /* placeholder 스타일링 */
      color: #aaa;
      font-size: 20px;
      font-style: italic;
    }
  }

  .button-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
  }

  .body-btn {
    width: 80px;
    height: 50px;
    border: none;
    margin-bottom: 2%;
    cursor: pointer;
  }
`;

// 버튼에 호버 효과와 색상 적용
const CancelButton = styled.button`
  background-color: rgb(233, 236, 239);
  border-radius: 5px;
  &:hover {
    background-color: #c4c4c4;
  }
`;

const WriteButton = styled.button`
  background-color: black;
  color: #fff;
  border-radius: 5px;
  margin-left: 15px;
  &:hover {
    background-color: #333;
  }

  #cancel-btn {
    background-color: rgb(233, 236, 239);
    border-radius: 5px;
  }

  #write-btn {
    background-color: black;
    color: #fff;
    border-radius: 5px;
    margin-left: 15px;
  }
`;

export default WritePage;
