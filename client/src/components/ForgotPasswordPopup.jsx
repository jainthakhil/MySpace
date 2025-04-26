import React,{useState} from 'react';
import styled from 'styled-components';
import { useFirebase } from '../context/Firebase';
import { usePopUpContext } from '../context/PopUpContext';


const ForgotPasswordPopup = () => {
    const firebase = useFirebase();
    const popupContext = usePopUpContext();
    const [email, setEmail] = useState('') 
   
    const handleChange = (e)=>{
        setEmail(e.target.value);
    }

    const handleCross = ()=>{
        console.log("cross clicked")
        popupContext.setShowForgotPassword(false);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // email?firebase.resetPassword(email):{alert("no email address provided") return};

      if(email){
        await firebase.resetPassword(email);
        console.log()
      }
      else {
        alert("No email address provided")
        return;
      }
      popupContext.setShowForgotPassword(false);
      
    }

  return (
    <StyledWrapper>
      <div className="relative form-container bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      <button onClick={handleCross} className='cursor-pointer absolute top-4 right-4'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" strokeWidth={0} fill="none" stroke="currentColor" className="cross-icon text-gray-800 dark:text-gray-100 " height={20} width={20}>
          <path fill="currentColor" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" clipRule="evenodd" fillRule="evenodd" />
        </svg>
        </button>
        <div className="logo-container text-black dark:text-gray-100">
          Forgot Password

        </div>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email" form='email'>Email</label>
            <input onChange={handleChange} type="text" id="email" name="email" value={email} placeholder="Enter your email" required  className='text-gray-800 dark:text-gray-100 border border-gray-700' />
          </div>
          <button onClick={handleSubmit} className="form-submit-btn bg-[#A78BFA] text-black dark-text-gray-100" type="submit">Send Email</button>
        </form>
        <p className="signup-link">
          Don't have an account?
          <a href="/signup" className="signup-link link text-[#A78BFA]"> Sign up now</a>
        </p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form-container {
    max-width: 400px;
    ${'' /* background-color: #fff; */}
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    ${'' /* color: #212121; */}
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .logo-container {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-container .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    font-family: inherit;
    border: 1px solid #ccc;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.8;
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #1778f2;
  }

  .form-container .form-submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    ${'' /* color: #fff; */}
    ${'' /* background-color: #212121; */}
    border: none;
    width: 100%;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin: 12px 0;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container .form-submit-btn:hover {
    ${'' /* background-color: #313131; */}
  }

  .form-container .link {
    ${'' /* color: #1778f2; */}
    text-decoration: none;
  }

  .form-container .signup-link {
    align-self: center;
    font-weight: 500;
  }

  .form-container .signup-link .link {
    font-weight: 400;
  }

  .form-container .link:hover {
    text-decoration: underline;
  }`;

export default ForgotPasswordPopup;
