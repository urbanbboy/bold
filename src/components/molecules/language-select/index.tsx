"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import RussianIcon from "@/assets/dropdown/rus.svg";
import UzbIcon from "@/assets/dropdown/usb.svg";
import UsaIcon from "@/assets/dropdown/usa.svg";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { baseApi } from "@/api/Base";
import { useSelector } from "react-redux";
import { getLanguage } from "@/api/LanguageSelect/selector";
import { languageActions } from "@/api/LanguageSelect";

interface LanguageProps {
    id: string;
    title: string;
    headers: string;
    shortTitle: string;
    icon: React.ReactNode;
}

const languageList: LanguageProps[] = [
    {
        id: "1",
        title: "English",
        shortTitle: "EN",
        headers: "en",
        icon: <UsaIcon />
    },
    {
        id: "2",
        title: "Русский",
        shortTitle: "РУ",
        headers: "ru",
        icon: <RussianIcon />
    },
    {
        id: "3",
        title: "О'zbek",
        shortTitle: "UZ",
        headers: "uz",
        icon: <UzbIcon />
    }
];

export const LanguageSelect = ({ isMobile }: { isMobile?: boolean }) => {
    const dispatch = useAppDispatch();
    const selectedLanguage = useSelector(getLanguage)

    const onChangeLanguage = (value: string) => {
        dispatch(languageActions.setLanguage(value));
        dispatch(baseApi.util.resetApiState());
    };

    if (selectedLanguage === null) return null;

    const selectedLang = languageList.find((lang) => lang.headers === selectedLanguage) || languageList[1];

    return (
        <div>
            <Select value={selectedLanguage} onValueChange={onChangeLanguage}>
                <SelectTrigger
                    className={cn(
                        "hover:bg-white/20 transition-all focus:ring-offset-0 outline-none duration-200 w-[110px]",
                        isMobile ? "text-black" : ""
                    )}>
                    <SelectValue>
                        {selectedLang && (
                            <div className="flex items-center space-x-1 focus:ring-offset-0">
                                <span>{selectedLang.icon}</span>
                                <span className="pr-1">{selectedLang.shortTitle}</span>
                            </div>
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[180px]">
                    {languageList.map((language) => (
                        <SelectItem key={language.id} value={language.headers}>
                            <div className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-200">
                                <span>{language.icon}</span>
                                <span>{language.title}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};