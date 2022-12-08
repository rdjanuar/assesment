import React, { useContext, useMemo, useState } from "react";

import { GlobalTable, ModalForm, ModalDelete } from "@/components";
import { useOrganizers } from "@/hooks";
import { constant, yupSchema, client } from "@/utils";
import { ActionContext } from "@/context/Action";

export const Organizers = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const {
    updateModal,
    deleteModal,
    postModal,
    toggleUpdate,
    togglePost,
    oneData,
  } = useContext(ActionContext);
  const {
    data,
    isLoading,
    isLoadingUpdate,
    updateOrganizers,
    postOrganizers,
    deleteOrganizers,
    isLoadingDelete,
    isLoadingPost,
  } = useOrganizers(page, perPage);

  const columns = useMemo(
    () => [
      {
        Header: "Organizer Name",
        accessor: "organizerName",
      },
      {
        Header: "Image Location",
        accessor: "imageLocation",
      },
    ],
    []
  );

  const defaultValuesUpdate = {
    organizerName: client.getDataById(data?.data, oneData)?.organizerName,
    imageLocation: client.getDataById(data?.data, oneData)?.imageLocation,
  };

  return (
    <>
      <GlobalTable
        isLoading={isLoading}
        columns={columns}
        setPage={setPerpage}
        data={data?.data}
        nextPage={client.nextPage(setPage, page, data?.meta?.pagination?.total)}
        prevPage={client.prevPage(setPage, page)}
        gotoPage={client.gotoPage(setPage)}
        currentPage={data?.meta?.pagination?.current_page}
        pageCount={data?.meta?.pagination?.total}
      />
      {updateModal && (
        <ModalForm
          onSubmit={updateOrganizers}
          validatorSchema={yupSchema.validationOrganizers()}
          isSubmitting={isLoadingUpdate}
          isOpen={updateModal}
          template={constant.TEMPLATE_FORM_ORGANIZERS}
          onClose={toggleUpdate}
          defaultValues={defaultValuesUpdate}
        />
      )}
      {postModal && (
        <ModalForm
          onSubmit={postOrganizers}
          validatorSchema={yupSchema.validationOrganizers()}
          isSubmitting={isLoadingPost}
          isOpen={postModal}
          template={constant.TEMPLATE_FORM_ORGANIZERS}
          defaultValues={constant.DEFAULTVALUES_ORGANIZERS}
          onClose={togglePost}
        />
      )}
      {deleteModal && (
        <ModalDelete
          confirmModal={deleteOrganizers}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};
