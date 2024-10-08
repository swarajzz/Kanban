import { GripVertical } from "lucide-react";

export default function Board() {
  return (
    <div className="h-full bg-primary-600">
      <div className="flex gap-10 px-4 py-4">
        <div className="w-72">
          <div className="mb-4 flex items-center gap-3">
            <div className="border-radius bg-accent-500 h-3 w-3 rounded-full"></div>
            <h3 className="text-sm font-bold uppercase">Todo</h3>
          </div>
          <ul className="flex flex-col gap-5">
            <li className="flex min-h-24 items-center gap-2 rounded-lg bg-primary-500 p-3">
              <GripVertical />

              <div className="flex flex-col gap-1">
                <div className="font-bold text-white">
                  Web Development Roadmap
                </div>
                <div className="text-xs text-primary-300">2 of 2 subtasks</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
