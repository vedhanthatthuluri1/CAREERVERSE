
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Trophy,
    RotateCcw,
    BookOpen,
    Clock,
} from 'lucide-react'

import {
    chapterTwoQuizOne,
    chapterTwoQuizTwo,
    type QuizQuestion,
} from '../../data/chapterTwoQuestions'

import {
    getChapterTwoQuizResult,
    saveChapterTwoQuizResult,
} from '../../services/storage/assessmentStorage'

import type { QuizResult } from '../../types/storage'

type QuizAnswers = Record<number, string>
type SubmittedQuestions = Record<number, boolean>

export default function ChapterTwoQuiz() {
    const { quizId } = useParams<{ quizId: string }>()

    const quizNumber = quizId === '1' ? 1 : quizId === '2' ? 2 : 0

    const questions: QuizQuestion[] =
        quizNumber === 1
            ? chapterTwoQuizOne
            : quizNumber === 2
                ? chapterTwoQuizTwo
                : []

    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState('')
    const [answers, setAnswers] = useState<QuizAnswers>({})
    const [submitted, setSubmitted] = useState<SubmittedQuestions>({})
    const [isFinished, setIsFinished] = useState(false)

    const [bestScore, setBestScore] = useState(() => {
        if (quizNumber === 0) return 0

        return getChapterTwoQuizResult(quizNumber)?.bestScore ?? 0
    })

    if (quizNumber === 0 || questions.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Quiz Not Found
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        The requested Chapter 2 assessment could not be found.
                    </p>

                    <Link
                        to="/student/chapter/2"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                        <ArrowLeft size={17} />
                        Back to Chapter 2
                    </Link>
                </div>
            </div>
        )
    }

    const currentQuestion = questions[currentIndex]

    const selectedAnswer = answers[currentIndex]

    const correctOption = currentQuestion.options.find(
        (option) => option.isCorrect,
    )

    const chosenOption = currentQuestion.options.find(
        (option) => option.id === selectedAnswer,
    )

    const isCurrentSubmitted = Boolean(submitted[currentIndex])

    const score = questions.reduce((total, question, index) => {
        const correct = question.options.find(
            (option) => option.isCorrect,
        )

        return total + (
            answers[index] === correct?.id ? 1 : 0
        )
    }, 0)

    const progress = ((currentIndex + 1) / questions.length) * 100

    const handleSubmitAnswer = () => {
        if (!selectedOption || isCurrentSubmitted) return

        setAnswers((previous) => ({
            ...previous,
            [currentIndex]: selectedOption,
        }))

        setSubmitted((previous) => ({
            ...previous,
            [currentIndex]: true,
        }))
    }

    const handlePrevious = () => {
        if (currentIndex === 0) return

        const previousIndex = currentIndex - 1

        setCurrentIndex(previousIndex)
        setSelectedOption(answers[previousIndex] ?? '')
    }

    const handleNext = () => {
        if (
            currentIndex >= questions.length - 1 ||
            !isCurrentSubmitted
        ) {
            return
        }

        const nextIndex = currentIndex + 1

        setCurrentIndex(nextIndex)
        setSelectedOption(answers[nextIndex] ?? '')
    }

    const handleFinish = () => {
        if (!isCurrentSubmitted) return

        const finalScore = questions.reduce((total, question, index) => {
            const correct = question.options.find(
                (option) => option.isCorrect,
            )

            return total + (
                answers[index] === correct?.id ? 1 : 0
            )
        }, 0)

        const previousResult = getChapterTwoQuizResult(quizNumber)

        const updatedBestScore = Math.max(
            bestScore,
            previousResult?.bestScore ?? 0,
            finalScore,
        )

        const result: QuizResult = {
            score: finalScore,
            bestScore: updatedBestScore,
            totalQuestions: questions.length,
            percentage: Math.round(
                (finalScore / questions.length) * 100,
            ),
            completed: true,
            completedAt: new Date().toISOString(),
        }

        const saved = saveChapterTwoQuizResult(
            quizNumber,
            result,
        )

        if (!saved) {
            console.error(
                `Unable to save Chapter 2 Quiz ${quizNumber} result.`,
            )
        }

        setBestScore(updatedBestScore)
        setIsFinished(true)
    }

    const handleRetry = () => {
        setCurrentIndex(0)
        setSelectedOption('')
        setAnswers({})
        setSubmitted({})
        setIsFinished(false)
    }

    // Results screen
    if (isFinished) {
        const percentage = Math.round(
            (score / questions.length) * 100,
        )

        return (
            <div className="min-h-screen bg-slate-50">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                        <Link
                            to="/student/chapter/2"
                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700"
                        >
                            <ArrowLeft size={18} />
                            Chapter 2
                        </Link>

                        <span className="font-bold tracking-wide text-blue-700">
                            CAREERVERSE
                        </span>
                    </div>
                </header>

                <main className="mx-auto max-w-2xl px-6 py-16">
                    <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                            <Trophy size={38} />
                        </div>

                        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blue-700">
                            Assessment Completed
                        </p>

                        <h1 className="mt-3 text-3xl font-bold text-slate-900">
                            Knowledge Quiz {quizNumber}
                        </h1>

                        <p className="mt-3 text-sm text-slate-600">
                            You have completed all {questions.length} questions.
                            Here is your result.
                        </p>

                        <div className="mt-8 rounded-2xl bg-blue-50 p-8">
                            <p className="text-sm font-medium text-slate-600">
                                Your Score
                            </p>

                            <p className="mt-2 text-5xl font-bold text-blue-700">
                                {score}/{questions.length}
                            </p>

                            <p className="mt-3 text-lg font-semibold text-slate-800">
                                {percentage}% Accuracy
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs text-slate-500">
                                    Correct Answers
                                </p>

                                <p className="mt-2 text-2xl font-bold text-green-600">
                                    {score}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <p className="text-xs text-slate-500">
                                    Best Score
                                </p>

                                <p className="mt-2 text-2xl font-bold text-blue-700">
                                    {bestScore}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleRetry}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                <RotateCcw size={17} />
                                Retry Quiz
                            </button>

                            <Link
                                to="/student/chapter/2"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                            >
                                Back to Chapter 2
                                <ArrowRight size={17} />
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
        )
    }

    // Active quiz screen
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link
                        to="/student/chapter/2"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700"
                    >
                        <ArrowLeft size={18} />
                        Exit Quiz
                    </Link>

                    <span className="font-bold tracking-wide text-blue-700">
                        CAREERVERSE
                    </span>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-6 py-10">
                <section className="mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                            Chapter 2 Assessment
                        </span>

                        <span className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock size={16} />
                            {questions.length} Questions
                        </span>
                    </div>

                    <h1 className="mt-5 text-3xl font-bold text-slate-900">
                        Knowledge Quiz {quizNumber}
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Select one answer for each question. Submit your
                        answer to view the explanation before continuing.
                    </p>
                </section>

                {/* Progress */}
                <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">
                            Question {currentIndex + 1} of {questions.length}
                        </span>

                        <span className="text-sm font-bold text-blue-700">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-blue-700 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </section>

                {/* Question */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <BookOpen size={17} />
                        Question {currentIndex + 1}
                    </div>

                    <h2 className="mt-5 text-xl font-bold leading-8 text-slate-900">
                        {currentQuestion.question}
                    </h2>

                    <div className="mt-7 space-y-3">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOption === option.id
                            const isCorrectOption = option.isCorrect

                            let optionStyle =
                                'border-slate-200 hover:border-blue-300 hover:bg-blue-50'

                            if (isCurrentSubmitted && isCorrectOption) {
                                optionStyle =
                                    'border-green-500 bg-green-50 text-green-900'
                            } else if (
                                isCurrentSubmitted &&
                                isSelected &&
                                !isCorrectOption
                            ) {
                                optionStyle =
                                    'border-red-400 bg-red-50 text-red-900'
                            } else if (isSelected) {
                                optionStyle =
                                    'border-blue-600 bg-blue-50 text-blue-900'
                            }

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    disabled={isCurrentSubmitted}
                                    onClick={() => setSelectedOption(option.id)}
                                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${optionStyle} ${isCurrentSubmitted
                                            ? 'cursor-default'
                                            : 'cursor-pointer'
                                        }`}
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-700">
                                        {String.fromCharCode(65 + index)}
                                    </span>

                                    <span className="flex-1 pt-1 text-sm leading-6">
                                        {option.text}
                                    </span>

                                    {isCurrentSubmitted && isCorrectOption && (
                                        <CheckCircle2
                                            size={20}
                                            className="shrink-0 text-green-600"
                                        />
                                    )}

                                    {isCurrentSubmitted &&
                                        isSelected &&
                                        !isCorrectOption && (
                                            <XCircle
                                                size={20}
                                                className="shrink-0 text-red-600"
                                            />
                                        )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Explanation */}
                    {isCurrentSubmitted && (
                        <div className="mt-6 space-y-4">
                            <div
                                className={`rounded-xl p-5 ${chosenOption?.isCorrect
                                        ? 'bg-green-50'
                                        : 'bg-red-50'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    {chosenOption?.isCorrect ? (
                                        <CheckCircle2
                                            size={20}
                                            className="text-green-700"
                                        />
                                    ) : (
                                        <XCircle
                                            size={20}
                                            className="text-red-700"
                                        />
                                    )}

                                    <p
                                        className={`font-bold ${chosenOption?.isCorrect
                                                ? 'text-green-800'
                                                : 'text-red-800'
                                            }`}
                                    >
                                        {chosenOption?.isCorrect
                                            ? 'Correct Answer!'
                                            : 'Incorrect Answer'}
                                    </p>
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-700">
                                    {chosenOption?.explanation}
                                </p>
                            </div>

                            {!chosenOption?.isCorrect && correctOption && (
                                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                                    <p className="text-sm font-bold text-green-800">
                                        Correct Answer
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {correctOption.text}
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-slate-700">
                                        {correctOption.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowLeft size={17} />
                            Previous
                        </button>

                        {!isCurrentSubmitted ? (
                            <button
                                type="button"
                                onClick={handleSubmitAnswer}
                                disabled={!selectedOption}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Submit Answer
                                <CheckCircle2 size={17} />
                            </button>
                        ) : currentIndex < questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                            >
                                Next Question
                                <ArrowRight size={17} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleFinish}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3 text-sm font-semibold text-white hover:bg-green-800"
                            >
                                View Final Result
                                <Trophy size={17} />
                            </button>
                        )}
                    </div>
                </section>

                <p className="mt-5 text-center text-xs text-slate-500">
                    Your progress and results are currently stored in this browser session.
                </p>
            </main>
        </div>
    )
}
