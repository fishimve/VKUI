import * as React from "react";
import { Icon16Cancel } from "@vkontakte/icons";
import { getTitleFromChildren, hasReactNode, noop } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Tappable } from "../Tappable/Tappable";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import "./Chip.css";

type ChipValue = string | number;

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  value: ChipValue;
  option?: { value?: ChipValue };
  onRemove?: (event?: React.MouseEvent, value?: ChipValue) => void;
  removable?: boolean;
  removeAriaLabel?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

/**
 * @see https://vkcom.github.io/VKUI/#/Chip
 */
export const Chip = ({
  value = "",
  option,
  removable = true,
  onRemove = noop,
  removeAriaLabel = "Удалить",
  before = null,
  after,
  children,
  ...restProps
}: ChipProps) => {
  const { sizeY } = useAdaptivity();
  const onRemoveWrapper = React.useCallback(
    (event: React.MouseEvent) => {
      onRemove(event, value);
    },
    [onRemove, value]
  );
  const title = getTitleFromChildren(children);

  return (
    <div
      vkuiClass={classNames(
        "Chip",
        getSizeYClassName("Chip", sizeY),
        removable && "Chip--removable"
      )}
      role="option"
      aria-label={title}
      {...restProps}
    >
      <div vkuiClass="Chip__in" role="presentation">
        {hasReactNode(before) && <div vkuiClass="Chip__before">{before}</div>}
        <Footnote vkuiClass="Chip__content" title={title} aria-hidden="true">
          {children}
        </Footnote>
        {hasReactNode(after) && <div vkuiClass="Chip__after">{after}</div>}

        {removable && (
          <Tappable
            Component="button"
            vkuiClass="Chip__remove"
            onClick={onRemoveWrapper}
            hasHover={false}
            hasActive={false}
            aria-label={`${removeAriaLabel} ${title}`}
          >
            <Icon16Cancel aria-hidden={true} />
          </Tappable>
        )}
      </div>
    </div>
  );
};
