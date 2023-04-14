import styled from "styled-components";

const AppTableCol = styled.div<{ width?: string }>`
  display: flex;
  padding: 10px;
  -webkit-box-pack: space-around;
  -webkit-justify-content: space-around;
  -ms-flex-pack: space-around;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default AppTableCol;
