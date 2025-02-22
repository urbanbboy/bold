
export interface ContactFormRequest {
    sender_name: string;
    sender_phone: string;
    sender_email: string;
}

export interface ServiceFormRequest {
    sender_name: string;
    sender_phone: string;
    sender_email: string;
    business_type: number[];
    service_type: number[];
}

export interface SmmServiceFormRequest {
    sender_name: string;
    sender_phone: string;
    sender_email: string;
    business_type: number[];
    promotion_type: number[];
    uantity_of_publications: string;
}

export interface VideoServiceFormRequest {
    sender_name: string;
    sender_phone: string;
    sender_email: string;
    business_type: number[];
    video_type: number[];
}

export interface SiteServiceFormRequest {
    sender_name: string;
    sender_phone: string;
    sender_email: string;
    business_type: number[];
    site_status: number[];
    purpose_of_promotion: number[];
}

export interface CrmServiceFormRequest {
    sender_name: string;
    sender_phone: string;
    sender_email: string;
    business_type: number[];
    task_type: number[];
}