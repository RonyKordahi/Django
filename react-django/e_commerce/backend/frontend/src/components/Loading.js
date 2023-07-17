import Spinner from 'react-bootstrap/Spinner';
import { styled } from "styled-components";

const Loading = () => {
    return (
        <StyledSpinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </StyledSpinner>
    )
}

const StyledSpinner = styled(Spinner)`
    height: 100px;
    width: 100px;
    display: block;
    margin: auto;
`

export default Loading