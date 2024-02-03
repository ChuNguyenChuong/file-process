import { block } from "million/react";
import React, { useCallback, useRef } from "react";
import { EnumPosition } from "../../enums/common";
import { getLogoFile } from "../../helpers";
import { IItem, IItemDrag, IValue } from "../../types/common";
import {
  DndComponentWraper,
  GroupContent,
  GroupName,
  IconItem,
  Item,
  LeftFilter,
  StepsCustomer,
  TooltipGroupName,
  WraperContainer,
} from "./styled";


type Props = {
  className?: string;
  value: IValue;
  setValue: React.Dispatch<React.SetStateAction<IValue>>;
};

// event DragEvent : e: React.DragEvent<HTMLDivElement>

const DndComponentBlock = block(({ value, setValue, className }: Props) => {
  const { left, right } = value;
  const itemDrag = useRef<IItemDrag>({
    data: {
      id: "",
      name: "",
    },
    groupId: "",
    position: EnumPosition.RIGHT,
  });
  const overTtemDragId = useRef<string>("");
  // const isOverSameGroup = useRef<boolean>(true)

  const handleOnDrangOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback(
    (item: IItem) => () => {
      overTtemDragId.current = item.id;
    },
    []
  );

  const handleOnDragStar = useCallback(
    (item: IItem, position: EnumPosition, groupId: string) => () => {
      itemDrag.current = {
        data: item,
        groupId: groupId,
        position,
      };
    },
    []
  );

  const handleOnDrop = useCallback(
    (groupId: string, postion: EnumPosition) => () => {
      console.log("sdasd", overTtemDragId.current, groupId, postion);
      const positionInState = postion === EnumPosition.RIGHT ? "right" : "left";

      const removeItenInGroupDraged = () => {
        return value[itemDrag.current.position].map((group) => {
          if (group.id === itemDrag.current.groupId) {
            group.list = group.list.filter((item) => item.id !== itemDrag.current.data.id);
          }
          return group;
        });
      };

      const cloneOldValue = {
        ...value,
        [positionInState]: value[positionInState].map((group) => {
          if (group.id === groupId && groupId == itemDrag.current.groupId && overTtemDragId.current) {
            const cloneGroupList = [...group.list];

            const indexItemGrag = cloneGroupList.findIndex((item) => item.id === itemDrag.current.data.id);
            const indexItemOver = cloneGroupList.findIndex((item) => item.id === overTtemDragId.current);

            const temp = cloneGroupList[indexItemOver];

            cloneGroupList[indexItemOver] = itemDrag.current.data;
            cloneGroupList[indexItemGrag] = temp;
            group.list = cloneGroupList;
          } else if (group.id === groupId && overTtemDragId.current === "") {
            console.log("cây 2");
            group.list = [...group.list, itemDrag.current.data as IItem];

            value[itemDrag.current.position] = removeItenInGroupDraged();
          } else if (group.id === groupId && overTtemDragId.current !== "") {
            console.log("cây 3");

            const indexInGroup = group.list.findIndex(function (element) {
              return element.id === overTtemDragId.current;
            });
            const array1 = group.list.slice(0, indexInGroup);
            const array2 = group.list.slice(indexInGroup);
            array1.push(itemDrag.current.data as IItem);
            const newGroupList = array1.concat(array2);
            group.list = newGroupList;
            value[itemDrag.current.position] = removeItenInGroupDraged();
          }
          return group;
        }),
      };
      setValue(cloneOldValue);
    },
    [setValue, value]
  );

  const handleDragEnd = useCallback(() => {
    // console.log(overTtemDragId.current);
    // console.log(itemDrag.current);
  }, []);

  const handleOnDragLeave = useCallback(() => {
    overTtemDragId.current = "";
  }, []);

  return (
    <DndComponentWraper className={className}>
      <WraperContainer>
        {left.map((group) => {
          return (
            <LeftFilter
              onDrop={handleOnDrop(group.id, EnumPosition.LEFT)}
              onDragOver={handleOnDrangOver}
              key={group.id}
            >
              <GroupName>
                <TooltipGroupName title={group.name}>
                  {group.icon && <img src={group.icon} alt="" width={20} />}
                  <p>{group.name}</p>
                </TooltipGroupName>
              </GroupName>
              <GroupContent>
                <StepsCustomer direction="vertical" size="small" current={group.list.length}
                  className="title-full">
                  {group.list.map((item) => {
                    return (
                      <StepsCustomer.Step
                        icon={<IconItem draggable={false} src={getLogoFile(item.name)} />}
                        title={
                          <Item
                            key={item.id}
                            draggable
                            onDragStart={handleOnDragStar(item, EnumPosition.LEFT, group.id)}
                            onDragEnter={handleDragEnter(item)}
                            onDragEnd={handleDragEnd}
                            onDragLeave={handleOnDragLeave}
                          >
                            {item.name}
                          </Item>
                        }
                      ></StepsCustomer.Step>
                    );
                  })}
                </StepsCustomer>
              </GroupContent>
            </LeftFilter>
          );
        })}
      </WraperContainer>
      <WraperContainer>
        {right.map((group) => {
          return (
            <LeftFilter
              onDrop={handleOnDrop(group.id, EnumPosition.RIGHT)}
              onDragOver={handleOnDrangOver}
              key={group.id}
            >
              <GroupName>
                <TooltipGroupName title={group.name}>
                  {group.icon && <img src={group.icon} alt="" width={20} />}
                  <p>{group.name}</p>
                </TooltipGroupName>
              </GroupName>
              <GroupContent>
                <StepsCustomer direction="vertical" size="small" current={group.list.length} className="title-full">
                  {group.list.map((item) => {
                    return (
                      <StepsCustomer.Step
                        icon={<IconItem draggable={false} src={getLogoFile(item.name)} className="p-2"/>}
                        title={
                          <Item
                            key={item.id}
                            draggable
                            onDragStart={handleOnDragStar(item, EnumPosition.RIGHT, group.id)}
                            onDragEnter={handleDragEnter(item)}
                            onDragEnd={handleDragEnd}
                            onDragLeave={handleOnDragLeave}
                          >
                            {item.name}
                          </Item>
                        }
                      ></StepsCustomer.Step>
                    );
                  })}
                </StepsCustomer>
              </GroupContent>
            </LeftFilter>
          );
        })}
      </WraperContainer>
    </DndComponentWraper>
  );
});

export default DndComponentBlock;
