import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

function OTPInput({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  const slotClassName = "border rounded-xl border-gray-600 text-white p-8";

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <InputOTP maxLength={6} value={value} onChange={handleValueChange}>
      <InputOTPGroup className="space-x-2">
        <InputOTPSlot className={slotClassName} index={0} />
        <InputOTPSlot className={slotClassName} index={1} />
        <InputOTPSlot className={slotClassName} index={2} />
        <InputOTPSlot className={slotClassName} index={3} />
        <InputOTPSlot className={slotClassName} index={4} />
        <InputOTPSlot className={slotClassName} index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export default OTPInput;
