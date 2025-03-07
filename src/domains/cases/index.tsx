'use client';

import { useGetPostsQuery } from "@/api/Post";
import { useGetStaticPageBySlugQuery } from "@/api/StaticPages";
import { RequestHandler } from "@/components/atoms/request-handler";
import { FeedbackForm } from "@/components/forms/feedback-form";
import { CasesList } from "@/components/organisms/cases-list";
import { ClientReviewList } from "@/components/organisms/client-review-list";
import { CompanyPartners } from "@/components/organisms/company-partners";
import { PartnerReviewList } from "@/components/organisms/partner-review-list";
import { FormLayout } from "@/components/templates/form-layout";
import { PageTitleLayout } from "@/components/templates/page-title-layout";
import useScrollToFeedback from "@/hooks/useScrollToFeedback";
import { useSlug } from "@/hooks/useSlug";


const CasesPage = () => {
    const slug = useSlug()
    const { data, isLoading, error } = useGetStaticPageBySlugQuery(slug);
    const { data: post_data } = useGetPostsQuery()
    const { ref, scrollToFeedback } = useScrollToFeedback()

    return (
        <RequestHandler
            isLoading={isLoading}
            error={error}
            data={data}
        >
            {data &&
                <PageTitleLayout
                    scrollToFeedback={scrollToFeedback}
                    bg_image={data.image}
                    title={data.title}
                    button_text={"Получить консультацию"}
                    breadcrumb={[
                        { text: 'Главная', href: '/home' },
                        { text: 'Кейсы', href: '/cases' },
                    ]}
                />
            }
            <CasesList
                posts={post_data?.results || []}
            />
            <ClientReviewList hasBg />
            <CompanyPartners />
            <PartnerReviewList />
            <FormLayout ref={ref} nestedForm={<FeedbackForm />} />
        </RequestHandler>
    );
}

export default CasesPage;