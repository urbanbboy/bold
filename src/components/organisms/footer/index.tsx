import { Designer } from "@/components/atoms/designer";
import { Logo } from "@/components/atoms/logo";
import { FooterLinks } from "@/components/molecules/footer-links";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const Footer = () => {
    return (
        <footer className="space-y-16 p-4 md:p-16 bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 mt-8">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <Logo className="w-[300px] h-[40px]" />
                        <p className="text-gray2 text-base max-w-sm">Bold Brands International ваш внешний отдел маркетинга</p>
                    </div>
                    <Designer className="hidden lg:flex" />
                </div>
                <FooterLinks />
            </div>
            <div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 mt-3 text-gray2">
                    <Designer className="md:hidden" />
                    <span className="text-left">&copy; 2024 Bold Brands International. Все права защищены</span>
                    <span className="md:text-right">Политика конфиденциальности</span>
                </div>
            </div>
        </footer>
    );
};