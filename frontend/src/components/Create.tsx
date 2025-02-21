import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useCreate } from "../hooks/useCreate";
import { useDenominator } from "../hooks/useDenominator";
import { isInteger, isNumber } from "lodash";
import { toast } from "react-toastify";

export const Create = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [temperatureEntered, setTemperatureEntered] = useState<string>("");

  const { data: denominator } = useDenominator();

  const create = useCreate({ temperature: temperature });

  useEffect(() => {
    if (Boolean(isNumber(Number(temperatureEntered)) && denominator)) {
      setTemperature(
        Math.floor(Number(temperatureEntered) * Number(denominator))
      );
    } else setTemperature(null);
  }, [temperatureEntered, denominator]);

  useEffect(() => {
    if (create.execution.isSuccess) {
      toast.success("Added weather point");
      setTemperature(null);
      setTemperatureEntered("");
      create.reset();
    }
  }, [create.execution.isSuccess]);

  const handleCreate = () => {
    create &&
      create.isEnabled &&
      create.isReady &&
      create.write &&
      create.write();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Add Weather Data</div>
      <div className="flex flex-row gap-4">
        <input
          type="number"
          placeholder="Enter temperature (e.g. -1.7)"
          value={temperatureEntered}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setTemperatureEntered(event.target.value)
          }
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={handleCreate}
          disabled={
            !create.isReady || !create.isEnabled || create.execution.isPending
          }
          className="btn"
        >
          {create.execution.isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
};
