import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { memo, ReactNode } from "react";

interface ColsProps {
  dndAttributes: DraggableAttributes;
  dndListeners: SyntheticListenerMap | undefined;
  columnName: string;
  children: ReactNode;
}

function Cols({
  dndAttributes,
  dndListeners,
  columnName,
  children,
}: ColsProps) {
  return (
    <>
      <div
        {...dndAttributes}
        {...dndListeners}
        className="flex items-center gap-5 self-start"
      >
        <div className="border-radius h-3 w-3 rounded-full bg-accent-500"></div>
        <h3 className="text-sm font-bold uppercase">{columnName}</h3>
      </div>
      {children}
    </>
  );
}

export default memo(Cols);
