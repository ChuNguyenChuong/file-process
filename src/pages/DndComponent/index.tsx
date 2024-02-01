import { block } from 'million/react';
import React, { useCallback, useRef } from 'react';
import { DndComponentWraper, GroupName, Item, LeftFilter, WraperContainer } from './styled';
import { EnumPosition, IItem, IItemDrag, IValue } from './types';

type Props = {
  className?: string,
  value: IValue,
  setValue: React.Dispatch<React.SetStateAction<IValue>>
}

// event DragEvent : e: React.DragEvent<HTMLDivElement>

const DndComponentBlock = block(({ value, className }: Props) => {
  const { left, right } = value;
  const itemDrag = useRef<IItemDrag>()
  const itemDragCurrentId = useRef<string>("")
  const overTtemDragId = useRef<string>("")

  const handleOnDrangOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleDragEnter = useCallback((item: IItem) => () => {
    overTtemDragId.current = item.id
    console.log("handleDragEnter", item);

  }, [])

  const handleOnDragStar = useCallback((item: IItem, position: EnumPosition, groupName: string) => () => {
    itemDragCurrentId.current = item.id
    itemDrag.current = {
      data: item,
      group: groupName,
      position
    }
  }, []);

  const handleOnDrop = useCallback((groupId: string, postion: EnumPosition) => () => {
    console.log(groupId, postion);

    // setValue(old => {
    //   const positionInState = postion === EnumPosition.RIGHT ? "right" : "left"
    //   const cloneOldValue = {
    //     ...old, [positionInState]: old[positionInState].map(group => {
    //       if (group.name === groupId && overTtemDragId.current === "") {
    //         group.list = [...group.list, (itemDrag.current?.data as IItem)]
    //       }
    //       return group
    //     })
    //   }

    //   return cloneOldValue
    // })


    console.log("🚀 ~ handleOnDrop ~ itemDrag:", itemDrag)
    console.log("🚀 ~ handleOnDrop ~ itemDragCurrentId:", itemDragCurrentId)
    console.log("🚀 ~ handleOnDrop ~ overTtemDragId:", overTtemDragId)
  }, [])



  const handleDragEnd = useCallback(() => {
    // console.log(itemDragCurrentId.current);
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
          return <LeftFilter onDrop={handleOnDrop(group.name, EnumPosition.LEFT)} onDragOver={handleOnDrangOver}>
            <GroupName>
              {group.name}
            </GroupName>
            {
              group.list.map(item => {
                return <Item
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
          return <LeftFilter onDrop={handleOnDrop(group.name, EnumPosition.RIGHT)} onDragOver={handleOnDrangOver}>
            <GroupName>
              {group.name}
            </GroupName>
            {
              group.list.map(item => {
                return <Item
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
        {/* <For each={right} memo>{(group) => {
          return <RightFiles onDrop={handleOnDrop} onDragOver={handleOnDrangOver}>
            <GroupName>
              {group.name}
            </GroupName>
            <For each={group.list} memo>{(item) => {
              return <Item
                draggable
                onDragStart={handleOnDragStar(item, EnumPosition.RIGHT, group.name)}
                onDragEnter={handleDragEnter(item)}
                onDragEnd={handleDragEnd}
              >
                {item.name}
              </Item>
            }}</For>
          </RightFiles>
        }}</For> */}
      </WraperContainer>
    </DndComponentWraper>
  )
})

export default DndComponentBlock