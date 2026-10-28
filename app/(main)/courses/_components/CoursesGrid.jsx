"use client";

import { motion } from "framer-motion";
import CourseCard from "./CourseCard"; // path adjust koro tomar structure onujayi

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CoursesGrid = ({ courses }) => {
    return (
        <motion.div
            className="grid gap-6"
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 320px))",
                justifyContent: "center",
            }}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
        >
            {courses.map((course) => (
                <motion.div key={course.id} variants={item}>
                    <CourseCard course={course} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CoursesGrid;