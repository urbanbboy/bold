import Link from "next/link"
import { Badge } from "@/components/ui/badge";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";

export interface FeatureProps {
    title: string;
    badges: string[];
    href: string;
    bg_image: React.ReactNode;
}

export const CompanyFeatureItem = ({ bg_image, title, href, badges }: FeatureProps) => {
    return (
        <div className="h-full border rounded-2xl shadow-lg flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="w-full h-[250px]  relative overflow-hidden">
                <div className="w-full h-full absolute inset-0">{bg_image}</div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex items-center my-4 flex-wrap gap-2">
                    {badges.map((badge) => (
                        <Badge
                            variant={'tag'}
                            key={badge}
                            className=""
                        >
                            {badge}
                        </Badge>
                    ))}
                </div>
                <Link href={href} className="mt-auto">
                    <ButtonWithIcon
                        variant="feature"
                        className="text-accent"
                    >
                        Подробнее
                    </ButtonWithIcon>
                </Link>

            </div>
        </div>
    );
};