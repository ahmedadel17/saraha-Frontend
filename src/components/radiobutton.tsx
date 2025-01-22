"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFormProps {
  control: any; // The control from useForm
  items: RadioOption[]; // The options for the radio buttons
  label: string; // The label for the radio group
  field: string; // The name of the field
  direction: string;
}

export const RadioGroupForm: React.FC<RadioGroupFormProps> = ({
  control,
  items,
  label,
  field,
  direction,
}) => {
  return (
    <FormField
      control={control}
      name={field}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-branding">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={
                direction == "col"
                  ? "flex flex-col space-y-1"
                  : "flex flex-row space-x-3"
              }
            >
              {items.map((item, index) => (
                <FormItem
                  key={item.value || index}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal text-branding">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
