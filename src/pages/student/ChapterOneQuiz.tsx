
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CheckCircle2,
    XCircle,
    Trophy,
    ArrowLeft,
    RotateCcw,
} from 'lucide-react'

import {
    getChapterOneQuizResult,
    saveChapterOneQuizResult,
} from '../../services/storage/assessmentStorage'

import type { QuizResult } from '../../types/storage'

const questions = [
    {
        question: 'Which three factors create strong career opportunities?',
        options: [
            'CGPA, certificates, and attendance',
            'Skill depth, proof of work, and communication/network',
            'Coding speed, social media, and hobbies',
            'Degree, college name, and certificates',
        ],
        answer: 1,
        explanation:
            'Strong opportunities come from practical skills, demonstrable work, and the ability to communicate and build professional connections.',
    },
    {
        question: 'What does the vertical part of a T-shaped engineer represent?',
        options: [
            'Knowledge of every programming language',
            'Participation in college events',
            'Deep expertise in one selected domain',
            'General knowledge without specialization',
        ],
        answer: 2,
        explanation:
            'The vertical part represents deep expertise in one domain, such as backend development, machine learning, or embedded systems.',
    },
    {
        question: 'What does the horizontal part of a T-shaped engineer represent?',
        options: [
            'Supporting knowledge across related technical and professional areas',
            'Expertise in only one programming language',
            'Only academic knowledge',
            'Avoiding collaboration',
        ],
        answer: 0,
        explanation:
            'The horizontal part includes supporting skills such as Git, SQL, cloud basics, AI tools, and communication.',
    },
    {
        question: 'According to the 70/20/10 time strategy, how much time should go to core skills?',
        options: ['10%', '20%', '50%', '70%'],
        answer: 3,
        explanation:
            'The strategy recommends allocating 70% of available learning time to core skills, projects, and domain development.',
    },
    {
        question: 'Which is a common career preparation mistake?',
        options: [
            'Building practical projects',
            'Starting DSA early',
            'Collecting certificates without building projects',
            'Practising communication',
        ],
        answer: 2,
        explanation:
            'Certificates alone do not demonstrate practical ability. Projects provide evidence that you can apply what you learn.',
    },
]

export default function ChapterOneQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)

    const [bestScore, setBestScore] = useState(
        () => getChapterOneQuizResult()?.bestScore ?? 0,
    )

    const question = questions[currentQuestion]
    const selectedAnswer = selectedAnswers[currentQuestion]
    const isCorrect = selectedAnswer === question.answer

    const score = questions.reduce(
        (total, item, index) =>
            total + (selectedAnswers[index] === item.answer ? 1 : 0),
        0,
    )

    function selectAnswer(optionIndex: number) {
        if (selectedAnswer !== undefined) return

        setSelectedAnswers((previous) => {
            const updated = [...previous]
            updated[currentQuestion] = optionIndex
            return updated
        })
    }

    function saveQuizResult(finalScore: number) {
        const previousResult = getChapterOneQuizResult()

        const newBestScore = Math.max(
            finalScore,
            previousResult?.bestScore ?? 0,
        )

        const result: QuizResult = {
            score: finalScore,
            bestScore: newBestScore,
            totalQuestions: questions.length,
            percentage: Math.round(
                (finalScore / questions.length) * 100,
            ),
            completed: true,
            completedAt: new Date().toISOString(),
        }

        const saved = saveChapterOneQuizResult(result)

        if (!saved) {
            console.error('Unable to save Chapter 1 quiz result.')
            return
        }

        setBestScore(newBestScore)
    }

    function nextQuestion() {
        if (selectedAnswer === undefined) return

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((previous) => previous + 1)
        } else {
            saveQuizResult(score)
            setShowResult(true)
        }
    }

    function restartQuiz() {
        setCurrentQuestion(0)
        setSelectedAnswers([])
        setShowResult(false)
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-3xl">

                <Link
                    to="/student/chapter/1"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                >
                    <ArrowLeft size={17} />
                    Back to Chapter 1
                </Link>

                {!showResult ? (
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">

                        <div className="mb-7 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-blue-700">
                                    CHAPTER 01 ASSESSMENT
                                </p>

                                <h1 className="mt-2 text-2xl font-bold text-slate-900">
                                    Test Your Understanding
                                </h1>
                            </div>

                            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                                {currentQuestion + 1} / {questions.length}
                            </span>
                        </div>

                        <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-blue-600 transition-all"
                                style={{
                                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                                }}
                            />
                        </div>

                        <h2 className="mb-6 text-xl font-semibold leading-relaxed text-slate-900">
                            {question.question}
                        </h2>

                        <div className="space-y-3">
                            {question.options.map((option, index) => {
                                const isSelected = selectedAnswer === index
                                const isAnswer = question.answer === index

                                let optionStyle =
                                    'border-slate-200 hover:border-blue-400 hover:bg-blue-50'

                                if (
                                    selectedAnswer !== undefined &&
                                    isAnswer
                                ) {
                                    optionStyle =
                                        'border-green-500 bg-green-50 text-green-800'
                                } else if (isSelected && !isCorrect) {
                                    optionStyle =
                                        'border-red-400 bg-red-50 text-red-800'
                                }

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => selectAnswer(index)}
                                        disabled={selectedAnswer !== undefined}
                                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm font-medium transition ${optionStyle}`}
                                    >
                                        <span>
                                            <span className="mr-3 font-bold">
                                                {String.fromCharCode(65 + index)}.
                                            </span>
                                            {option}
                                        </span>

                                        {selectedAnswer !== undefined && isAnswer && (
                                            <CheckCircle2
                                                className="shrink-0 text-green-600"
                                                size={20}
                                            />
                                        )}

                                        {isSelected && !isCorrect && (
                                            <XCircle
                                                className="shrink-0 text-red-600"
                                                size={20}
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        {selectedAnswer !== undefined && (
                            <div
                                className={`mt-6 rounded-xl p-4 ${isCorrect
                                        ? 'bg-green-50 text-green-900'
                                        : 'bg-amber-50 text-amber-900'
                                    }`}
                            >
                                <p className="font-bold">
                                    {isCorrect
                                        ? 'Correct answer!'
                                        : 'Not quite. Review this concept.'}
                                </p>

                                <p className="mt-2 text-sm leading-relaxed">
                                    {question.explanation}
                                </p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={nextQuestion}
                            disabled={selectedAnswer === undefined}
                            className="mt-8 w-full rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            {currentQuestion === questions.length - 1
                                ? 'View My Results'
                                : 'Next Question'}
                        </button>
                    </section>
                ) : (
                    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                            <Trophy size={34} className="text-blue-700" />
                        </div>

                        <p className="mt-6 text-sm font-bold tracking-wider text-blue-700">
                            CHAPTER 01 ASSESSMENT SUBMITTED
                        </p>

                        <h1 className="mt-3 text-3xl font-bold text-slate-900">
                            Assessment Results
                        </h1>

                        <p className="mt-5 text-5xl font-bold text-blue-700">
                            {score}/{questions.length}
                        </p>

                        <p className="mt-2 text-lg font-semibold text-slate-700">
                            {Math.round((score / questions.length) * 100)}%
                        </p>

                        <p className="mt-3 text-slate-600">
                            {score === 5
                                ? 'Excellent work! You answered every question correctly.'
                                : score >= 3
                                    ? 'Good effort! Review the explanations to strengthen your understanding.'
                                    : 'Keep learning. Revisit the chapter and try the assessment again.'}
                        </p>

                        <div className="mt-6 rounded-xl bg-blue-50 p-5">
                            <p className="text-sm font-medium text-slate-600">
                                Your Best Score
                            </p>

                            <p className="mt-1 text-2xl font-bold text-blue-800">
                                {bestScore}/{questions.length}
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                                Your best result is retained during this browser session.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                            <button
                                type="button"
                                onClick={restartQuiz}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                <RotateCcw size={17} />
                                Retry Assessment
                            </button>

                            <Link
                                to="/student/dashboard"
                                className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                            >
                                Return to Dashboard
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}
