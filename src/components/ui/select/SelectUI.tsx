import * as React from "react";
import Select, { SelectProps } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useField } from "formik";
import { authFieldSx } from "@/components/ui/input/authFieldStyles";

type SelectOption = {
    label: string;
    value: string;
};

type FormikSelectProps = SelectProps<string, false> & {
    name: string;
    formik?: boolean;
    options: SelectOption[];
    placeholder?: string;
};

const SelectUI: React.FC<FormikSelectProps> = ({
    formik,
    options,
    placeholder,
    ...props
}) => {
    if (formik && props.name) {
        const [field, meta, helpers] = useField<string>(props.name);

        return (
            <>
                <Select
                    {...props}
                    name={field.name}
                    value={field.value || null}
                    placeholder={placeholder}
                    sx={authFieldSx}
                    color={meta.touched && meta.error ? "danger" : "neutral"}
                    onChange={(_, value) => helpers.setValue(value || "")}
                    onBlur={() => helpers.setTouched(true)}
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
        <Select {...props} placeholder={placeholder} sx={authFieldSx}>
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default SelectUI;
