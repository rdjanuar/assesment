import React, { useMemo, createContext, useCallback, useReducer } from "react";
import { createStandaloneToast } from "@chakra-ui/react";

export const ActionContext = createContext({
  updateModal: false,
  toggleUpdate: (data) => data,
  togglePost: () => {},
  toggleDelete: (data) => data,
  deleteModal: false,
  postModal: false,
  oneData: {},
});

export const ActionProvider = ({ children }) => {
  const { ToastContainer, toast } = createStandaloneToast();

  const [state, dispatch] = useReducer(
    (initState, action) => {
      switch (action.type) {
        case "TOGGLE_POST":
          return {
            ...initState,
            postModal: !initState.postModal,
          };
        case "TOGGLE_UPDATE":
          return {
            ...initState,
            updateModal: !initState.updateModal,
            oneData: action.payload,
          };
        case "TOGGLE_DELETE":
          return {
            ...initState,
            deleteModal: !initState.deleteModal,
            oneData: action.payload,
          };

        default:
          return initState;
      }
    },
    {
      postModal: false,
      updateModal: false,
      deleteModal: false,
      oneData: {},
    }
  );

  const togglePost = useCallback(() => {
    dispatch({ type: "TOGGLE_POST" });
  }, [dispatch]);

  const toggleUpdate = useCallback(
    (data) => {
      dispatch({ type: "TOGGLE_UPDATE", payload: data });
    },
    [dispatch]
  );

  const toggleDelete = useCallback(
    (data) => {
      dispatch({ type: "TOGGLE_DELETE", payload: data });
    },
    [dispatch]
  );

  const notify = useCallback(
    (status, title, position = "top-right") => {
      toast({
        title,
        status,
        position,
        variant: "subtle",
        duration: "2000",
        isClosable: true,
      });
    },
    [toast]
  );

  const value = useMemo(
    () => ({
      oneData: state.oneData,
      postModal: state.postModal,
      updateModal: state.updateModal,
      deleteModal: state.deleteModal,
      togglePost,
      toggleUpdate,
      toggleDelete,
      notify,
    }),
    [
      state.postModal,
      state.updateModal,
      state.deleteModal,
      state.oneData,
      togglePost,
      toggleUpdate,
      toggleDelete,
      notify,
    ]
  );

  return (
    <ActionContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ActionContext.Provider>
  );
};
