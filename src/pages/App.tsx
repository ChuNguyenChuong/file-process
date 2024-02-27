import { block } from "million/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const ItemMenu = styled.div`
  width: 156px;
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: gray;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppBlock = block(() => {
  return (
    <Wrapper>
      <ItemMenu>
        <LinkItem to={"/upload-file"}>Upload files</LinkItem>
      </ItemMenu>
    </Wrapper>
  );
});

export default AppBlock;
