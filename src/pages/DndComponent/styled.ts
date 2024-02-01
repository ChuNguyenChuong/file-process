import { Tooltip } from "antd";
import styled from "styled-components";

export const DndComponentWraper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 50px;
`

export const WraperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const LeftFilter = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  user-select: none;
  position: relative;
  background-color: white;
  min-height: 48px;
`

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
`

export const Item = styled.div`
  cursor: pointer;
  border-radius: 4px;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  padding: 12px 16px;
  font-size: 12px;
  user-select: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`

export const GroupName = styled.p`
  position: absolute;
  top: -10px;
  left: 10px;
  padding: 8px 12px;
  background-color: white;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  max-width: calc(100% - 20px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
  display: flex;
`

export const TooltipGroupName = styled(Tooltip)`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  p{
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`