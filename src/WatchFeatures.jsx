import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const features = [
  {
    id: 'fitness',
    image: '/watch-features/fitness.png',
    eyebrow: 'Fitness',
    title: 'Every run. Every goal.',
    body: 'Advanced metrics and real-time motivation for training that feels personal.',
    imagePosition: 'left center',
    className: 'lg:col-span-7',
    height: 'min-h-[24rem] sm:min-h-[29rem] lg:min-h-[32rem]',
    copyMode: 'mobile',
  },
  {
    id: 'focus',
    image: '/watch-features/focus.png',
    eyebrow: 'Focus',
    title: 'Your day, closer at hand.',
    body: 'Calls, updates, tasks, and quick glances stay easy to reach.',
    imagePosition: '58% center',
    className: 'lg:col-span-5',
    height: 'min-h-[24rem] sm:min-h-[29rem] lg:min-h-[32rem]',
    copyMode: 'always',
  },
  {
    id: 'water',
    image: '/watch-features/water.png',
    eyebrow: 'Water resistant',
    title: 'Water? Bring it on.',
    body: 'Ready for swims, surf, sweat, and everything in between.',
    imagePosition: 'center 44%',
    className: 'lg:col-span-12',
    height: 'min-h-[23rem] sm:min-h-[30rem] lg:min-h-[33rem]',
    copyMode: 'mobile',
  },
  {
    id: 'mac-unlock',
    eyebrow: 'Ecosystem',
    title: 'Unlocking Mac with Apple Watch',
    body: 'This has to be one of the best ecosystem features ever. Your Apple Watch can replace the biometric unlock, so you do not need an Apple keyboard with Touch ID just to unlock your Mac.',
    className: 'lg:col-span-12',
    setup: [
      'Make sure both the Mac and Apple Watch use the same Apple ID.',
      'Make sure a passcode is enabled on your Apple Watch.',
      'On your Mac, head to System Settings > Login Password and check your Apple Watch.',
      'Now, whenever you need to input your Mac password, Apple Watch unlocks it for you.',
    ],
  },
]

function FeatureCard({ feature, index }) {
  if (feature.setup) {
    return (
      <article
        id={feature.id}
        className={`feature-card watch-motion relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.035))] p-5 shadow-2xl shadow-black/40 ring-1 ring-white/[0.04] backdrop-blur sm:p-7 lg:p-9 ${feature.className}`}
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-white/12 bg-black/28 px-3 py-1.5 font-['Poppins'] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/76 backdrop-blur-xl">
              {String(index + 1).padStart(2, '0')} / {feature.eyebrow}
            </div>
            <h2 className="mt-8 max-w-xl font-['Oswald'] text-[clamp(2.5rem,9vw,5.3rem)] font-medium uppercase leading-[0.9]">
              {feature.title}
            </h2>
            <p className="mt-5 max-w-xl font-['Poppins'] text-sm leading-7 text-white/66 sm:text-base sm:leading-8">
              {feature.body}
            </p>
          </div>

          <div className="grid gap-3 font-['Poppins'] sm:grid-cols-2">
            {feature.setup.map((step, stepIndex) => (
              <div
                key={step}
                className="setup-step watch-motion rounded-[1.35rem] border border-white/10 bg-black/24 p-4 backdrop-blur-xl sm:p-5"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">
                  Step {stepIndex + 1}
                </span>
                <p className="mt-4 text-sm leading-6 text-white/78">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    )
  }

  const showCopyAlways = feature.copyMode === 'always'

  return (
    <article
      id={feature.id}
      className={`feature-card watch-motion group relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/40 ring-1 ring-white/[0.04] backdrop-blur ${feature.className}`}
    >
      <div className={`relative ${feature.height}`}>
        <img
          src={feature.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
          style={{ objectPosition: feature.imagePosition }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_34%)] opacity-80" />

        <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/28 px-3 py-1.5 font-['Poppins'] text-[10px] font-semibold uppercase tracking-[0.18em] text-white/76 backdrop-blur-xl sm:left-5 sm:top-5">
          {String(index + 1).padStart(2, '0')} / {feature.eyebrow}
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 p-5 font-['Poppins'] sm:p-7 lg:p-8 ${
            showCopyAlways ? '' : 'sm:hidden'
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/52">
            Apple Watch
          </p>
          <h2 className="mt-2 max-w-[11ch] font-['Oswald'] text-[clamp(2.35rem,9vw,4.25rem)] font-medium uppercase leading-[0.88]">
            {feature.title}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/72">
            {feature.body}
          </p>
        </div>
      </div>
    </article>
  )
}

function WatchFeatures() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const section = sectionRef.current

      if (!section) {
        return
      }

      const header = section.querySelector('.features-heading')
      const cards = gsap.utils.toArray('.feature-card', section)
      const setupSteps = gsap.utils.toArray('.setup-step', section)

      gsap.fromTo(
        header,
        {
          autoAlpha: 0,
          y: 28,
          filter: 'blur(12px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 70,
          scale: 0.94,
          filter: 'blur(18px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 64%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      gsap.fromTo(
        setupSteps,
        {
          autoAlpha: 0,
          y: 22,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#mac-unlock',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bg-[#050506] px-5 py-16 text-white sm:px-10 sm:py-24 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="features-heading watch-motion mb-8 flex flex-col gap-4 font-['Poppins'] sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/42">
              Features
            </p>
            <h2 className="mt-3 font-['Oswald'] text-[clamp(2.4rem,8vw,5rem)] font-medium uppercase leading-[0.9]">
              Built for every part of your day.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/54 sm:text-right">
            Fitness, focus, and water resistance presented in clean iOS-style
            cards.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WatchFeatures
