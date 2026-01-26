
import { BusinessInfo, UserCard, UserData } from "@/components/shared";
import { IUserDetail } from "@/helper/model/user";
import { dateFormat } from "@/helper/utils/dateFormat";
import { RiVerifiedBadgeFill } from "react-icons/ri";


export default function UserInfo(
    props: IUserDetail
) {

    console.log(props);

    return (
        <div className=" w-full flex flex-col gap-8 items-center pt-6 " >
            <UserCard width="120px" item={props as IUserDetail} />
            <UserData {...props} />
            <BusinessInfo {...props.business} />
        </div>
    )
}