import styled from "styled-components"
import Dragger from "antd/es/upload/Dragger";

export const WrapperUploadFile = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 100px;
  background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/1fbf4b536c3dd6efa1dc317fb2e6c2ca/photo-1696595883516-76c97aa3a164.jpg");
  color: white;
`

export const DraggerStyled = styled(Dragger)`
  height: 185px;
  span,p{
    color:white !important
  }
`