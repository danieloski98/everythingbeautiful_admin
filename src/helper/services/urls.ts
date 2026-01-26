export const URLS = {
    LOGIN: `/admin-auth/login`, 
    VERIFY: `/admin-auth/verify-otp`, 
    UPLOAD: "/upload/file",
    BUSINESS: "/business/filter",
    USER: "/user",
    ANALYTICS: "/analytics/global",
    CREATECHAT: "/messaging/chats",
    SENDCHAT: "/messaging/messages",
    CHATLIST: (item: string) => `/messaging/chats/user/${item}`,
    CHATMESSAGES: (item: string) => `/messaging/chats/${item}/messages`,
    BOOKING: "/booking",
    ORDER: "/order",
    SERVICE: "/service/all",
    SERVICEBYID: (item: string) => `/service/${item}`,
    PRODUCT: "/product/filter",
    BUSINESSBYID: (item: string) => `/business/${item}`,
    PRODUCTBYID: (item: string) => `/product/${item}`,
    USERUPDATE: (item: string) => `/user/${item}`
}

// export const IMAGE_URL = process.env.NEXT_PUBLIC_RESOURCE_URL as string; 

// export const RESOURCE_BASE_URL = process.env.NEXT_PUBLIC_AWS_BASE_URL as string; 
