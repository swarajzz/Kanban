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
        className="group relative flex cursor-grab items-center gap-5 transition-all duration-200 active:cursor-grabbing"
      >
        <div className="border-radius h-3 w-3 rounded-full bg-accent-500"></div>
        <h3 className="text-sm font-bold uppercase">{columnName}</h3>

        <div className="bg-muted text-muted-foreground pointer-events-none absolute right-1 top-1 flex translate-y-[-4px] items-center gap-1 rounded px-1 text-xs opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          Drag me ↕
        </div>
      </div>
      {children}
    </>
  );
}

export default memo(Cols);
