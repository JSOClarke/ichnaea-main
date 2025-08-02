import { useForm, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";

type AccountType = {
  id: number;
  value: string;
  label: string;
};

const accountTypes = [
  { id: 1, value: "Savings", label: "Savings Account" },
  { id: 2, value: "Investment", label: "Investment Account" },
];

type AccountForm = {
  accounts: {
    id: string;
    name: string;
    type: AccountType;
    amount: number | undefined;
  }[];
};

export default function Page1() {
  const { register, control, handleSubmit } = useForm<AccountForm>({
    defaultValues: {
      accounts: [
        { id: nanoid(), name: "", type: accountTypes[0], amount: undefined },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accounts",
  });

  const onSubmit = (data: AccountForm) => {
    console.log("Submitted accounts:", data.accounts);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="step-container">
      <div className="step-title">Enter Your Accounts</div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="account-entry"
          style={{ marginBottom: "1rem" }}
        >
          <input
            placeholder="Account Name"
            {...register(`accounts.${index}.name`)}
          />

          <select {...register(`accounts.${index}.type`)}>
            <option value="">Select account type</option>
            {accountTypes.map(({ id, label, value }) => (
              <option key={id} id={value}>
                {label}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="£0.00"
            {...register(`accounts.${index}.amount`, { valueAsNumber: true })}
          />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            id: nanoid(),
            name: "",
            type: accountTypes[1],
            amount: undefined,
          })
        }
      >
        + Add Account
      </button>

      <button type="submit" style={{ marginTop: "1rem" }}>
        Submit
      </button>
    </form>
  );
}
