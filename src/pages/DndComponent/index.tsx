import { block } from 'million/react';
import React, { useCallback, useRef } from 'react';
import { DndComponentWraper, GroupName, Item, LeftFilter, TooltipGroupName, WraperContainer } from './styled';
import { EnumPosition, IItem, IItemDrag, IValue } from './types';
import { Tooltip } from 'antd';

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
    console.log("handleDragEnter", item);

  }, [])

  const handleOnDragStar = useCallback((item: IItem, position: EnumPosition, groupName: string) => () => {
    itemDrag.current = {
      data: item,
      group: groupName,
      position
    }
  }, []);

  const handleOnDrop = useCallback((groupId: string, postion: EnumPosition) => () => {
    console.log(groupId, postion);
    console.log(overTtemDragId.current);
    console.log(itemDrag.current);
    const positionInState = postion === EnumPosition.RIGHT ? "right" : "left";
    // const positionInState = postion === EnumPosition.RIGHT ? "right" : "left";

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
    })

    setValue(cloneOldValue)

    // if (!isDragInSameGroup) {

    // }
    // else {

    // }

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