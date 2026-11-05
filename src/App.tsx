import { useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import { FaMusic, FaPause, FaPlay } from "react-icons/fa";

const lyrics: { lyric: string; duration: number, delay?: number }[] = [
  { lyric: "We poppin' like...🍾", duration: 0.5, delay: 1.5},
  {lyric: "Ayooo!🕺🏾", duration: 1.5},
  { lyric: "All my bitches got real hair chillin' with the top down🪩", duration: 2.3, delay: 0.3 },
  { lyric: "Screamin' like...", duration: 0.8 },
  {lyric: "Ayooo!🕺🏾", duration: 1.5},
  { lyric: "I'ma take her ass down if she bring her friend around 😏", duration: 2, delay: 0.4 },
  { lyric: "Fuck 'em both like...😩", duration: 0.8 },
  {lyric: "Ayooo!🕺🏾", duration: 1.5, delay: 0.2},
  { lyric: "I'm a bougie ass nigga, left the roof at home 😎", duration: 2.5, delay: 0.3},
  { lyric: "We poppin' like...", duration: 0.5 },
  {lyric: "Ayooo!🕺🏾", duration: 1.2},
  {lyric: "Ayooo!🕺🏾", duration: 1.2},
  {lyric: "Ayooo!🕺🏾", duration: 1.2},
  { lyric: "But don't be actin' like I need you 😒", duration: 1.5 },
]


function App() {
  let elapsedSeconds = 0
  const [isAnimationPaused, setIsAnimationPaused] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)


  function playPauseMusic(){
    const audio = audioRef.current
    if(!audio) return

    if(isAnimationPaused){
      audio.play()
    }else{
      audio.pause()
    }
  }

  return (
    <div className="w-screen h-screen bg-neutral-800 font-public-sans text-white flex justify-center items-center">
      <div className="w-120 h-fit bg-[#131313] rounded p-7 max-sm:p-4">
        <span className="font-edu text-[10px] mb-5 text-rose-400 block">Created by Timi</span>
        <div className="flex justify-between items-center text-green-300">
          <h1 className="opacity-90 text-orange-300 text-xl relative font-edu flex items-center gap-3">
          <FaMusic /> Ayo — Chris Brown
            <div className="w-full absolute h-1/2 bottom-0 left-0 bg-linear-to-t from-orange-300/2 to-transparent"/>
          </h1>

          <div className="space-x-2">
            <button
              onClick={() => {
                setIsAnimationPaused(!isAnimationPaused)
                playPauseMusic()
              }}
              className="cursor-pointer"
            >
                {isAnimationPaused ? <FaPlay/> : <FaPause />}
            </button>
            <button
            onClick={() => {
              window.location.reload()
            }}
            className="cursor-pointer"
            >
              <BiReset className="text-blue-500" />
            </button>
          </div>
        </div>
        
        <div>
          <ul className="mt-10 space-y-2 [&>li]:text-sm overflow-hidden">
            {lyrics.map(({ lyric, duration, delay }, index) => {
              const delayDuration = delay ? delay + elapsedSeconds : elapsedSeconds
              elapsedSeconds = delay ? delay + elapsedSeconds + duration : elapsedSeconds + duration

              return (
                <li key={`${lyric}-${index}`} className="flex justify-between gap-4 w-fit relative">
                  <span>{lyric}</span>
                  <div
                    className="w-[calc(100%+20px)] h-full absolute revealer -left-5 bg-linear-to-r from-transparent from-0% to-[#131313] to-5%"
                    style={{
                      animationDuration: `${duration * 1000}ms`,
                      animationDelay: `${delayDuration * 1000}ms`,
                      animationPlayState: isAnimationPaused ? "paused" : "initial"
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      	<audio controls ref={audioRef} className="absolute opacity-0 pointer-events-none">
          <a href="media/audio/scrimbaPodTom.mp3">download audio</a>
          <source src="/music.mp3" type="audio/mp3" />
        </audio>
    </div>
  )
}

export default App