"use client";
import Image from "next/image";
import FormComponent from "@/components/contact/FormComponent";
import RenderModel from "@/components/RenderModel";
import clsx from "clsx";
import useDayNightMode from "@/app/customHook/useDayNightMode";
import {BambooModel} from "@/components/model/BambooModel";
import {PineModel} from "@/components/model/PineModel";
import bg from '../../../../public/background/japan_castel2_gradient.webp';
import {useTranslations} from "next-intl";

const ContactPage = () => {
    const isNight = useDayNightMode();
    const t = useTranslations("contact");

    return (
        <div className="flex min-h-screen h-full w-full flex-col items-center justify-center px-8 xs:px-16 lg:px-32 py-20 relative">

            <Image
                src={bg}
                alt="background"
                fill
                sizes="100vw"
                priority
                className={clsx(
                    "fixed object-cover top-0 left-0 w-full h-screen bg-fixed z-0 blur-sm",
                    isNight ? "opacity-8" : "opacity-9"
                )}
            />

            {/* Первая 3D-модель (Bamboo) */}
            <div className="fixed hidden sm:hidden md:block md:top-80 lg:top-0 w-full -left-[42vw] h-4/5 sm:h-4/5 md:h-4/5 lg:h-screen -z-50">
                <RenderModel light="night">
                    <BambooModel config={{
                        floatAmplitude: 0.01,
                        floatSpeed: 0.4,
                        swayAmplitude: 0.004,
                        swaySpeed: 0.5,
                    }} />
                </RenderModel>
            </div>

            <article className="relative flex flex-col items-center justify-center space-y-2 3xl:space-y-8 text-white">
                <h1 className="font-bold text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-7xl text-amber-600 mb-5 2xl:mb-10 3xl:mb-20">
                    {t('title')}
                </h1>
                <div className="flex flex-col items-center justify-center space-y-6 w-full sm:w-3/4">
                    <p className="text-center text-light">{t('description')}</p>
                </div>
                <FormComponent />
            </article>

            {/* Вторая 3D-модель (Pine) */}
            <div className="w-full fixed top-36 sm:top-30 md:top-0 lg:top-0 left-[5vw] sm:left-[10vw] md:left-[42vw] lg:left-[42vw] h-[85vh] lg:h-screen -z-30">
                <RenderModel light="night">
                    <PineModel config={{
                        floatAmplitude: 0.01,
                        floatSpeed: 0.56,
                        swayAmplitude: 0.005,
                        swaySpeed: 0.5,
                        rotateY: 0,
                        light: 1
                    }} />
                </RenderModel>
            </div>
        </div>
    );
};

export default ContactPage;
