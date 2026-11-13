
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Send,
} from 'lucide-react'

import {
  getChapterThreePollResult,
  saveChapterThreePollResult,
} from '../../services/storage/assessmentStorage'

import type { DomainPollResult } from '../../types/storage'

const domainOptions = [
  'Software Development / Full Stack',
  'Mobile App Development',
  'Data Science and Analytics',
  'Machine Learning and AI',
  'Generative AI and LLMs',
  'Cybersecurity',
  'Cloud Computing and DevOps',
  'Embedded Systems, IoT and VLSI',
  'Quality Assurance and SDET',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Electronics Engineering',
]

const reasonOptions = [
  'I enjoy solving technical problems.',
  'I want to build useful products.',
  'I am interested in research and innovation.',
  'I see good career opportunities in this domain.',
  'I want to explore and discover my interests.',
]

const experienceOptions = [
  'Beginner — I am just starting.',
  'Basic — I know the fundamentals.',
  'Intermediate — I have completed small projects.',
  'Advanced — I have practical experience.',
  'Not sure yet.',
]

function ChapterThreePoll() {
  const [domain, setDomain] = useState('')
  const [reason, setReason] = useState('')
  const [experience, setExperience] = useState('')

  const [submitted, setSubmitted] = useState(
    () => getChapterThreePollResult() !== null,
  )

  function handleSubmit() {
    if (!domain || !reason || !experience) {
      alert('Please answer all three questions.')
      return
    }

    const response: DomainPollResult = {
      domain,
      reason,
      experience,
      submittedAt: new Date().toISOString(),
    }

    const saved = saveChapterThreePollResult(response)

    if (!saved) {
      alert('Unable to save your response. Please try again.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <CheckCircle2 className="mx-auto mb-5 h-16 w-16 text-green-600" />

          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Response Submitted!
          </h1>

          <p className="mb-8 leading-7 text-slate-600">
            Your domain preference has been recorded in this browser
            session. Use your responses to guide your next four-week
            domain exploration.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/student/chapter/3"
              className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Back to Chapter 3
            </Link>

            <Link
              to="/student/dashboard"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/student/chapter/3"
          className="mb-8 inline-flex items-center gap-2 font-medium text-blue-700 hover:text-blue-900"
        >
          <ArrowLeft size={18} />
          Back to Chapter 3
        </Link>

        <section className="mb-8 rounded-3xl bg-blue-700 p-8 text-white">
          <div className="mb-4 flex items-center gap-3">
            <ClipboardList size={28} />
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-100">
              Chapter 3 Activity
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold">
            Domain Preference Poll
          </h1>

          <p className="leading-7 text-blue-100">
            Explore your interests, identify your current experience
            and choose a domain to investigate further. There are no
            right or wrong answers.
          </p>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              1. Which domain interests you the most?
            </h2>

            <p className="mb-5 text-sm text-slate-500">
              Select one primary area of interest.
            </p>

            <div className="space-y-3">
              {domainOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-400 hover:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="domain"
                    value={option}
                    checked={domain === option}
                    onChange={() => setDomain(option)}
                    className="h-4 w-4 accent-blue-700"
                  />

                  <span className="text-sm text-slate-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              2. Why are you interested in this domain?
            </h2>

            <div className="mt-5 space-y-3">
              {reasonOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-400 hover:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="reason"
                    value={option}
                    checked={reason === option}
                    onChange={() => setReason(option)}
                    className="h-4 w-4 accent-blue-700"
                  />

                  <span className="text-sm text-slate-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold text-slate-900">
              3. What is your current experience level?
            </h2>

            <div className="mt-5 space-y-3">
              {experienceOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-blue-400 hover:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option}
                    checked={experience === option}
                    onChange={() => setExperience(option)}
                    className="h-4 w-4 accent-blue-700"
                  />

                  <span className="text-sm text-slate-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!domain || !reason || !experience}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-6 py-4 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            Submit My Response
          </button>
        </div>
      </div>
    </main>
  )
}

export default ChapterThreePoll
