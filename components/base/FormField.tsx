import React from 'react'
import { Controller, FieldValues } from "react-hook-form";
import { FormItem, FormControl, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type? :'text' | 'email' | 'password' | 'file'
}

const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => 
 (
    <Controller
      name={name}
      control={control}

      render={({ field }) => (

        <FormItem>
          <FormLabel className="  text-sm font-sm text-gray-700">{label}</FormLabel>
          
          <FormControl>
            <Input
              className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );


export default FormField