"use client";

import * as React from "react";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { useField, useFormikContext } from "formik";

interface SelectOption {
    value: string;
    label: string;
}

type FormikSelectProps = {
    name: string;
    formik?: boolean;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
};

const sharedSx = {
    minHeight: 48,
    borderRadius: "12px",
    "--Select-placeholderOpacity": 0.65,
};

const SelectUI: React.FC<FormikSelectProps> = ({
    formik,
    name,
    options,
    placeholder,
    ...props
}) => {
    if (formik) {
        const [field, meta] = useField<string>(name);
        const { setFieldTouched, setFieldValue } = useFormikContext<any>();

        return (
            <>
                <Select
                    {...props}
                    name={name}
                    value={field.value || null}
                    placeholder={placeholder}
                    error={!!meta.error && meta.touched}
                    onChange={(_, value) => setFieldValue(name, value || "")}
                    onBlur={() => setFieldTouched(name, true)}
                    sx={sharedSx}
                >
                    {options.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
                {meta.touched && meta.error && (
                    <div style={{ color: "red", fontSize: 12 }}>{meta.error}</div>
                )}
            </>
        );
    }

    return (
        <Select {...props} name={name} placeholder={placeholder} sx={sharedSx}>
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default SelectUI;
