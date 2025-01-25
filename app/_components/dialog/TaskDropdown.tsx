import { deleteTask } from "@/app/_lib/actions";

function TaskDropdown({
  toggleShowDropdown,
  toggleDialog,
  toggleEditDialog,
  taskId,
}: {
  toggleShowDropdown: () => void;
  toggleDialog: () => void;
  toggleEditDialog: () => void;
  taskId: string;
}) {
  function handleClick() {
    toggleShowDropdown();
    toggleDialog();
    toggleEditDialog();
  }

  return (
    <>
      <ul className="absolute -right-12 top-16 flex w-48 flex-col gap-4 rounded-lg bg-main_bkg px-4 py-6 text-primary-300 shadow-sm">
        <li
          className="cursor-pointer transition hover:text-accent-200"
          onClick={handleClick}
        >
          Edit Task
        </li>
        <li
          className="cursor-pointer text-accent-400 transition hover:text-accent-300"
          onClick={() => deleteTask(taskId)}
        >
          Delete Task
        </li>
      </ul>
    </>
  );
}

export default TaskDropdown;
