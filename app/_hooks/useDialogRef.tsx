import { memo, useCallback, useRef } from "react";

function useDialogRef() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = useCallback(() => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }, []);

  return { dialogRef, toggleDialog };
}

export default useDialogRef;