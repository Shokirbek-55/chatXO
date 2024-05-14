import styled from 'styled-components';
import Colors from '../../../utils/colors';

const Input = styled.input`
    border: none;
    border-bottom: 2px solid ${Colors.Green};
    font-size: 18px;
    display: flex;
    height: 50px;
    outline: none;
    padding: 0px;
`;

const Space = styled.div`
    width: 20px;
`;

// const Text = styled.p`
//   text-align: center;
//   font-size: 16px;
//   color: ${Colors.};
// `;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const OtpVerifyStyles = {
    Input,
    Space,
    FormBox,
    //   Text,
};
