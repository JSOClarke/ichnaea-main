import { useAccountContext } from "../../AccountsContext";
import UniversalWidget from "./UniversalWidget";

export default function AccountWidget() {
  const { accounts } = useAccountContext();

  const totalAccount = accounts.reduce((curr, acc) => {
    return curr + acc.amount;
  }, 0);
  return <UniversalWidget title="Account" value={totalAccount} />;
}
