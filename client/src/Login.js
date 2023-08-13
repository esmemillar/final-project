import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({userId}) => {

    // const [userInfo, setUserInfo] = useState({});
    const [login, setLogin] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        // Look if the new key value is empty
        if (value.length === 0){
            // remove empty keys from userInfo
            let login = {...login};
            delete login[key]
            setLogin({
                ...login
            })
        } else {
            // set new key value
            setLogin({
                ...login,
                [key]: value
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataBody = {...login};

    };
        return (
            <Wrapper>
                <div>
                <Container>
                    <StyledForm onSubmit={(e) => handleSubmit(e)}>
                        <TitleLabel>Login</TitleLabel>
    
                            <Input 
                                type="email" 
                                placeholder="Email"
                                name="email"
                                required={true}
                                onChange={handleChange} 
                            />
                                 <Input 
                                type="password" 
                                placeholder="Password"
                                name={"password"}
                                required={true}
                                onChange={handleChange} 
                            />
                
                        <ButtonContainer>
                            <Submit type="submit" disabled={Object.keys(login).length < 4}>Login</Submit>
                        </ButtonContainer>
                    </StyledForm>
                    {errorMessage.length > 0 &&
                        <ErrorContainer>
                            <ErrorMessage>Error: {errorMessage}</ErrorMessage>
                        </ErrorContainer>
                    }
                </Container>
                </div>

            </Wrapper>
        )
    };

const Wrapper = styled.div`
display: flex-wrap;
justify-content: center;
margin: auto;
width: 80vw;
gap: 50px;
flex-wrap: wrap;
`

const Container = styled.div`
display: flex;

justify-content: center;
align-items: center;
margin: auto;
width: 45vw;
background: white;
padding: 50px 0 20px 0;
box-shadow: 0px 0px 5px 1px lightgrey;
`

const Input = styled.input`
width: auto;
height: 25px;
display: flex;
`

const Submit = styled.button`
width: 100%;
margin: 10px 0;
background-color: darkblue;
color: white;
border: none;
cursor: pointer;

&:hover{
    background-color: lightblue;
    color: inherit;
}

&:disabled{
    background-color: darkgrey;
    border: none;
    color: white;
    cursor: default;
}
`

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const StyledForm = styled.form`
display: flex;
gap: 20px;
flex-direction: column;
margin: 0;
width: 80%;
height: auto;
`

const TitleLabel = styled.label`
font-size: 1.3em;
font-weight: bold;
`


const ErrorContainer = styled.div`
display: flex;
border: 2px solid darkred;
width: 80%;
margin-top: 10px;
margin-bottom: 0;
height: 50px;
`

const ErrorMessage = styled.p`
padding-left: 10px;
color: darkred;
`


export default Login;