import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginLogo, LoginBelowImg } from "../../components/ui/LoginLogo";

const JoinPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 중복 여부 및 비밀번호 상태
  // 3가지 상태에 대해서 모두 true 이여야지만 서버에 post 요청
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  // 비밀번호 유효성 검사
  const passwordCheck = async (e) => {
    if (e.target.value.length < 8) {
      setErrorMessage("비밀번호는 8자리 이상이어야 합니다");
      return;
    }
    setIsPasswordValid(true);
    setErrorMessage("");
  };

  // confirm 비밀번호 유효성 검사
  const confirmPasswordCheck = async (e) => {
    if (password.length < 8) {
      setErrorMessage("비밀번호는 8자리 이상이어야 합니다");
      return;
    } else if (e.target.value !== password) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }
    setIsConfirmPasswordValid(true);
    setErrorMessage("");
  };

  // username 중복 확인 (서버와 통신)
  const validCheckHandler = async (e) => {
    try {
      const response = await axios.post("/join/isDuplicated", {
        username,
      });
      console.log(response.data);
      setIsUsernameChecked(true);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setErrorMessage("중복된 아이디 입니다");
        setIsUsernameChecked(false);
      }
    }
  };

  // 회원 가입 (서버와 통신)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUsernameChecked) {
      setErrorMessage("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage("비밀번호는 8자리 이상이어야 합니다.");
      return;
    }

    if (!isConfirmPasswordValid) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post("/join", {
        username: username,
        password: password,
      });
      console.log("회원가입 데이터: " + response.data); //확인용
      navigate("/users/login"); //회원가입 성공시 로그인 화면으로 이동
    } catch (e) {
      if (e.response.status === 401) {
        alert("사용자 입력 오류");
      } else if (e.response.status === 500) {
        alert("서버측 오류 발생");
      }
    }
  };

  return (
    <JoinContentsCotainer>
      <LoginForm>
        <LoginLogo></LoginLogo>
        <InputContainer>
          <JoinInput
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <CheckButton onClick={() => validCheckHandler()}>
            중복확인
          </CheckButton>
        </InputContainer>
        <JoinInput
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            passwordCheck(e);
          }}
        />

        <JoinInput
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            confirmPasswordCheck(e);
          }}
        />
        {errorMessage && <Message>{errorMessage}</Message>}
        <ButtonContainer>
          <SignUpButton type="submit" onClick={(e) => handleSubmit(e)}>
            회원 가입
          </SignUpButton>
          <LoginButton onClick={() => navigate("/users/login")}>
            로그인
          </LoginButton>
        </ButtonContainer>
      </LoginForm>
      <LoginBelowImg></LoginBelowImg>
    </JoinContentsCotainer>
  );
};

const JoinContentsCotainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 40px auto;
  padding: 40px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  background-color: white;
`;

const JoinInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const JoinButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
  width: 45%;
  font-weight: 700;
`;

const LoginButton = styled(JoinButton)`
  background-color: #007bff;
  font-weight: 700;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpButton = styled(JoinButton)`
  background-color: #28a745;
  font-weight: 700;

  &:hover {
    background-color: #218838;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CheckButton = styled(JoinButton)`
  width: 30%;
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const Message = styled.div`
  color: red;
  margin-bottom: 20px;
`;

export default JoinPage;
