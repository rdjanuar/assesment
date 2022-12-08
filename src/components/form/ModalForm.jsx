import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select as CustomSelect, chakraComponents } from "chakra-react-select";
import { withAsyncPaginate } from "react-select-async-paginate";

import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

import { LayoutModal } from "@/layouts/Modal";
import { ActionContext } from "@/context/Action";

const components = {
  LoadingIndicator: (props) => (
    <chakraComponents.LoadingIndicator
      color="base.secondary.500"
      emptyColor="transparent"
      spinnerSize="sm"
      speed="0.5s"
      thickness="2px"
      {...props}
    />
  ),
};

const CustomSelectAsync = withAsyncPaginate(CustomSelect);

export const ModalForm = ({
  validatorSchema,
  onSubmit,
  template,
  defaultValues,
  isSubmitting,
  isOpen,
  onClose,
}) => {
  const { tittle, fields } = template;

  const { postModal } = useContext(ActionContext);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(validatorSchema),
    defaultValues,
  });

  useEffect(() => {
    if (postModal && isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, postModal, reset, defaultValues]);

  const renderFields = (field) =>
    field?.map(
      ({
        title,
        type,
        name,
        readOnly,
        isRequired,
        placeholder,
        isClearable,
        loadOptions,
        shouldUnregister,
      }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          shouldUnregister={shouldUnregister}
          render={({ field: { value, name, onChange } }) => (
            <FormControl
              isInvalid={errors[name]}
              key={name}
              isRequired={isRequired}
              htmlFor={name}
              mt="4"
            >
              <FormLabel
                htmlFor={name}
                fontSize="bodyBase"
                fontWeight="medium"
                transform="translateX(0.25rem)"
              >
                {title}
              </FormLabel>
              {type === "hidden" && loadOptions ? (
                <CustomSelectAsync
                  additional={{
                    page: 1,
                    perPage: 10,
                  }}
                  useBasicStyles
                  value={value}
                  size="lg"
                  selectedOptionColor="base.secondary"
                  placeholder={placeholder}
                  closeMenuOnSelect={true}
                  chakraStyles={{
                    container: (styles) => ({
                      ...styles,
                      textColor: "base.secondary.500",
                    }),

                    control: (styles) => ({
                      ...styles,
                      textColor: "base.secondary.500",
                      borderColor: !value ? "neutral.10" : "base.secondary.500",
                      rounded: "10px",
                    }),

                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                      rounded: "10px",
                    }),
                    option: (provided) => ({
                      ...provided,
                      height: "48px",
                    }),
                    dropdownIndicator: (
                      provided,
                      { selectProps: { menuIsOpen } }
                    ) => ({
                      ...provided,
                      "> svg": {
                        transitionDuration: "normal",
                        transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
                      },
                    }),
                  }}
                  selectedOptionStyle="color"
                  components={components}
                  onChange={onChange}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  isClearable={isClearable}
                  isSearchable={false}
                  loadOptions={loadOptions}
                />
              ) : (
                <Input
                  tabIndex="1"
                  type={type}
                  name={name}
                  height="48px"
                  rounded="10px"
                  autoComplete={`current-${name}`}
                  isReadOnly={readOnly}
                  value={value}
                  pl="4"
                  transform="translateX(0.25rem)"
                  placeholder={placeholder}
                  onChange={(e) => onChange(e.target.value)}
                  lineHeight
                  _placeholder={{
                    lineHeight: "bodyBase",
                    fontWeight: "normal",
                    textColor: "neutral.10",
                  }}
                />
              )}

              <FormErrorMessage
                textColor="functional.warning"
                fontSize="bodyXSmall"
              >
                {errors[name] && errors[name]?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
      )
    );

  return (
    <LayoutModal tittle={tittle} isOpen={isOpen} size="md" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} key={tittle}>
        {renderFields(fields)}
        <HStack justify="end">
          <Button isLoading={isSubmitting} mt={5} type="submit">
            Simpan
          </Button>
        </HStack>
      </form>
    </LayoutModal>
  );
};
