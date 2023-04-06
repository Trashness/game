import styled from "styled-components";

const StyledTheme = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 100vw;
  height: 100vw;
  color: rgb(192, 194, 205);
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  background: radial-gradient(
      29.22% 92.35% at 103.22% 74.22%,
      rgba(8, 131, 99, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      31.63% 99.95% at -4.59% 74.44%,
      rgba(19, 93, 200, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgb(6, 9, 12);
`;

const Theme = ({ children }) => {
  return <StyledTheme>{children}</StyledTheme>;
};

export default Theme;
