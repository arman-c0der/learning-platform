import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionTitle } from "@/components/section-title";
import Image from "next/image";
import { StarRating } from "@/components/star-rating";
import { Quote } from "lucide-react";

const Testimonials = ({ testimonials }) => {
    return (
        <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <span className="mb-3 inline-block rounded-full border border-purple-800/50 bg-purple-950/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
                        Testimonials
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        What Our{" "}
                        <span className="text-purple-400">Students Say</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-purple-300/60">
                        Real feedback from learners who transformed their
                        careers with us
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="mx-auto w-full max-2xl:w-[90%]"
                >
                    <CarouselPrevious className="border-purple-800/50 bg-[#0f0720] text-purple-300 hover:bg-purple-950 hover:text-white" />
                    <CarouselNext className="border-purple-800/50 bg-[#0f0720] text-purple-300 hover:bg-purple-950 hover:text-white" />
                    <CarouselContent className="py-4">
                        {testimonials.map((testimonial) => (
                            <CarouselItem
                                key={testimonial.id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="h-full sm:break-inside-avoid">
                                    <blockquote className="group relative flex h-full flex-col rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_12px_36px_-10px_rgba(168,85,247,0.35)] sm:p-8">
                                        <Quote className="mb-2 h-7 w-7 text-purple-700/50" />

                                        <p className="flex-1 text-sm leading-relaxed text-purple-200/80 sm:text-base">
                                            {testimonial?.content}
                                        </p>

                                        <div className="mt-6 flex items-center gap-4 border-t border-purple-900/40 pt-5">
                                            <Image
                                                alt="profile picture"
                                                src={
                                                    testimonial?.user
                                                        ?.profilePicture ||
                                                    "/images/default-avatar.png"
                                                }
                                                width="48"
                                                height="48"
                                                className="size-12 flex-none rounded-full border border-purple-800/50 object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-white">
                                                    {
                                                        testimonial?.user
                                                            ?.first_name
                                                    }{" "}
                                                    {
                                                        testimonial?.user
                                                            ?.last_name
                                                    }
                                                </p>
                                                <div className="mt-0.5 flex gap-0.5 text-purple-400">
                                                    <StarRating
                                                        rating={
                                                            testimonial?.rating
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </blockquote>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;