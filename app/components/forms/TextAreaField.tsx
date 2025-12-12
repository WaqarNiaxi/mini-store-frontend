"use client";

import { Controller, FieldValues, Control, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

interface TextAreaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  maxLength?: number;
}

export function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  maxLength = 100,
}: TextAreaFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <InputGroup>
            <InputGroupTextarea
              {...field}
              id={name}
              rows={6}
              placeholder={placeholder}
              className="min-h-24 resize-none"
              aria-invalid={fieldState.invalid}
            />

            <InputGroupAddon align="block-end">
              <InputGroupText>
                {field.value.length}/{maxLength}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
