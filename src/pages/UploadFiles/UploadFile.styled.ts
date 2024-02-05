import styled from "styled-components"
import Dragger from "antd/es/upload/Dragger";
import { Avatar } from "antd";

export const WrapperUploadFile = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: #dedcd4;
  padding: 50px 0px;
  background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/1fbf4b536c3dd6efa1dc317fb2e6c2ca/photo-1696595883516-76c97aa3a164.jpg");
  color: white;
  min-height: 100vh;

`

export const DraggerStyled = styled(Dragger)`
  height: 185px;
  span,p{
    color:white !important
  }
`

export const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; 
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 4px;
  user-select: none;
  padding: 4px 8px;
  color: white;
    margin-top: 10px;
    background-color: rgba(255,255,255, 0.3);
    width: 100%;
`
export const IconItem = styled(Avatar)`
  padding: 2px;
`

export const Item = styled.div`
  font-size: 16px;
  width: 100%;
`;

export const FileList = styled.div`
  min-width: 690px;
`