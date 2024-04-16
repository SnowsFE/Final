import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyComments = () => {
  const [myBoards, setMyBoards] = useState([]);
  const sampleComments = [
    {
      title: "제목 11111111111111111111111111111111111111",
      commentNum: "12",
      writeDt: "2024.01.01",
      boardId: "0",
    },
    {
      title: "제목 2222222222222222222222222222222222222",
      commentNum: "13",
      writeDt: "2024.01.01",
      boardId: "1",
    },
  ];
  const navigator = useNavigate();

  //제목 길이를 조정하는 함수
  const titleCheck = (boards) => {
    boards.forEach((board) => {
      let sliceTitle = truncateString(board.title, 15);
      console.log("길이 조정" + sliceTitle);
      board.title = sliceTitle;
    });
  };
  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num - 3) + "...";
    } else {
      return str;
    }
  }
  titleCheck(sampleComments);

  // 조회 클릭시 해당 게시판으로 이동
  const inquery = (boardId) => {
    navigator(`/boards/${boardId}`);
  };

  // 삭제 클릭시 해당 게시판 삭제
  const deleteBoard = async (boardId) => {
    const res = await axios.delete(`/boards/${boardId}`);
    console.log("데이터 삭제: " + res.data);
    navigator("/MyPage");
  };

  return (
    <MyBoardsContainer>
      <table>
        <caption>내가 작성한 댓글</caption>
        <thead>
          <tr>
            <th>게시판</th>
            <th>작성 댓글수</th>
            <th>작성일자</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {sampleComments.map((board, index) => {
            return (
              <tr>
                <td>{board.title}</td>
                <td>{board.commentNum}</td>
                <td>{board.writeDt}</td>
                <td>
                  <button class="view" onClick={() => inquery(board.boardId)}>
                    조회
                  </button>
                  <button
                    class="delete"
                    onClick={() => deleteBoard(board.boardId)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <td colspan="5" class="tablefoot"></td>
        </tfoot>
      </table>
    </MyBoardsContainer>
  );
};

const MyBoardsContainer = styled.div`
  table {
    width: 700px;
    text-align: center;
    border: 1px solid #fff;
    border-spacing: 1px;
    font-family: "Cairo", sans-serif;
    margin: auto;
  }

  caption {
    font-weight: bold;
    text-align: left;
    margin-bottom: 18px;
  }

  table td {
    padding: 10px;
    background-color: #fff;
  }

  table th {
    background-color: #333;
    color: #fff;
    padding: 10px;
  }

  img {
    width: 90px;
    height: 90px;
  }

  .view,
  .delete {
    border: none;
    padding: 5px 10px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }

  .view:hover,
  .delete:hover {
    background-color: #333; /* hover 시 배경색 변경 */
  }

  .view {
    background-color: #03a9f4;
  }

  .delete {
    background-color: #e91e63;
  }

  .tablefoot {
    padding: 0;
    border-bottom: 3px solid #333;
  }
`;

export default MyComments;
