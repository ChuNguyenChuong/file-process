import { For, block } from 'million/react';
import React, { useCallback, useRef } from 'react';
import { DndComponentWraper, GroupName, Item, LeftFilter, RightFiles, WraperContainer } from './styled';
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
  }, [])

  const handleOnDragStar = useCallback((item: IItem, position: EnumPosition, groupName: string) => () => {
    itemDragCurrentId.current = item.id
    itemDrag.current = {
      data: item,
      group: groupName,
      position
    }
  }, []);

  const handleOnDrop = useCallback(() => {
    console.log("🚀 ~ handleOnDrop ~ itemDrag:", itemDrag)
    console.log("🚀 ~ handleOnDrop ~ itemDragCurrentId:", itemDragCurrentId)
    console.log("🚀 ~ handleOnDrop ~ overTtemDragId:", overTtemDragId)
  }, [])



  const handleDragEnd = useCallback(() => {
    // console.log(itemDragCurrentId.current);
    // console.log(overTtemDragId.current);
    // console.log(itemDrag.current);
  }, [])



  return (
    <DndComponentWraper className={className}>
      <WraperContainer>
        <For each={left} memo>{(group) => {
          return <LeftFilter onDrop={handleOnDrop} onDragOver={handleOnDrangOver}>
            <GroupName>
              {group.name}
            </GroupName>
            <For each={group.list} memo>{(item) => {
              return <Item
                draggable
                onDragStart={handleOnDragStar(item, EnumPosition.LEFT, group.name)}
                onDragEnter={handleDragEnter(item)}
                onDragEnd={handleDragEnd}
              >
                {item.name}
              </Item>
            }}</For>
          </LeftFilter>
        }}</For>
      </WraperContainer>
      <WraperContainer>
        <For each={right} memo>{(group) => {
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
        }}</For>
      </WraperContainer>
    </DndComponentWraper>
  )
})

export default DndComponentBlock