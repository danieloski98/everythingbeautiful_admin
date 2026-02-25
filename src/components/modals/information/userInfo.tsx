
import { BusinessInfo, UserCard, UserData } from "@/components/shared";
import { IUserDetail } from "@/helper/model/user"; 


export default function UserInfo(
    props: {
        user: IUserDetail,
        setIsOpen: (by: boolean) => void;
    }
) { 

    return (
        <div className=" w-full flex flex-col gap-8 items-center pt-6 " >
            <UserCard width="120px" item={props.user as IUserDetail} />
            <UserData {...props.user} />
            <BusinessInfo onClose={props.setIsOpen} business={props.user.business} />
        </div>
    )
}