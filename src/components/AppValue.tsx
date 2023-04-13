import styled from 'styled-components'

const Div = styled.div`
    border-radius: 2px;
    color: rgb(192, 194, 205);
    font-size: 16px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out 0s;
`;

const AppValue = ({ children }) => {
    return <Div>{ children }</Div>
}

export default AppValue

