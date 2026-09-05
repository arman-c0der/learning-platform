"use server";

import mongoose from "mongoose";

import { Quizset } from "@/model/quizset-models";
import { Quiz } from "@/model/quizzes-model";
import { Assessment } from "@/model/assessment-model";

import { getSlug, replaceMongoIdInArray } from "@/lib/convertData";
import { createQuiz } from "@/queries/quizzes";
import { getQuizSetById } from "@/queries/quizzes";
import { createAssessmentReport } from "@/queries/reports";
import { getLoggedInUser } from "@/lib/loggedin-user";

export async function updateQuizSet(quizset, dataToUpdate) {
    try {
        await Quizset.findByIdAndUpdate(quizset, dataToUpdate);
    } catch (e) {
        throw new Error(e);
    }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
    try {
        const transformedQuizData = {};

        transformedQuizData["question"] = quizData["question"];
        transformedQuizData["description"] = quizData["description"];
        transformedQuizData["slug"] = getSlug(quizData["question"]);
        transformedQuizData["options"] = [
            {
                text: quizData.optionA.label,
                is_correct: quizData.optionA.isTrue,
            },
            {
                text: quizData.optionB.label,
                is_correct: quizData.optionB.isTrue,
            },
            {
                text: quizData.optionC.label,
                is_correct: quizData.optionC.isTrue,
            },
            {
                text: quizData.optionD.label,
                is_correct: quizData.optionD.isTrue,
            },
        ];

        const createdQuizId = await createQuiz(transformedQuizData);
        (createdQuizId);

        const quizSet = await Quizset.findById(quizSetId);
        quizSet.quizIds.push(createdQuizId);
        await quizSet.save();
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateQuiz(quizId, quizSetId, quizData) {
    try {
        const transformedQuizData = {};

        transformedQuizData["question"] = quizData["question"];
        transformedQuizData["description"] = quizData["description"];
        transformedQuizData["slug"] = getSlug(quizData["question"]);
        transformedQuizData["options"] = [
            {
                text: quizData.optionA.label,
                is_correct: quizData.optionA.isTrue,
            },
            {
                text: quizData.optionB.label,
                is_correct: quizData.optionB.isTrue,
            },
            {
                text: quizData.optionC.label,
                is_correct: quizData.optionC.isTrue,
            },
            {
                text: quizData.optionD.label,
                is_correct: quizData.optionD.isTrue,
            },
        ];

        await Quiz.findByIdAndUpdate(quizId, transformedQuizData);
    } catch (e) {
        throw new Error(e);
    }
}

export async function deleteQuiz(quizId, quizSetId) {
    try {
        await Quiz.findByIdAndDelete(quizId);

        const quizSet = await Quizset.findById(quizSetId);
        quizSet.quizIds = quizSet.quizIds.filter(
            (id) => id.toString() !== quizId.toString()
        );
        await quizSet.save();
    } catch (e) {
        throw new Error(e);
    }
}

export async function deleteQuizSet(quizSetId) {
    try {
        await Quizset.findByIdAndDelete(quizSetId);
    } catch (e) {
        throw new Error(e);
    }
}

export async function doCreateQuizSet(data) {
    try {
        data["slug"] = getSlug(data.title);
        const craetedQuizSet = await Quizset.create(data);
        return craetedQuizSet?._id.toString();
    } catch (e) {
        throw new Error(e);
    }
}

export async function addQuizAssessment(courseId, quizSetId, answers) {
    try {
        (quizSetId, answers);
        const quizSet = await getQuizSetById(quizSetId);
        const quizzes = replaceMongoIdInArray(quizSet.quizIds);

        const assessmentRecord = quizzes.map((quiz) => {
            const obj = {};
            obj.quizId = new mongoose.Types.ObjectId(quiz.id);

            const found = answers.find((a) => a.quizId === quiz.id);
            obj.attempted = !!found;

            const mergedOptions = quiz.options.map((o) => {
              
                const selectedMatch = answers.find(
                    (a) =>
                        a.quizId === quiz.id &&
                        a.options?.[0]?.option === o.text
                );

                return {
                    option: o.text,
                    isCorrect: o.is_correct,
                    isSelected: !!selectedMatch,
                };
            });

            obj["options"] = mergedOptions;
            return obj;
        });

        const assessmentEntry = {};
        assessmentEntry.assessments = assessmentRecord;
        assessmentEntry.otherMarks = 0;

        const assessment = await Assessment.create(assessmentEntry);
        const loggedInUser = await getLoggedInUser();

        await createAssessmentReport({
            courseId: courseId,
            userId: loggedInUser.id,
            quizAssessment: assessment?._id,
        });
    } catch (err) {
        throw new Error(err);
    }
}