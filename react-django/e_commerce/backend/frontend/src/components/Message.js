import Alert from 'react-bootstrap/Alert';

const Message = ({variant, children}) => {
    return (
        <Alert key={variant} variant={variant}>
            {children}
        </Alert>
    )
}

export default Message