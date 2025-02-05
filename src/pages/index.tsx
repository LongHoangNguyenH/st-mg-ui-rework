import { RolesSelectionCombobox } from "@/components/RolesSelectionCombobox";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5">
        <div className="flex flex-col items-center justify-center py-10" >
          <RolesSelectionCombobox/>
          <span className="text-black">
            <p>Your are logged as {}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
