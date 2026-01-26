import { IconType } from "react-icons"

export interface IAnalytic {
    "totalUsers": number,
    "totalBusinesses": number,
    "totalProducts": number,
    "totalServices": number
}


export interface IAnalyticLabel {
    icon: IconType,
    label: string,
    color?: string,
    key: string
}
