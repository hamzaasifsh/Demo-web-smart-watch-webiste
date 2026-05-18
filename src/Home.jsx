import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import WatchFeatures from './WatchFeatures.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FRAME_COUNT = 240
const frameSrc = (index) =>
  `/watch-frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`

function Home() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const copyRef = useRef(null)
  const progressRef = useRef(null)
  const frameRef = useRef({ frame: 0 })
  const imagesRef = useRef([])
  const animationFrameRef = useRef(null)
  const lastDrawnFrameRef = useRef(-1)
  const [loadedFrames, setLoadedFrames] = useState(0)

  useGSAP(
    () => {
      const section = sectionRef.current
      const canvas = canvasRef.current
      const copy = copyRef.current
      const progress = progressRef.current

      if (!section || !canvas || !copy) {
        return
      }

      const context = canvas.getContext('2d')
      const images = []
      let loaded = 0
      let isDisposed = false
      let timeline

      const sizeCanvas = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
        const rect = canvas.getBoundingClientRect()

        canvas.width = Math.floor(rect.width * pixelRatio)
        canvas.height = Math.floor(rect.height * pixelRatio)
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        lastDrawnFrameRef.current = -1
      }

      const drawFrame = (frameIndex) => {
        const image = images[frameIndex]

        if (!image?.complete) {
          return
        }

        const rect = canvas.getBoundingClientRect()
        const canvasRatio = rect.width / rect.height
        const imageRatio = image.naturalWidth / image.naturalHeight
        const isMobile = rect.width < 640
        const zoom = isMobile ? 1.16 : 1
        let drawWidth
        let drawHeight

        if (imageRatio > canvasRatio) {
          drawHeight = rect.height
          drawWidth = drawHeight * imageRatio
        } else {
          drawWidth = rect.width
          drawHeight = drawWidth / imageRatio
        }

        drawWidth *= zoom
        drawHeight *= zoom
        const offsetX = (rect.width - drawWidth) / 2
        const offsetY = (rect.height - drawHeight) / 2

        context.clearRect(0, 0, rect.width, rect.height)
        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight)
        lastDrawnFrameRef.current = frameIndex
      }

      const requestDraw = () => {
        if (animationFrameRef.current !== null) {
          return
        }

        animationFrameRef.current = window.requestAnimationFrame(() => {
          animationFrameRef.current = null
          const frameIndex = Math.round(frameRef.current.frame)

          if (frameIndex !== lastDrawnFrameRef.current) {
            drawFrame(frameIndex)
          }
        })
      }

      const createTimeline = () => {
        if (isDisposed || timeline) {
          return
        }

        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=4000',
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(
            frameRef.current,
            {
              frame: FRAME_COUNT - 1,
              ease: 'none',
              onUpdate: requestDraw,
            },
            0,
          )
          .to(
            copy,
            {
              y: -8,
              autoAlpha: 0.9,
              ease: 'none',
            },
            0,
          )

        if (progress) {
          timeline.to(
            progress,
            {
              scaleX: 1,
              ease: 'none',
            },
            0,
          )
        }
      }

      sizeCanvas()

      for (let frame = 1; frame <= FRAME_COUNT; frame += 1) {
        const image = new Image()
        image.src = frameSrc(frame)
        image.onload = () => {
          loaded += 1

          if (!isDisposed) {
            setLoadedFrames(loaded)
          }

          if (frame === 1 || loaded === FRAME_COUNT) {
            requestDraw()
          }

          if (loaded === FRAME_COUNT) {
            createTimeline()
          }
        }
        images.push(image)
      }

      imagesRef.current = images

      gsap.set(copy, {
        y: 0,
        autoAlpha: 1,
      })

      if (progress) {
        gsap.set(progress, {
          scaleX: 0,
          transformOrigin: 'left center',
        })
      }

      const handleResize = () => {
        sizeCanvas()
        requestDraw()
        ScrollTrigger.refresh()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        isDisposed = true
        window.removeEventListener('resize', handleResize)

        if (animationFrameRef.current !== null) {
          window.cancelAnimationFrame(animationFrameRef.current)
        }
      }
    },
    { scope: sectionRef },
  )

  const loadPercent = Math.round((loadedFrames / FRAME_COUNT) * 100)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030303] text-white">
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-[#080808]"
      >
        <canvas
          ref={canvasRef}
          className="watch-motion absolute inset-0 h-full w-full brightness-[1.18] contrast-[1.05] sm:brightness-[1.16]"
          aria-label="Scroll-controlled Apple Watch product sequence"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.06)_36%,rgba(0,0,0,0.86)_100%),linear-gradient(90deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.08)_66%,rgba(0,0,0,0.42)_100%)] sm:bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.82)_100%),linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.10)_34%,rgba(0,0,0,0.10)_66%,rgba(0,0,0,0.62)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52vh] bg-gradient-to-t from-[#030303] via-[#030303]/72 to-transparent sm:h-[42vh]" />

        {loadedFrames < FRAME_COUNT && (
          <div className="absolute inset-0 z-30 grid place-items-center font-['Poppins'] text-xs font-bold uppercase tracking-[0.24em] text-white/55">
            Loading experience {loadPercent}%
          </div>
        )}

        <div className="relative z-20 flex min-h-[100svh] items-end justify-center px-5 pb-[13vh] pt-20 sm:min-h-screen sm:px-10 sm:pb-[10vh] lg:px-20">
          <div
            ref={copyRef}
            className="mx-auto max-w-[22rem] text-center font-['Oswald'] sm:max-w-4xl"
          >
            <p className="mb-2 font-['Poppins'] text-[9px] font-bold uppercase tracking-[0.28em] text-white/45 sm:mb-3 sm:text-xs sm:tracking-[0.32em]">
              Apple Watch Studio
            </p>
            <h1 className="text-balance text-[clamp(2.3rem,15vw,4rem)] font-medium uppercase leading-[0.84] sm:text-[clamp(2.6rem,5.1vw,5.6rem)]">
              Precision.
              <span className="block text-white/45">Unfolded.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xs font-['Poppins'] text-[11px] leading-5 text-white/68 sm:mt-4 sm:max-w-xl sm:text-sm sm:leading-6">
              Scroll to reveal the architecture inside. Return upward and the
              watch becomes whole again.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5 font-['Poppins'] sm:mt-5 sm:gap-3">
              <a
                href="#fitness"
                className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-black transition hover:bg-white/85 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Explore fitness
              </a>
              <a
                href="#water"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Explore water
              </a>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-20 font-['Poppins'] sm:bottom-8 sm:left-10 sm:right-10 lg:left-20 lg:right-20">
            <div className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-white/38 sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">
              <span>Complete</span>
              <span>Revealed</span>
            </div>
            <div className="h-px overflow-hidden rounded-full bg-white/14">
              <span
                ref={progressRef}
                className="watch-motion block h-full origin-left scale-x-0 bg-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      <WatchFeatures />
    </main>
  )
}

export default Home
