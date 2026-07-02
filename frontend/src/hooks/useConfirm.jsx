import { useState, useCallback } from "react";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";

export default function useConfirm() {
  const [state, setState] = useState({ open: false, title: "", message: "", resolve: null });

  const confirm = useCallback((message, title = "Confirm") => {
    return new Promise((resolve) => {
      setState({ open: true, title, message, resolve });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve(true);
    setState({ open: false, title: "", message: "", resolve: null });
  }, [state]);

  const handleCancel = useCallback(() => {
    state.resolve(false);
    setState({ open: false, title: "", message: "", resolve: null });
  }, [state]);

  const ConfirmDialogComponent = (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      message={state.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, ConfirmDialog: ConfirmDialogComponent };
}
