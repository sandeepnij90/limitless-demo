"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitSetupTrainer } from "@/app/actions/submitSetupTrainer";

const FormSchema = z.object({
  companyName: z.string().min(3, { message: "Enter minumum of 3 characters" }),
  phoneNumber: z.string().min(11, { message: "Enter a valid phone number" }),
});

export type FormValues = z.infer<typeof FormSchema>;

export const SetupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormValues) => {
    submitSetupTrainer(data);
  };

  return (
    <>
      <h1 className="text-2xl text-center mb-8">Let's setup your account</h1>
      <form
        className="flex flex-col gap-4 max-w-[360px] border rounded-sm p-4 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label>Your company name</label>
          <input
            className="input-field"
            type="text"
            placeholder="Limited k9 training"
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>Your phone number</label>
          <input
            className="input-field"
            type="text"
            placeholder="07895748918"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="flex">
          <button className="primary-button">Save</button>
        </div>
      </form>
    </>
  );
};
