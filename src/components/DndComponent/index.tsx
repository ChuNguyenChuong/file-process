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
  RightFiles,
  TooltipGroupName,
  WraperContainer,
  WraperContainerRight,
  WrapperItem,
} from "./styled";
import { message } from "antd";

const DEFAULT_ITEM_DRAG: IItemDrag = {
  data: {
    id: "",
    name: "",
  },
  groupId: "",
  position: EnumPosition.RIGHT,
}


type Props = {
  className?: string;
  value: IValue;
  setValue: React.Dispatch<React.SetStateAction<IValue>>;
  disableDrag?: boolean
};

// event DragEvent : e: React.DragEvent<HTMLDivElement>

const DndComponentBlock = block(({ value, setValue, className, disableDrag }: Props) => {
  const { left, right } = value;
  const itemDrag = useRef<IItemDrag>(DEFAULT_ITEM_DRAG);
  const overTtemDrag = useRef<IItemDrag>(DEFAULT_ITEM_DRAG);

  const handleOnDrangOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback(
    (item: IItem, groupId: string, position: EnumPosition) => () => {
      overTtemDrag.current = {
        data: item,
        groupId,
        position
      };
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


  const checkValid = useCallback((item: IItemDrag, includesString: string[], type: string[],) => {
    const nameFile = item.data.name;
    const nameSplit = nameFile.split(".")
    const typeFile = nameSplit[nameSplit.length - 1];
    if (type.length === 0 && includesString.length === 0) {
      return true
    }
    if (type.length !== 0 && !type.includes(typeFile)) {
      return false
    }
    if (type.length !== 0 && type.includes(typeFile) && includesString.length === 0) {
      return true
    }

    let result = true
    for (let i = 0; i < includesString.length; i++) {
      const item = includesString[i]
      if (!nameFile.includes(item)) {
        result = false
        break
      }
    }
    return result
  }, [])

  const switchFileCheck = useCallback((groupId: string) => {
    switch (groupId) {
      case "all":
        return true
      case "docFiles":
        return checkValid(itemDrag.current, ['Ueberm', "BSW"], ["doc", "docx"])
      case "xlsxFiles":
        return checkValid(itemDrag.current, [], ["xlsx"])
      case "bmsFiles":
        return checkValid(itemDrag.current, ["-BSW-"], [])
      case "ansKorrFiles":
        return checkValid(itemDrag.current, ["-neue-ANS-", "-korr"], [])
      case "ansReinFiles":
        return checkValid(itemDrag.current, ["-neue-ANS-", "-rein"], [])
      case "besKorrFiles":
        return checkValid(itemDrag.current, ["-neue-BES-", "-korr"], [])
      case "besReinFiles":
        return checkValid(itemDrag.current, ["-neue-BES-", "-rein"], [])
      case "optionale":
        return checkValid(itemDrag.current, [], [])
      case "rechnungPdf":
        return checkValid(itemDrag.current, ["Rechnung"], ["pdf"])
      default:
        return false
    }
  }, [checkValid])

  const handleDislayMessage = (groupId: string) => {
    switch (groupId) {
      case "docFiles":
        return message.error(`File contains "Ueberm" AND "BSW" AND file is.doc(x)!`)
      case "xlsxFiles":
        return message.error(`File require .xlsx!`)
      case "bmsFiles":
        return message.error(`File contains "-BSW-" !`)
      case "ansKorrFiles":
        return message.error(`File contains "-neue-ANS-" AND "-korr" !`)
      case "ansReinFiles":
        return message.error(`File contains "-neue-ANS-" AND "-rein" !`)
      case "besKorrFiles":
        return message.error(`File contains "-neue-BES-" AND "-korr" !`)
      case "besReinFiles":
        return message.error(`File contains "-neue-BES-" AND "-rein" !`)
      case "rechnungPdf":
        return message.error(`File contains "Rechnung" AND file is .pdf !`)
      default:
        return message.error(`File invalid!`)
    }
  }


  const handleOnDrop = useCallback(
    (groupId: string, postion: EnumPosition) => () => {
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
          if (group.id === groupId && groupId == itemDrag.current.groupId && overTtemDrag.current.data.id) {
            const cloneGroupList = [...group.list];
            const indexItemGrag = cloneGroupList.findIndex((item) => item.id === itemDrag.current.data.id);
            const indexItemOver = cloneGroupList.findIndex((item) => item.id === overTtemDrag.current.data.id);
            const temp = cloneGroupList[indexItemOver];
            cloneGroupList[indexItemOver] = itemDrag.current.data;
            cloneGroupList[indexItemGrag] = temp;
            group.list = cloneGroupList;
          } else if (group.id === groupId && overTtemDrag.current.data.id === "") {
            const cloneGroupList = [...group.list]
            if (groupId === itemDrag.current.groupId) {
              if (itemDrag.current.groupId === groupId) {
                const indexItemGrag = cloneGroupList.findIndex((item) => item.id === itemDrag.current.data.id);
                const indexItemOver = cloneGroupList.findIndex((item) => item.id === overTtemDrag.current.data.id);
                const temp = cloneGroupList[indexItemOver];
                cloneGroupList[indexItemOver] = itemDrag.current.data;
                cloneGroupList[indexItemGrag] = temp;
                group.list = cloneGroupList;
              } else {
                group.list = cloneGroupList
              }
            } else {
              group.list = [...cloneGroupList, itemDrag.current.data as IItem];
              value[itemDrag.current.position] = removeItenInGroupDraged();
            }
          } else if (group.id === groupId && overTtemDrag.current.data.id !== "") {
            const isValid = switchFileCheck(groupId)
            if (isValid) {
              const indexInGroup = group.list.findIndex(function (element) {
                return element.id === overTtemDrag.current.data.id;
              });
              const array1 = group.list.slice(0, indexInGroup);
              const array2 = group.list.slice(indexInGroup);
              array1.push(itemDrag.current.data as IItem);
              const newGroupList = array1.concat(array2);
              group.list = newGroupList;
              value[itemDrag.current.position] = removeItenInGroupDraged();
            } else {
              handleDislayMessage(groupId)
            }
          }
          return group;
        }),
      };
      setValue(cloneOldValue);
    },
    [setValue, switchFileCheck, value]
  );

  const handleDragEnd = useCallback(() => {
    // overTtemDrag.current = DEFAULT_ITEM_DRAG;
    // itemDrag.current = DEFAULT_ITEM_DRAG;
  }, []);




  return (
    <DndComponentWraper className={className}>
      <WraperContainer>
        {left.map((group) => {
          return (
            <LeftFilter
              onDrop={handleOnDrop(group.id, EnumPosition.LEFT)}
              onDragOver={handleOnDrangOver}
              onDragEnd={handleDragEnd}
              key={group.id}
            >
              <GroupName>
                <TooltipGroupName title={group.name}>
                  {group.icon && <img src={group.icon} alt="" width={20} />}
                  <p>{group.name}</p>
                </TooltipGroupName>
              </GroupName>
              <GroupContent>
                {group.list.map((item) => {
                  return <WrapperItem
                    key={item.id}
                    draggable={!disableDrag}
                    onDragStart={handleOnDragStar(item, EnumPosition.LEFT, group.id)}
                    onDragEnter={handleDragEnter(item, group.id, EnumPosition.LEFT)}
                    onDragEnd={handleDragEnd}
                  >
                    <IconItem draggable={false} src={getLogoFile(item.name)} className="p-2" />
                    <Item>
                      {item.name}
                    </Item>
                  </WrapperItem>
                })}
              </GroupContent>

            </LeftFilter>
          );
        })}
      </WraperContainer>
      <WraperContainerRight>
        <WraperContainer className="scroll">
          {right.map((group) => {
            return (
              <RightFiles
                onDrop={handleOnDrop(group.id, EnumPosition.RIGHT)}
                onDragOver={handleOnDrangOver}
                onDragEnd={handleDragEnd}
                key={group.id}
              >
                <GroupName>
                  <TooltipGroupName title={group.name}>
                    {group.icon && <img src={group.icon} alt="" width={20} />}
                    <p>{group.name}</p>
                  </TooltipGroupName>
                </GroupName>
                <GroupContent>
                  {group.list.map((item) => {
                    return <WrapperItem
                      key={item.id}
                      draggable={!disableDrag}
                      onDragStart={handleOnDragStar(item, EnumPosition.RIGHT, group.id)}
                      onDragEnter={handleDragEnter(item, group.id, EnumPosition.RIGHT)}
                      onDragEnd={handleDragEnd}
                    >
                      <IconItem draggable={false} src={getLogoFile(item.name)} className="p-2" />
                      <Item>
                        {item.name}
                      </Item>
                    </WrapperItem>
                  })}
                </GroupContent>

              </RightFiles>
            );
          })}
        </WraperContainer>
      </WraperContainerRight>
    </DndComponentWraper>
  );
});

export default DndComponentBlock;
