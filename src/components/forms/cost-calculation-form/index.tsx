"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";
import ruLabels from "react-phone-number-input/locale/ru.json";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { ButtonWithIcon } from "@/components/atoms/button-with-icon";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostCalculationSchema } from "./schema";
import { useState } from "react";
import { MultiSelect } from "@/components/atoms/multi-select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Type } from "@/api/Types/types";



interface CostCalculationFormProps {
    business_type: Type[];
    service_type: Type[];
}

export const CostCalculationForm = ({
    business_type,
    service_type,
}: CostCalculationFormProps) => {
    const form = useForm<z.infer<typeof CostCalculationSchema>>({
        resolver: zodResolver(CostCalculationSchema),
        defaultValues: {
            sender_name: "",
            sender_phone: "",
            sender_email: "",
            acceptTerms: false,
        },
    });

    const [tabValue, setTabValue] = useState("business");
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [selectedBusinesses, setSelectedBusinesses] = useState<number[]>([]);
    const [openTerms, setOpenTerms] = useState(false);
    const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);


    const showTerms = () => {
        setOpenTerms((prev) => !prev);
    };

    const handleNextStep = () => {
        if (selectedBusinesses.length > 0 && selectedServices.length > 0) {
            setIsFirstStepCompleted(true);
            setTabValue('contacts');
        } else {
            toast.error("Выберите хотя бы один вариант в каждом поле");
        }
    };

    const onSubmit = (data: z.infer<typeof CostCalculationSchema>) => {
        if (!selectedServices.length || !selectedBusinesses.length) {
            toast.error("Выберите хотя бы один пункт в каждом поле!");
            return;
        }
        const formData = {
            ...data,
            service_types: selectedServices,
            business_types: selectedBusinesses,
        };
        console.log(formData);
        toast.success("Успешно отправлено");
    };

    return (
        <Card className="bg-background-dark2 border-none md:p-8 rounded-3xl">
            <CardHeader className="font-bold text-primary-foreground text-xl md:text-3xl">
                Заполните форму и получите предложение
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <Tabs value={tabValue} onValueChange={(value) => {
                                if (value === "business") {
                                    setTabValue(value);
                                }
                                else if (selectedBusinesses.length > 0 && selectedServices.length > 0) {
                                    setTabValue(value);
                                } else {
                                    toast.error("Выберите хотя бы один вариант в каждом поле");
                                }
                            }}>
                                <TabsList className="flex flex-col items-start lg:flex-row mb-8 mt-5 md:mt-0 bg-transparent">
                                    <TabsTrigger value='business' className="space-x-2 group">
                                        {isFirstStepCompleted
                                            ? <div className="border-2 rounded-full p-2  group-data-[state=active]:border-accent">
                                                <Check />
                                            </div>
                                            : <div className="border-2 rounded-full py-2 px-4  group-data-[state=active]:border-accent">
                                                1
                                            </div>
                                        }


                                        <div className="flex flex-col text-left">
                                            <span className="text-sm xl:text-base">О вашем бизнесе</span>
                                            <span className="text-xs xl:text-sm">Тип бизнеса и услуги</span>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger value='contacts' className="space-x-2 group">
                                        <div className="border-2 rounded-full py-2 px-3.5  group-data-[state=active]:border-accent">
                                            2
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm xl:text-base">Контактные данные</span>
                                            <span className="text-xs xl:text-sm">Ваши данные для связи</span>
                                        </div>
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="business" className="space-y-8">
                                    <MultiSelect
                                        label="Тип бизнеса"
                                        options={business_type}
                                        selected={selectedBusinesses}
                                        setSelected={setSelectedBusinesses}
                                        placeholder="Выберите тип бизнеса"
                                        description="Это поможет нам лучше понять ваш бизнес и предложить оптимальное решение"
                                    />
                                    <MultiSelect
                                        label="Какая услуга вам нужна?"
                                        options={service_type}
                                        selected={selectedServices}
                                        setSelected={setSelectedServices}
                                        placeholder="Выберите услуги"
                                        description="Мы адаптируем стратегию под ваши цели и платформы"
                                    />
                                    <ButtonWithIcon type="button" onClick={handleNextStep}>
                                        Продолжить
                                    </ButtonWithIcon>
                                </TabsContent>
                                <TabsContent value="contacts" className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="sender_name"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-left text-slate-400">Имя</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="name"
                                                        placeholder="Иван Иванов Иванович"
                                                        className="border-b-2 bg-transparent"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="sender_phone"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-left text-slate-400">Номер телефона</FormLabel>
                                                <FormControl className="w-full">
                                                    <PhoneInput
                                                        defaultCountry="KG"
                                                        international
                                                        limitMaxLength
                                                        countryCallingCodeEditable={false}
                                                        labels={ruLabels}
                                                        placeholder="Введите номер телефона"
                                                        className="border-b-2"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="sender_email"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-start">
                                                <FormLabel className="text-left text-slate-400">Электронная почта</FormLabel>
                                                <FormControl className="w-full">
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="Введите электронную почту"
                                                        className="border-b-2 bg-transparent"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-col xl:flex-row pt-3 gap-5">
                                        <FormField
                                            control={form.control}
                                            name="acceptTerms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 text-white">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-sm md:text-md leading-6">
                                                            Я согласен на обработку моих данных в соответствии с{' '}
                                                            <span
                                                                onClick={showTerms}
                                                                className="text-rose-500 underline hover:cursor-pointer"
                                                            >
                                                                политикой конфиденциальности
                                                            </span>
                                                        </FormLabel>
                                                        <Dialog open={openTerms} onOpenChange={setOpenTerms}>
                                                            <DialogContent>
                                                                <DialogTitle>
                                                                    Скибиди Доп Доп Доп
                                                                </DialogTitle>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <ButtonWithIcon type="submit">Отправить</ButtonWithIcon>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
