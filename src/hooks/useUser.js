import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { helper } from "@/utils";
import { http } from "@/lib/services/https";
import { useContext, useState } from "react";
import { ActionContext } from "@/context/Action";

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { notify } = useContext(ActionContext);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isSuccess } = useQuery(
    ["user", "detail", helper.getLocalStorage("user").id],
    () =>
      http(
        {
          method: "GET",
        },
        `users/${helper.getLocalStorage("user").id}`
      ),
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
  );

  const { mutate: updateUser } = useMutation(
    (data) =>
      http(
        {
          method: "PUT",
          data,
        },
        `users/${helper.getLocalStorage("user").id}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "user",
          "detail",
          helper.getLocalStorage("user").id,
        ]);
        notify("success", "Berhasil Mengubah Data");
      },
    }
  );

  const { mutate: updateUserPassword } = useMutation((data) =>
    http(
      {
        method: "PUT",
        data,
      },
      `users/${helper.getLocalStorage("user").id}/password`
    )
  );

  const handlerSubmit = async (data) => {
    try {
      setLoading(true);
      const { firstName, lastName, email, ...rest } = data;

      const handlerUser = updateUser({
        firstName,
        lastName,
        email,
      });

      if (data.oldPassword === "") {
        await Promise.resolve(handlerUser);
      } else {
        await Promise.all([
          handlerUser,
          updateUserPassword({
            ...rest,
          }),
        ]);
      }
    } catch (error) {
      setLoading(false);
      notify("error", "Gagal Mengubah Data");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    isLoading,
    isSuccess,
    loading,
    handlerSubmit,
  };
};
