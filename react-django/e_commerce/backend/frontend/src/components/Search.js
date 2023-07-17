import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Search = () => {

    const [userInput, setUserInput] = useState("")

    const navigate = useNavigate();
    const location = useLocation();

    const onSubmitHander = (e) => {
        e.preventDefault();

        if(userInput) {
            navigate(`/?query=${userInput}&page=1`);
        }
        else {
            navigate(location.pathname);
        }
    }

    return (
        <Form onSubmit={onSubmitHander}>
            <Form.Control
                className="mr-sm-2 ml-sm-5"
                type="text"
                name="query"
                onChange={e => setUserInput(e.target.value)}
                style={{"color": "black"}}
            />
            <Button className="p-2" type="submit" variant="outline-success">Search</Button>
        </Form>
    )
}

export default Search