import { Tooltip } from 'antd';
import { block } from 'million/react';
import React, { useCallback, useRef } from 'react';
import { EnumPosition } from '../../enums/common';
import { IItem, IItemDrag, IValue } from '../../types/common';
import { DndComponentWraper, GroupName, Item, LeftFilter, TooltipGroupName, WraperContainer } from './styled';

type Props = {
  className?: string,
  value: IValue,
  setValue: React.Dispatch<React.SetStateAction<IValue>>
}

// event DragEvent : e: React.DragEvent<HTMLDivElement>

const DndComponentBlock = block(({ value, setValue, className }: Props) => {
  const { left, right } = value;
  const itemDrag = useRef<IItemDrag>({
    data: {
      id: "",
      name: ""
    },
    group: "",
    position: EnumPosition.RIGHT
  })
  const overTtemDragId = useRef<string>("")

  const handleOnDrangOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleDragEnter = useCallback((item: IItem) => () => {
    overTtemDragId.current = item.id
  }, [])

  const handleOnDragStar = useCallback((item: IItem, position: EnumPosition, groupName: string) => () => {
    itemDrag.current = {
      data: item,
      group: groupName,
      position
    }
  }, []);

  const handleOnDrop = useCallback((groupId: string, postion: EnumPosition) => () => {
    const positionInState = postion === EnumPosition.RIGHT ? "right" : "left";
    const cloneOldValue = {
      ...value, [positionInState]: value[positionInState].map(group => {
        if (group.name === groupId && overTtemDragId.current === "") {
          group.list = [...group.list, (itemDrag.current.data as IItem)]
        }
        else if (group.name === groupId && overTtemDragId.current !== "") {
          const indexInGroup = group.list.findIndex(function (element) {
            return element.id === overTtemDragId.current
          });
          const array1 = group.list.slice(0, indexInGroup)
          const array2 = group.list.slice(indexInGroup)
          array1.push(itemDrag.current.data as IItem)
          const newGroupList = array1.concat(array2)
          group.list = newGroupList

        }
        return group
      }),
    }
    cloneOldValue[itemDrag.current.position] = cloneOldValue[itemDrag.current.position].map(group => {
      if (group.name === itemDrag.current.group) {
        group.list = group.list.filter(item => item.id !== itemDrag.current.data.id)
      }
      return group
    });
    setValue(cloneOldValue);
  }, [setValue, value])

  const handleDragEnd = useCallback(() => {
    // console.log(overTtemDragId.current);
    // console.log(itemDrag.current);
  }, [])

  const handleOnDragLeave = useCallback(() => {
    overTtemDragId.current = ""
  }, [])

  return (
    <DndComponentWraper className={className}>
      <WraperContainer>
        {left.map(group => {
          return <LeftFilter onDrop={handleOnDrop(group.name, EnumPosition.LEFT)} onDragOver={handleOnDrangOver} key={group.name}>
            <GroupName>
              <TooltipGroupName title={group.name}>
                {group.icon && <img src={group.icon} alt="" width={20} />}
                <p>
                  {group.name}
                </p>
              </TooltipGroupName>
            </GroupName>
            {
              group.list.map(item => {
                return <Item
                  key={item.id}
                  draggable
                  onDragStart={handleOnDragStar(item, EnumPosition.LEFT, group.name)}
                  onDragEnter={handleDragEnter(item)}
                  onDragEnd={handleDragEnd}
                  onDragLeave={handleOnDragLeave}
                >
                  {item.name}
                </Item>
              })
            }
          </LeftFilter>
        })}
      </WraperContainer>
      <WraperContainer>
        {right.map(group => {
          return <LeftFilter onDrop={handleOnDrop(group.name, EnumPosition.RIGHT)} onDragOver={handleOnDrangOver} key={group.name}>
            <GroupName>
              <Tooltip title={group.name}>
                {group.name}
              </Tooltip>
            </GroupName>
            {
              group.list.map(item => {
                return <Item
                  key={item.id}
                  draggable
                  onDragStart={handleOnDragStar(item, EnumPosition.RIGHT, group.name)}
                  onDragEnter={handleDragEnter(item)}
                  onDragEnd={handleDragEnd}
                  onDragLeave={handleOnDragLeave}
                >
                  {item.name}
                </Item>
              })
            }
          </LeftFilter>
        })}
      </WraperContainer>
    </DndComponentWraper>
  )
})

export default DndComponentBlock