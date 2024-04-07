"use client";
import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { org } from "@/types/globalTypes.types";
import { addOrg, createTable } from "@/utils/tableland";
import { WalletClient } from "viem";
import { useAccount } from "wagmi";
import { filecoinCalibration } from "viem/chains";
import { deployOrgContract } from "@/utils/contractInteractions";
import { CircularProgress } from "@nextui-org/progress";

const model_options = ["Stable Diffusion Dreambooth"];

const CreateModelForm = ({wc}:{wc: WalletClient}) => {
  const [radioSelect, setRadioSelect] = useState<Boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {address} = useAccount();

  const onSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value == "pre-trained") {
      setRadioSelect((pre_val) => !pre_val);
    }
  };
  const [formData, setFormData] = useState<org>({
    id: 0,
    org_add: "",
    org_name: "",
    description: "",
    isTrained: 0,
    contributors: '',
    costPerPrompt: 0,
    Owner_add: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      name,
      value,
    }: { name: string; value: string | boolean | string[] } = e.target;
    setFormData((oldVal: org) => ({ ...oldVal, [name]: value }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // deploycontract and update table
    const deployedAddress = await deployOrgContract(
      formData.org_add,
      formData.costPerPrompt,
      wc!
    );
    console.log(deployedAddress);
    await addOrg({
      id: 0,
      org_name: formData.org_name,
      org_add: deployedAddress!,
      description: formData.description,
      isTrained: 0,
      contributors: '',
      costPerPrompt: formData.costPerPrompt,
      Owner_add: address!
    });
    setLoading(false);
    setSuccess(true);
  };

  return (
    <form className="max-w-[90%] m-auto" onSubmit={submitForm}>
      <h1 className="text-xl my-10">
        Create Model Org For Accepting Contributions{" "}
      </h1>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="org_name"
          id="org_name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={handleChange}
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Model Title
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          name="description"
          id="description"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          onChange={handleChange}
        />
        <label
          htmlFor="descdescription"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Model Description
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="costPerPrompt"
          id="costPerPrompt"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={handleChange}
          required
          step="any"
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Cost Per Prompt ($EAI)
        </label>
      </div>
      <RadioGroup
        label="Upload ML Model"
        onChange={onSelectChange}
        className="text-sm mt-5"
      >
        <Radio
          value="own"
          description="Disabled: Will be enabled in future"
          isDisabled
        >
          Upload your own model
        </Radio>
        <Radio value="pre-trained" description="Quicker and easier approach ">
          Fine tune one of the pre-trained model
        </Radio>
      </RadioGroup>
      {radioSelect ? (
        <div className="my-5">
          <Select
            isRequired
            label="Select Model"
            placeholder="Select Pre-trained Model"
            className="max-w-xs"
          >
            {model_options.map((model, index) => (
              <SelectItem key={model} value={index}>
                {model}
              </SelectItem>
            ))}
          </Select>
        </div>
      ) : (
        <></>
      )}
      <button
        type="submit"
        className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
          success
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }  focus:ring-blue-800 mt-5`}
        disabled={loading || success}
      >
        {loading ? (
          <CircularProgress size={"sm"} aria-label="loading ..." />
        ) : success ? (
          <> ✔️ Org Created</>
        ) : (
          <>Submit</>
        )}
      </button>
    </form>
  );
};

export default CreateModelForm;
