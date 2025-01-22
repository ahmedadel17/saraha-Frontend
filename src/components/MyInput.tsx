import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
const MyInput = ({
  control,
  label,
  description,
  placeholder,
  name,
}: {
  control: any;
  label: string;
  description: string;
  placeholder: string;
  name: string;
}) => {
  return (
    <div className="">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-branding">{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormDescription className="mx-2 text-branding">
              {description}
            </FormDescription>
            <FormMessage className="mx-2" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MyInput;
