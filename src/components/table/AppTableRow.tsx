import styled from "styled-components";

const AppTableRow = styled.div<{ width?: string }>`
  display: flex;
  flex-flow: row nowrap;
  
  justify-content: space-around;
  width: 100%;
`;

export default AppTableRow;
