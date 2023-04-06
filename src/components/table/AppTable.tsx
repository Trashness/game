import styled from "styled-components";

const AppTable = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 0px;
`;

export default AppTable;
