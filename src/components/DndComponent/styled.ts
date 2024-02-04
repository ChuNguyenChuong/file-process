import { Avatar, Steps, Tooltip } from "antd";
import styled from "styled-components";

export const DndComponentWraper = styled.div`
  display: flex;
  gap: 16px;
`;

export const WraperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: rgba(252, 253, 255, 0.3);
  padding: 16px;
  height: 720px;
  max-height: 720px;
  overflow: auto;
  border-radius: 16px;

  &::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

export const LeftFilter = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  user-select: none;
  position: relative;
  background-color: white;
`;

export const RightFiles = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  user-select: none;
  position: relative;
  background-color: white;
`;

export const Item = styled.div`
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  user-select: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 100%;
`;

export const GroupName = styled.p`
  padding: 8px 12px;
  background-color: white;
  border-radius: 8px 8px 0px 0px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  display: flex;
  height: 36px;
`;

export const TooltipGroupName = styled(Tooltip)`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  p {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const GroupContent = styled.div`
  padding: 0px 16px;
  min-height: 50px;
`;


export const StepsCustomer = styled(Steps)`
  .ant-steps-item-title{
    width: 100%;
  }
`

export const IconItem = styled(Avatar)`
  padding: 2px;
`