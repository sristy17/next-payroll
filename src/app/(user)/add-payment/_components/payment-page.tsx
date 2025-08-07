"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const formSchema = z.object({
  expenseName: z.string().min(2, "Expense name must be atleast 2 characters"),
  amount: z
    .string()
    .min(1, "Amount can't be empty")
    .regex(/^[0-9]+$/, "Amount should only contain numbers."),
  modeOfPayment: z.enum(["", "CASH", "UPI"]),
});

export interface PaymentFormData {
  expenseName: string;
  amount: string;
  modeOfPayment: "" | "CASH" | "UPI";
}

export default function PaymentPage({
  handleSubmit,
}: {
  handleSubmit: (data: PaymentFormData) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseName: "",
      amount: "",
      modeOfPayment: "",
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    handleSubmit(data);
  };
  return (
    <div className="flex flex-col gap-y-4 mt-8 h-full">
      <h2 className="font-bold md:text-xl">Add Payment</h2>
      <div className="bg-gradient-to-br from-green-900 md:h-3/4 to-black rounded-xl p-4 md:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between h-full"
          >
            <div className="flex flex-col gap-6">
              {/* Expense Name */}
              <FormField
                control={form.control}
                name="expenseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-background">
                      Expense Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Electricity bill"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-background">Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1000"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mode of Payment */}
              <FormField
                control={form.control}
                name="modeOfPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-background">
                      Mode of Payment
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Cash/UPI" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CASH">Cash</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Plus />
              Add Payment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
