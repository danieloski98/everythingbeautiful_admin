import { CreateAdminBtn } from "@/components/shared";
import { AdminTable } from "@/components/tables";

export default function Adminpage() {
  return (
    <div className=" w-full flex flex-col gap-4 ">
      <div className=" w-full flex justify-end py-3 ">
        <CreateAdminBtn />
      </div>
      <AdminTable />
    </div>
  );
}
