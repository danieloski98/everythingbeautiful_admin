import { BusinessInfo, UserData } from "@/components/shared";
import { IProductDetail } from "@/helper/model/business";
import { Avatar } from "@heroui/react";
import { formatNumber } from "@/helper/utils/numberFormat";

export default function ProductInfo(props: {
    product: IProductDetail;
    setIsOpen: (by: boolean) => void;
}) {
    return (
        <div className=" w-full flex flex-col gap-8 items-center pt-6 ">
            {props?.product?.pictures?.length > 0 && (
                <Avatar
                    style={{ width: "120px", height: "120px" }}
                    radius="md"
                    src={props?.product?.pictures[0]}
                    name={props?.product?.business?.name}
                />
            )}
            <div className=" w-full flex flex-col gap-3 overflow-y-auto ">
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Name</p>
                    <p className=" text-sm capitalize ">{props?.product?.name}</p>
                </div>
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Description</p>
                    <div className=" flex items-center gap-1 ">
                        <p className=" text-sm ">{props?.product?.description}</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-1 ">
                    <p className=" font-medium ">Price Per Hour</p>
                    <div className=" flex items-center gap-1 ">
                        <p className=" text-sm ">
                            {formatNumber(props?.product?.price)}
                        </p>
                    </div>
                </div>
                <div className=" flex flex-col gap-4 mt-4 ">
                    <p className=" font-medium ">User Info</p>
                    <UserData {...props?.product?.business?.creator} />
                </div>
                <BusinessInfo onClose={props.setIsOpen} business={props?.product?.business} />
            </div>
        </div>
    );
}
