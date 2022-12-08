import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { http } from "@/lib/services/https";
import { helper } from "@/utils";
import { ActionContext } from "@/context/Action";

export const useAuths = () => {
  const { notify } = useContext(ActionContext);
  const navigate = useNavigate();

  const { mutate: mutationRegister, isLoading: isLoadingRegister } =
    useMutation(
      (data) =>
        http(
          {
            method: "POST",
            data,
          },
          "users"
        ),
      {
        onSuccess: () => {
          notify("success", "Register Success");
          navigate("/");
        },
      }
    );

  const { mutate: mutationLogin, isLoading: isLoadingLogin } = useMutation(
    (data) =>
      http(
        {
          method: "POST",
          data,
        },
        "users/login"
      ),
    {
      onSuccess: (data) => {
        if (!data) return;

        helper.setLocalStorage("user", JSON.stringify(data));
        navigate("/dashboard");
      },
      onError: ({ response: { data } }) => {
        notify("error", data.error);
      },
    }
  );

  return {
    mutationLogin,
    isLoadingLogin,
    isLoadingRegister,
    mutationRegister,
  };
};
