import React from 'react';
import styled from 'styled-components';

const DeleteLoadingCard = () => {
    return (
        <StyledWrapper>
          <div className="card">
            <div className="card__content">
            </div></div>
        </StyledWrapper>
      );
}

const StyledWrapper = styled.div`
  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    padding: 5px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  }

  .card__content {
    background: rgb(5, 6, 45);
    border-radius: 17px;
    width: 100%;
    height: 100%;
  }`;
  
export default DeleteLoadingCard;
