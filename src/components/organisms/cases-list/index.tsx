import { Post } from "@/api/Post/types";
import { Heading } from "@/components/atoms/heading";
import { SearchInput } from "@/components/atoms/search-input";
import { VideoLoader } from "@/components/atoms/video-loader";
import { CompanyPostItem } from "@/components/molecules/company-post-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerTransition, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface CasesListProps {
    posts: Post[];
}

const tags = [
    { name: "SMM", tag: "SMM" },
    { name: "Таргет", tag: "Таргет" },
    { name: "Маркетинг", tag: "Маркетинг" },
];

export const CasesList = ({ posts }: CasesListProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // состояние для загрузки
    const pageSize = 4;

    const useDebounce = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
    
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
                setIsLoading(false); // останавливаем индикатор загрузки
            }, delay);
    
            setIsLoading(true); // запускаем индикатор загрузки
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
    
        return debouncedValue;
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) => post.tags.some((t) => t.tags === tag));
            return matchesSearch && matchesTags;
        });
    }, [posts, debouncedSearchTerm, selectedTags]);

    const totalPages = Math.ceil(filteredPosts.length / pageSize);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <section className="max-w-[1920px] mt-16">
            <div className="max-w-[1280px] m-auto px-5">
                <div className="flex flex-col md:flex-row justify-between md:items-end">
                    <div className="space-y-4">
                        <Heading as="h2">Кейсы</Heading>
                        <div className="flex gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag.name}
                                    variant={'case'}
                                    className={`hover:cursor-pointer ${selectedTags.includes(tag.tag) ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => toggleTag(tag.tag)}
                                >
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* POSTS */}
                <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-3 mt-5">
                    {isLoading ? (
                        <div className="col-span-full text-center"><VideoLoader /></div>
                    ) : (
                        paginatedPosts.map((post, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn("up", "spring", idx * 0.2)}
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportConfig}
                                transition={staggerTransition(idx)}
                                className="max-w-[422px]"
                            >
                                <CompanyPostItem {...post} />
                            </motion.div>
                        ))
                    )}
                </article>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-2 mt-5">
                    <Button
                        className="bg-background-gray2 hover:bg-graphic-gray"
                        variant="ghost"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft />
                    </Button>

                    <div className="text-sm whitespace-nowrap">
                        {currentPage} <span className="text-graphic-gray">/ {totalPages}</span>
                    </div>

                    <Button
                        className="bg-background-gray2 hover:bg-graphic-gray"
                        variant="ghost"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </section>
    );
};
